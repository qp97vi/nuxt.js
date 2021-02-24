/**
 * VUEshop
 * ============================================================================
 * * 版权所有 2015-2027 深圳搜豹网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.vueshop.com.cn
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和使用 .
 * 不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: soubao-java 2020-07-22 $
 */
<template>
	<div class="ri-menu fr">
		<div class="menumain p">
			<div class="goodpiece">
				<h1>{{i18n.address_list.address_manage}}</h1>
				<span class="co_blue" @click="address_edit()" style="cursor:pointer">{{i18n.address_list.add_new_address}}</span>
			</div>
			<div class="grou_num_list address_list_jl ma-to-20">
				<ul class="grou_tite">
					<li class="sx2">
						<span>{{i18n.address_list.consignee}}</span>
					</li>
					<li class="sx1">
						<span>{{i18n.address_list.take_address}}</span>
					</li>
					<li class="sx3">
						<span>{{i18n.address_list.call}}</span>
					</li>
					<li class="sx5">
						<span>{{i18n.operation}}</span>
					</li>
				</ul>
				<ul class="add_conta addressItem" :data-address-id="item.address_id" v-for="(item,index) in siteData" :key="item.address_id">
					<li class="sx2">
						<span>{{item.consignee}}</span>
					</li>
					<li class="sx1">
						<el-tag type="danger" v-if="item.is_default==1">{{i18n.address_list.default_address}}</el-tag>
						<span>{{item.province_name}}</span>
						<span>{{item.city_name}}</span>
						<span>{{item.district_name}}</span>
						<span>{{item.address}}</span>
					</li>
					<li class="sx3">
						<span>{{item.mobile}}</span>
					</li>
					<li class="sx5" style="width: 250px;">
						<el-button-group>
						  <el-button size="mini" v-if="item.is_default==0" @click="set_address_default(item,index)" :class="item.is_default==1 ? 'defulat_address':''">{{i18n.address_list.set_default_address}}</el-button>
						  <el-button icon="el-icon-edit" size="mini" @click="amendLocation(item)">{{i18n.alter}}</el-button>
						  <el-button icon="el-icon-delete" size="mini" @click="deleteAddress(item,index)">{{i18n.delete}}</el-button>
						</el-button-group>
					</li>
				</ul>
			</div>
			<p class="gp_num2">
				{{i18n.yet_save}}
				<em class="red">{{siteData.length}}</em>{{i18n.address_list.bar_address_and_save}}
				<em class="red">{{20-siteData.length}}</em>{{i18n.address_list.the_address}}
			</p>
		</div>
		<!-- 弹框 -->
		<po-pout :dialogFormVisible.sync="dialogFormVisible" @closeBindWarnStandard="handleCloseBindWarnStandard"
		 @updatesiteData="updatesiteData" :title="title" :form="form" :shippingAddres="shippingAddress" :shippingAddressName="shippingAddressName"></po-pout>
	</div>
</template>

<script>
	import {
		customerAddress,
		removeAddress,
		singleUserAddress,
		modifyUserAddress,
	} from "@/utils/api.js";
	import poPout from "@/components/Popout/index";
	export default {
		components: {
			poPout
		},
		data() {
			return {
				siteData: [], //地址数据
				dialogFormVisible: false,
				title: this.$t('user').address_list.newly_increased, //表单标题
				form: {
					consignee: "", //收货人
					address: "", //详细地址
					zipcode: "", //邮编
					mobile: "", //手机
					is_default: 0, //默认地址
				},
				shippingAddress: [], //收货地址id
				shippingAddressName: [], //收货地址名称
				clonedAddress: "", // 克隆当前修改的数据
			};
		},
		created() {
			this.getCustomerAddress();
		},
		computed: {
			i18n () {  
			  return this.$t('user') 
			} 
		},
		methods: {
			//关闭弹框
			handleCloseBindWarnStandard(data) {
				this.dialogFormVisible = data;
			},
			//设置默认
			set_address_default(item, index) {
				var _this = this;
				var form = this.siteData[index];
				form.is_default = 1;
				var argu = "";
				modifyUserAddress(form).then((res) => {
					if (res.status == 1) {
						argu = {
							showClose: true,
							message: res.msg,
							type: "success",
						};
					} else {
						argu = {
							showClose: true,
							message: _this.i18n.address_list.setup_failed + res.msg,
							type: "error",
						};
					}
					_this.$message(argu);
					_this.getCustomerAddress();
				});
			},
			//点击增加地址
			address_edit() {
				this.title = this.i18n.address_list.newly_increased;
				this.dialogFormVisible = true;
				this.shippingAddress = [];
				this.form = {
					consignee: "", //收货人
					address: "", //详细地址
					zipcode: "", //邮编
					mobile: "", //手机
					is_default: 0 //默认地址
				};
				this.shippingAddressName = [this.i18n.address_list.please_select_address];
			},
			updatesiteData(data) {
				this.siteData = data
			},
			//点击修改地址
			amendLocation(item) {
				var _this = this;
				this.title = this.i18n.alter;
				this.dialogFormVisible = true;
				singleUserAddress(item.address_id).then((res) => {
					if (_this.shippingAddress) {
						_this.shippingAddress.splice(0, 1, res.province);
						_this.shippingAddress.splice(1, 1, res.city);
						_this.shippingAddress.splice(2, 1, res.district);
						
						_this.shippingAddressName.splice(0, 1, res.province_name);
						_this.shippingAddressName.splice(1, 1, res.city_name);
						_this.shippingAddressName.splice(2, 1, res.district_name);
					} else {
						_this.shippingAddress.push(res.province);
						_this.shippingAddress.push(res.city);
						_this.shippingAddress.push(res.district);
						
						_this.shippingAddressName.push(res.province_name);
						_this.shippingAddressName.push(res.city_name);
						_this.shippingAddressName.push(res.district_name);
					}
					
					_this.form = res;
					_this.clonedAddress = JSON.parse(JSON.stringify(res));
				});
			},
			//删除地址
			deleteAddress(item, index) {
				var _this = this;
				this.$confirm(_this.i18n.address_list.deleteok, _this.i18n.message, {
						confirmButtonText: _this.i18n.confirm,
						cancelButtonText: _this.i18n.cancel,
						type: "warning",
					})
					.then(() => {
						removeAddress(item.address_id).then((res) => {
							var argu = {};
							if (res.status == 1) {
								_this.getCustomerAddress()
								argu = {
									showClose: true,
									message: res.msg,
									type: "success",
								};
							} else {
								argu = {
									showClose: true,
									message:_this.i18n.fail_delete + res.msg,
									type: "error",
								};
							}
							_this.$message(argu);
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: _this.i18n.undeleted,
						});
					});
			},
			getCustomerAddress() {
				customerAddress().then((res) => {
					this.siteData = res;
				});
			},
		},
	};
</script>

<style scoped>
	@import "@/static/css/return.add.css";
	@import "@/static/css/myaccount.css";

	.defulat_address {
		margin: 0 0 0 10px;
		font-size: 12px;
		background: #ffaa45;
		padding: 2px;
		color: #fff;
		font-weight: 400;
	}

	.pageContent .fl,
	.fr span {
		cursor: pointer;
	}

	.pageContent .fl,
	.fr span:hover {
		color: #ff3b3b;
		transition: all 0.4s ease;
	}

	.goodpiece span {
		float: right;
	}

	.col_main {
		width: 1000px;
		float: right;
		background: #fff;
	}

	.item input {
		vertical-align: middle;
	}

	#air03 .fl.new,
	#air03 .fl.new .new_select {
		width: 420px;
		max-width: 420px;
		margin-right: 10px;
	}

	.co_blue{
		font-size: 1rem;
		font-weight: bold;
	}
</style>

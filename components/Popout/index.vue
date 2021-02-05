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
	<div class="dialog">
		<el-dialog :title="title+i18n.Popout.delivery_address" :visible.sync="dialogFormVisible" :before-close="handleCloseBindWarnStandard">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item :label="i18n.Popout.consignee" :label-width="formLabelWidth" prop="consignee">
					<el-input v-model="form.consignee" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="i18n.Popout.delivery_address" id="delivery-address" :label-width="formLabelWidth" prop="region">
					<el-popover
						style="float:left;"
					    placement="bottom"
						v-model="popoverShow"
					    width="300"
					    trigger="click">
						<div class="popover-content">
							<el-form>
								<span v-if="is_code">
								 <el-divider content-position="left">{{i18n.Popout.import_area}}</el-divider>
								<el-form-item :label="i18n.Popout.region">
									<el-input id="postCode-input" size="mini" v-model="postCode" :placeholder="i18n.Popout.please_area" autocomplete="on" style="width: 160px;"></el-input>
									<el-button id="btn" type="danger" @click="getAddress" size="mini" style="margin-left: 15px;">{{i18n.Popout.confirm}}</el-button>
								</el-form-item>
								</span>
								<span  v-if="is_address">
								 <el-divider content-position="left">{{i18n.Popout.select_address}}</el-divider>
								<el-form-item :label="i18n.Popout.site">
									<Regions ref="region" :initVal="region" @choose="getRegion"></Regions>
								</el-form-item>
								</span>
							</el-form>
						</div>
						<el-input style="width: 300px;" id="region-input" size="mini" slot="reference" v-model="region" :placeholder="i18n.Popout.click_select_address" readonly></el-input>
					</el-popover>
				</el-form-item>
				<el-form-item :label="i18n.Popout.detailed_address" :label-width="formLabelWidth" prop="address">
					<el-input type="textarea" :rows="2" :placeholder="i18n.Popout.enter_content" v-model="form.address"></el-input>
				</el-form-item>
				<el-form-item :label="i18n.Popout.postcode" :label-width="formLabelWidth" prop="zipcode">
					<el-input v-model="form.zipcode" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="i18n.Popout.landline_phone" :label-width="formLabelWidth" prop="mobile">
					<el-input v-model="form.mobile" autocomplete="off"></el-input>
					<!-- {{i18n.Popout.number_format}}:xx-xx({{i18n.Popout.suchas}}: 0755-86140485) -->
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button id="saveBtn" type="primary" @click="saveShippingAddress('form')" v-if="buttonBool">{{i18n.Popout.save_shipping_address}}</el-button>
				<el-button id="updateBtn" type="primary" @click="amendUserAddress()" v-else>{{i18n.Popout.change_delivery_address}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getShopConfig,
		getInList,
		modifyUserAddress,
		newAddress,
		customerAddress,
		getAddress
	} from "@/utils/api.js";
	import Regions from "@/components/Regions";
	export default {
		data() {
			return {
				is_address:false,
				is_code:false,
				siteData: [], //地址数据
				buttonBool: true, //新增按钮显示隐藏
				shippingAddress: [], //收货地址
				formLabelWidth: "120px",
				props: {
					lazy: true,
					lazyLoad(node, resolve) {
						const {
							level
						} = node;
						var date = {
							parent_id: node.value || 0,
						};
						getInList(date).then((res) => {
							const nodes = res.map((item, index) => ({
								value: item.id,
								label: item.name,
								leaf: level >= 2,
							}));
							resolve(nodes);
						});
					},
				}, //选择地址
				//验证
				rules: {
					consignee: [{
						required: true,
						message: "请输入收货人",
						trigger: "blur"
					}, ],
					region: [{
						required: false,
						message: "请输入收货地址",
						trigger: "blur"
					}, ],
					address: [{
						required: true,
						message: "请输入详细地址",
						trigger: "blur"
					}, ],
					zipcode: [{
							required: true,
							message: "请输入邮编号",
							trigger: "blur"
						},
						{
							validator: function(rule, value, callback) {
								if (value === "") {
									callback(new Error(this.$t('components.Popout.verify_four')));
								} else {
									if (value !== "") {
										var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
										if (!reg.test(value)) {
											callback(new Error(this.$t('components.Popout.verify_five')));
										}
									} else {
										callback();
									}
								}
							},
							trigger: "blur",
						},
					],
					mobile: [{
							required: true,
							message: "请输入手机号码",
							trigger: "blur"
						},
						{
							validator: function(rule, value, callback) {
								if (/^1[34578]\d{9}$/.test(value) == false) {
									callback(new Error(this.$t('components.Popout.verify_sevene')));
								} else {
									callback();
								}
							},
							trigger: "blur",
						},
					],
				},
				postCode: "", //邮编
				region: "",
				popoverShow: false,
			};
		},
		props: ["dialogFormVisible", "title", "form", "shippingAddres", "shippingAddressName"],
		watch: {
			shippingAddres(val, old) {
				this.shippingAddress = val
			},
			title(val, old) {
				if (val == '新增' || val == this.i18n.Popout.newly_increased) {
					this.buttonBool = true
				} else {
					this.buttonBool = false
				}
			}
		},
		computed: {
			i18n () {  
				this.rules.consignee[0].message = this.$t('components.Popout.verify_one') 
				this.rules.address[0].message = this.$t('components.Popout.verify_two') 
				this.rules.zipcode[0].message = this.$t('components.Popout.verify_therr') 
				this.rules.mobile[0].message = this.$t('components.Popout.verify_six') 
				return this.$t('components')  
			} 
		},
		created(){
			this.getPayConfig();
		},
		components: {
		  Regions
		},
		methods: {
			getPayConfig() {
				var that = this;
				var work=[];
				getShopConfig({
					inc_type: 'shopping'
				}).then(res => {
					if (res.shopping && res.shopping.address_and_code) {
						work = res.shopping.address_and_code.split(",");
						for(var i=0; i<work.length; i++) {
							if(parseInt(work[i]) == 1){
								that.is_code=true;
							}
							if(parseInt(work[i]) == 0){
								that.is_address=true;
							}
						}
					}
				})
			},
			//选择地址
			selectArea(msg) {
				this.form.province = msg[0];
				this.form.city = msg[1];
				this.form.district = msg[2];
			},
			//保存新增地址
			saveShippingAddress() {
				var _this = this;
				if (this.siteData.length > 20) {
					_this.$message({
						showClose: true,
						message: _this.i18n.Popout.add_few,
						type: "warning",
					});
				} else {
					if(this.form.consignee!=''&& this.form.mobile!=''&& this.form.address!=''&& this.form.zipcode&&this.region!=''){
						newAddress(this.form).then((res) => {
							var argu = "";
							if (res.status == 1) {
								argu = {
									showClose: true,
									message: res.msg,
									type: "success",
								};
							} else {
								argu = {
									showClose: true,
									message: _this.i18n.Popout.new_failure + res.msg,
									type: "error",
								};
							}
							_this.$message(argu);
							_this.handleCloseBindWarnStandard()
							_this.getCustomerAddress();
						});
					}else{
						_this.$message('请完善信息');
					}
					
				}
			},
			//确认修改地址
			amendUserAddress() {
				var _this = this;
				var argu = "";
				modifyUserAddress(this.form).then((res) => {
					if (res.status == 1) {
						argu = {
							showClose: true,
							message: res.msg,
							type: "success",
						};
					} else {
						argu = {
							showClose: true,
							message:_this.i18n.Popout.fail_modify + res.msg,
							type: "error",
						};
					}
					_this.$message(argu);
					_this.getCustomerAddress();
					_this.handleCloseBindWarnStandard()
				});
			},
			//获取地址数据
			getCustomerAddress() {
				customerAddress().then((res) => {
					this.siteData = res;
					this.$emit("updatesiteData", this.siteData)
				});
			},
			handleCloseBindWarnStandard() {
				this.$emit("closeBindWarnStandard", false);
			},
			getShippingAddresName(){
				if(this.$props.shippingAddressName){
					return this.$props.shippingAddressName.join("/")
				}else{
					return this.i18n.Popout.please_select
				}
			},
			getAddress() {
				var that = this;
				var regPos = /^\d+(\.\d+)?$/;
				getAddress({
					name: this.postCode
				}).then(res => {
					if (res) {
						if (res.status < 0) {
							that.$message.error(res.msg)
						} else {
							var address = ""
							res.forEach(region => {
								address += region.name + ","
							})
							that.region = address.substr(0, address.length - 1);
							that.form.province = res[0].id;
							that.form.city = res[1].id;
							that.form.district = res[2].id;
							if(res[3]){
								that.form.twon = res[3].id;
								// that.form.address = res[0].name+res[1].name+res[2].name+res[3].name;
								that.form.zipcode = res[3].name
								that.popoverShow = false
							}else{
								// that.form.address= res[0].name+res[1].name+res[2].name
								that.popoverShow = false
							}	
						}				
					}
				})
			},
			getRegion(data) {
				var that = this;
				var regPos = /^\d+(\.\d+)?$/;
				var address = data.label;
				var rg = ""
				address.forEach(name => {
					rg += name + ","
				})
				that.region = rg.substr(0, rg.length - 1);
				that.form.province = data.value[0];
				that.form.city = data.value[1];
				that.form.district = data.value[2];
				that.form.twon = data.value[3];
				that.postCode = data.label[data.label.length - 1];
				// that.form.address=this.region
				that.popoverShow = false;				
				that.form.zipcode = data.label[data.label.length - 1];
				// if (regPos.test(data.label[data.label.length - 1])) {
				// 	that.form.zipcode = data.label[data.label.length - 1];
				// }
			}
		}
	};
</script>

<style scoped>
	>>>.el-dialog__body {
		padding: 10px 110px;
	}

	>>>.el-select .el-input {
		width: 85%;
	}

	>>>#delivery-address .el-form-item__label:before{
	    content: '*';
		color: #F56C6C;
		margin-right: 4px;
	}
</style>

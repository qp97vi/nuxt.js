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
			<!-- 导航栏 -->
			<div class="navitems p" id="nav">
				<ul>
					<li>
						<span :class="seleType=='All' ? 'selected' : ''" @click="obliGation('All','1')">{{i18n.order_list.all_orders}}</span>
					</li>
					<li>
						<span :class="seleType=='WAITPAY' ? 'selected' : ''" @click="obliGation('WAITPAY','14')">{{i18n.order_list.obligation}}</span>
					</li>
					<li>
						<span :class="seleType=='WAITSEND' ? 'selected' : ''" @click="obliGation('WAITSEND','27')">{{i18n.order_list.send_goods}}</span>
					</li>
					<li>
						<span :class="seleType=='WAITRECEIVE' ? 'selected' : ''" @click="obliGation('WAITRECEIVE','40')">{{i18n.order_list.wait_receiving}}</span>
					</li>
					<li>
						<nuxt-link :to="{ name: 'user/index/comment/id'}">{{i18n.order_list.comment}}</nuxt-link>
					</li>
				</ul>
				<!-- 下面线条 -->
				<div class="wrap-line" :style="'width:130px;left:'+leftPx+'px;'">
					<span style="left:15px;"></span>
				</div>
			</div>
			<!-- 搜索商品信息 -->
			<div class="menu_search p">
				<div id="search_order">
					<input class="sea_ol" type="text" name="search_key" id="search_key1" v-model="gooods_name" :placeholder="i18n.order_list.gooods_name" />
					<input class="sea_ol" type="text" name="search_key" id="search_key2" v-model="order_sn" :placeholder="i18n.order_list.order_sn" />
					<button class="sea_et" @click="inquire" :value="year+'/'+(month+1)+'/'+day">{{i18n.order_list.query}}</button>
					<select name="select_year" @change="inquire">
						<option selected :value="year+'/'+(month+1)+'/'+day">{{i18n.order_list.recent_orders}}</option>
						<option :value="year+'/01'+'/01'">{{i18n.order_list.order_year}}</option>
						<option :value="year-1">{{year-1}}{{i18n.order_list.inorder}}</option>
						<option :value="year-2">{{year-2}}{{i18n.order_list.inorder}}</option>
						<option :value="year-3">{{year-3}}{{i18n.order_list.inorder}}</option>
						<option :value="year-4">{{year-4}}{{i18n.order_list.inorder}}</option>
						<option :value="year-5">{{year-5}}{{i18n.order_list.inorder}}</option>
					</select>
				</div>
			</div>
			<!-- 商品信息 -->
			<div class="orderbook-list">
				<div class="book-tit">
					<ul>
						<li class="sx1">{{i18n.order_list.goods_data}}</li>
						<li class="sx2">{{i18n.order_list.unit_price}}</li>
						<li class="sx3">{{i18n.order_list.amount}}</li>
						<!--<li class="sx4">支付总金额</li>-->
						<li class="sx4">{{i18n.order_list.order_price}}</li>
						<li class="sx5 s5clic" :class="orderStatus ? 'sxbb' : ''" @click="clickOrder">
							{{i18n.order_list.order_status}}
							<i class="jt-x"></i>
						</li>
						<li class="sx6">{{i18n.order_list.operate}}</li>
					</ul>
				</div>
				<div class="hid-derei" :class="orderStatus ? 'orderstatus' : ''">
					<ul>
						<li>
							<span @click="obliGation('','1')">{{i18n.order_list.all_orders}}</span>
						</li>
						<li>
							<span @click="obliGation('WAITPAY','14')">{{i18n.order_list.obligation}}</span>
						</li>
						<li>
							<span @click="obliGation('WAITSEND','27')">{{i18n.order_list.send_goods}}</span>
						</li>
						<li>
							<span @click="obliGation('WAITRECEIVE','40')">{{i18n.order_list.wait_receiving}}</span>
						</li>
						<li>
							<nuxt-link :to="{ name: 'user/index/comment/id',query:{is_comment:0}}">{{i18n.order_list.comment}}</nuxt-link>
						</li>
						<li>
							<span @click="obliGation('FINISH')">{{i18n.order_list.off_stocks}}</span>
						</li>
						<li>
							<span @click="obliGation('CANCEL')">{{i18n.order_list.canceled}}</span>
						</li>
					</ul>
				</div>
			</div>
			<!-- 商品数据 -->
			<div class="order-alone-li lastset_cm" v-if="bool">
				<table width="100%" border cellspacing cellpadding :id="'ordertable_534'+index" v-for="(item,index) in pagingData"
				 :key="item.order_id">
					<tbody>
						<tr class="time_or">
							<td colspan="6">
								<div class="fl_ttmm">
									<span class="time-num">
										{{i18n.order_list.order_time}}：
										<!-- add_time -->
										<em class="num">{{item.add_time_detail}}</em>
									</span>
									<span class="time-num">
										{{i18n.order_list.order_sn}}：
										<em class="num">{{item.order_sn}}</em>
									</span>
									<span class="time-num">
										{{i18n.order_list.seller}}：<em class="num" style="margin-right: 0px;"> {{item.store_name}}</em>
										<a v-if="$store.state.shop_basic&&shop_basic.im_choose == 1" href="javascript:;" :user_id="user.user_id" :uname="user.nickname" :avatar="user.head_pic"
										 sign="" :storeid="item.store_id" :client_host="location.host" :client_href="location.href" :goods_id="item.order_goods[0].goods_id"
											:im_href="location.origin + '/im'" :ws_socket="getWssOrws() + '//' + location.host + '/ws'" 
											 :order_id="item.order_id" :order_sn="item.order_sn" :add_time="item.add_time_detail"
											 :full_address="item.address" :consignee="item.consignee + item.mobile" id="workerman-kefu" onclick="jump()">
											<i class="ear"></i>
										</a>
										<a v-if="$store.state.shop_basic&&shop_basic.im_choose == 2" :href="'tencent://message/?uin=' + item.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
											<i class="ear"></i>
										</a>
									</span>
									<div class="paysoon">
										<a class="ps_lj" href="javascript:;" @click="fob(item)" v-if="item.is_able_receive">{{i18n.order_list.receiving_affirm}}</a>
										<nuxt-link class="ps_lj" :to="{name:'cart/paymentOrder/id',query:{order_sn:item.order_sn}}" v-if="(item.pay_status==0 || item.pay_status == 2) && item.order_status == 0">{{i18n.order_list.immediate_payment}}</nuxt-link>
										<a class="consoorder" href="javascript:;" @click="setPiece(item)" v-if="item.is_able_cancel">{{i18n.order_list.cancellation_order}}</a>
									</div>
								</div>
								<div class="fr_ttmm"></div>
							</td>
						</tr>
						<tr class="conten_or" v-for="(commit,index) in item.order_goods" :key="commit.rec_id">
							<td class="sx1">
								<div class="shop-if-dif">
									<div class="shop-difimg" @click="goods_details(commit)">
										<img :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + commit.goods_id" />
									</div>
									<div class="shop_name">
										<nuxt-link :to="{ name: 'goods/goodsInfo/id',query:{id:commit.goods_id}}">
											<span>{{commit.goods_name}}</span>
										</nuxt-link>
									</div>
									<div class="shop_name">
										<a></a>
									</div>
								</div>
							</td>
							<td class="sx2">
								<span>{{i18nCommon.symbol}}</span>
								<span>{{commit.goods_price}}</span>
							</td>
							<td class="sx3">
								<span>x{{commit.goods_num}}</span><br>
								<span v-if="(item.is_able_return) && commit.is_send > 0 && commit.unsend == 0">
									<nuxt-link :to="{ name: 'order/index/return_goods_rec/id',query:{rec_id:commit.rec_id}}">{{i18n.order_list.apply_sales}}</nuxt-link>
								</span>
								<span v-if="commit.unsend == 1">
									<nuxt-link :to="{ name: 'order/index/return_goods_info/id',query:{rec_id:commit.rec_id}}">{{i18n.order_list.after_sale}}</nuxt-link>
								</span>
							</td>
							<!-- </span> -->
							<td class="sx4" :rowspan="item.order_goods.length" v-if="index==0">
								<div class="pric_rhz">
									<p class="d_pri">
										<span>{{i18nCommon.symbol}}</span>
										<span>{{item.total_amount.toFixed(2)}}</span>
									</p>
									<p class="d_yzo">
										<span>{{i18n.order_list.shipping_included}}：</span>
										<span>{{item.shipping_price.toFixed(2)}}</span>
									</p>
									<p class="d_yzo">
										<a href="javascript:void(0);">{{item.pay_name}}</a>
									</p>
								</div>
							</td>
							<td class="sx5" :rowspan="item.order_goods.length" v-if="index==0">
								<div class="detail_or">
									<p class="d_yzo">{{item.order_status_detail}}</p>
									<p>
										<nuxt-link :to="{name:'order/order_detail/id',query:{order_id:item.order_id}}">{{i18n.order_list.view_details}}</nuxt-link>
									</p>
								</div>
							</td>
							<td class="sx6" :rowspan="item.order_goods.length" v-if="index==0">
								<div class="rbac">
									<p class>
										<nuxt-link :to="{name:'goods/goodsInfo/id',query:{id:commit.goods_id}}">{{i18n.order_list.buy_again}}</nuxt-link>
									</p>
									<p class="inspect" v-if="item.is_able_comment">
										<nuxt-link :to="{ name: 'order/index/comment_list/id',query:{order_id:item.order_id}}">{{i18n.order_list.evaluate}}</nuxt-link>
									</p>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 没有商品时 -->
			<div class="order-alone-li lastset_cm" v-else>
				<div class="car-none-pl">
					<i class="account-acco1"></i>{{i18n.order_list.noorder}}，
					<nuxt-link :to="{name:'index'}">{{i18n.order_list.have_look}}~</nuxt-link>
				</div>
			</div>
			<!-- 分页 -->
			<div class="paging">
				<div class="block">
					<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
					 :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
				</div>
			</div>
			<!-- 取消订单弹框 -->
			<el-dialog :title="i18n.order_list.cancel_application" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item>
						<p>{{i18n.order_list.cancelled_successfully}}</p>
					</el-form-item>
					<el-form-item :label="i18n.order_list.order_amount" :label-width="formLabelWidth">
						<strong class="ftx-01">{{i18nCommon.symbol}}{{Number(form.goods_price).toFixed(2)}}</strong>
					</el-form-item>
					<el-form-item :label="i18n.order_list.reason_cancellation" :label-width="formLabelWidth">
						<el-select v-model="form.region" :placeholder="i18n.order_list.please_reason_cancellation">
							<el-option :label="i18n.order_list.cause_one" :value="i18n.order_list.cause_one"></el-option>
							<el-option :label="i18n.order_list.cause_two" :value="i18n.order_list.cause_two"></el-option>
							<el-option :label="i18n.order_list.cause_therr" :value="i18n.order_list.cause_therr"></el-option>
							<el-option :label="i18n.order_list.cause_four" :value="i18n.order_list.cause_four"></el-option>
							<el-option :label="i18n.order_list.cause_five" :value="i18n.order_list.cause_five"></el-option>
							<el-option :label="i18n.order_list.cause_six" :value="i18n.order_list.cause_six"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label-width="formLabelWidth" class="paydetail-box">
						<div style="overflow: hidden;">
							<dl class="pdetail clearfix" style="float:left;">
								<dd class="fore1">{{i18n.order_list.discount_coupon}}</dd>
								<dd class="fore2">
									<strong class="ftx-01" id="payDetail3">{{i18nCommon.symbol}}{{Number(form.coupon_price).toFixed(2)}}</strong>
								</dd>
							</dl>
							<dl class="pdetail clearfix" style="float:left;">
								<dd class="fore1">{{i18n.order_list.integral}}</dd>
								<dd class="fore2">
									<strong class="ftx-01" id="payDetail18">{{i18nCommon.symbol}}{{Number(form.integral_money).toFixed(2)}}</strong>
								</dd>
							</dl>
							<dl class="pdetail clearfix" style="float:left;">
								<dd class="fore1">{{i18n.order_list.balance}}</dd>
								<dd class="fore2">
									<strong class="ftx-01" id="payDetail1">{{i18nCommon.symbol}}{{Number(form.user_money).toFixed(2)}}</strong>
								</dd>
							</dl>
						</div>
					</el-form-item>
					<el-form-item :label="i18n.order_list.warm_prompt" :label-width="formLabelWidth" class="paydetail-box">
						<div class="return-msg">
							<br />· {{i18n.order_list.warm_one}}
							<br />· {{i18n.order_list.warm_two}}
							<br />· {{i18n.order_list.warm_therr}}
						</div>
					</el-form-item>
					<el-form-item :label="i18n.order_list.contact_way" :label-width="formLabelWidth">
						<input type="text" class="text text1 gray" name="consignee" style="margin-right:10px;" v-model="form.consignee" />
						<input type="text" class="text gray" name="mobile" v-model="form.mobile" />
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="determineCancel()">{{i18n.order_list.confirm_cancel}}</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">{{i18n.order_list.temporarily_notcancel}}</el-button>
				</div>
			</el-dialog>
		</div>
		<div class="operating fixed" id="bottom">
			<div class="fn_page clearfix"></div>
		</div>
	</div>
</template>

<script>
 import { mapState } from "vuex";
	import {
		getUser
	} from "@/utils/auth.js";
	import {
		userOrderPaging,
		commoditySearch,
		cancellationOrder,
		confirmReceipt,
	} from "@/utils/api.js";
	import {loadImJs,getWssOrws} from "@/utils/asyncLoadJs"
	let loadedImJs = false;//是否加载完im的js
	export default {
		data() {
			return {
				bool: true, //有数据时显示
				form: {
					coupon_price: "", //优惠卷
					integral_money: "", //积分
					user_money: "", //余额
					goods_price: "", //商品总价
					consignee: "", //弹框姓名
					mobile: "", //弹框手机号
					region: this.$t('user.order_list.cause_one'), //弹框取消原因
				},
				currentPage: 1, //初始页面为1
				pageSize: 10, //默认数据条
				pagingData: [], //我的订单数据
				handleSize: 10, //当页面几条数据
				handleCurrent: 1, //第几页
				total: 0, //总共多少条数据
				seleType: "All", //类名切换
				leftPx: "10", //下面线条偏移
				orderStatus: false, //订单状态
				day: new Date().getDate(), //当前日期
				month: new Date().getMonth(), //当前月份
				year: new Date().getFullYear(), //当前年份
				gooods_name: "", //商品名称
				order_sn: "", //订单编号
				dialogFormVisible: false,
				formLabelWidth: "100px",
				type: "", //类型
				location:"",
				user: getUser(),
			};
		},
		computed: {
			...mapState(["shop_basic"]),
			i18n() {
				// this.form.region = this.$t('user.order_list.cause_one');
				return this.$t('user')
			},
			i18nCommon() {
				return this.$t('common')
			}
		},
		created() {
			if(process.client) {
				this.location = window.location;
			}
			
		},
		methods: {
			goods_details(commit){
				this.$router.push({name:'goods/goodsInfo/id',query:{id:commit.goods_id}})
			},
			getWssOrws(){
				return getWssOrws()
			},
			//收货确认
			fob(item) {
				var _this = this;
				this.$confirm(_this.i18n.order_list.confirm_receipt, _this.i18n.hint, {
						confirmButtonText: _this.i18n.confirm,
						cancelButtonText: _this.i18n.cancel,
						type: "warning",
					})
					.then(() => {
						confirmReceipt(item).then((res) => {
							if (res.status == 1) {
								this.$message({
									type: "success",
									message: res.msg,
								});
								var params = {
									p: _this.handleCurrent,
									size: _this.handleSize,
									type: _this.type,
								};
								_this.pagingMethod(params);
							} else {
								this.$message({
									type: "error",
									message: res.msg,
								});
							}
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: _this.i18n.canceled,
						});
					});
			},
			//取消订单
			setPiece(item) {
				this.dialogFormVisible = true;
				this.form = item;
				//this.form.region = "订单不能按预计时间送达"; //弹框取消原因
			},
			//确定取消订单
			determineCancel() {
				var _this = this;
				var params = {
					order_id: this.form.order_id,
					order_sn: this.form.order_sn,
					mobile: this.form.mobile,
					consignee: this.form.consignee,
				};
				cancellationOrder(params).then((res) => {
					var aren = {};
					if (res.status == 1) {
						aren = {
							showClose: true,
							message: res.msg,
							type: "success",
						};
						var params = {
							p: _this.handleCurrent,
							size: _this.handleSize,
							type: _this.type,
						};
						_this.pagingMethod(params);
					} else {
						aren = {
							showClose: true,
							message: res.msg,
							type: "error",
						};
					}
					_this.$message(aren);
					_this.dialogFormVisible = false;
				});
			},
			//查询
			inquire(id) {
				var _this = this;
				var year = new Date().getFullYear();
				var time = year + "/" + (this.month + 1) + "/" + this.day;
				if (year > id.target.value) {
					time = id.target.value + "/01" + "/01";
				} else {
					time = id.target.value;
				}
				var getTime = new Date(time).getTime() / 1000;
				var params = {
					start_time: getTime,
					gooods_name: this.gooods_name,
					order_sn: this.order_sn,
				};
				commoditySearch(params).then((res) => {
					if (res.records.length > 0) {
						_this.bool = true;
					} else {
						_this.bool = false;
					}
					_this.handleCurrent = 1;
					_this.total = res.total;
					_this.pagingData = res.records;
				});
				// }
			},
			//点击订单状态
			clickOrder() {
				this.orderStatus = !this.orderStatus;
			},
			// 切换
			obliGation(type, pixel) {
				var _this = this;
				this.handleCurrent = 1;
				this.type = type;
				var params = {
					p: _this.handleCurrent,
					size: _this.handleSize,
					type: type,
				};
				this.pagingMethod(params);
				this.seleType = type;
				this.orderStatus = false;
				this.leftPx = 10 * pixel;
			},
			// 切换每页多少条数据
			handleSizeChange(val) {
				this.handleSize = val;
				var params = {
					p: this.handleCurrent,
					size: this.handleSize,
					type: this.type,
				};
				this.pagingMethod(params);
			},
			// 跳转到第几页
			handleCurrentChange(val) {
				this.handleCurrent = val;
				var params = {
					p: this.handleCurrent,
					size: this.handleSize,
					type: this.type,
				};
				this.pagingMethod(params);
			},
			// 分页数据
			pagingMethod(data) {
				userOrderPaging(data).then((res) => {
					if (res.records.length > 0) {
						this.bool = true;
					} else {
						this.bool = false;
					}
					this.pagingData = res.records;
					this.total = res.total;
				});
			}

		},
		created() {
			if (this.$route.query.type != undefined) {
				this.seleType = this.$route.query.type
			}
			this.leftPx = this.$route.query.leftPx * 10
			var params = {
				p: 1,
				size: 10,
				type: this.seleType,
			};
			this.pagingMethod(params);
			if (!loadedImJs &&this.$store.state.shop_basic&& this.shop_basic.im_choose == 1) {
				loadImJs(location.origin + '/im').then(() => {
				  loadedImJs = true;
				})
			}
		},
	};
</script>

<style scoped>
	@import "@/static/css/cOrderIframe.css";

	>>>.el-dialog__body {
		padding: 5px 20px;
	}

	>>>.el-dialog {
		width: 35%;
	}

	.paydetail-box {
		margin: 0px;
	}

	.menu_search .sea_ol {
		width: 150px;
		margin-right: 10px;
	}

	.hid-derei ul li span {
		padding: 6px 0px 6px 31px;
		cursor: pointer;
	}

	.orderstatus {
		display: block;
	}

	.selected {
		color: #ff3b3b !important;
	}

	.ri-menu .menumain .navitems li span {
		padding: 0px 40px;
		font-size: 16px;
		line-height: 40px;
		display: inline-block;
		color: #555;
		cursor: pointer;
	}

	.lastset_cm {
		overflow-y: height;
	}

	.paging {
		text-align: center;
	}

	.shop-if-dif .shop-difimg {
		width: 100px;
		height: 100px;
	}

	.shop-difimg>img {
		width: 100%;
	}
</style>

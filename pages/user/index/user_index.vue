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
		<div class="menu-ri-t p">
			<div class="mu-head fl">
				<img :src="userInfo.head_pic" />
			</div>
			<div class="mu-midd fl">
				<nuxt-link :to="{ name: 'user_index'}">{{userInfo.nickname}}</nuxt-link>
				<a class="mu-m-vip">{{levelData.level_name}}</a>
				<p>
					<span>{{i18n.user_index.account_security}}：</span>
					<span class="tt-zd">
						<i style="width: 30%;" v-if="userInfo.mobile_validated == 0 || userInfo.email_validated==0"></i>
						<i style="width: 60%;" v-if="userInfo.mobile_validated == 1 && userInfo.email_validated==1 && userInfo.paypwd == null"></i>
						<i style="width: 90%;" v-if="userInfo.mobile_validated == 1 && userInfo.email_validated==1 && userInfo.paypwd != null"></i>
					</span>
					<span class="c_ye" v-if="userInfo.mobile_validated == 0 || userInfo.email_validated==0">{{i18n.user_index.lower}}</span>
					<span class="c_ye" v-if="userInfo.mobile_validated == 1 && userInfo.email_validated==1 && userInfo.paypwd == null">{{i18n.user_index.ordinary}}</span>
					<span class="c_ye" v-if="userInfo.mobile_validated == 1 && userInfo.email_validated==1 && userInfo.paypwd != null">{{i18n.user_index.higher}}</span>
					<!-- <a class="c_bl" href="">提升</a> -->
				</p>
			</div>
			<div class="mu-afte fl">
				<ul class="mu-a1">
					<li class hidden>
						<a href>
							<i class="icon-card"></i>
							<span>{{i18n.user_index.member_discount}}</span>
							<em class="mu-unit">&nbsp;{{i18n.user_index.break}}</em>
							<em class="mu-num">0</em>
							<i class="icon-ar"></i>
						</a>
					</li>
					<li class>
						<nuxt-link :to="{name:'recharge'}">
							<i class="icon-balance"></i>
							<span>{{i18n.user_index.account_balance}}</span>
							<em class="mu-unit">&nbsp;{{i18n.user_index.unit}}</em>
							<em class="mu-num">{{Number(userInfo.user_money).toFixed(2)}}</em>
							<i class="icon-ar"></i>
						</nuxt-link>
					</li>
					<li>
						<!--下一个ul里拿上来的-->
						<nuxt-link :to="{name:'account'}">
							<i class="icon-point"></i>
							<span>{{i18n.user_index.available_integral}}</span>
							<em class="mu-unit">&nbsp;{{i18n.user_index.point}}</em>
							<em class="mu-num">{{userInfo.pay_points}}</em>
							<i class="icon-ar"></i>
						</nuxt-link>
					</li>
				</ul>
				<ul class="mu-a2">
					<li>
						<nuxt-link :to="{name:'coupon'}">
							<i class="icon-coupon"></i>
							<span>{{i18n.user_index.discount_coupon}}</span>
							<em class="mu-unit">&nbsp;{{i18n.user_index.open}}</em>
							<em class="mu-num">{{total}}</em>
							<i class="icon-ar"></i>
						</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="order-list p">
			<div class="ddlb-ayh">
				<div class="ddlb-tit">
					<h1>{{i18n.user_index.myorder}}</h1>
					<nuxt-link :to="{name:'user/index/order_list/id'}" class="u-view-all">{{i18n.user_index.view_allorders}}</nuxt-link>
					<i class="u-sep"></i>
				</div>
				<div class="order-alone-li" v-if="OrderFormData != ''">
					<table width="100%" border cellspacing cellpadding>
						<tbody>
							<tr class="time_or">
								<td colspan="6">
									<div class="fl_ttmm">
										<span class="time-num">
											{{i18n.user_index.order_time}}：
											<em class="num">{{OrderFormData.add_time_detail}}</em>
										</span>
										<span class="time-num">
											{{i18n.user_index.order_number}}：
											<em class="num">{{OrderFormData.order_sn}}</em>
										</span>
										<span class="time-num">
											{{i18n.user_index.seller}}：
											<a :href="'tencent://message/?uin=' + OrderFormData.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
												<em class="num">
													{{OrderFormData.store_name}}
													<i class="ear"></i>
												</em>
											</a>
										</span>
										<div class="paysoon">
											<a class="ps_lj"  href="javascript:;" @click="fob(OrderFormData)" v-if="OrderFormData.shipping_status==1 && OrderFormData.order_status == 1" >{{i18n.user_index.goods_receipt}}</a>
											<nuxt-link class="ps_lj" :to="{name:'cart/paymentOrder/id',query:{order_sn:OrderFormData.order_sn}}">{{i18n.user_index.immediate_payment}}</nuxt-link>
											<a class="consoorder" href="javascript:;" @click="setPiece(OrderFormData)" v-if="(OrderFormData.order_status==0 || OrderFormData.order_status == 1) && OrderFormData.shipping_status == 0">{{i18n.user_index.cancellation_order}}</a>
										</div>
									</div>
									<div class="fr_ttmm"></div>
								</td>
							</tr>
							<tr class="conten_or" v-for="(item,index) in OrderFormData.order_goods" :key="item.rec_id">
								<td class="sx1">
									<div class="shop-if-dif">
										<div class="shop-difimg">
											<img style="width:100px;height:100px" :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.goods_id" />
										</div>
										<div class="shop_name">
											<nuxt-link :to="{ name: 'goods/goodsInfo/id',query:{id:item.goods_id}}">
												<span>{{item.goods_name}}</span>
											</nuxt-link>
										</div>
									</div>
								</td>
								<td class="sx2">
									<span>{{i18nCommon.symbol}}</span>
									<span>{{item.member_goods_price}}</span>
								</td>
								<td class="sx3">{{item.goods_num}}</td>
								<td class="sx4" :rowspan="OrderFormData.order_goods.length" v-if="index == 0">
									<div class="pric_rhz">
										<p class="d_pri">
											<span>{{i18nCommon.symbol}}</span>
											<span>{{OrderFormData.goods_price}}</span>
										</p>

										<p class="d_yzo">
											<span>{{i18n.user_index.shipping_included}}：</span>
											<span>{{OrderFormData.shipping_price}}</span>
										</p>
										<p class="d_yzo">
											<a>{{OrderFormData.pay_name}}</a>
										</p>
									</div>
								</td>
								<td class="sx5">
									<div class="detail_or">
										<p class="d_yzo">{{OrderFormData.order_status_detail}}</p>
										<p>
											<nuxt-link :to="{name:'order/order_detail/id',query:{order_id:item.order_id}}">{{i18n.user_index.view_details}}</nuxt-link>
										</p>
									</div>
								</td>
								<td class="sx6" rowspan="1">
									<div class="rbac">
										<p class>
											<nuxt-link :to="{name:'goods/goodsInfo/id', query:{ id: item.goods_id }}">{{i18n.user_index.buy_again}}</nuxt-link>
										</p>
										<p class="inspect" v-if="OrderFormData.order_status==2 && OrderFormData.order_status != 4">
											<nuxt-link :to="{ name: 'order/index/comment_list/id',query:{order_id:OrderFormData.order_id}}">{{i18n.user_index.evaluate}}</nuxt-link>
										</p>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div v-else>
					<div class="car-none-pl">
						<i class="account-acco1"></i>{{i18n.user_index.recent_orders}}
						<a href="/">{{i18n.user_index.have_look}}~</a>
					</div>
				</div>
			</div>
		</div>
		<div class="order-list bgno p">
			<div class="ddlb-zy">
				<div class="coll-coupon fl">
					<div class="coll-etl">
						<div class="ddlb-tit">
							<h1>{{i18n.user_index.myfavorite}}</h1>
							<nuxt-link :to="{name:'user/index/goods_collect/id'}" class="u-view-all">{{i18n.user_index.view_more}}</nuxt-link>
						</div>
						<div class="shop-sc-t">
							<ul>
								<li v-for="(item) in goodsData" :key="item.user_id">
									<nuxt-link :to="{name:'goods/goodsInfo/id', query:{ id: item.goods_id }}">
										<img :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.goods_id" />
										<p>
											<em>{{i18nCommon.symbol}}</em>
											<em>{{item.shop_price}}</em>
										</p>
									</nuxt-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="coll-coupon malrh fl">
					<div class="coupon-etl">
						<div class="ddlb-tit">
							<h1>{{i18n.user_index.mycoupons}}</h1>
							<nuxt-link :to="{name:'user/index/coupon'}" class="u-view-all">{{i18n.user_index.view_more}}</nuxt-link>
						</div>
						<div class="shop-sc-t">
							<div class="coupon-bgimg" v-for="(item) in coupon" :key="item.id">
								<nuxt-link :to="item.use_type == 1 ? {name:'goods/goodsInfo/id', query:{ id: item.goods_id }} : {name:'store/index/id', query:{ store_id: item.store_id , bool: 2}}">
									<div class="cp-jal">
										<h1>
											<em class="li-fh">{{i18nCommon.symbol}}</em>
											<em>{{item.money}}</em>
										</h1>
										<span>{{i18n.user_index.full}}{{item.condition}}{{i18n.user_index.subtract}}{{item.money}}</span>
									</div>
									<div class="cp-jay">
										<span>{{i18n.user_index.immediate_use}}</span>
									</div>
								</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 取消订单弹框 -->
		<el-dialog :title="i18n.user_index.cancel_application" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item>
					<p>{{i18n.user_index.way_back}}</p>
				</el-form-item>
				<el-form-item :label="i18n.user_index.orde_total" :label-width="formLabelWidth">
					<strong class="ftx-01">{{i18nCommon.symbol}}{{Number(form.goods_price).toFixed(2)}}</strong>
					<!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
				</el-form-item>
				<el-form-item :label="i18n.user_index.reason_cancellation" :label-width="formLabelWidth">
					<el-select v-model="form.region" :placeholder="i18n.user_index.select_active_area">
						<el-option :label="i18n.user_index.cause_one" :value="i18n.user_index.cause_one"></el-option>
						<el-option :label="i18n.user_index.cause_two" :value="i18n.user_index.cause_two"></el-option>
						<el-option :label="i18n.user_index.cause_therr" :value="i18n.user_index.cause_therr"></el-option>
						<el-option :label="i18n.user_index.cause_four" :value="i18n.user_index.cause_four"></el-option>
						<el-option :label="i18n.user_index.cause_five" :value="i18n.user_index.cause_five"></el-option>
						<el-option :label="i18n.user_index.cause_six" :value="i18n.user_index.cause_six"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" class="paydetail-box">
					<div style="overflow: hidden;">
						<dl class="pdetail clearfix" style="float:left;">
							<dd class="fore1">{{i18n.user_index.discount_coupon}}</dd>
							<dd class="fore2">
								<strong class="ftx-01" id="payDetail3">{{i18nCommon.symbol}}{{Number(form.coupon_price).toFixed(2)}}</strong>
							</dd>
						</dl>
						<dl class="pdetail clearfix" style="float:left;">
							<dd class="fore1">{{i18n.user_index.integral}}</dd>
							<dd class="fore2">
								<strong class="ftx-01" id="payDetail18">{{i18nCommon.symbol}}{{Number(form.integral_money).toFixed(2)}}</strong>
							</dd>
						</dl>
						<dl class="pdetail clearfix" style="float:left;">
							<dd class="fore1">{{i18n.user_index.balance}}</dd>
							<dd class="fore2">
								<strong class="ftx-01" id="payDetail1">{{i18nCommon.symbol}}{{Number(form.user_money).toFixed(2)}}</strong>
							</dd>
						</dl>
					</div>
				</el-form-item>
				<el-form-item :label="i18n.user_index.warm_prompt" :label-width="formLabelWidth" class="paydetail-box">
					<div class="return-msg">
						<br />· {{i18n.user_index.hint_one}}
						<br />· {{i18n.user_index.hint_two}}
						<br />· {{i18n.user_index.hint_therr}}
					</div>
				</el-form-item>
				<el-form-item :label="i18n.user_index.contact_way" :label-width="formLabelWidth">
					<input type="text" class="text text1 gray" name="consignee" style="margin-right:10px;" v-model="form.consignee" />
					<input type="text" class="text gray" name="mobile" v-model="form.mobile" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="determineCancel()">{{i18n.user_index.confirm_cancel}}</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">{{i18n.user_index.withhold_cancel}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getUser
	} from "@/utils/auth.js";
	import {
		// userCoupons,
		getBaseInfo,
		collectionRecords,
		userOrderPaging,
		accessLevel,
		confirmReceipt,
		cancellationOrder,
		userCouponPage //我的优惠卷数据
	} from "@/utils/api.js";

	export default {
		data() {
			return {
				userInfo:"",
				coupon: [], //优惠卷数据
				goodsData: [], //收藏商品数据
				OrderFormData: [], //我的订单数据
				levelData: {}, //用户等级数据
				params: {
					p: 1,
					size: 2
				},
				form: {
					coupon_price: "", //优惠卷
					integral_money: "", //积分
					user_money: "", //余额
					goods_price: "", //商品总价
					consignee: "", //弹框姓名
					mobile: "", //弹框手机号
					region: "订单不能按预计时间送达" //弹框取消原因
				},
				dialogFormVisible: false, //
				formLabelWidth: "100px",
				total: 0 //优惠卷数量
			};
		},
		head() {
			return {
				title: "个人中心",
				meta: [
						{ hid: 'description', name: 'description', content: 'Home page description' }
					],
			}
		},
		computed:{
			i18n () { 
      			this.form.region = this.$t('user.virtual_list.cause_one')  
				return this.$t('user')  
			},
			i18nCommon () {
				return this.$t('common')  
			}
		},
		created() {
			this._getBaseInfo()
		},
		methods: {
			_getBaseInfo() {
				var that = this
				getBaseInfo().then((res) => {
					that.userInfo = res;
				});
			},
			//收货确认
			fob(item) {
				var _this = this
				this.$confirm(_this.i18n.user_index.whether_goods, _this.i18n.hint, {
						confirmButtonText: _this.i18n.confirm,
						cancelButtonText:_this.i18n.cancel,
						type: "warning"
					})
					.then(() => {
						confirmReceipt(item).then(res => {
							if (res.status == 1) {
								this.$message({
									type: "success",
									message: res.msg
								});
								// var params = {
								//   p: _this.handleCurrent,
								//   size: _this.handleSize,
								//   type: _this.type
								// };
								// _this.pagingMethod(params);
								_this.$router.push({
									name: 'order_list'
								})
							} else {
								this.$message({
									type: "error",
									message: res.msg
								});
							}
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: _this.i18n.canceled
						});
					});
			},
			//取消订单
			setPiece(item) {
				this.dialogFormVisible = true;
				this.form = item;
				this.form.region = _this.i18n.user_index.cause_one; //弹框取消原因
			},
			//确定取消订单
			determineCancel() {
				var _this = this;
				var params = {
					order_id: this.form.order_id,
					order_sn: this.form.order_sn,
					mobile: this.form.mobile,
					consignee: this.form.consignee
				};
				cancellationOrder(params).then(res => {
					var aren = {};
					if (res.status == 1) {
						aren = {
							showClose: true,
							message: res.msg,
							type: "success"
						};
						_this.$router.push({
							name: 'order_list'
						})
					} else {
						aren = {
							showClose: true,
							message: res.msg,
							type: "error"
						};
					}
					_this.$message(aren);
					_this.dialogFormVisible = false;
				});
			},
			//优惠卷
			getCoupon() {
				userCouponPage(this.params).then(res => {
					this.coupon = res.records;
					this.total = res.total;
				});
			},
			//收藏商品
			collectGoods() {
				collectionRecords(this.params).then(res => {
					this.goodsData = res.records;
				});
			},
			//我的订单
			myOrderForm() {
				var params = {
					p: 1,
					size: 1
				};
				userOrderPaging(params).then(res => {
					if (res.records[0]!= undefined) {
						this.OrderFormData = res.records[0];
					}
				});
			},
			getaccessLevel() {
				var data = {
					level_id: this.userInfo.level
				};
				accessLevel(data).then(res => {
					this.levelData = res;
				});
			},
			//立即使用优惠卷
			immediateUse(item) {
				if (this.type == 1 || this.type == 2) {
				} else {
					if (item.use_type == 0) {
						this.$router.push({
							name: "store",
							query: {
								store_id: item.store_id,
								bool: 2
							},
						});
					} else if (item.use_type == 1) {
						this.$router.push({
							name: "goodsInfo",
							query: {
								id: item.goods_id
							},
						});
					} else if (item.use_type == 2) {
						this.$router.push({
							name: "store",
							query: {
								store_id: item.store_id,
								bool: 2
							},
						});
					}
				}
			},
		},
		created() {
			this._getBaseInfo();
			this.getCoupon();
			this.collectGoods();
			this.myOrderForm();
			this.getaccessLevel();
		},
		components: {}
	};
</script>

<style scoped>
</style>


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
		<!--充值-s-->
		<div class="aboutmoney addmon" style>
			<div class="usermoney topup-money">
				<div class="userdown-top">
					<span>{{i18n.invest.recharge}}</span>
				</div>
				<hr style="height: 1px; background: #dedede; border: none; margin-top: -1px;" />
				<div class="choicetu">
					<form method="post" id="recharge_form" action>
						<div class="monettu">
							<div class="fop-main">
								<div class="remain-cash">
									<!-- {{i18n.invest.current_balance}}：
									<em>{{i18nCommon.symbol}}</em>
									<b>99994647.99</b> -->
								</div>
								<div class="tag-define" data-_id="tag_157">
									<span class="define-label">
										{{i18n.invest.recharge_amount}}：
										<em>{{i18nCommon.symbol}}</em>
									</span>
									<!-- <input type="text" name="account" class="define-input"  v-model="money" :placeholder="i18n.invest.please_enter_amount"  /> -->
									<i></i>
								</div>
								<div class="m-tagbox m-multi-tag">
									<span v-for="(item,index) in tableData" :key="index">
										<el-radio-group v-model="radio">
											<el-radio-button :label="item.face_value"></el-radio-button>
										</el-radio-group>
									</span>
								</div>
							</div>
							<div class="fop-choice">
								<div class="orde-sjyy">
									<h3 class="titls">{{i18n.invest.method}}</h3>
									<div class="bsjy-g">
										<dl>
											<dd>
												<div class="order-payment-area">
													<div class="po-re dsfzf-ee">
														<ul>
															<li v-if="wxPaySwitch == 1">
																<div class="payment-area">
																	<input type="radio" value="1" v-model="check" class="radio vam" name="pay_radio" />
																	<label for>
																		<img src="@/static/images/weixin/logo.jpg" style="margin-top: 20px; width: 68px; height: 68px" class="image">
																	</label>
																</div>
															</li>
															<li v-if="aliPaySwitch == 1">
																<div class="payment-area">
																	<input type="radio" value="2" v-model="check" class="radio vam" name="pay_radio" />
																	<label for>
																		<img src="@/static/images/newalipay/logo.jpg" style="margin-top: 20px; width: 68px; height: 68px"
																		 class="image">
																	</label>
																</div>
															</li>
															<li  v-if="payPalSwitch == 1">
																<div class="payment-area">
																	<input type="radio" value="3" v-model="check" class="radio vam" name="pay_radio" />
																	<label for>
																	<img src="@/static/images/paypal/logo.png" style="margin-top: 20px; width: 68px; height: 68px" class="image">	
																	</label>
																</div>
															</li>
															<li v-if="stripeSwitch == 1">
																<div class="payment-area">
																	<input type="radio" value="4" v-model="check" class="radio vam" name="pay_radio" />
																	<label for>
																		<img src="@/static/images/stripe/logo.png" style="margin-top: 20px; width: 68px; height: 68px" class="image">
																	
																	</label>
																</div>
															</li>
														</ul>
													</div>
												</div>
												<!--第三方网银支付 start-->
												<!--第三方网银支付 end -->
											</dd>
										</dl>
										<input type="hidden" name="account" id="add_money" value="50" />
										<div class="order-payment-action-area">
											<a class="button-style-5 button-confirm-payment" href="javascript:void(0);" @click="gemOrder">提交申请</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!--充值-e-->
		<div class="operating fixed consume_log" id="bottom" style="display: none;">
			<div class="fn_page clearfix"></div>
		</div>
	</div>
</template>

<script>
	import {
		loadStripe
	} from '@stripe/stripe-js';
	import {
		getRechargeFaceIPage,
		addRecharge,
		wxPayOrder,
		getQrCode,
		getShopConfig,
		aliPayOrder,
		getPayPalUrl,
		getStripeSecret
	} from "@/utils/api";
	import {
		getUser
	} from "@/utils/auth.js";
	export default {
		data() {
			return {
				money:'',
				tableData: [],
				currentPage: this.$route.params.currentPage || 1,
				totalCount: 0,
				pageSize: 10,
				check: '',
				pic: '',
				radio: '',
				order_sn: '',
				card: null,
				aliPaySwitch: 0, //支付宝支付是否启用
				wxPaySwitch: 0, //微信支付是否启用
				stripeSwitch: 0, //stripe支付是否启用
				payPalSwitch: 0, //payPay支付是否启用
				
			};
		},
		created() {
			this.getPage();
		this.getPayConfig();
		},
		mounted() {
			
		},
		computed: {
			i18n() {
				return this.$t('user')
			},
			i18nCommon() {
				return this.$t('common')
			}
		},
		components: {},
		methods: {
			getPayConfig() {
				var that = this;
				getShopConfig({
					inc_type: 'wx_pay,ali_pay,stripe,pay_pal'
				}).then(res => {
					if (res.wx_pay && res.wx_pay.switch) {
						that.wxPaySwitch = parseInt(res.wx_pay.switch)
					}
					if (res.ali_pay && res.ali_pay.switch) {
						that.aliPaySwitch = parseInt(res.ali_pay.switch)
					}
					if (res.stripe && res.stripe.switch) {
						that.stripeSwitch = parseInt(res.stripe.switch)
						if (that.stripeSwitch == 1) {
							that.getStripePublishableKey()
						}
					}
					if (res.pay_pal && res.pay_pal.switch) {
						that.payPalSwitch = parseInt(res.pay_pal.switch)
					}
				})
			},
			async setStripe(key) {
				var that = this
				this.stripe = await loadStripe(key);
				this.elements = this.stripe.elements();
				this.card = this.elements.create('card', {
					style: this.styleObject || this.style
				});
				this.card.mount('#card-element');
				this.card.addEventListener('change', ({
					error
				}) => {
					const displayError = document.getElementById('card-errors');
					if (error) {
						displayError.textContent = error.message;
						return;
					}
					displayError.textContent = '';
				});

				this.form.addEventListener('submit', function(ev) {
					ev.preventDefault();
					that.createPaymentIntent()
				});
			},
			stripePay() {
				this.$refs.stripeSubmitButtonRef.click();

			},
			gemOrder() {
				var that = this;
				var recharge = {
					user_id: getUser().user_id,
					account: this.radio,
					pay_oauth: this.check
				}
				addRecharge(recharge).then((res) => {
					if (res.status == 1) {
					that.order_sn=res.result
					if(this.check==1){//微信
						var requestOrder = {
							trade_type: "NATIVE",
							is_trail:"2",
						}
						requestOrder.order_sn = that.order_sn
						wxPayOrder(requestOrder).then((wxpay) => {
							if (wxpay.result.code_url) {
								that.getPayQrCode(wxpay.result.code_url)
							} else {
								if (wxpay.status != 1) {
									that.$message({
										message: wxpay.msg,
										type: 'error'
									})
								}
							}
						})	
					}//-------------
					if(this.check==2){//支付宝
						aliPayOrder({
							out_trade_no: that.order_sn,
							subject:that.order_sn,
							is_trial:"2"
						}).then(res => {
							let routeUrl = this.$router.resolve({
								name: 'aliPay',
								query: {
									html: res
								}
							});
							console.log(routeUrl.href);
							window.open(routeUrl.href, '_blank');
						})
						
					}//-----------------
					if(this.check==3){//PalPay支付
							getPayPalUrl({
								order_sn: that.order_sn,
								cancel_url: window.location.href,
								success_url: window.location.href,
								is_trail:2,
								// cancel_url: "http://j.tpsns.com/api/order/pay_pal/pay/cancel",
								// success_url: "http://j.tpsns.com/api/order/pay_pal/pay/cancel",
							}).then((url) => {
								window.open(url, '_blank')
							})
					}//-----------------
					if(this.check==4){
						getStripeSecret({
							order_sn: that.order_sn,
							is_trial:"2"
						}).then((clientSecret) => {
							that.stripe.confirmCardPayment(clientSecret, {
								payment_method: {
									card: that.card,
									billing_details: {
										name: that.$store.state.shop_config.company_name
									}
								}
							}).then(function(result) {
								if (result.error) {
									that.$message.error(result.error.message);
								} else {
									/* if (result.paymentIntent.status === 'succeeded') {
						
									} */
								}
							});
						})
					}
					} else {
						that.$message.error(res.msg);
					}
				})

			},
			getPage() {
				var that = this;
				getRechargeFaceIPage({
					p: that.currentPage,
					size: that.pageSize
				}).then(function(res) {
					console.log(res)
					that.tableData = res.records;
					that.totalCount = res.total;
				});
			},
			
			getPayQrCode(code_url) {
				var that = this
				getQrCode({
					url: code_url
				}).then((res) => {
					that.qrCodeLoading = false
					that.qr_code = res
					that.qrCodeDialogVisible = true
				})
			},
		}
	};
</script>


<style scoped>
	@import "@/static/css/jh.css";

	.topup-money {
		background-color: #ffffff;
		padding: 15px;
	}

	.usermoney {
		border: 1px solid #dedede;
		overflow: hidden;
	}

	.userdown-top {
		width: 100%;
	}

	.userdown-top span {
		display: inline-block;
		cursor: pointer;
		width: 120px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		border: 1px solid #dedede;
		border-bottom: 1px solid #fff;
		color: #333;
		font-size: 16px;
		font-weight: bold;
		letter-spacing: 3px;
	}

	.choicetu {
		overflow: hidden;
		padding: 10px;
		margin-top: 16px;
	}

	.fop-main {
		overflow: hidden;
		margin-bottom: 50px;
	}

	.m-tagbox {
		margin-top: 20px;
		overflow: hidden;
	}

	.m-tagbox .tag-define,
	.m-tagbox .tag-item {
		float: left;
		width: 98px;
		height: 38px;
		line-height: 38px;
		border: 1px solid #e0e0e0;
		margin-right: 20px;
		text-align: center;
		color: #333;
	}

	.m-tagbox .tag-item {
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.m-tagbox .t-check {
		display: none;
		position: absolute;
		right: 0;
		bottom: 0;
		width: 16px;
		height: 16px;
		background-position: -40px 0;
	}

	.m-tagbox .tptig {
		display: inline-block;
		background-image: url(../../static/images/sprite-operate.png);
		background-repeat: no-repeat;
	}

	.orde-sjyy {
		font-family: "Tahoma", "\5FAE\8F6F\96C5\9ED1";
	}

	.titls {
		font-size: 14px;
		border-left: 3px solid #e5e5e5;
		padding-left: 6px;
		line-height: 20px;
		margin-bottom: 20px;
	}

	.bsjy-g dl {
		border: 1px solid #dedede;
		border-bottom: 0 none;
	}

	.list1 li {
		float: left;
	}
</style>

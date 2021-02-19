
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
	<div>
		<top-bar></top-bar>
		<div class="fn-cart-pay">
			<!-- cart-title -->
			<div class="wrapper1190">
				<div class="order-header">
					<div class="layout after">
						<div class="fl">
							<div class="logo pa-to-36 wi345">
								<a href="/">
									<img :src="shop_config.store_logo" alt style="max-width: 240px;max-height: 80px;" />
								</a>
							</div>
						</div>
						<div class="fr">
							<div class="pa-to-36 progress-area">
								<div class="progress-area-wd" style="display:none">{{i18n.cart2.i_shopping_trolley}}</div>
								<div class="progress-area-tx" style="display:none">{{i18n.cart2.fill_in_order}}</div>
								<div class="progress-area-cg">{{i18n.cart2.sub_order}}</div>
							</div>
						</div>
					</div>
				</div>
				<!-- end cart-title -->

				<div class="layout after-ta order-ha" v-if="payOrder">
					<div class="erhuh">
						<i class="icon-succ"></i>
						<h3>{{i18n.paymentOrder.order_pay_succeed}}</h3>
						<p class="succ-p">
							{{payOrder.order_list.length > 1 ? i18n.paymentOrder.direct : ""}}{{i18n.paymentOrder.order_number}}：{{payOrder.order_list.length > 1 ? payOrder.master_order_sn : payOrder.order_list[0].order_sn}}
							|
							{{i18n.paymentOrder.pay_money}}：
							<b>{{payOrder.order_amount}}</b>
							<b>{{i18n.paymentOrder.unit}}</b>
						</p>
						<div class="succ-tip" v-if="payOrder.order_list[0].prom_type != 4">
							{{i18n.paymentOrder.you_in}}<b>{{payOrder.order_list[0].finally_pay_time}}</b>&nbsp;{{i18n.paymentOrder.fulfill_pay}}
						</div>
					</div>
					<!-- <div class="ddxq-xiaq">
						<a @click="toOrderDetail()">
							{{i18n.paymentOrder.order_details}}
							<i></i>
						</a>
					</div> -->

					<div class="orde-sjyy">
						<div class="bsjy-g">
							<dl>
								<dd>
									<div class="order-payment-area">
										<div class="dsfzfpte titlsp">
											<b>{{i18n.paymentOrder.select_pay}}</b>
										</div>
										<div class="po-re dsfzf-ee">
											<el-row :gutter="12">
												<el-col  :class="payindex==5?'action':''" :span="8" v-if="payPalSwitch == 1">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<div style="text-align:center" @click="payPalPay()">
															<img src="@/static/images/paypal/paypallogo.jpg" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																PayPal
															</div>
														</div>
													</el-card>
												</el-col>
												<el-col :class="payindex==1?'action':''"  :span="8" v-if="stripeSwitch == 1">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<div style="text-align:center" @click="stripeCheckout()">
															<img src="@/static/images/stripe/logo2.jpg" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																{{i18n.paymentOrder.credit_card}}
															</div>
														</div>
													</el-card>
												</el-col>
												<el-col :class="payindex==3?'action':''" :span="8" v-if="wxPaySwitch == 1">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<div style="text-align:center" @click="wxPay()">
															<img src="@/static/images/weixin/logo.jpg" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																{{i18n.paymentOrder.wx_pay}}
															</div>
														</div>
													</el-card>
												</el-col>
											     <el-col :class="payindex==4?'action':''" :span="8" v-if="aliPaySwitch == 1">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<div style="text-align:center" @click="aliPay()">
															<img src="@/static/images/newalipay/logo.jpg" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																{{i18n.paymentOrder.zfb_apy}}
															</div>
														</div>
													</el-card>
												</el-col>
											</el-row>
										</div>
									</div>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>

		<el-dialog title="Stripe" :visible.sync="stripeDialogVisible" width="30%" :before-close="stripeDialogHandleClose"
		 class="stripeDialog">
			<span slot="footer" class="dialog-footer">
				<div>
					<form id="payment-form">
						<slot name="card-element">
							<div id="card-element"></div>
						</slot>
						<slot name="card-errors">
							<div id="card-errors" role="alert"></div>
						</slot>
						<button ref="stripeSubmitButtonRef" type="submit" class="hide"></button>
					</form>
				</div>
				<el-button @click="stripeDialogVisible = false">{{i18n.cancel}}</el-button>
				<el-button type="primary" @click="stripePay()" :loading="stripePayLoading">{{i18n.confirm}}</el-button>
			</span>
		</el-dialog>

		<el-dialog :title="i18n.paymentOrder.payment_qrcode" :visible.sync="qrCodeDialogVisible" width="30%" center>
			<el-image style="width: 300px; height: 300px" :src="qr_code" fit="fit"></el-image>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="wxPay()" :loading="qrCodeLoading">{{i18n.paymentOrder.refresh}}</el-button>
			</span>
		</el-dialog>
		<!-- palpal组件 -->
		<el-dialog :visible.sync="PayPalVisible" center>
			<PayPal 
				:amount="payOrder.order_amount"
				:orderSn ="orderQuery.master_order_sn ||orderQuery.order_sn"
				type=""
				ref="PayPal"
				@jump="jump"
			></PayPal>
		</el-dialog>
		
	</div>
</template>

<script>
	import {
		loadStripe
	} from '@stripe/stripe-js';
	import md5 from "@/utils/md5.js";
	import {
		getPayMasterOrder,
		wxPayOrder,
		getQrCode,
		aliPayOrder,
		getShopConfig,
		getStripePublishableKey,
		getStripeSecret,
		getStripeSessionId,
	} from "@/utils/api.js";
	import TopBar from "@/components/TopBar/index.vue";
	import PayPal from '@/components/Paypal/index.vue';
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				orderQuery: {},
				payOrder: '',
				submitLoading: false,
				stripePayLoading: false,
				stripeDialogVisible: false,
				password: '',
				qr_code: '',
				qrCodeDialogVisible: false,
				qrCodeLoading: false,
				aliPaySwitch: 0, //支付宝支付是否启用
				wxPaySwitch: 0, //微信支付是否启用
				stripeSwitch: 0, //stripe支付是否启用
				payPalSwitch: 0, //payPay支付是否启用
				stripe: "",
				elements: null,
				card: null,
				approvalUrl: "",
				payindex:5,
				PayPalVisible:false,
			};
		},
		components: {
			TopBar,
			PayPal
		},
		created() {
			this.getPayConfig();
		},
		beforeMount() {
			if (this.$route.query.master_order_sn) {
				this.orderQuery.master_order_sn = this.$route.query.master_order_sn
			} else {
				this.orderQuery.order_sn = this.$route.query.order_sn
			} 
			this._getPayMasterOrder();
		},
		mounted() {
		},
		computed: {
			...mapState(['shop_config', 'shop_basic']),
			form() {
				return document.getElementById('payment-form');
			},
			i18n() {
				return this.$t('cart')
			}
		},
		methods: {
			_getOrderSn() {
				if (this.$route.query.master_order_sn) {
					return this.$route.query.master_order_sn
				} else {
					return this.$route.query.order_sn
				}
			},
			_getPayMasterOrder() {
				var that = this
				getPayMasterOrder(this.orderQuery).then((res) => {
					this.payOrder = res
					if (this.payOrder.order_list.length == 0 || this.payOrder.order_list[0].order_status == 3) {
						that.$message({
							message: that.i18n.paymentOrder.canceled,
							type: 'error',
							onClose: function() {
								that.toOrderDetail()
							}
						})
					}
					if (this.payOrder.order_list[0].pay_status == 1) {
						if (this.payOrder.order_list.length > 1) {
							that.$message({
								message: that.i18n.paymentOrder.order_paid,
								type: 'success',
								onClose: function() {
									that.toOrderDetail()
								}
							})
						} else {
							that.$message({
								message: that.i18n.paymentOrder.order_paid,
								type: 'success',
								onClose: function() {
									that.toOrderDetail()
								}
							})
						}
					}
				})
			},
			toOrderDetail() {
				if (this.payOrder.order_list.length > 1) {
					this.$router.push({
						name: 'order_list'
					})
				} else {
					this.$router.push({
						name: 'order_detail',
						query: {
							order_sn: this.payOrder.order_list[0].order_sn
						}
					})
				}
			},
			wxPay() {
				var that = this
				that.payindex=3
				var requestOrder = {
					trade_type: "NATIVE",
					is_trail:0,
				}
				requestOrder.order_sn = this._getOrderSn()
				that.submitLoading = true
				that.qrCodeLoading = true
				wxPayOrder(requestOrder).then((res) => {
					that.submitLoading = false
					if (res.result.code_url) {
						that.getPayQrCode(res.result.code_url)
					} else {
						if (res.status != 1) {
							that.$message({
								message: res.msg,
								type: 'error'
							})
						}
					}
				})
			},
			aliPay() {
				var that = this
				that.payindex=4
				var order_sn = that.$route.query.master_order_sn ? that.$route.query.master_order_sn : that.$route.query.order_sn;
				aliPayOrder({
					out_trade_no: order_sn,
					subject: order_sn,
					is_trial:"0"
				}).then(res => {
					let routeUrl = this.$router.resolve({
						name: 'aliPay',
						query: {
							html: res
						}
					});
					window.open(routeUrl.href, '_blank');
				})
			},
			stripeDialogHandleClose() {
				this.stripeDialogVisible = false
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
			getStripePublishableKey() {
				getStripePublishableKey().then((res) => {
					this.setStripe(res)
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
			stripeCheckout() {
				var that = this
				that.payindex=1
				getStripeSessionId({
					order_sn: this._getOrderSn(),
					success_url: window.location.href,
					cancel_url: window.location.href
				}).then((sessionId) => {
					if (sessionId.msg) {
						that.$message.error(sessionId.msg);
					} else {
						that.stripe.redirectToCheckout({ sessionId: sessionId })
					}
				})
			},
			createPaymentIntent() {
				var that = this
				getStripeSecret({
					order_sn: this._getOrderSn(),
					is_trial:"0"
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
							if (result.paymentIntent.status === 'succeeded') {
								that.toOrderDetail()
							}
						}
					});
				})
			},
			payPalPay() {
				this.payindex=5
				this.PayPalVisible = true;
			},
			/*监听PalPay支付成功*/
			jump(flag) {
				let that = this;
				if(flag ) {
					that.
					PayPalVisible = false;
					that.$message({
						message: that.i18n.paymentOrder.payment_successful,
						type: 'success',
						onClose: function() {
							that.toOrderDetail()
						}
					})
				}
			}
		}
	};
</script>

<style scoped>
	@import "@/static/css/common.min.css";
	@import "@/static/css/jh.css";

	iframe {
		width: 100%;
		height: 770px;
		border-width: 0;
	}

	>>>.el-dialog--center .el-dialog__body {
		text-align: center;
	}

	.stripe-card {
		width: 300px;
		border: 1px solid grey;
	}

	.stripe-card.complete {
		border-color: green;
	}

	>>>.stripeDialog .el-dialog__body {
		padding: 0px;
	}

	>>>.el-card.is-hover-shadow:hover {
		cursor: pointer;
	}
	>>>.el-col{
		border: solid 1px #fff;
	}
	.dsfzf-ee {
		padding: 30px 10px;
	}
	.action{
		border: solid 1px #ccc;
	}
	.titlsh3{
		font-size: 16px;
	}
	.titlsp{
		color: red;
		font-size: 18px;
		margin: 5px 0;
	}

</style>

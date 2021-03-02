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

				<div class="layout after-ta order-ha">
					<div class="erhuh">
						<i class="icon-succ"></i>
						<h3>{{i18n.paymentOrder.order_pay_succeed}}</h3>
						<p class="succ-p">
							试用订单号：{{order.order_sn}} | 付款金额（元）：
							<b>{{order.shipping_price}}</b>
							<b>元</b>
						</p>
						<div class="succ-tip">
							<!-- {{i18n.paymentOrder.you_in}}<b>2018-03-15 16:08:32</b>&nbsp;{{i18n.paymentOrder.fulfill_pay}} -->
						</div>
					</div>
					<div class="ddxq-xiaq">
						<a>
							{{i18n.paymentOrder.order_details}}
							<i></i>
						</a>
					</div>
					<div class="orde-sjyy">
						<h3 class="titls">{{i18n.paymentOrder.select_pay}}</h3>
						<div class="bsjy-g">
							<dl>
								<dd>
									<div class="order-payment-area">
										<div class="dsfzfpte">
											<b>{{i18n.paymentOrder.select_pay}}</b>
										</div>
										<div class="po-re dsfzf-ee">
											<el-row :gutter="12">
												<el-col :span="8">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<!-- <div style="text-align:center" @click="userMoneyDialogVisible = true"> -->
														<div style="text-align:center" @click="balance()">
															<img src="@/static/images/user_money.png" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																{{i18n.paymentOrder.balance_pay}}
															</div>
														</div>
													</el-card>
												</el-col>
												<el-col :span="8" v-if="wxPaySwitch == 1">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<div style="text-align:center">
															<img src="@/static/images/weixin/logo.jpg" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																{{i18n.paymentOrder.wx_pay}}
															</div>
														</div>
													</el-card>
												</el-col>
												<el-col :span="8" v-if="aliPaySwitch == 1">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<div style="text-align:center" @click="aliPay()">
															<img src="@/static/images/newalipay/logo.jpg" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																	{{i18n.paymentOrder.zfb_apy}}
															</div>
														</div>
													</el-card>
												</el-col>
												<el-col :span="8" v-if="stripeSwitch == 1">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<div style="text-align:center" @click="stripeDialogVisible = true">
															<img src="@/static/images/stripe/logo.png" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																信用卡
																<!-- CreditCard -->
															</div>
														</div>
													</el-card>
												</el-col>
												<el-col :span="8" v-if="payPalSwitch == 1">
													<el-card :body-style="{ padding: '0px' }" shadow="hover">
														<div style="text-align:center"  @click="payPalPay()">
															<img src="@/static/images/paypal/logo.png" style="margin-top: 20px; width: 68px; height: 68px" class="image">
															<div style="padding: 14px;">
																PayPal
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

		<el-dialog title="Stripe" :visible.sync="stripeDialogVisible" width="30%" :before-close="stripeDialogHandleClose" class="stripeDialog">
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

		<el-dialog title="支付密码" :visible.sync="userMoneyDialogVisible" width="30%" :before-close="userMoneyHandleClose">
			<el-input placeholder="请支付密码" v-model="password" show-password clearable maxlength="6"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="userMoneyDialogVisible = false">{{i18n.cancel}}</el-button>
				<el-button type="primary" v-if="password.length == 6" @click="userMoneyPay()" >{{i18n.confirm}}</el-button>
			</span>
		</el-dialog>
		
		
		<el-dialog title="设置支付密码" :visible.sync="usernowpwd" width="30%" >
			<el-input placeholder="请支付密码" v-model="pwdpay" show-password clearable maxlength="6"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="usernowpwd = false">{{i18n.cancel}}</el-button>
				<el-button type="primary" v-if="pwdpay.length == 6" @click="updatepwd()" >{{i18n.confirm}}</el-button>
			</span>
		</el-dialog>

		<el-dialog title="支付二维码" :visible.sync="qrCodeDialogVisible" width="30%" center>
			<el-image style="width: 300px; height: 300px" :src="qr_code" fit="fit"></el-image>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="wxPay()" :loading="qrCodeLoading">{{i18n.paymentOrder.refresh}}</el-button>
			</span>
		</el-dialog>
		<!-- palpal组件 -->
		 <el-dialog :visible.sync="PayPalVisible" center>
			<PayPal 
				:amount="order_amount"
				:orderSn ="trial+order_sn "
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
		getShopConfig,
		getStripePublishableKey,
		getTrialOrder,
		wxPayOrder,
		getQrCode,
		/* getPayPalUrl,
		payPalNotifySuccess, */
		trialUserPay,
		changePaymentPassword,
		aliPayOrder
	} from "@/utils/api.js";
	import TopBar from "@/components/TopBar/index.vue";
	import PayPal from '@/components/Paypal/index.vue';
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				trial:'trial',
				pwdpay:'',
				usernowpwd:false,
				userMoneyDialogVisible: false,
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
				card: null,
				orderSn:'',
				order_sn:'',
				order_amount:0,
				money:'',
				order:[],
				is_without:0,
				PayPalVisible:false,
				
			};
		},
		components: {
			TopBar,
			PayPal
		},
		created() {
			this.getPayConfig();
			this.getOrder();
		},
		mounted() {
		},
		computed: {
			...mapState(['shop_config', 'shop_basic']),
			form() {
				return document.getElementById('payment-form');
			},
			i18n () {
			  return this.$t('cart')  
			} 
		},
		methods: {
			payPalPay() {
				this.payindex=5
				this.PayPalVisible = true;
				
			},
			wxPay() {
				var that = this
				var requestOrder = {
					trade_type: "NATIVE",
					is_trail:1,
				}
				requestOrder.order_sn =that.order_sn
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
				var order_sn = that.$route.query.master_order_sn ? that.$route.query.master_order_sn : that.$route.query.order_sn;
				aliPayOrder({
					out_trade_no: order_sn,
					subject: order_sn,
					is_trial:"1"
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
			
			updatepwd(){
			var that = this;	
			var user_change_pay_pwd_vo ={
				paypwd: md5("TPSHOP" + that.pwdpay)
			}
			changePaymentPassword(user_change_pay_pwd_vo).then(function(isnot) {
					if (isnot.status == 1) {
						that.$message.info("修改成功");
						that.usernowpwd=false;
					} else {
						that.$message.error(isnot.msg);
					}
				});
			
			},
			userMoneyPay(){
				var that = this;
				var user_pay = {
					order_sn:that.order_sn,
					pwd: md5("TPSHOP" + that.password)
				}
				trialUserPay(user_pay).then(function(isnot) {
					if (isnot.status == 1) {
						that.$message.info("支付成功");
						that.$router.push({
							name: 'my_trial',
						});
					} else {
						if(isnot.status== -10020){
							that.usernowpwd=true;
						}
						that.$message.error(isnot.msg);
					}
				});
			},
			getOrder(){
				var that=this;
				getTrialOrder({
				order_sn:  this.$route.query.order_sn
				}).then(function(map) {
					if(map.records[0].total_amount== 0){
					that.$message.info("支付成功");
					that.$router.push({
						name: 'my_trial',
					});
					}
					that.order=map.records[0];
					that.order_amount=map.records[0].order_amount;
					that.order_sn=map.records[0].order_sn;
				})
			},
			getPayConfig() {
				var that = this;
				getShopConfig({
					inc_type: 'wx_pay,ali_pay,stripe,pay_pal,basic'
				}).then(res => {
					if(res.basic && res.basic.is_without){
					that.is_without = parseInt(res.basic.is_without)
					}
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
			stripeDialogHandleClose(){
				this.stripeDialogVisible = false
			},
			balance(){
				this.payindex=2
				if(this.is_without == 1){
				this.userMoneyPayLoading = true
				this.userMoneyPay();
				}else{
			this.userMoneyDialogVisible = true		
				}		
			},
			userMoneyHandleClose() {
				this.userMoneyDialogVisible = false
			},
			toOrderDetail() {
					this.$router.push({
						name: 'my_trial'
					})
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
			},
			stripePay() {
				this.$refs.stripeSubmitButtonRef.click();
			},
		}
	};
</script>

<style scoped>
	@import "@/static/css/common.min.css";
	@import "@/static/css/jh.css";
	iframe{
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

	.dsfzf-ee {
		padding: 30px 10px;
	}
</style>

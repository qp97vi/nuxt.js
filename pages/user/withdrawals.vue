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
				<h1>{{i18n.withdrawals.withdraw_apply}}</h1>
				<nuxt-link :to="{name:'article/index/detail/id'}">
					<span class="co_blue">{{i18n.withdrawals.balance_statement}}</span>
				</nuxt-link>
				<input type="hidden" id="openid" value />
			</div>
			<div class="personerinfro tixbox">
				<form action method="post" id="distribut_form">
					<ul class="hend_jz">
						<li class="infor_wi_le">
							<a href="javascript:void(0);">
								<i class="star">*</i>{{i18n.withdrawals.withdraw_money}}：
							</a>
						</li>
						<li class="infor_img">
							<div class="duleyuan">
								<input @blur="checkMoney()" v-model="withdrawals.money" type="text" onpaste="this.value=this.value.replace(/[^\d.]/g,'')"
								 onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" />
								<span>{{i18n.withdrawals.unit}}</span>
							</div>
							<span class="keyj">
								({{i18n.withdrawals.withdrawal_limit}}{{config.cash.min_cash}} - {{config.cash.max_cash}}
								{{i18n.withdrawals.current_amount}}
								<em>{{Number(userInfo.user_money).toFixed(2)}}</em>{{i18n.withdrawals.unit}})
							</span>
							<p class="adviceql clear">
								{{i18n.withdrawals.service_charge}}：
								<span id="taxfee">{{taxfee}}</span>&nbsp;{{i18n.withdrawals.unit}}
							</p>
						</li>
					</ul>
					<ul class="name_jz">
						<li class="infor_wi_le">
							<a href="javascript:void(0);">
								<i class="star">*</i>{{i18n.withdrawals.withdrawal_type}}：
							</a>
						</li>
						<li class="paydegs">
							
							  <el-radio-group v-model="radio">
							    <el-radio v-for="item in withdrawal_way" :label="item">
									<span v-if="item==0">微信</span>
									<span v-else-if="item==1">支付宝</span>
									<span v-else-if="item==2">银行卡</span>
									<span v-else-if="item==3">paypal</span>
									<span v-else>Stripe</span>
								</el-radio>
							  </el-radio-group>
						</li>
					</ul>
					<ul class="name_jz">
						<li class="infor_wi_le">
							<a href="javascript:void(0);">
								<i class="star">*</i>{{i18n.withdrawals.due_bank}}：
							</a>
						</li>
						<li>
							<a href="javascript:void(0);">
								<input class="name_zjxs" type="text" v-model="withdrawals.bank_name" :placeholder="i18n.withdrawals.like"
								 :disabled="withdrawals.bank_name==i18n.withdrawals.alipay || withdrawals.bank_name==i18n.withdrawals.wechat ? true : false" />
							</a>
							<p class="adviceql">{{i18n.withdrawals.suggest_one}}</p>
						</li>
					</ul>
					<ul class="name_jz">
						<li class="infor_wi_le">
							<a href="javascript:void(0);">
								<i class="star">*</i>{{i18n.withdrawals.shroff_account}}：
							</a>
						</li>
						<li>
							<a href="javascript:void(0);">
								<input class="name_zjxs" type="text" v-model="withdrawals.bank_card" name="bank_card" id="bank_card" value="687646546"
								 :disabled="withdrawals.bank_name==i18n.withdrawals.wechat ? true : false" />
							</a>
							<p class="adviceql">{{i18n.withdrawals.binding_account}}</p>
						</li>
					</ul>
					<ul class="name_jz">
						<li class="infor_wi_le">
							<a href="javascript:void(0);">
								<i class="star">*</i>{{i18n.withdrawals.account_name}}：
							</a>
						</li>
						<li>
							<a href="javascript:void(0);">
								<input class="name_zjxs wisd" v-model="withdrawals.realname" type="text"  />
							</a>
							<p class="adviceql">{{i18n.withdrawals.collection_name}}</p>
						</li>
					</ul>
					<ul class="name_jz">
						<li class="infor_wi_le">
							<a href="javascript:void(0);">
								<i class="star">*</i>{{i18n.withdrawals.payment_code}}：
							</a>
						</li>

						<li>
							<a href="javascript:void(0);">
								<input class="name_zjxs wisd" v-model="withdrawals.pay_pwd" type="password" name="paypwd" id="paypwd" value />
							</a>
						</li>
					</ul>
					<ul class="name_jz" style="background: #f5f5f5;">
						<li class="infor_wi_le">
							<a href="javascript:void(0);">{{i18n.withdrawals.warm_prompt}}：</a>
						</li>
						<li>
							<p>1.{{i18n.withdrawals.hint_one}} {{config.cash.min_cash}}{{i18n.withdrawals.unit}}，{{i18n.withdrawals.less_than}}
								{{config.cash.max_cash}} {{i18n.withdrawals.unit}}。</p>
							<p>2.{{i18n.withdrawals.hint_two}}</p>
							<p>3.{{i18n.withdrawals.hint_therr}} {{config.cash.service_ratio}}% {{i18n.withdrawals.hint_therr_queen}}</p>
							<p>4.{{i18n.withdrawals.hint_four_queen}} {{config.cash.min_service_money}} {{i18n.withdrawals.hint_four_centre}}
								{{config.cash.max_service_money}} {{i18n.withdrawals.hint_four_queen}}。</p>
							<p>5.{{i18n.withdrawals.hint_five}}</p>
						</li>
					</ul>
					<ul class="hobby_jz">
						<li class="infor_wi_le">
							<a href="javascript:void(0);"></a>
						</li>
						<li class="infor_wi_ri">
							<div class="save_s">
								<input class="save" type="button" @click="onSubmit()" :value="i18n.withdrawals.confirm_withdrawal" />
								<input class="save closoff" type="reset" @click="getBack" :value="i18n.withdrawals.cancel_return" />
							</div>
						</li>
					</ul>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		userWithdrawals,
		getShopConfig,
		getBaseInfo,
		oauthUser,
	} from "@/utils/api.js";
	import md5 from "@/utils/md5.js";
	export default {
		data() {
			return {
				radio: '1',
				withdrawals: {
					bank_name: "",
					bank_card: "",
					pay_pwd:""
				},
				withdrawal_way:[],
				config: {},
				userInfo: {},
				taxfee: 0,
				bankName: "银行卡",
				oauthUser: {},
				aa: "",
			};
		},
		computed: {
			i18n() {
				this.bankName = this.$t('user.withdrawals.bank_card')
				return this.$t('user')
			}
		},
		components: {},
		methods: {
			//返回
			getBack() {
				this.$router.push({
					name: "recharge"
				});
			},
			onSubmit() {
				var _this = this
				this.withdrawals.pay_pwd = md5("TPSHOP" + this.withdrawals.pay_pwd);
				this.withdrawals.type=0;
				this.withdrawals.bank_type= parseInt(this.radio);
				 userWithdrawals(this.withdrawals).then((res) => {
					if (res.status == 1) {
						this.$message.success(_this.i18n.withdrawals.successful_withdrawal);
					} else {
						this.$message.error(res.msg);
					}
				}); 
			},
			getConfig() {
				var that = this;
				getShopConfig({
					inc_type: "cash",
				}).then((res) => {
					that.config = res;
					that.withdrawal_way=res.cash.withdrawal_way.split(",");
				});
			},
			//获取个人信息
			userInformation() {
				getBaseInfo().then((res) => {
					this.userInfo = res;
				});
			},
			getTaxfee(money) {
				if (this.config.cash.service_ratio > 0) {
					this.taxfee = (money * this.config.cash.service_ratio) / 100;
					if (
						this.config.cash.max_service_money > 0 &&
						this.taxfee > this.config.cash.max_service_money
					) {
						this.taxfee = this.config.cash.max_service_money;
					}
					if (this.taxfee < this.config.cash.min_service_money) {
						this.taxfee = this.config.cash.min_service_money;
					}
				}
			},
			getOauthUser() {
				oauthUser({
					oauth: "wx",
				}).then((res) => {
					this.oauthUser = res;
				});
			},
			checkMoney() {
				var _this = this
				if (Number(this.withdrawals.money) == 0) {
					this.$message.error(_this.i18n.withdrawals.greater_than);
					this.withdrawals.money = 0;
				}
				if (Number(this.withdrawals.money) > this.config.cash.max_cash) {
					this.$message.error(_this.i18n.withdrawals.shall_notbe + this.config.cash.max_cash);
					this.withdrawals.money = 0;
				}
				if (Number(this.withdrawals.money) < this.config.cash.min_cash) {
					this.$message.error(_this.i18n.withdrawals.notbe_lessthan + this.config.cash.max_cash);
					this.withdrawals.money = 0;
				}
				this.getTaxfee(this.withdrawals.money);
			},
			changeBank() {
				var _this = this
				if (this.bankName == _this.i18n.withdrawals.alipay) {
					this.withdrawals.bank_name = _this.i18n.withdrawals.alipay;
				}
				if (this.bankName == _this.i18n.withdrawals.wechat) {
					if (this.oauthUser) {
						this.withdrawals.bank_name = _this.i18n.withdrawals.wechat;
						this.withdrawals.bank_card = this.oauthUser.openid;
					} else {
						this.bankName = this.withdrawals.bank_name;
						this.$message.error(_this.i18n.withdrawals.binding_weChat);
					}
				}
				if (this.bankName == _this.i18n.withdrawals.bank_card) {
					this.withdrawals.bank_name = "";
				}
			},
		},
		created() {
			this.getConfig();
			this.userInformation();
			this.getOauthUser();
		},
	};
</script>

<style scoped>
	.personerinfro ul li {
		padding: 20px 0;
	}

	.personerinfro .name_jz .name_zjxs {
		background-color: white;
	}

	>>>.tixbox .paydegs span {
		margin: 0px;
	}
</style>

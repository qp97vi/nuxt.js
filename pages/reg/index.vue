
<template>
	<div class="regcon">
		<a class="m-fnlogoa fn-fl" href="/">
			<img 
			  v-if="$store.state.shop_config" 
              :src="apiHead+$store.state.shop_config.store_logo||imgUrl"
			 style="width: 159px;height: 58px;" />
		</a>
		<span class="m-fntit">{{i18n.reg.welcome_register}}</span>
		<div class="ui_tab">
			<ul class="ui_tab_nav regnav">
				<li v-if="smtp.smtp_switch == 1" class="uli" :class="bool == 1 || sms.sms_switch == 0 ? 'active' :''">
					<span @click="enroll(1)">{{i18n.reg.registered_mail}}</span>
				</li>
				<li v-if="sms.sms_switch == 1" class="uli" :class="bool == 0 ? 'active' :''">
					<span @click="enroll(0)">{{i18n.reg.phone_registered}}</span>
				</li>
				<li class="no fn-fr loginbtn">
					{{i18n.reg.have_registered}}
					<nuxt-link :to="{name:'login'}">{{i18n.reg.register}}&gt;</nuxt-link>
				</li>
			</ul>
			<!-- 手机注册 -->
			<div id="reg_form2" onsubmit="return false" v-if="bool == 0">
				<input type="hidden" name="scene" value="1" />
				<input type="hidden" name="auth_code" value="TPSHOP" />
				<div class="ui_tab_content">
					<div class="m-fnbox ui_panel" style="display: block;">
						<div class="fnlogin clearfix">
							<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
								<el-form-item :label="i18n.reg.phone_number" prop="mobile" required>
									<!-- <country-code-selector :countryCode.sync="mobilePrefix"></country-code-selector> -->
									<vue-country-intl v-model="mobilePrefix" :onlyValue="true" :showLabelImg="false" type="phone"></vue-country-intl>
									<el-input v-model="ruleForm.mobile" :placeholder="i18n.reg.please_phone_number" autocomplete="off" style="margin-left: 10px;"></el-input>
								</el-form-item>
								<!-- v-if="regis_sms_enable == 1" -->
								<el-form-item :label="i18n.reg.authentication_code" required v-show="regis_sms_enable == 1">
									<el-input v-model="code" :placeholder="i18n.reg.get_authentication_code" autocomplete="off"></el-input>
									<el-button type="info" size="small" style="margin-left:10px;" :disabled="!disabledCodeBtn" @click="sendCode()">{{codeSmsText}}</el-button>
								</el-form-item>
								<el-form-item :label="i18n.reg.set_password" prop="password" required>
									<el-input type="password" :placeholder="i18n.reg.assembly" v-model="ruleForm.password"></el-input>
								</el-form-item>
								<el-form-item :label="i18n.reg.confirm_password" prop="confirmPassword" required>
									<el-input type="password" :placeholder="i18n.reg.enter_again" v-model="ruleForm.confirmPassword"></el-input>
								</el-form-item>
								<el-form-item :label="i18n.reg.verification_code" prop="authCode" required>
									<el-input :placeholder="i18n.reg.verification_code" v-model="ruleForm.authCode" autocomplete="off"></el-input>
									<img width="100" height="35" :src="verification_image" id="reflsh_code2" class="po-ab to0" style="margin:0px 10px;" />
									<a>
										<img @click="fleshVerify()" src="@/static/images/chg_image.png" class="ma-le-210 verifyImg" />
									</a>
								</el-form-item>
								<el-form-item>
									<div class="liner">
										<label class="linel">&nbsp;</label>
										<div class="clearfix checkcon">
											<p class="fn-fl checktxt">
												<input type="checkbox" class="iyes fn-fl J_protocal" style="margin-top:13px;" v-model="ruleForm.checked" />
												<span class="fn-fl">{{i18n.reg.read_agree}}</span>
												<nuxt-link target="_blank" class="itxt fn-fl" :to="{name:'serve_agreement'}">《{{i18n.reg.service_contract}}》</nuxt-link>
												<!-- </a> -->
											</p>
											<p class="fn-fl errorbox v-txt" id="protocalBox"></p>
										</div>
									</div>
								</el-form-item>
								<el-form-item>
									<el-button type="danger" :loading="loging" @click="submitForm('ruleForm')">{{i18n.reg.agreement_registration}}</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
			</div>
			<!-- 邮箱注册 -->
			<div id="reg_form2" onsubmit="return false;" v-show="bool == 1">
				<input type="hidden" name="auth_code" value="TPSHOP" />
				<div class="ui_tab_content">
					<div class="m-fnbox ui_panel" style="display: block;">
						<div class="fnlogin clearfix">
							<el-form :model="emailForm" status-icon :rules="emailRules" ref="emailForm" label-width="100px" class="demo-ruleForm">
								<el-form-item :label="i18n.reg.mailbox" prop="email">
									<el-input v-model="emailForm.email" :placeholder="i18n.reg.please_mailbox" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item :label="i18n.reg.email_code" v-show="regis_smtp_enable == 1" required>
									<el-input v-model="code" :placeholder="i18n.reg.get_email_code" autocomplete="off"></el-input>
									<el-button type="info" size="small" style="margin-left:10px;" :disabled="!disabledCodeBtn" @click="sendCode()">{{codeEmailText}}</el-button>
								</el-form-item>
								<el-form-item :label="i18n.reg.set_password" prop="password">
									<el-input type="password" :placeholder="i18n.reg.assembly" v-model="emailForm.password"></el-input>
								</el-form-item>
								<el-form-item :label="i18n.reg.confirm_password" prop="confirmPasswordEmail">
									<el-input type="password" :placeholder="i18n.reg.enter_again" v-model="emailForm.confirmPasswordEmail"></el-input>
								</el-form-item>
								<el-form-item :label="i18n.reg.verification_code" prop="authCode">
									<el-input :placeholder="i18n.reg.verification_code" v-model="emailForm.authCode" autocomplete="off"></el-input>
									<img width="100" height="35" :src="verification_image" id="reflsh_code2" class="po-ab to0" style="margin:0px 10px;" />
									<a>
										<img @click="fleshVerify()" src="@/static/images/chg_image.png" class="ma-le-210 verifyImg" />
									</a>
								</el-form-item>
								<el-form-item>
									<div class="liner">
										<label class="linel">&nbsp;</label>
										<div class="clearfix checkcon">
											<p class="fn-fl checktxt">
												<input type="checkbox" class="iyes fn-fl J_protocal" style="margin-top:13px;" v-model="emailForm.checked" />
												<span class="fn-fl">{{i18n.reg.read_agree}}</span>
												<nuxt-link target="_blank" class="itxt fn-fl" :to="{name:'serve_agreement'}">《{{i18n.reg.service_contract}}》</nuxt-link>
											</p>
											<p class="fn-fl errorbox v-txt" id="protocalBox"></p>
										</div>
									</div>
								</el-form-item>
								<el-form-item>
									<el-button type="danger" @click="submitForm('emailForm')">{{i18n.reg.agreement_registration}}</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { setToken, setUser, getUser } from "@/utils/auth.js";
	import {
		getVerifyImage,
		mobilePhoneRegistration,
		getShopConfig,
		verifyVerifyImage,
		getCode,
		verification,
		getEmailCode,
		checkEmailCode,
		getBaseInfo,
	} from "@/utils/api";
	import md5 from "@/utils/md5.js";
	import regPhoneList from "@/utils/regPhone.js";
	export default {
		data() {
			var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			var mobile = (rule, value, callback) => {
				if (!value) {
					return callback(new Error(this.$t('login.reg.verify_one')));
				} else {
					var breg = false;
					regPhoneList.forEach(reg => {
						if (reg.key == this.mobilePrefix) {
							if (!reg.value.test(value)) {
								breg = true;
							}
						}
					})
					if (breg) {
						return callback(new Error(this.$t('login.reg.verify_two')));
					} else {
						callback();
					}
				}
			};
			var password = (rule, value, callback) => {
				if (value === "") {
					callback(new Error(this.$t('login.reg.verify_therr')));
				} else {
					callback();
				}
			};
			var confirmPassword = (rule, value, callback) => {
				if (value === "") {
					callback(new Error(this.$t('login.reg.enter_again')));
				} else if (value !== this.ruleForm.password) {
					callback(new Error(this.$t('login.reg.verify_four')));
				} else {
					callback();
				}
			};
			var confirmPasswordEmail = (rule, value, callback) => {
				if (value === "") {
					callback(new Error(this.$t('login.reg.enter_again')));
				} else if (value !== this.emailForm.password) {
					callback(new Error(this.$t('login.reg.verify_four')));
				} else {
					callback();
				}
			};
			var authCode = (rule, value, callback) => {
				if (!value) {
					return callback(new Error(this.$t('login.reg.verify_five')));
				} else {
					callback();
				}
			};
			var email = (rule, value, callback) => {
				if (!value) {
					return callback(new Error(this.$t('login.reg.verify_six')));
				} else {
					if (!regEmail.test(value)) {
						return callback(new Error(this.$t('login.reg.verify_seven')));
					} else {
						callback();
					}
				}
			};
			return {
				mobilePrefix: 1, //手机区号
				bool: 1, //0手机注册, 1邮箱注册
				verification_image: "", //验证码
				codeSmsText: "获取验证码",
				codeEmailText: "获取验证码",
				disabledCodeBtn: true, //短信验证码是否禁用
				ruleForm: {
					mobile: "", //手机号
					password: "", //密码
					confirmPassword: "", //确认密码
					authCode: "", //验证码
					checked: false, //是否勾选
				},
				rules: {
					mobile: [{
						validator: mobile,
						trigger: "blur"
					}],
					confirmPassword: [{
						validator: confirmPassword,
						trigger: "blur"
					}],
					password: [{
						validator: password,
						trigger: "blur"
					}],
					authCode: [{
						validator: authCode,
						trigger: "blur"
					}],
				},
				regis_sms_enable: 0, //是否出现短信验证
				regis_smtp_enable: 0, //是否邮箱验证
				code: "", //短信验证码
				sms: {}, //倒计时数据
				smtp: {}, //商城邮箱配置信息
				smsTime: 0, //短信倒计时时间
				emailTime: 0, //邮箱倒计时时间
				loging: false, //
				imgUrl: require('../../static/images/c4bb0c276ab88de5259a57c673e49a87.png'), //默认图片
				emailForm: {
					email: "", //邮箱
					password: "", //密码
					confirmPasswordEmail: "", //确认密码
					authCode: "", //验证码
					checked: false, //是否勾选
				},
				emailRules: {
					email: [{
						required: true,
						validator: email,
						trigger: "blur"
					}],
					confirmPasswordEmail: [{
						required: true,
						validator: confirmPasswordEmail,
						trigger: "blur"
					}],
					password: [{
						required: true,
						validator: password,
						trigger: "blur"
					}],
					authCode: [{
						required: true,
						validator: authCode,
						trigger: "blur"
					}],
				},
				phoneCountry: ""
			};
		},
		components: {
		},
		created() {
			this.fleshVerify();
			this.getcountDown();
		},
		computed: {
			i18n() {
				return this.$t('login')
			}
		},
		methods: {
			fleshVerify() {
				var that = this;
				var random = Math.random();
				getVerifyImage({
					t: random,
				}).then(function(res) {
					that.verification_image = res;
				});
			},
			sendCode() {
				if (this.bool == 0) {
					this.sendSmsCode();
				}
				if (this.bool == 1) {
					this.sendEmailCode();
				}
			},
			//获取短信验证码
			sendSmsCode() {
				var _this = this;
				let params = {
			    session_id:this.mobilePrefix,
					mobile: this.ruleForm.mobile,
					scene: 6,
				};
				getCode(params).then((res) => {
					if (res.status == 1) {
						_this.changeSmsTime(_this.smsTime);
					} else {
						this.$message.error(res.msg);
					}
				});
			},
			sendEmailCode() {
				var _this = this;
				let params = {
					email: this.emailForm.email,
					scene: 1,
				};
				getEmailCode(params).then(res => {
					if (res.status == 1) {
						_this.changeEamilTime(_this.emailTime);
					} else {
						_this.$message.error(res.msg);
					}
				})
			},
			changeSmsTime(time) {
				var _this = this;
				if (time == 0) {
					_this.disabledCodeBtn = true;
					_this.codeSmsText = _this.i18n.reg.get_code;
					_this.smsTime = _this.sms.sms_time_out
					return;
				} else {
					_this.disabledCodeBtn = false;
					_this.codeSmsText = _this.i18n.reg.resend + "(" + _this.smsTime + ")";
					_this.smsTime--;
				}
				setTimeout(() => {
					_this.changeSmsTime(_this.smsTime);
				}, 1000);
			},
			changeEamilTime(time) {
				var _this = this;
				if (time == 0) {
					_this.disabledCodeBtn = true;
					_this.codeEmailText = _this.i18n.reg.get_code;
					_this.emailTime = _this.smtp.smtp_time_out
					return;
				} else {
					_this.disabledCodeBtn = false;
					_this.codeEmailText = _this.i18n.reg.resend + "(" + _this.emailTime + ")";
					_this.emailTime--;
				}
				setTimeout(() => {
					_this.changeEamilTime(_this.emailTime);
				}, 1000);
			},
			enroll(val) {
				this.bool = val;
			},
			//点击注册
			submitForm(formName) {
				var _this = this;
				_this.loging = true;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var checkCode = _this.ruleForm.authCode;
						if (_this.bool == 1) {
							checkCode = _this.emailForm.authCode;
						}
						if ((!_this.ruleForm.checked && _this.bool == 0) || (!_this.emailForm.checked && _this.bool == 1)) {
							_this.$message.error(_this.i18n.reg.please_check);
							_this.loging = false
							return;
						}
						verifyVerifyImage({
							verification: checkCode
						}).then(
							(res) => {
								if (!res) {
									_this.fleshVerify();
									_this.$message.error(_this.i18n.reg.membercode);
									_this.loging = false
									return;
								}
								if (_this.bool == 0 && _this.regis_sms_enable == 1) {
									verification({code: _this.code, mobile: _this.ruleForm.mobile, scene: 6}).then((res) => {
										if (res.status != 1) {
											_this.$message.error(res.msg);
											_this.loging = false
											return;
										}
										_this.register();
									});
									return;
								}
								if (_this.smtp.regis_smtp_enable == 1) {
									checkEmailCode({code: _this.code, email: _this.emailForm.email, scene: 1}).then(res => {
										if (res.status != 1) {
											_this.$message.error(res.msg);
											_this.loging = false
											return;
										}
										_this.register();
									});
									return;
								}
								_this.register();
							}
						);
					} else {
						_this.loging = false
						return false;
					}
				});
			},
			//注册
			register() {
				var data = {}
				if (this.bool == 0) {
					data = {
						password: md5("TPSHOP" + this.ruleForm.password),
						mobile: this.ruleForm.mobile,
						mobile_prefix: this.mobilePrefix
					}
				} else {
					data = {
						password: md5("TPSHOP" + this.emailForm.password),
						email: this.emailForm.email
					}
				}
				if (localStorage.getItem('user_id')) {
					data.first_leader = localStorage.getItem('user_id')
				}
				var _this = this;
				mobilePhoneRegistration(data).then((res) => {
					_this.loging = false
					if (Object.prototype.hasOwnProperty.call(res, "access_token")) {
						_this.option=_this.$message({
							message: '正在登陆...',
							showClose: true,
							duration:0,
							type: 'success'
						});
						setToken(res.access_token);
						getBaseInfo().then(function (res) {
							setUser(res);
							_this.$router.push({
								name: "index",
							});
							_this.option.close()
						})
					}else{
						_this.$message.error(res.msg);
					}
				});
			},
			//判断是否显示短信验证
			// getShopConfig() {
			//   getShopConfig({ inc_type: "sms" }).then((res) => {
			//     // this.regis_sms_enable = 1;
			//   });
			// },
			//获取倒计时
			getcountDown() {
				getShopConfig({
					inc_type: "sms",
				}).then((res) => {
					this.sms = res.sms;
					this.smsTime = res.sms.sms_time_out;
					this.regis_sms_enable = res.sms.regis_sms_enable;
					if (res.sms.sms_switch == 0) {
						this.bool = 1;
					}
				});
				getShopConfig({
					inc_type: "smtp"
				}).then(res => {
					this.smtp = res.smtp;
					this.emailTime = res.smtp.smtp_time_out;
					this.regis_smtp_enable = res.smtp.regis_smtp_enable;
				})
			},
		},
	};
</script>

<style scoped>
	@import "@/static/css/reg3.css";

	.regnav .uli span {
		display: block;
		color: #333;
		text-decoration: none;
		padding: 0px 36px;
		cursor: pointer;
	}

	>>>.el-form-item__content {
		display: flex;
	}

	>>>.flag-list-box {
		z-index: 10;
		position: absolute;
		left: 0;
		top: 40px;
		padding: 10px;
		width: 200px;
		height: 300px;
		overflow: auto;
		border: 1px solid #E5E5E5;
		background: #fff;
	}

	>>>.selected-flag {
		height: 45px;
	}


	>>>.fnlogin .pa {
		position: relative;
	}

	>>>.fnlogin .fr {
		float: none !important;
	}

	>>>.vue-country-list-wrap {
		width: 320px;
	}

	>>>.vue-country-intl .country-intl-input {
		padding: 0px;
	}

	>>>.vue-country-intl .country-intl-label {
		padding: 0px;
	}

	>>>.vue-country-intl .country-intl-label .iti-flag {
		margin-right: 0px;
		margin-left: 8px;
	}

	/* >>> .vue-country-intl .country-intl-label span:last-child{
	margin-left: 15px;
} */
</style>
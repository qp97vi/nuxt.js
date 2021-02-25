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
    <div class="menumain">
      <div class="goodpiece">
        <h1>{{i18n.password.security_settings}}</h1>
        <!--<a href=""><span class="co_blue">帮助</span></a>-->
      </div>
      <div class="accouun"></div>
      <div class="thirset ma-to-20">
        <div :class="bool == 0 ? 'wshef yellc' : 'wshef'">
          1.{{i18n.password.authentication}}
          <i class="spassw"></i>
        </div>
        <div :class="bool == 1 ? 'wshef yellc' : 'wshef'">
          2.{{i18n.password.set_new_password}}
          <i class="spassw"></i>
        </div>
        <div :class="bool == 2 ? 'wshef yellc' : 'wshef'">3.{{i18n.password.complete}}</div>
      </div>
      <div class="personerinfro verifyi" v-if="bool == 0">
        <form action method="post">
          <ul class="birth_jz">
            <li class="infor_wi_le">
              <a href="javascript:void(0);">{{i18n.password.verification_mode}}：</a>
            </li>
            <li>
              <select v-model="type" @change="checkType">
                <!-- <option :value="0">{{i18n.password.verification_mobile}}</option>
                <option :value="1">邮箱验证</option> -->
				<option v-if="user.mobile" :value="0">{{i18n.password.verification_mobile}}</option>
				<option v-if="user.email" :value="1">邮箱验证</option>
              </select>
            </li>
          </ul>
          <ul class="name_jz phone sender_name" v-if="type == 0">
            <li class="infor_wi_le">
              <a href="javascript:void(0);">{{i18n.password.phone_number}}：</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="sender">{{user.mobile}}</a>
            </li>
          </ul>
          <ul	 class="name_jz email sender_name" v-if="type == 1">
            <li class="infor_wi_le">
              <a href="javascript:void(0);">{{i18n.password.mail_number}}：</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="sender">{{user.email}}</a>
            </li>
          </ul>
          <ul class="name_jz checode">
            <li class="infor_wi_le">
              <a href="javascript:void(0);">{{i18n.password.auth_code}}：</a>
            </li>
            <li class="teaeu">
              <a href="javascript:void(0);">
                <input class="name_zjxs" v-model="code"/>
              </a>
              <a href="javascript:void(0);">
				<el-button
				  type="info"
				  size="small"
				  style="margin-left:10px;"
				  :disabled="!disabledCodeBtn"
				  @click="sendCode()"
				>{{codeText}}</el-button>
              </a>
            </li>
          </ul>
          <ul class="hobby_jz">
            <li class="infor_wi_le"></li>
            <div class="save_s">
              <input class="save" type="button" @click="nextstep" :value="i18n.password.next_step" />
            </div>
          </ul>
        </form>
      </div>
	  <div class="personerinfro verifyi-next" v-if="bool == 1" style="display: flex;">
		  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 30%;margin: auto;">
			<el-form-item :label="i18n.password.old_password" prop="old_pass_word" >
				<el-input v-model="ruleForm.old_pass_word" type="password" size="mini"></el-input>
			</el-form-item>
		    <el-form-item :label="i18n.password.new_loginpwd" prop="new_pass_word">
		      <el-input type="password" v-model="ruleForm.new_pass_word" size="mini"></el-input>
		    </el-form-item>
		    <el-form-item :label="i18n.password.affirm_newpwd" prop="check_new_pass_word">
		      <el-input type="password" v-model="ruleForm.check_new_pass_word" size="mini"></el-input>
		    </el-form-item>
		    <el-form-item>
		      <el-button type="danger" @click="nextstep('ruleForm')" :loading="isLoading">{{i18n.password.next_step}}</el-button>
		    </el-form-item>
		  </el-form>
	  </div>
	  <div class="oversuccen" v-if="bool == 2">
	  	<div class="zaiebox">
	  		<div class="fljair">
	  			<img @/static/images/flj.png"/>
	  		</div>
	  		<div class="fljfon">
	  			<p>{{i18n.password.successfully_set}}</p>
	  			<p>{{i18n.password.remember_password}}
					<nuxt-link :to="{ name: 'login'}">{{i18n.password.back_login_again}}</nuxt-link>
				</p>
				<!-- <a href="{:U('User/logout')}">返回重新登录</a></p> -->
	  		</div>
	  	</div>
	  </div>
    </div>
  </div>
</template>

<script>
import {getCode,getShopConfig,verification,changePassWord,exitLogin,getEmailCode,checkEmailCode,getcodeEmail} from "@/utils/api.js";
import md5 from "@/utils/md5.js";
import { getUser } from "@/utils/auth.js";
export default {
	data() {
		var validateNewPwd = (rule, value, callback) => {
		  if (value === "" || value === undefined) {
		    callback(new Error(this.$t('user.password.verify_one')));
		  } else {
		    callback();
		  }
		};
		var validatePassword = (rule, value, callback) => {
		  if (value === "" || value === undefined) {
		    callback(new Error(this.$t('user.password.verify_two')));
		  } else {
		    callback();
		  }
		};
		var validateCheckNewPwd = (rule, value, callback) => {
		  if (value === "" || value === undefined) {
		    callback(new Error(this.$t('user.password.verify_therr')));
		  } else if (value !== this.ruleForm.new_pass_word) {
			callback(new Error(this.$t('user.password.verify_four')));
		  } else {
		    callback();
		  }
		};
		return {
			bool: 0,
			user: getUser(),
			type: getUser().mobile ? 0 : 1,
			disabledCodeBtn: true, //验证码是否禁用
			codeText: "获取验证码", //
			code: "", //验证码
			emailcode:'',
			sms: {}, //倒计时
			smtp: {},
			smsTime: 0, //短信倒计时时间
			emailTime: 0, //邮箱倒计时时间
			form: {},
			disabled: false,
			ruleForm: {
			  old_pass_word: '',
			  new_pass_word: '',
			  check_new_pass_word: ''
			},
			rules: {
			  old_pass_word: [
			    {required: true, validator: validatePassword, trigger: 'blur' }
			  ],
			  new_pass_word: [
			    {required: true, validator: validateNewPwd, trigger: 'blur' }
			  ],
			  check_new_pass_word: [
			    {required: true, validator: validateCheckNewPwd, trigger: 'blur' }
			  ]
			},
			isLoading: false
		}
	},
	computed:{
		i18n () {  
     		 this.codeText = this.$t('user.password.get_code');
			return this.$t('user')  
		}
	},
	methods: {
		checkType() {
		},
		//获取验证码
		sendCode(tiem) {
		  var _this = this;
		  if (this.type == 0) {
			  var params = {
			      mobile: this.user.mobile,
			      scene: 6,
			    };
			    getCode(params).then((res) => {
			      if (res.status == 1) {
					_this.changeSmsTime(_this.smsTime);
			      } else {
			        this.$message.error(res.msg);
			      }
			    });
		  } else {
			  var params = {
			      email: this.user.email,
			      scene: 1,
			    };
			    getEmailCode(params).then((res) => {
			      if (res.status == 1) {

					_this.changeEamilTime(_this.emailTime);
					 return params
			      } else {
			        this.$message.error(res.msg);
			      }
			    }).then((params)=>{
							  getcodeEmail({
							  	email:params.email,
							  	scene:1,
							  }).then(function(map) {
								  _this.emailcode=map.content;
								  _this.emailcode=_this.emailcode.substring(_this.emailcode.lastIndexOf(":")+1);
							  })
				});
		  }
		  
		},
		changeSmsTime(time) {
			var _this = this;
			if (time == 0) {
				_this.disabledCodeBtn = true;
				_this.codeText = _this.i18n.paypwd.get_code;
				_this.smsTime = _this.sms.sms_time_out
				// _this.sms.sms_time_out = _this.smsTime;
				return;
			} else {
				_this.disabledCodeBtn = false;
				_this.codeText = _this.i18n.paypwd.resend+"(" + _this.smsTime + ")";
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
				_this.codeText = _this.i18n.paypwd.get_code;
				_this.emailTime = _this.smtp.smtp_time_out
				return;
			} else {
				_this.disabledCodeBtn = false;
				_this.codeText = _this.i18n.paypwd.resend+"(" + _this.emailTime + ")";
				_this.emailTime--;
			}
			setTimeout(() => {
			  _this.changeEamilTime(_this.emailTime);
			}, 1000);
		},
		nextstep() {
			var _this = this;
			
			if (this.bool == 0) {
				if(this.emailcode!=this.code){
					  this.$message.error("验证码不正确");
					return false;
				}
				if(this.code==""){
					  this.$message.error("验证码不可以为空");
					return false;
				}
					if (this.type == 0) {
						var form = {
						  code: this.code,
						  mobile: this.user.mobile,
						  scene: 6,
						};
						verification(form).then((res) => {
						  if (res.status == 1) {
						    this.bool = 1;
						  } else {
						    this.$message.error(res.msg);
						  }
						});
					} else {
						var form = {
							code: this.code,
							email: this.user.email,
							scene: 1
						}
						checkEmailCode(form).then(res => {
							if (res.status == 1) {
								this.bool = 1;
							} else {
								this.$message.error(res.msg);
							}
						})
					}
			}
			if (this.bool == 1) {
				var that = this;
				this.$refs["ruleForm"].validate(valid => {
					if (valid) {
						this.isLoading = true;
						this.ruleForm.old_pass_word = md5("TPSHOP" + that.ruleForm.old_pass_word);
						this.ruleForm.new_pass_word = md5("TPSHOP" + that.ruleForm.new_pass_word);
						changePassWord(this.ruleForm).then(res => {
							if (res.status == 1) {
								that.bool = 2
							} else {
								that.$message.error(res.msg)
							}
							that.isLoading = false;
						})
					} else {
						that.$message.error(that.i18n.password.parameter_error);
						return false;
					}
				});
			}
		},
		//获取倒计时
		getcountDown() {
		  getShopConfig({
		    inc_type: "sms,smtp",
		  }).then((res) => {
		    this.sms = res.sms;
			this.smtp = res.smtp;
			this.smsTime = res.sms.sms_time_out;
			this.emailTime = res.smtp.smtp_time_out
		  });
		},
	},
	created() {
	  this.getcountDown();
	},
	components: {
	},
};
</script>

<style scoped>
>>>.el-button--danger {
    color: #FFF;
    background-color: #e23435;
    border-color: #e23435;
}
</style>
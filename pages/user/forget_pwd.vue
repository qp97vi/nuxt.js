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
    <top-info></top-info>
    <div class="home-index-middle">
      <div class="w1224">
        <div class="g-crumbs">
			 <router-link :to="{ name: 'user_index'}">{{i18n.forget_pwd.mymall}}</router-link>
          <i class="litt-xyb"></i>
          <span>{{i18n.forget_pwd.forget_password}}</span>
        </div>
        <div class="home-main forgetpaw">
          <div class="menumain">
            <div class="goodpiece">
              <h1>{{i18n.forget_pwd.security_settings}}</h1>
              <!--<a href=""><span class="co_blue">帮助</span></a>-->
            </div>
            <div class="accouun"></div>
            <div class="thirset ma-to-20">
              <div class="wshef" :class="bool == 1?'yellc' :''">
                1.{{i18n.forget_pwd.fill_account}}
                <i class="spassw"></i>
              </div>
              <div class="wshef" :class="bool == 2?'yellc' :''">
                2.{{i18n.forget_pwd.set_new_password}}
                <i class="spassw"></i>
              </div>
              <!-- <div class="wshef" :class="bool == 3?'yellc' :''">
                2.
                <i class="spassw"></i>
              </div>-->
              <div class="wshef" :class="bool == 3?'yellc' :''">3.{{i18n.forget_pwd.complete}}</div>
            </div>
            <div class="personerinfro verifyi">
              <div class="form_pwd" v-if="bool == 1">
                <el-form
                  :model="ruleForm"
                  status-icon
                  :rules="rules"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item :label="i18n.forget_pwd.screen_name" prop="username">
                    <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- <el-form-item :label="i18n.forget_pwd.auth_code" prop="verification">
                    <el-input v-model="ruleForm.verification"></el-input>
                    <img
                      class="yck"
                      style="width:120px;margin:0px 10px;"
                      id="captchaImg"
                      alt="captcha"
                      :src="verification_image"
                      @click="fleshVerify()"
                    />
                  </el-form-item> -->
                  <el-form-item>
                    <el-button type="danger" @click="firstStep('ruleForm')">{{i18n.forget_pwd.next_step}}</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="personerinfro verifyi" v-if="bool == 2">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  status-icon
                  label-width="130px"
                  class="demo-ruleForm"
                >
                  <el-form-item :label="i18n.forget_pwd.erification_mode">
					<el-select v-model="checkType" :placeholder="i18n.forget_pwd.please_select">
						<el-option v-if="userInfo.mobile" :label="i18n.forget_pwd.cellphone_verification" value="mobile"></el-option>
						<el-option v-if="userInfo.email" :label="i18n.forget_pwd.emall_verification" value="email"></el-option>
					  </el-select>
                    <!-- <select v-model="checkType" style="width:100%;padding: 10px;">
                      <option v-if="userInfo.mobile" value="mobile" :rel="ruleForm.username">手机验证</option>
                      <option v-if="userInfo.email" value="email" :rel="ruleForm.username">邮箱验证</option>
                    </select> -->
                  </el-form-item>
                  <el-form-item v-if="userInfo.mobile" :label="i18n.forget_pwd.phone_number">
                    <div class=" fl mr10">
                      <vue-country-intl v-model="mobilePrefix" :onlyValue="true" :showLabelImg="false" type="phone"></vue-country-intl>
                    </div>
                    <span>{{userInfo.mobile}}</span>
                  </el-form-item>
                  <el-form-item v-if="userInfo.email" :label="i18n.forget_pwd.emall_number">
                      <span>{{userInfo.email}}</span>
                  </el-form-item>
                  <el-form-item :label="i18n.forget_pwd.auth_code">
                    <el-input v-model="ruleForm.verificationCode" autocomplete="off"></el-input>
                    <el-button
                      type="info"
                      size="small"
                      style="margin-left:10px;"
                      :disabled="!disabledCodeBtn"
                      @click="sendCode()"
                    >{{codeText}}</el-button>
                  </el-form-item>
                  <el-form-item :label="i18n.forget_pwd.new_loginpwd" prop="new_pass_word">
                    <el-input type="password" v-model="ruleForm.new_pass_word"></el-input>
                  </el-form-item>
                  <el-form-item :label="i18n.forget_pwd.confirm_password" prop="check_new_pass_word">
                    <el-input type="password" v-model="ruleForm.check_new_pass_word"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" @click="secondStep()">{{i18n.forget_pwd.next_step}}</el-button>
                  </el-form-item>
                </el-form>
                <!-- <ul class="birth_jz">
                  <li class="infor_wi_le">
                    <a>请选择验证方式：</a>
                  </li>
                  <li>
                    <a>
                      <select name="sender" id="sender">
                        <option value="phone" rel="12345678901">手机验证</option>
                        <option value="email" rel="1808311406@qq.com">邮箱验证</option>
                      </select>
                    </a>
                  </li>
                </ul>
                <ul class="name_jz">
                  <li class="infor_wi_le">
                    <a>请验证手机号码：</a>
                  </li>
                  <li>
                    <a>12345678901</a>
                  </li>
                </ul>
                <ul class="name_jz">
                  <li class="infor_wi_le">
                    <a>请验证邮箱号码：</a>
                  </li>
                  <li>
                    <a>1808311406@qq.com</a>
                  </li>
                </ul>
                <ul class="name_jz checode">
                  <li class="infor_wi_le">
                    <a>验证码：</a>
                  </li>
                  <li class="teaeu">
                    <a>
                      <input class="name_zjxs" type="text" name="tpcode" id="tpcode" value />
                    </a>
                    <a>
                      <input
                        class="button_yzm"
                        type="button"
                        onclick="sendcode(this)"
                        value="获取验证码"
                      />
                    </a>
                  </li>
                </ul>
                <ul class="hobby_jz">
                  <li class="infor_wi_le"></li>
                  <div class="save_s">
                    <input class="save" type="button" id onclick="checkcode()" value="下一步" />
                  </div>
                </ul>-->
              </div>
              <div class="oversuccen" v-if="bool == 3">
                <div class="zaiebox">
                  <div class="fljair">
                    <img @/static/images/flj.png" />
                  </div>
                  <div class="fljfon">
                    <p>{{i18n.forget_pwd.successfully_set}}</p>
                    <p>
                      {{i18n.forget_pwd.engrave_password}}
                      <router-link :to="{ name: 'login'}">{{i18n.forget_pwd.back_login_again}}</router-link>
                    </p>
                    <!-- <a href="{:U('User/logout')}">返回重新登录</a></p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/index2.vue";
import TopInfo from "@/components/TopInfo/index.vue";
import {
  getVerifyImage,
  verifyVerifyImage,
  accessAccount,
  getCode,
  verification,
  forgetPassword,
  getShopConfig,
  getEmailCode,
  getcodeEmail
} from "@/utils/api";
import md5 from "@/utils/md5.js";

export default {
  data() {
    var reg = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
    var username = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('user.forget_pwd.verify_one')));
      } else {
        callback();
      }
    };
    var verification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('user.forget_pwd.verify_two')));
      } else {
        callback();
      }
    };
    var new_pass_word = (rule, value, callback) => {
      // if (value === "") {
      //   callback(new Error(this.$t('user.forget_pwd.verify_therr')));
      // } else {
      //   if (!reg.test(value)) {
      //     return callback(new Error(this.$t('user.forget_pwd.verify_four')));
      //   } else {
      //     if (this.ruleForm.confirmPassword !== "") {
      //       this.$refs.ruleForm.validateField("confirmPassword");
      //     }
          callback();
      //   }
      // }
    };
    var check_new_pass_word = (rule, value, callback) => {
      // if (value === "") {
      //   callback(new Error(this.$t('user.forget_pwd.verify_five')));
      // } else if (value != this.ruleForm.new_pass_word) {
      //   callback(new Error(this.$t('user.forget_pwd.verify_six')));
      // } else {
        callback();
      // }
    };
    return {
      mobilePrefix: 1, //手机区号
      verification_image: "",
      disabledCodeBtn: true, //验证码是否禁用
      codeText: "获取验证码", //
      sms: {}, //倒计时
	  smsTime: 0, //倒计时时间
	  em:'',
	  code:'',
      ruleForm: {
        username: "", //手机号
        verification: "", //图片验证码
        email: "", //邮箱
        verificationCode: "", //短信验证
        new_pass_word: "", //新密码
        check_new_pass_word: "", //确认新密码
      },
      rules: {
        username: [{ validator: username, trigger: "blur" }],
        verification: [{ validator: verification, trigger: "blur" }],
        new_pass_word: [{ validator: new_pass_word, trigger: "blur" }],
        check_new_pass_word: [
          { validator: check_new_pass_word, trigger: "blur" },
        ],
      },
	  checkType: '',
      bool: 1,
      userInfo: {}, //用户部分信息
      count:"",//跳转倒计时
    };
  },
  created() {
    // this.fleshVerify();
	this.getcountDown();
  },
  computed: {
  	i18n () {  
      this.codeText = this.$t('user.forget_pwd.get_code');
  	  return this.$t('user')  
  	} 
  },
  methods: {
    // 第一步
    firstStep(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
		  var form = {};
          var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(_this.ruleForm.username)) {
            form = {
              email: _this.ruleForm.username,
            };
			_this.checkType = "email"
          } else {
            form = {
              mobile: _this.ruleForm.username,
            };
			_this.checkType = "mobile"
          }
          accessAccount(form).then((res) => {
            if (res != "") {
              // verifyVerifyImage({
              //   verification: _this.ruleForm.verification,
              // }).then((res) => {
              //   if (res) {
              //     _this.bool = 2;
              //   } else {
              //     _this.$message.error(_this.i18n.forget_pwd.input_error);
              //   }
              // });
              _this.bool = 2;
              this.userInfo = res;	
			
            } else {
              _this.$message.error(_this.i18n.forget_pwd.account_does_exist);
            }
            // _this.fleshVerify();
          })
        } else {
          return false;
        }
      });
    },
	
    // 第二步
    secondStep() {
      var _this = this;
      if (this.ruleForm.verificationCode == "") {
        _this.$message.error(_this.i18n.forget_pwd.verify_two);
        return;
      }
      if (this.ruleForm.new_pass_word == "") {
        _this.$message.error(_this.i18n.forget_pwd.password_cannot_empty);
        return;
      }
      if (this.ruleForm.check_new_pass_word == "") {
        _this.$message.error(_this.i18n.forget_pwd.confirm_password_blank);
        return;
      }
	  if(this.ruleForm.verificationCode!=this.code){
		  _this.$message.error("验证码不正确")
		 return;  
	  }
          var data = {
            pass_word: md5("TPSHOP" + _this.ruleForm.new_pass_word),
            verification: _this.ruleForm.verificationCode,
          };
		  if (_this.checkType == "mobile") {
			  data.mobile = _this.userInfo.mobile
		  } else {
			  data.email = _this.userInfo.email
		  }
          forgetPassword(data).then((res) => {
            if (res.status == 1) {
              // _this.bool = 3;
              _this.$message({
                 message:'修改成功',
                 type:'success'
              });
							_this.$router.push({ name: "login" });
            } else {
              _this.$message.error(res.msg);
            }
      });
    },
    //获取验证码
    sendCode() {
      var _this = this;
	  var params = {}
	  if (this.checkType == "mobile") {
		  params = {
        mobile: this.ruleForm.username,
        session_id:this.mobilePrefix,
		    scene: 2,
		  };
		  getCode(params).then((res) => {
		    if (res.status == 1) {
				_this.changeTime(_this.sms.sms_time_out)
		    } else {
		      this.$message.error(res.msg);
		    }
		  });
	  } else {
		  params = {
			  email: this.ruleForm.username,
			  scene: 1,
		  }
		  getEmailCode(params).then(res => {
			  if (res.status == 1) {
				  _this.changeTime(_this.sms.sms_time_out);
				 return params
			  } else {
				this.$message.error(res.msg);
		      }
		  }).then((params)=>{
			  getcodeEmail({
			  	email:params.email,
			  	scene:1,
			  }).then(function(map) {
				  _this.code=map.content;
				  _this.code=_this.code.substring(_this.code.lastIndexOf(":")+1);
			  })
		  })
	  }
    },
	changeTime(time) {
		var _this = this;
		if (time == 0) {
			_this.disabledCodeBtn = true;
			_this.codeText = _this.i18n.forget_pwd.get_code;
			_this.sms.sms_time_out = _this.smsTime;
			return;
		} else {
			_this.disabledCodeBtn = false;
			_this.codeText = _this.i18n.forget_pwd.resend+"(" + _this.sms.sms_time_out + ")";
			_this.sms.sms_time_out--;
		}
		setTimeout(() => {
		  _this.changeTime(_this.sms.sms_time_out);
		}, 1000);
	},
    //图片验证码
    // fleshVerify() {
    //   var that = this;
    //   var random = Math.random();
    //   getVerifyImage({
    //     t: random,
    //   }).then(function (res) {
    //     that.verification_image = res;
    //   });
    // },
    //获取倒计时
    getcountDown() {
      getShopConfig({
        inc_type: "sms",
      }).then((res) => {
        this.sms = res.sms;
        this.smsTime = res.sms.sms_time_out;
      });
    },
  },
  components: {
    TopBar,
    TopInfo,
  },
};
</script>

<style scoped>
@import "@/static/css/myaccount.css";
>>> .el-select .el-input.is-focus .el-input__inner {
	border-color: #409EFF !important;
}
>>> .el-select .el-input__inner:focus{
	border-color: #409EFF !important;
}
/* 2523087547@qq.com */
.el-select-dropdown__item.selected {
	color: #409EFF;
}
.forgetpaw .thirset .wshef {
  width: 33%;
}
.demo-ruleForm {
  width: 40%;
  margin: auto;
}
>>> .el-form-item__content {
  display: flex;
}
>>>.security_passwd .pub-step .steps-con .step-col li{
  padding-left:10px;
}
>>>.vue-country-list-wrap {
		width: 320px;
  }
  >>>.vue-country-list-wrap li{
    width: 100%;
  }
>>>.vue-country-intl .country-intl-input {
    padding: 0px;
    border: none;
	}
  >>>.country-intl-input-wrap{
    width: 80px;
  }
	>>>.vue-country-intl .country-intl-label {
		padding: 0px;
	}

	>>>.vue-country-intl .country-intl-label .iti-flag {
		margin-right: 0px;
		margin-left: 8px;
  }
  >>>.country-intl-label{
    height: 30px;
  }
  >>>.fn-form input[type="text"], .fn-form input[type="password"] {
    width: 80px;
    height: 32px;
  }
</style>
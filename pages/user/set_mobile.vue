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
  <div class="col_main">
    <div class="main security_passwd">
      <div class="themes_title">
        <h3>{{i18n.set_mobile.security_settings}}</h3>
      </div>
      <section class="security_passwd">
        <div class="wrapper-3">
          <div id="step" class="pub-step">
            <!--  <div class="steps-nav fixed ">
                                    <p class="step-nav step-nav-1 go">1.原手机<i></i></p>
                                    <p class="step-nav step-nav-2 go">2.新手机<i></i></p>
                                    <p class="step-nav step-nav-3 go">3.完成</p>
            </div>-->
            <form action method="post" id="mobileForm">
              <div id="stepBlock2" class="steps-con block-02">
                <div class="step-col fn-form captcha_row" data-fn-verify>
                  <ul style="display: block;" class="pub-ul verify-captcha-sms">
                    <li style="padding-left: 107px;">
                      <span class="title">{{i18n.set_mobile.new_mobile}}：</span>
                      <div class=" fl mr10">
                        <vue-country-intl v-model="mobilePrefix" :onlyValue="true" :showLabelImg="false" type="phone"></vue-country-intl>
                      </div>
                      <div class="fl con verify-group">
						<el-input 
						  v-model="mobile" 
						  onpaste="this.value=this.value.replace(/[^\d]/g,'')" 
						  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" 
						  :placeholder="i18n.set_mobile.please_phone_number"></el-input>
                      </div>
                    </li>
                    <li style="padding-left: 107px;">
                      <span class="title">{{i18n.set_mobile.verification_code}}：</span>
                      <div class="con verify-group" style="display: flex;">
                        <!-- <input
                          type="text"
                          class="msg-code ie-01 verify-ctrl left"
                          name="mobile_code"
                          id="mobile_code"
                        />-->
                        <el-input v-model="code" :placeholder="i18n.set_mobile.please_enter_content"></el-input>
                        <el-button
                          type="info"
                          size="small"
                          style="margin-left:10px;"
                          :disabled="!disabledCodeBtn"
                          @click="sendCode()"
                        >{{codeText}}</el-button>
                        <!-- <input
                          type="button"
                          intervaltime="60"
                          value="获取验证码 "
                          id="btnemailAuthCode2"
                          onclick="sendCode(this,'new_mobile')"
                          style="width:120px;"
                        />-->
                      </div>
                    </li>
                    <li>
                      <el-button type="danger" size="small" @click="check_form()">{{i18n.set_mobile.sure_modify}}</el-button>
                      <!-- <button
                        class="btn_pay verify-ctrl"
                        type="button"
                        style="color:white"
                        onclick="check_form()"
                      >确定修改</button>-->
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getCode,amendNumber,getShopConfig,updateUserInfo,verification } from "@/utils/api.js";
export default {
  data() {
    return {
      mobilePrefix: 1, //手机区号
      codeText: "获取验证码", //'
      disabledCodeBtn: true, //验证码是否禁用
      mobile: this.$route.query.mobile || null, //手机号
      code: "", //验证码
      sms: {}, //倒计时
      time:0,
	  type: this.$route.query.type, //0绑定手机，1手机验证
    };
  },
  computed:{
		i18n () {  
      this.codeText = this.$t('user.set_mobile.get_code');
		  return this.$t('user')  
		}
	},
  methods: {
    //获取验证码
    sendCode(tiem) {
      var _this = this;
      var params = {
        mobile: this.mobile,
        session_id:this.mobilePrefix,
        scene: 6
      };
      getCode(params).then(res => {
        if (res.status == 1) {
          if (tiem == 0) {
            _this.disabledCodeBtn = true;
            _this.codeText = _this.i18n.set_mobile.get_code;
            _this.sms.sms_time_out = this.time;
            return
          } else {
            _this.disabledCodeBtn = false;
            _this.codeText =  _this.i18n.set_mobile.resend+"(" + _this.sms.sms_time_out + ")";
            _this.sms.sms_time_out--;
          }
          setTimeout(() => {
            _this.sendCode(_this.sms.sms_time_out);
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //确认修改手机号
    check_form() {
	  var _this =this
	  if (this.type == 0) {
		  var params = {
		    mobile:this.mobile,
		    verification:this.code
		  }
		  amendNumber(params).then(res=>{
		    if(res.status == 1 ){
		      _this.$router.push({
		        name:'info'
		      })
		    }else{
		      _this.$message.error(res.msg);
		    }
		  })
	  } 
	  if (this.type == 1) {
		  verification({
			  code: this.code,
			  mobile: this.mobile,
			  scene: 6
		  }).then(res => {
			  if (res.status == 1) {
				  updateUserInfo({
					  mobile: this.mobile,
					  mobile_validated: 1
				  }).then(e => {
					  if(e.status == 1) {
						  _this.$message.success(_this.i18n.set_mobile.binding_success);
						  _this.$router.push({name:"safety_settings"})
					  } else {
						  _this.$message.error(e.msg);
					  }
				  })
			  } else {
				  this.$message.error(res.msg)
			  }
		  })
	  }
    },
    //获取倒计时
    getcountDown() {
	  getShopConfig({
		  inc_type: 'sms'
	  }).then(res => {
        this.sms = res.sms;
        this.time = res.sms.sms_time_out //倒计时
      });
    }
  },
  created() {
    this.getcountDown();
  }
};
</script>

<style scoped>
@import "@/static/css/security_set.css";
>>> .el-input {
  float: left;
}
>>> .fn-form input[type="text"],
.fn-form input[type="password"] {
  height: 100%;
}
.col_main {
  width: 1000px;
  float: right;
}
.main {
  background-color: #ffffff;
  padding: 15px;
}
.themes_title {
  border-bottom: 2px solid #eee;
  height: 20px;
  line-height: 20px;
  padding: 0 10px 7px 5px;
  margin-bottom: 20px;
  position: relative;
  margin-top: -3px;
}
.themes_title h3 {
  color: #6c6c6c;
  font-size: 14px;
  font-weight: bold;
  float: left;
}
.themes_title h2 {
  float: right;
  font-weight: 700;
}
.themes_title h2 a {
  color: #f22e00;
}
.themes_title h2:after {
  content: "";
  clear: both;
}
.themes_title .blue {
  position: absolute;
  right: 10px;
  bottom: 6px;
}
.btn_pay {
  width: 84px;
  height: 28px;
  line-height: 28px;
  background: -244px -90px;
}
.btn_pay:hover {
  text-decoration: none;
  background: -247px -125px;
}
.btn_pay,
.btn_pay:hover,
.btn_to_pay:hover,
.btn_to_pay {
  background-image: url(../../static/images/sprite_btn.png);
}

.security_passwd .pub-step .steps-con .step-col li {
    padding-left: 0px;
}

.country-list {
	background-color: #FFF;
    margin-top: -20px;
    list-style: none;
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
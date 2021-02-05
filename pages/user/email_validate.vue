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
        <h3>{{i18n.email_validate.security_settings}}</h3>
      </div>
      <section class="security_passwd">
        <div class="wrapper-3">
          <div id="step" class="pub-step">
            <div class="steps-nav fixed">
              <p class="step-nav step-nav-1 go">
                1.{{i18n.email_validate.original_email}}
                <i></i>
              </p>
              <p class="step-nav step-nav-2 go">
                2.{{i18n.email_validate.new_email}}
                <i></i>
              </p>
              <p class="step-nav step-nav-3 go">3.{{i18n.email_validate.complete}}</p>
            </div>
            <form action method="post" onsubmit="return check_form();">
              <div id="stepBlock2" class="steps-con block-02">
                <div class="step-col fn-form captcha_row" data-fn-verify>
                  <ul style="display: block;" class="pub-ul verify-captcha-sms">
                    <li>
                      <span class="title">{{i18n.email_validate.original_email}}：</span>
                      <div class="con verify-group">
                        <input
                          type="text"
                          class="it-01 verify-ctrl my_chkpwd"
						  v-model="user.email"
                          readonly="readonly"
                          style="cursor: not-allowed;color:#999"
                        />
                        <span style="display: block" class="v-tips verify-tips" id="span_tips">
                          <i class="icon" id="showForPwdtip"></i>
                          <span class="txt" id="showForPwd"></span>
                        </span>
                      </div>
                    </li>
                    <li>
                      <span class="title">{{i18n.email_validate.new_email}}：</span>
                      <div class="con verify-group">
                        <input
                          type="text"
                          class="it-01 verify-ctrl my_chkpwd"
                          v-model="email"
                          name="email"
                          id="new_email"
                        />
                        <span style="display: block;" class="v-tips verify-tips">
                          <i class="icon" id="rightTip"></i>
                          <span id="errorEmail" class="txt"></span>
                        </span>
                      </div>
                    </li>
                    <!-- <li>
                      <span class="title">验证码：</span>
                      <div class="con verify-group">
                         <el-input v-model="code" placeholder="请输入内容"></el-input>
                        <el-button
                          type="info"
                          size="small"
                          style="margin-left:10px;"
                          :disabled="!disabledCodeBtn"
                          @click="sendCode()"
                        >{{codeText}}</el-button>
                      </div>
                    </li>-->
                    <li>
                      <el-button type="danger" size="small" @click="nextStep()">{{i18n.email_validate.next_step}}</el-button>
                      <!-- <button class="btn_pay verify-ctrl" type="submit">下一步</button> -->
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
import { updateUserInfo, getBaseInfo } from "@/utils/api.js";
import { getUser, setUser } from "@/utils/auth.js";
export default {
  data() {
    return {
	  user: getUser(),
      codeText: "获取验证码",
      originalEmail:"",  //原邮箱
      code: "", //验证码
      disabledCodeBtn: true, //验证码是否禁用
      email: "" //新邮箱
    };
  },
  computed: {
  	i18n () {  
  	  return this.$t('user')  
  	} 
  },
  methods: {
    //下一步
    nextStep() {
      var _this = this
      var params = {
        email:this.email,
		email_validated: 1
      }
      if (this.email != "") {
        updateUserInfo(params).then(res => {
          if(res.status == 1){
            _this.$message.success(res.msg);
			_this.getUser();
            _this.$router.push({name:'user_index'})
          }else{
            _this.$message.warning(res.msg);
          }
        });
      }else{
        this.$message.warning(_this.i18n.email_validate.mailbox_one);
      }
    },
	getUser() {
	  getBaseInfo().then(function (res) {
	    setUser(res);
	  });
	},
  }
};
</script>

<style scoped>
@import "../../static/css/security_set.css";
>>> .security_passwd .block-02 .pub-ul li .con input {
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
</style>
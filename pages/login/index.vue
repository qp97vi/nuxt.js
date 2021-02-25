
<template>
  <div>
    <div class="header area">
      <nuxt-link :to="{name:'index'}" style="margin: 10px 0;height: 59px; ">
        <img
		  v-if="$store.state.shop_config" 
          :src="apiHead+$store.state.shop_config.store_logo||imgUrl"
          style="max-width: 189px;margin-bottom: 10px;"
          alt 
        />
		
      </nuxt-link>
      <span class="login-welcome" style="font-size: 28px;font-family:微软雅黑;">
        <span>{{i18n.theme}}</span>
      </span>
    </div>
    <div class="m-login" style="background-color: #bf1919;" id="divMLogin">
      <div class="login-wrap">
        <div class="banner">
			<adv ad_id="88"></adv>
        </div>
        <div class="login-form">
          <div class="title oh">
            <h1 class="fl" v-if="$store.state.shop_config">{{i18n.title}}{{shop_config.store_name}}</h1>
            <div class="regist-link fr">
              <nuxt-link :to="{name:'reg'}">{{i18n.register}}</nuxt-link>
            </div>
          </div>
          <div class="u-msg-wrap">
            <div class="msg msg-warn" style="display:none;">
              <i></i>
              <span>{{i18n.account_loss}}</span>
            </div>
            <div class="msg msg-err" style="display:none;">
              <i></i>
              <span class="J-errorMsg"></span>
            </div>
          </div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="0px"
            class="demo-ruleForm"
          >
            <el-input
              :placeholder="i18n.username"
              v-model="ruleForm.account"
              class="u-input mb15"
              prefix-icon="el-icon-user"
            ></el-input>
            <el-input
              type="password"
              :placeholder="i18n.password"
              v-model="ruleForm.password"
              class="u-input mb15"
              prefix-icon="el-icon-edit"
            ></el-input>
            <el-input :placeholder="i18n.verification" v-model="ruleForm.verification" class="u-input mb15">
              <template slot="append">
                <img
                  :src="verification_image"
                  @click="fleshVerify"
                  :title="i18n.change_code"
                  name="codeimage"
                  border="0"
                  class="image"
                />
              </template>
            </el-input>
            <div class="u-safe">
              <span class="forget">
                <nuxt-link :to="{name:'forget_pwd'}">{{i18n.forget_pwd}}</nuxt-link>
              </span>
            </div>
            <div class="u-btn mb20 mt20">
              <el-button
                class="login_button"
                type="primary"
                @click="submitForm('ruleForm')"
                @keyup.enter="enterLogin()"
                :loading="loging"
              >{{i18n.login}}</el-button>
            </div>
          </el-form>
          <dl class="account">
            <dt class="mr20">{{i18n.third_login}}</dt>
			<a v-if="google.google_login_enable == '1'" href="javascript:void(0);" id="customBtn">Google</a>&nbsp;&nbsp;
			<a v-if="facebook.facebook_login_enable == '1'" href="javascript:void(0);" id="sbfacebookBtn" @click="fbLogin" style="margin-left: 10px;">Facebook</a>
          </dl>
        </div>
      </div>
    </div>
	
  </div>
</template>

<script>
import { setToken, setUser, getUser } from "@/utils/auth.js";
import md5 from 'md5';
import { getVerifyImage, login, getBaseInfo, getShopConfig, getBindInfo,addCartList } from "@/utils/api";
import Adv from "@/components/Adv/index.vue";
import {loadJs} from "@/utils/asyncLoadJs"
import common from "@/utils/common.js";
import {mapState} from 'vuex';
let loadedMineMapJs = false;//是否加载完js
export default {
  data() {
    var checkVerification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('login.verify_one')));
      } else {
        callback();
      }
    };
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('login.verify_two')));
      } else {
        callback();
      }
    };
	var validateAccount = (rule, value, callback) => {
	  if (value === "") {
	    callback(new Error(this.$t('login.verify_therr')));
	  } else {
	    callback();
	  }
	};
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('login.enter_yourpin')));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
		account: "",
        mobile: "",
        password: "",
        verification: "",
      },
      rules: {
		account: [
		  {
		    validator: validateAccount,
		    trigger: "blur",
		  },
		],
        mobile: [
          {
            validator: validateMobile,
            trigger: "blur",
          },
        ],
        checkPassword: [
          {
            validator: validatePassword,
            trigger: "blur",
          },
        ],
        verification: [
          {
            validator: checkVerification,
            trigger: "blur",
          },
        ],
      },
      verification_image: "",
      loging: false,
      imgUrl:require('../../static/images/c4bb0c276ab88de5259a57c673e49a87.png'),  //默认图片
	  dialogVisible: false,
	  auth2:"",
	  thirdUser: {},
	  google: {},
	  facebook: {},
	  fromRouter: ''
    };
  },
  components: {
	  Adv
  },
  computed: {
	...mapState(['shop_config',]),
	
  	i18n () {   
  	  return this.$t('login')  
  	} 
  },
  beforeRouteEnter:(to,from,next)=>{
	   next(vm=>{
		 vm.fromRouter = from.name
	   })
	  },

  created() {
	  
	  console.log("状态信息",this.shop_config,)
    this.enterLogin()
	if (!loadedMineMapJs) {
		loadJs().then(() => {
		  loadedMineMapJs = true;
		})
	  }
	
    if (getUser() != null) {
      this.$router.push("user");
    } else {
      this.fleshVerify();
    }
	// this.getConfig();
  },
  mounted(){
	let _this = this;
	  //循环判断是否加载完js
	let interval = setInterval(()=>{
		if(loadedMineMapJs){
		  clearInterval(interval);
		  _this.getConfig();
		}
	},100);
  },
  watch: {
    $route: {
      handler(newRouter) {
        this.curTagName = newRouter.name;
      },
      immediate: true,
    },
  },
  methods: {
    enterLogin(){
		if(process.client) {
			document.onkeydown = e =>{
				if (e.keyCode === 13) {
					this.submitForm('ruleForm')
				}
			}
		}
        
    },
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.login();
        } else {
          return false;
        }
      });
    },
    login() {
      this.loging = true;
	  var that = this;
	  
	  var requestForm = {
		
	    password: md5("TPSHOP" + this.ruleForm.password),
	    verification: this.ruleForm.verification,
	  };
	  let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	  if (regEmail.test(this.ruleForm.account)) {
		  requestForm.email = this.ruleForm.account
	  } else {
		  requestForm.mobile = this.ruleForm.account
	  }
      login(requestForm).then(function (res) {
        if (Object.prototype.hasOwnProperty.call(res, "access_token")) {
          setToken(res.access_token);
          that.getUser();
        } else {
          that.$message({
            showClose: true,
            message: that.i18n.login_failure + res.msg,
            type: "error",
          });
          that.fleshVerify();
          that.ruleForm.verification = null;
        }
        that.loging = false;
      });
    },
    fleshVerify() {
      var that = this;
      var random = Math.random();
      getVerifyImage({
        t: random,
      }).then(function (res) {
        that.verification_image = res;
      });
    },
    getUser() {
      var that = this;
      getBaseInfo().then(function (res) {
        setUser(res);
		if (that.fromRouter === "reg") {
			that.$router.push("user");
		} else {
			that.$router.go(-1);
		}
		return res;
      }).then(()=>{
		  /*检测session传参*/
		  let storeageData = common.getSessionData('shopCartList');
		  if(storeageData!=null){
			  that.addCartList(storeageData)
		  }
	  })
    },
	//初始化谷歌登陆
	startApp(){
		let that = this;
		gapi.load('auth2', function(res){
		  that.auth2 = gapi.auth2.init({
		    client_id: that.google.google_client_id, //客户端ID
		    cookiepolicy: 'single_host_origin',
		    scope: 'profile' //可以请求除了默认的'profile' and 'email'之外的数据
		  });
		  if(process.client) {
			  that.attachSignin(document.getElementById('customBtn'));
		  }
		  
		});
	},
	attachSignin(element) {
		var that = this;
		that.auth2.attachClickHandler(element, {},
			function() {
			var profile = that.auth2.currentUser.get().getBasicProfile();
			that.thirdUser = {
				oauth: "google",
				openid: profile.getId(),
				email: profile.getEmail()
			}
			that.getBindInfo(that.thirdUser)
			// that.loginByThird(that.thirdUser);
			}, function(error) {
			});
	},
	getConfig() {
		var that = this;
		getShopConfig({
			inc_type: "google,facebook"
		}).then(res => {
			if (res.google) {
				that.google = res.google;
			}
			if (res.facebook) {
				that.facebook = res.facebook;
			}
			if (that.google.google_login_enable == '1') {
				that.startApp();
			}
			if (that.facebook.facebook_login_enable == '1') {
				that.fbInit();
			}
		})
	},
	fbInit() {
		FB.init({
			appId: this.facebook.facebook_app_id,
			cookie: true,
			xfbml: true,
			oauth: true,
			version: 'v3.2'
		})
	},
	fbLogin() {
		var that = this;
		FB.login(res => {
			that.statusChangeCallBack(res)
		}, {scope: 'public_profile,email'})
	},
	statusChangeCallBack(res) {
		this.thirdUser = {
			oauth: "facebook",
			openid: res.authResponse.userID,
			email: res.email
		} 
		this.getBindInfo(this.thirdUser)
	},
	loginByThird(loginUser) {
		var that = this;
		login(loginUser).then(res => {
			if (Object.prototype.hasOwnProperty.call(res, "access_token")) {
				setToken(res.access_token);
				that.dialogVisible = false;
				that.getUser();
			} else if(res == "") {
				that.dialogVisible = true;
			} else {
			  that.$message({
				showClose: true,
				message: that.i18n.login_failure + res.msg,
				type: "error",
			  });
			}
		})
	},
	/*查询是否绑定三方信息*/ 
	getBindInfo(thirdUser) {
		/*查询是否绑定三方信息 有返回绑定信息就去登录,没有就去绑定第三方*/ 
		getBindInfo(thirdUser).then(res=>{
			if(res) {
				this.loginByThird(res)
			}else{
				let params = {
					type: thirdUser.oauth,
					openid: thirdUser.openid
				}
				this.jump(params)
			}
		})
	},
	jump(params) {
		/*跳转到绑定页面*/
		let exportUrl = "/user/tripartite_logo?"
		Object.keys(params).map((key)=>{
			exportUrl += key + '=' + params[key] +'&';	
		})
		exportUrl = exportUrl.substring(exportUrl.length-1,1)
		this.$router.push({ path: `${exportUrl}` })
	},
	addCartList(params) {
		/*批量添加购物车购物车添加成功之后,清除本地session*/
		addCartList(params).then(res=>{
			if(res.status == 1) {
				common.removeSessionItem('shopCartList')
			}
		}) 
	}
  },
};
</script>

<style scoped>
@import "@/static/css/login.css";
.login-wrap{
  height: 100%;
}
.login-wrap .banner{
  margin-top: 58px;
  overflow: hidden;
}
>>> .login_button {
  width: 305px;
  height: 40px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  background-color: #da3a4c;
}

>>> .el-input-group__append {
  background-color: #fff;
  border: none;
  color: #fff;
}
</style>

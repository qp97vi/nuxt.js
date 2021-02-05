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
			 <router-link :to="{ name: 'user_index'}">我的商城</router-link>
          <i class="litt-xyb"></i>
          <span>三方登录</span>
        </div>
        <div class="tripartite_logo">
            <div class="user_header">
                <div class="user_img_box">
					<div class="user_img clearfix">
						<img :src="openLogo" alt="">
						<img src="@/static/images/tripartite_logo/chain.png" alt="">
						<img :src="$store.state.shop_config.store_ico" alt="">
					</div>
				</div>
                <div class="user_name">绑定后你可用{{query.type}}或手机号码登录商城</div>
                <div class="user_number">
                    <span>账号：</span>
                    <input type="text" v-model="account" placeholder="请输入邮箱/手机号">
                </div>
                <div class="verification">
                    <span>验证码：</span>
                    <input type="text" v-model="verification" placeholder="请输入验证码">
                    <button class="codeBtn" :class="isRedBtn?'redBtn':''" @click="getCodeBar">{{SendFlag?CountDown==0?'重新发送':`倒计时${CountDown}`:'获取验证码'}}</button>
                </div>
                <div class="binding" @click="submit">注册并绑定</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/index2.vue";
import TopInfo from "@/components/TopInfo/index.vue";
import {getEmailCode, getCode, getShopConfig, login, getBaseInfo} from "@/utils/api";
import md5 from "@/utils/md5.js";
import { setToken, setUser, getUser } from "@/utils/auth.js";
export default {
	data() {
		return {
		account:"",//账号
		verification:"",//验证码
		query:"",//路由信息
		accountType:-1,//判断是邮箱还是手机号  1邮箱 0手机号
		SendFlag:false,// 短信控制器
		SmsInfo:"",//短信配置信息
		SmtpInfo:"",//邮箱配置信息
		CountDown:"",//倒计时
		timer:null,//定时器
		fromRouterName:"",//上级路由名
		fromRouterfullPath:"",//上级路由具体路径
		isRedBtn:false,//按钮变色控制器
		};
	},
	components: {
		TopBar,
		TopInfo,
	},
	/*监听路由变化*/
	beforeRouteEnter:(to,from,next)=>{
		console.log(to,from)
	   	next(vm=>{
			vm.fromRouter =from.name;
			vm.fromRouterfullPath = from.fromRouterfullPath
	   	})
	},
	created() {
		this.query = this.$route.query;
		this.getTime()
		console.log(this.$store.state)
	},
	watch:{
		account:{
			deep:true,
			handler() {
				/*账号有值后按钮变色 无值 恢复*/
				if(this.account) {
					this.isRedBtn = true;
				} else {
					this.isRedBtn = false;
				}
				/*账号 检测账号是邮箱还是手机号*/
				if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.account)) {
					this.accountType = 1;
				}else{
					this.accountType = 0;
				}
			}
		},
	},
	computed:{
		openLogo(){
			/*平台logo 根据query.type 展示不同的图片*/
			let url = require(`@/static/images/tripartite_logo/${this.query.type}.png`)
			return url;
		},
	},
	methods: {
		submit(){
			/*检测 账号和验证码都输入的情况下才验证登录*/
			if(this.account&&this.verification) {
				let params = new Object();
				params.code = this.verification;
				params.oauth = this.query.type;
				params.openid = this.query.openid;
				params[this.accountType ==1?'email':'mobile'] = this.account;
				this.login(params)
			}else if(!this.account) {
				this.$message.error('账号不能为空');
				return 
			}else if(!this.verification){
				this.$message.error('验证码不能为空');
				return 
			}
		},
		getCodeBar(){
			/*无值返回不触发下面事件*/
			if(!this.isRedBtn) {
				return false;
			}
			/*获取邮箱验证码 根据this.accountType值判断 是获取短信还是邮箱验证码*/
			let params = new Object();
			params[this.accountType ==1?'email':'mobile'] = this.account;
			params.scene = this.accountType ==1?1:6;
			if(this.accountType ==1) {
				this.getEmailCode(params)
			} else if(this.accountType ==0) {
				this.getCode(params)
			}
		},
		/*邮箱验证码*/ 
		getEmailCode(params) {
			getEmailCode(params).then(res=>{
				if(res.status==1) {
					this.SendFlag =true;
					this.CountDown = this.SmtpInfo.smtp_time_out;
					this.setTime()
					this.$message({
						message: '已发送',
						type: 'success'
					});
				}
			})
		},
		/*手机短信验证码*/
		getCode(params) {
			getCode(params).then(res=>{
				if(res.status == 1) {
					this.SendFlag =true;
					this.CountDown = this.SmsInfo.sms_time_out;
					this.setTime()
					this.$message({
						message: '已发送',
						type: 'success'
					});
				}
			})
		},
		setTime() {
			let that = this;
			this.timer=setInterval(() => {
				if(that.CountDown>0) {
					that.CountDown--;
				} else if(that.CountDown == 0) {
					clearInterval(that.timer)
					that.CountDown =0
				}
			}, 1000);
		},
		/*获取短信,邮箱 配置信息*/
		getTime() {
			getShopConfig({ inc_type: "sms,smtp",}).then(res=>{
				this.SmtpInfo = res.smtp;
				this.SmsInfo = res.sms;
			})
		},
		/*
		登录接口
		oauth:第三方标识
		openid:第三方id
		*/ 
		login(params) {
			login(params).then(res=>{
				let that = this;
				if(Object.prototype.hasOwnProperty.call(res, "access_token")) {
					that.$message({
						showClose: true,
						message:  "绑定成功",
						type: "success",
					});
					setToken(res.access_token);
					that.getUser();
				} else {
					that.$message({
						showClose: true,
						message:  res.msg,
						type: "error",
					});
				}
			})
		},
		/*获取用户信息*/
		getUser() {
			let that = this;
			getBaseInfo().then(function (res) {
				setUser(res);
				/*当前路由名是 绑定登录页面的路由就进入个人中心，不是就返回原网页*/
				if(that.fromRouterName == 'tripartite_logo'){
					that.$router.push({path:'user/user_index'});
				} else {
					that.$router.push({path:`${that.fromRouterfullPath}`});
				}
			});
		},
	},
	destroyed() {
		/*销毁定时器*/ 
		clearInterval(this.timer)
	},
};
</script>

<style scoped>
  .tripartite_logo{
    height:500px;
    overflow: hidden;
  }
  .user_header{
    width: 600px;
    height: 300px;
    margin: 100px auto;
  }
  .user_img{
    height: 100px;
    margin: 0 auto;
  }
  .user_img_box{
	  text-align:center;
  }
  .user_img img{
	  width:62px;
	  height:62px;
	  float:left;
  }
  .user_name{
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    height: 30px;
	color: #999;
  }
  .user_number{
    width: 500px;
    margin: 0 auto;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .user_number span{
    display: inline-block;
    width: 60px;
    text-align: right;
  }
  .user_number input{
    width: 400px;
    height: 40px;
    font-size: 12px;
    text-indent: 16px;
    border-radius: 6px;
    border: solid 1px #F56C6C;
  }
  .verification{
    width: 500px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .verification span{
    display: inline-block;
    width: 60px;
    text-align: right;
	
  }
  .verification input{
    width: 300px;
    height: 40px;
    font-size: 12px;
    text-indent: 16px;
    border-radius: 6px;
    border: solid 1px #F56C6C;
  }
  .verification button{
    margin-left: 10px;
    width: auto;
    height: 40px;
    border-radius: 8px;
	padding: 0 10px;
  }
  .binding{
    margin-left: 110px; 
    width: 400px;
    height:40px; 
    margin-top: 10px;
    text-align: center;
    line-height: 40px;
    background: #e23435;
    color: #fff;
    border-radius: 20px;
	cursor:pointer;
  }
  .codeBtn{
	background:#999999;
	border: none;
	color:#fff;
	font-size:12px;
  }
  .redBtn{
	  background:#e23435;
  }
</style>
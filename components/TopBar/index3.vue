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
  <div class="public-top-layout w">
    <div class="topbar wrapper">
      <div class="user-entry" v-if="userInfo != null">
        {{i18n.topBar.index3.shalom}}
        <span>
          <nuxt-link :to="{name:'user/index/user_index'}">{{userInfo.nickname}}</nuxt-link>
          <div class="nc-grade-mini" style="cursor:pointer;" onclick="javascript:go();">VO</div>
        </span>
        {{i18n.topBar.index3.welcome_back}}，
          <nuxt-link :to="{name:'user/index/user_index'}" :title="i18n.topBar.index3.home_page" :alt="i18n.topBar.index3.home_page">
          <span>{{i18n.topBar.index3.shop}}</span>
        </nuxt-link>
        <span>
          [
          <span @click="quit()" style="cursor: pointer;">{{i18n.topBar.index3.quit}}</span>
          ]
        </span>
      </div>
      <div class="user-entry" v-else>
        Hi，{{i18n.topBar.index3.welcome}}
        <nuxt-link :to="{name:'index'}">{{i18n.topBar.index3.shop}}</nuxt-link>
        <nuxt-link :to="{name:'login'}">{{i18n.topBar.index3.please_log}}</nuxt-link>
        <span>
          <nuxt-link :to="{name:'reg'}">{{i18n.topBar.index3.free_registration}}</nuxt-link>
        </span>
      </div>
      <div class="quick-menu">
        <!-- <dl
          class="down_app"
          :class="bool == 0 ?'hover':''"
          @mousemove="moveClass(0)"
          @mouseout="outClass()"
        >
          <dt>
            <em class="ico_tel"></em>
            <a>手机移动端</a>
            <i></i>
          </dt>
          <dd>
            <div class="qrcode">
              <img
                img-url=""
                src=""
              />
            </div>
            <div class="hint">
              <h4>扫描二维码</h4>下载手机客户端
            </div>
            <div class="addurl">
              <a href="http://fir.im/tpshopAndroid" target="_blank">
                <i class="icon-android"></i>Android
              </a>
              <a
                href="https://itunes.apple.com/cn/app/sou-bao-shang-cheng/id1119059153?mt=8"
                target="_blank"
              >
                <i class="icon-apple"></i>iPhone
              </a>
            </div>
          </dd>
        </dl> -->
        <dl :class="bool == 1 ?'hover':''" @mousemove="moveClass(1)" @mouseout="outClass()">
          <dt>
            <em class="ico_shop"></em>
            <nuxt-link :to="{name:'newjoin/index/newjoin_index'}" :title="i18n.topBar.index3.business_management">{{i18n.topBar.index3.business_management}}</nuxt-link>
            <i></i>
          </dt>
          <dd>
            <ul>
              <li>
                <nuxt-link :to="{name:'newjoin/index/newjoin_index'}" :title="i18n.topBar.index3.investmentin">{{i18n.topBar.index3.investmentin}}</nuxt-link>
              </li>
              <li>
                <a href="http://jseller.tpsns.com" target="_blank" :title="i18n.topBar.index3.management_center">{{i18n.topBar.index3.merchant_login}}</a>
              </li>
            </ul>
          </dd>
        </dl>
        <dl :class="bool == 2 ?'hover':''" @mousemove="moveClass(2)" @mouseout="outClass()">
          <dt>
            <em class="ico_order"></em>
            <nuxt-link :to="{name:'user/index/goods_collect/id'}" :title="i18n.topBar.index3.business_management">{{i18n.topBar.index3.myorder}}</nuxt-link>
            <i></i>
          </dt>
          <dd>
            <ul>
              <li>
                <nuxt-link :to="{name:'user/index/order_list/id',query:{type:'WAITPAY',leftPx:'14'}}">{{i18n.topBar.index3.pending_order}}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{name:'user/index/order_list/id',query:{type:'WAITRECEIVE',leftPx:'40'}}">{{i18n.topBar.index3.receipt_confirmed}}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{name:'user/index/order_list/id',query:{type:'All',leftPx:'1'}}">{{i18n.topBar.index3.trade_evaluated}}</nuxt-link>
              </li>
            </ul>
          </dd>
        </dl>
        <dl :class="bool == 3 ?'hover':''" @mousemove="moveClass(3)" @mouseout="outClass()">
          <dt>
            <em class="ico_store"></em>
            <nuxt-link :to="{name:'user/index/goods_collect/id'}" :title="i18n.topBar.index3.business_management">{{i18n.topBar.index3.myfavorite}}</nuxt-link>
            <i></i>
          </dt>
          <dd>
            <ul>
              <li>
                <nuxt-link :to="{name:'user/index/goods_collect/id',query:{tabBool:true}}">{{i18n.topBar.index3.goods_collection}}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{name:'user/index/goods_collect/id',query:{tabBool:false}}">{{i18n.topBar.index3.collection}}</nuxt-link>
              </li>
            </ul>
          </dd>
        </dl>
        <dl :class="bool == 4 ?'hover':''" @mousemove="moveClass(4)" @mouseout="outClass()">
          <dt>
            <em class="ico_service"></em>{{i18n.topBar.index3.customer_service}}
            <i></i>
          </dt>
          <dd>
            <ul>
              <li>
                <nuxt-link :to="{name:'article/index/detail/id'}">{{i18n.topBar.index3.help_center}}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{name:'article/index/detail/id'}">{{i18n.topBar.index3.postsales_service}}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{name:'article/index/detail/id'}">{{i18n.topBar.index3.call_center}}</nuxt-link>
              </li>
            </ul>
          </dd>
        </dl>
        <!-- <dl class="weixin">
        <dt>关注我们<i></i></dt>
        <dd>
          <h4>扫描二维码<br/>关注商城微信号</h4>
          <img src="/template/pc/rainbow/static/images/weixin.png" > </dd>
        </dl>-->
      </div>
    </div>
  </div>
</template>

<script>
import { getUser,removeToken } from "@/utils/auth.js";
import { exitLogin } from "@/utils/api.js";
export default {
  data() {
    return {
      bool: -1,
      userInfo:''
    };
  },
   computed: {
  	i18n () {  
  	  return this.$t('components')  
  	} 
  },
  methods: {
     quit() {
      var _this = this;
      exitLogin().then((res) => {
        removeToken();
        _this.$router.push({ name: "login" });
      });
    },
    moveClass(i) {
      this.bool = i;
    },
    outClass() {
      this.bool = -1;
    },
  },
  created(){
    this.userInfo = getUser()
  }
};
</script>

<style scoped>
/* @import "../../static/css/store_base.css"; */
</style>
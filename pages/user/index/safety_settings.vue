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
        <h1>{{i18n.safety_settings.security_settings}}</h1>
		<nuxt-link :to="{name:'article/index/detail/id'}">
          <span class="co_blue">{{i18n.safety_settings.help}}</span>
        </nuxt-link>
      </div>
      <div class="menu-ri-t setsafe p">
        <div class="mu-head fl">
          <img :src="userInfo.head_pic" />
        </div>
        <div class="mu-midd fl">
          <a class="mu-m-phone" href>{{userInfo.nickname}}</a>
          <a
            class="dmht"
            :class="userInfo.mobile_validated == 0 || userInfo.email_validated==0 ? 'dark':''"
          >{{i18n.safety_settings.low}}</a>
          <a
            class="dmht"
            :class="userInfo.mobile_validated == 1 && userInfo.email_validated==1 && userInfo.paypwd == null ? 'dark':''"
          >{{i18n.safety_settings.centre}}</a>
          <a
            class="dmht"
            :class="userInfo.mobile_validated == 1 && userInfo.email_validated==1 && userInfo.paypwd != null ? 'dark':''"
          >{{i18n.safety_settings.tall}}</a>
          <p class="advice">{{i18n.safety_settings.suggest_one}}</p>
        </div>
      </div>
      <div class="safe_list_set">
        <ul>
          <li class="sx2">
            <span>{{i18n.safety_settings.login_password}}</span>
          </li>
          <li class="sx1">
            <span>{{i18n.safety_settings.suggest_two}}</span>
          </li>
          <li class="sx3">
            <nuxt-link class="co_blue" :to="{name:'password'}">{{i18n.safety_settings.amend}}</nuxt-link>
          </li>
        </ul>
        <ul>
          <li class="sx2">
            <span>{{i18n.safety_settings.payment_code}}</span>
          </li>
          <li class="sx1">
            <span>{{i18n.safety_settings.verify_one}}</span>
          </li>
          <li class="sx3">
            <nuxt-link class="co_blue" :to="{name:'paypwd'}">
              <span v-if="userInfo.paypwd">{{i18n.safety_settings.set}}</span>
              <span v-else>{{i18n.safety_settings.amend}}</span>
            </nuxt-link>
          </li>
        </ul>
        <ul>
          <li class="sx2">
            <span>{{i18n.safety_settings.verification_mobile}}</span>
          </li>
          <li class="sx1">
            <span v-if="userInfo.mobile_validated==0">{{i18n.safety_settings.suggest_therr}}</span>
            <span v-else>
              {{i18n.safety_settings.verified_phone}}
              <em>{{userInfo.mobile}}</em>{{i18n.safety_settings.suggest_four}}
            </span>
          </li>
          <li class="sx3">
            <nuxt-link class="co_blue" :to="{ name: 'set_mobile',query:{mobile:userInfo.mobile,type:1}}">
              <span v-if="!userInfo.mobile">{{i18n.safety_settings.noset}}</span>
              <span v-else>
                <span v-if="userInfo.mobile_validated==0">{{i18n.safety_settings.unverified}}</span>
                <span v-else>{{i18n.safety_settings.authenticated}}</span>
              </span>
            </nuxt-link>
          </li>
        </ul>
        <ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getBaseInfo } from "@/utils/api.js";
export default {
  data() {
    return {
      userInfo: {} //个人信息
    };
  },
  computed:{
		i18n () {  
		  return this.$t('user')  
		}
	},
  methods: {
    baseInfo() {
      getBaseInfo().then(res => {
        this.userInfo = res;
      });
    }
  },
  created() {
    this.baseInfo();
  },
  components: {}
};
</script>

<style scoped>
</style>

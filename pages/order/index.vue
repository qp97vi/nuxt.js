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
    <router-view />
    <div class="slidebar_alo">
	<ul>
		<li class="re_cuso"><a target="_blank" href="">{{i18n.service_serve}}</a></li>
		<li class="re_wechat">
			<a target="_blank" href="">{{i18n.follow_wechat}}</a>
			<div class="rtipscont" style="opacity: 0; left: 0px;"> 
				<span class="arrowr-bg"></span> 
				<span class="arrowr"></span> 
				<img src="@/static/images/qrcode.png"> 
				<p class="tiptext">{{i18n.scan_attention}}<br>{{i18n.ahead}}</p>
			</div>
		</li>
		<li class="re_top" style="display: none;"><a target="_blank" href="javascript:void(0);">{{i18n.go_top}}</a></li>
	</ul>
</div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/index2.vue";
import TopInfo from "@/components/TopInfo/index.vue";

export default {
  data() {
    return {};
  },
  computed: {
    i18n() {
		return this.$t('order.index') 
    }
  },
  components: {
    TopBar,
    TopInfo
  }
};
</script>

<style scoped>
@import "@/static/css/myaccount.css";
</style>
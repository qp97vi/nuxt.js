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
    <div class="main-header show-center-1224 clearfix">
      <div class="header-l clearfix">
        <a class="logo" href="/">
          <img style="width: 130px;height: 130px" src="@/static/images/nicefoodlogo.png" alt />
        </a>
        <p class="des">{{i18n.merchant_enter}}</p>
      </div>
      <ul class="header-r children-a-100 clearfix">
        <li class="active">
          <router-link :to="{ name: 'newjoin_index'}">{{i18n.enter_home}}</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/index.vue";
export default {
  data() {
    return {};
  },
  computed: {
    i18n() {
		  return this.$t('newjoin.index')
    }
  },
  components: {
    TopBar
  }
};
</script>

<style scoped>
@import "@/static/css/join.css";
.main-header{
  position: absolute;
  left: 50%;
  margin-left: -612px;
}

</style>
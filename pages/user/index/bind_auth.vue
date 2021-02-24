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
        <h1>{{i18n.binding_account}}</h1>
        <!--<a href=""><span class="co_blue">帮助</span></a>-->
      </div>
      <div class="safe_list_set"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
  	i18n () {  
  	  return this.$t('user')  
  	} 
  },
  components: {}
};
</script>

<style scoped>
</style>

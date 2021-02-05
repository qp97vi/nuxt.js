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
     <search-box></search-box>
     <router-view></router-view>
 </div>
</template>

<script>
import TopBar from "@/components/TopBar/index.vue";
import SearchBox from "@/components/SearchBox/index.vue";
 export default {
   data () {
     return {

     }
   },
   components: {
       TopBar,
       SearchBox
   }
 }
</script>

<style scoped>

 
</style>

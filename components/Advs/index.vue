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
    <!-- 顶部广告-s -->
    <li  :key="index" v-for="(item,index) in adList">
      <a target="_blank" :href="item.ad_link" >
        <img :src="item.ad_code" @click="edit(item)" />
      </a>
      <!-- v-if="item.ad_link.indexOf('http')>-1" -->
      <!-- <router-link v-else :target="item.target == 1? '_blank' : '_self'" :to="item.ad_link">
        <img :src="item.ad_code" />
      </router-link> -->
    </li>
  </div>
</template>

<script>

import { getAds } from "@/utils/api";
export default {
  data() {
    return {
      adList: null,
    };
  },
  props:{start_pid:{

  },end_pid:{
	  
  },pid:{
	  
  },size:{
	required: true
  }},
  created() {
    this._getAds({
      start_pid:this.start_pid,
      end_pid:this.end_pid,
      pid:this.pid,
      size:this.size
    });
  },
  mounted(){
    
  },
  components: {},
  methods: {
    edit(item){
      if(this.$route.query.type=='admin'){
        item.ad_link=` ${this.$route.query.rediceUrl}/${this.$route.query.type}/${this.$route.query.parameter}?id=${item.ad_id}`
      }
    },
    _getAds(param) {
      getAds(param).then(res => {
        this.adList = res;
      });
    }
  }
};
</script>

<style scoped>
</style>
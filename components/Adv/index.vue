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
  <div id="divimg" v-if="adInfo">
    <!-- 顶部广告-s -->
    <a :href="linkUrl" target='_black' >
      <img id="img" :src="adInfo.ad_code"v-if="adInfo.enabled"/>
      <!-- v-show="adInfo.enabled" -->
    </a>
  </div>
</template>
<script>
import { getAd } from "@/utils/api";

export default {
  data() {
    return {
      adInfo: {},
      linkUrl:"",
    };
  },
  created() {
    getAd({ad_id:this.ad_id}).then(res => {
      this.adInfo = res
    });
  },
  watch:{
		adInfo(){
			this.$nextTick(()=>{
        if(this.$route.query.type=='admin'){
            this.linkUrl =`${this.$route.query.rediceUrl}/${this.$route.query.type}/${this.$route.query.parameter}?id=${this.ad_id}`
        }else{
          this.linkUrl = this.adInfo.ad_link
        }
			})
		}
	},
  props:['ad_id'],
  components: {},
  methods: {

  },
};
</script>
<style scoped>
  #img{
    max-width: 100%;
    max-height: 100%;
  }
</style>

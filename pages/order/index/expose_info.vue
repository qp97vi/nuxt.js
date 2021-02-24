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
    <div class="menumain p">
      <div class="goodpiece">
        <h1>{{i18n.related_products}}</h1>
      </div>
      <div class="jdxe_xq ma-to-10">
        <div class="goods_infom">
          <div class="fi_imgli">
            <router-link :to="{name:'goodsInfo',query:{id:reportSingleData.expose_goods_id}}" target="_blank">
            	<img
            	  :src="apiHead + '/mall/goods/thumb_image?width=50&height=50&goods_id=' + reportSingleData.expose_goods_id"
            	  height="100"
            	  alt="100*100"
            	/>
            </router-link>
          </div>
          <div class="fi_fonri">
            <p>{{i18n.goods_name}}：{{reportSingleData.expose_goods_name}}</p>
            <p>{{i18n.goods_id}}：{{reportSingleData.expose_user_id}}</p>
            <p>{{i18n.reported_merchant}}：{{reportSingleData.expose_store_name}}</p>
            <p>{{i18n.report_time}}：{{reportSingleData.expose_time_show}}</p>
          </div>
        </div>
      </div>
      <div class="goodpiece ma-to-20 unfios">
        <h1>{{i18n.treatment_state}}</h1>
      </div>
      <div class="mistake_afr">
        <p class="gsinfo_xx">{{reportSingleData.expose_state_detail}}</p>
      </div>
      <div class="goodpiece ma-to-20 unfios">
        <h1>{{i18n.report_type}}</h1>
      </div>
      <div class="mistake_afr">
        <p class="gsinfo_xx">{{reportSingleData.expose_type_name}}</p>
      </div>
      <!-- <div class="goodpiece ma-to-20 unfios">
        <h1>举报主题</h1>
      </div>
      <div class="mistake_afr">
        <p class="gsinfo_xx">{{reportSingleData.expose_subject_name}}</p>
      </div> -->
      <div class="goodpiece ma-to-20 unfios">
        <h1>{{i18n.report_content}}</h1>
        <!--<a href=""><span class="co_blue">帮助</span></a>-->
      </div>
      <div class="mistake_afr">
        <p class="gsinfo_xx">{{reportSingleData.expose_content}}</p>
      </div>
      <div class="goodpiece ma-to-20 unfios">
        <h1>{{i18n.report_picture}}</h1>
      </div>
      <div class="mistake_afr">
        <div class="smallimg_t">
          <a v-for="img in imageUrl" :href="img" :key="img" style="margin-left: 5px;">
            <img :src="img" />
          </a>
        </div>
      </div>
	  <p class="tips_jub">
	  	{{i18n.mymall}}-【<router-link :to="{name:'expose_list'}">{{i18n.inform_message}}</router-link>】{{i18n.query_report}}
	  </p>
      <div class="boxbutn_re">
        <el-button type="danger" size='mini' @click="getBack()">{{i18n.return}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getReportSingle } from "@/utils/api";
export default {
  data(){
    return{
        reportSingleData:{},  //纠纷单数据
		    imageUrl: [],
    }
  },
  computed: {
    i18n() {
				return this.$t('order.expose_info') 
    }
  },
  methods:{
    getBack(){
      this.$router.push({
        name:'expose_list'
      })
    },
    reportSingle(data){
      getReportSingle(data).then(res=>{
        this.reportSingleData = res
		this.imageUrl = res.expose_pic.split(',');
      })
    }
  },
  created(){
    var data = {
      expose_id:this.$route.query.expose_id
    }
    this.reportSingle(data)
  }
};
</script>

<style scoped>
</style>
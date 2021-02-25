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
  <div id="pageContent" class="pageContent p">
    <div class="hc-warp">
      <div class="hc-crumbs">
        <a class="p-fb" href target="_blank">{{i18n.help_center}}</a>&gt;
        <a>{{article.title}}</a>
      </div>
      <div class="hc-column">
        <div v-for="(item,index) in leftList" :key="index" class="hc-column-box">
          <h2>
            <a class="ah2">{{item.cat_name}}</a>
          </h2>
          <ul>
            <li :key="idx" v-for="(itm,idx) in item.articles">
              <router-link :to="{name:'detail',query:{id:itm.article_id}}">{{itm.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div id="content">
        <div style="width: 1050px; overflow: hidden; font-family: Verdana,Helvetica; float: right;">
          <div style="border: 1px solid rgb(233, 234, 236); margin-bottom: 25px;">
            <h2
              style="height: 34px; line-height: 34px; border-bottom-color: rgb(233, 234, 236); border-bottom-width: 1px; border-bottom-style: solid;"
            >
              <span
                style="color: rgb(60, 60, 60); padding-top: 4px; padding-bottom: 4px; padding-left: 10px; font-size: 14px; font-weight: bold; border-left-color: rgb(242, 46, 0); border-left-width: 3px; border-left-style: solid;"
              >试用介绍</span>
            </h2>
            <img src />
            <div style="padding: 20px 30px 0px; color: rgb(60, 60, 60); font-size: 12px;">
              试用中心介绍的内容 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleList } from "@/utils/api.js";

export default {
  data() {
    return {
      leftList:[],
      article:""
    };
  },
  computed: {
  	i18n () {  
  	  return this.$t('article')  
  	} 
  },
  components: {},
  created(){
    this._getArticleList()
  },
  methods:{
    _getArticleList(){
      var that = this
      getArticleList().then((res)=>{
        that.leftList = res
        
      })
    },
  }
};
</script>

<style scoped>
</style>

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
  <div class="l-wrap">
    <div class="l-main">
      <div class="l-menu">
        <h3 class="menu-title">
          <a href="#" @click="getHelpList">{{i18n.common_problem}}</a>
        </h3>
		<el-tree :data="typeTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="l-content" id="type_article" v-if="bool == 0">
        <div class="o-hd">
          <h3 id="currentCataLogName" class="title">{{i18n.common_answer}}</h3>
        </div>
        <div class="l-pack">
          <ul class="normal-list">
            <li class="li-item" v-for="help in helpList" :key="help.help_id">
              <em class="icon-middot"></em>
			  <!-- <router-link :to="{name:'helpInfo',query:{help_id: help.help_id}}">{{help.help_title}}</router-link> -->
			  <a href="#" @click="getHelpInfo(help.help_id)">{{help.help_title}}</a>
            </li>
          </ul>
        </div>
      </div>
	  <div class="l-content" v-if="bool == 1">
	    <div class="wt-detailbox">
	      <div class="wt-detail">
	        <h3
	          style="text-align: left;font-family:'微软雅黑';font-weight:bold; font-size: 14px;margin-bottom: 10px;"
	        >{{help_info.help_title}}</h3>
	        <div v-html="help_info.help_info" style="padding: 20px 30px 0px; color: rgb(60, 60, 60); font-size: 12px;">
	        </div>
	      </div>
	    </div>
	  </div>
    </div>
  </div>
</template>

<script>
import { helpTypeTree,helpList,helpInfo } from "@/utils/api.js";
export default {
  data() {
    return {
		bool: 0,
		typeTree: [],
		defaultProps: {
			children: 'children',
			label: 'type_name'
		},
		type_id: null, //帮助类型id
		helpList: [],  //帮助列表
		help_info: {}, //帮助信息
		help_id: this.$route.query.help_id,
	};
  },
  created() {
	  this.helpTypeTree();
	  this.helpData();
	  if (this.help_id) {
		  this.bool = 1;
		  this.getHelpInfo(this.help_id);
	  }
  },
  computed: {
  	i18n () {  
  	  return this.$t('article')  
  	} 
  },
  components: {},
  methods: {
	  helpTypeTree() {
		  helpTypeTree().then(res => {
			  this.typeTree = res;
		  })
	  },
	  handleNodeClick(data) {
		  if(!data.children) {
			  this.bool = 0;
			  this.type_id = data.type_id;
			  this.helpData();
		  }
	  },
	  helpData() {
		  var params = {
			  type_id: this.type_id
		  }
		  //没ID获取常见问题文章,默认查10条
		  if (!this.type_id) {
			  params.limit = 10
		  }
		  helpList(params).then(res => {
			  this.helpList = res;
		  })
	  },
	  getHelpList() {
		  this.bool = 0;
		  this.type_id = null;
		  this.helpData();
	  },
	  getHelpInfo(id) {
		  this.bool = 1;
		  helpInfo({
			  help_id: id
		  }).then(res => {
			  this.help_info = res;
		  })
	  }
  }
};
</script>

<style scoped>
</style>

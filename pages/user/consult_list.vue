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
				<h1>{{i18n.consult_list.consult_record}}</h1>
			</div>
			<div class="grou_num_list address_list_jl ma-to-20">
				<ul class="grou_tite">
					<li class="sx2">
						<span>{{i18n.consult_list.consult_person}}</span>
					</li>
					<li class="sx1">
						<span>{{i18n.consult_list.consult_content}}</span>
					</li>
					<li class="sx3">
						<span>{{i18n.order_name}}</span>
					</li>
					<li class="sx5">
						<span>{{i18n.consult_list.consult_time}}</span>
					</li>
				</ul>
				<ul class="" data-address-id="" v-for="(item,index) in pagingData" :key="item.id">
					<li class="sx2"><span>{{item.username}}</span></li>
					<li class="sx1"><span>{{item.content}}</span></li>
					<li class="sx3"><span>{{item.goods_name}}</span></li>
					<li class="sx5">
						<span>{{item.add_time_format}}</span>
					</li>

					<li class="store-reply p" style="float: none;width: 80%;text-align: left;padding:0 8%" v-for="(child,index) in item.children_consults" :key="child.id">
						<span class="visitor-name">{{i18n.vendor}} <i class="reply-tips" style="color: #ec6909;">{{i18n.consult_list.reply}}</i>：</span>
						{{child.content}} <i class="send-time" style="float: right">{{child.add_time_format}}</i>
					</li>
					<br>
				</ul>
			</div>
			<!-- 分页 -->
			<div class="paging">
			  <div class="block">
			    <el-pagination
			      background
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-sizes="[5, 10, 15, 20]"
			      :page-size="pageSize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			    </el-pagination>
			  </div>
			</div>
			<p class="gp_num2"></p>
		</div>
	</div>
</template>

<script>
import { getGoodsConsultPage } from "@/utils/api";
export default {
	data() {
		return {
			bool:true,
			pagingData:[],
			currentPage:1,
			pageSize:10,
			total:0,
		};
	},
	created() {
	  this.pagingMethod()
	},
	computed: {
		i18n () {  
		  return this.$t('user')  
		} 
	},
	components: {},
	methods: {
		pagingMethod(){
			 var params = {
			   p: this.currentPage,
			   size: this.pageSize,
			 }
		   getGoodsConsultPage(params).then(res => {
		    if(res.records.lengin>0){
		      this.bool = false;
		    }
		    this.pagingData = res.records
		    this.total = res.total
		  });
		},
		// 切换每页多少条数据
		handleSizeChange(val) {
			this.pageSize = val
		    this.pagingMethod()
		},
		// 跳转到第几页
		handleCurrentChange(val) {
		  this.currentPage = val
		  this.pagingMethod()
		},
	}
};
</script>

<style scoped>
</style>

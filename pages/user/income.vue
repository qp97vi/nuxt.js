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
        <h1>{{i18n.income.order_list}}</h1>
        <!--<a href=""><span class="co_blue">帮助</span></a>-->
        <div class="fr ddd-h2">
          <h3>
            <span>{{i18n.income.promote_order}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-size: 14px;">{{i18n.income.total_amount}}：{{goods_price_sum}}{{i18n.income.unit}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-size: 14px;">{{i18n.income.income_amount}}：{{distributed_money_sum}}{{i18n.income.unit}}</span>
          </h3>
        </div>
      </div>
      <div class="orderbook-list returnmagament">
        <div class="time-sala timsearch p">
          <ul>
            <li :class="status == null ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(null)">{{i18n.income.all}}</a>
            </li>
            <li :class="status == 0 ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(0)">{{i18n.income.obligation}}</a>
            </li>
            <li :class="status == 1 ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(1)">{{i18n.income.account_paid}}</a>
            </li>
            <li :class="status == 2 ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(2)">{{i18n.income.received}}</a>
            </li>
            <li :class="status == 3 ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(3)">{{i18n.income.been_divided}}</a>
            </li>
            <li :class="status == 4 ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(4)">{{i18n.income.canceled}}</a>
            </li>
          </ul>
          <form action method="POST" id="searchfrom">
            <div class="search-ss-lit">
              <input type="text" v-model="order_sn" name="search_key" :placeholder="i18n.income.order_reference" />
              <i class="litt-sexx" @click="pagingMethod()"></i>
            </div>
          </form>
        </div>
        <div class="he"></div>
        <div class="returngoods">
          <div class="book-tit">
            <ul>
              <li class="sx3">{{i18n.income.order_number}}</li>
              <li class="sx1">{{i18n.income.order_amount}}</li>
              <li class="sx4 s5clic">
                {{i18n.income.order_time}}
                <!--<i class="jt-x"></i>-->
              </li>
              <li class="sx5">{{i18n.income.purchase_membership}}</li>
              <li class="sx6 s5clic">
                {{i18n.income.income_amount}}
                <!--<i class="jt-x"></i>-->
              </li>
              <li class="sx6">{{i18n.income.returns_time}}</li>
            </ul>
          </div>
          <div class="book-tit book_content p">
            <ul v-for="(item,index) in pagingData" :key="item.order_id">
              <li class="sx3">{{item.order_sn}}</li>
              <li class="sx1">{{item.goods_price}}</li>
              <li class="sx4">{{item.create_time_desc}}</li>
              <li class="sx5">{{item.nickname}}</li>
              <li class="sx6">{{item.money}}</li>
              <li class="sx6">
				<span v-if="item.confirm_time > 0">{{item.confirm_time_desc}}</span>
				<span v-else>---</span>
			  </li>
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
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRebateOrderList, getRebateLogSurvey } from "@/utils/api.js";
export default {
  data() {
    return {
		bool:true,  //有数据时显示
		currentPage:1,  //初始页面为1
		pageSize:10,  //默认数据条
		pagingData:[],  //我的订单数据
		handleSize:10,  //当页面几条数据
		handleCurrent:1,  //第几页
		total:0,  //总共多少条数据
		status:null,  //订单状态
		goods_price_sum: 0,  //订单总金额
		distributed_money_sum: 0, //收益总金额
		buy_user_id: null || this.$route.query.buy_user_id,
		order_sn: ''
	};
  },
  components: {},
  created() {
    this.pagingMethod()
	this.getRebateLogSurvey()
  },
  computed: {
  	i18n () {  
  	  return this.$t('user')  
  	} 
  },
  methods: {
	  // 切换每页多少条数据
	   handleSizeChange(val) {
	      this.handleSize = val
	      this.pagingMethod()
	  },
	  // 跳转到第几页
	    handleCurrentChange(val) {
	      this.handleCurrent = val
	      this.pagingMethod()
	    },
	    // 分页数据
	    pagingMethod(){
		   var params = {
		     p: this.currentPage,
		     size: this.pageSize,
			 buy_user_id: this.buy_user_id,
			 order_sn: this.order_sn
		   }
		   if (this.status != null) {
			   params.status = this.status
		   }
	       getRebateOrderList(params).then(res => {
	        if(res.records.lengin>0){
	          this.bool = false;
	        }
	        this.pagingData = res.records
	        this.total = res.total
	      });
	    },
		obliGation(status) {
			this.status = status;
			this.pagingMethod();
		},
		getRebateLogSurvey() {
			getRebateLogSurvey().then(res => {
				this.goods_price_sum = res.goods_price_sum;
				this.distributed_money_sum = res.distributed_money_sum;
			})
		}
  }
};
</script>

<style scoped>
</style>

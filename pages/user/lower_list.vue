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
        <h1>
          {{i18n.lower_list.myreferrals}}(
          <b>0</b>)
        </h1>
      </div>
      <div class="orderbook-list">
        <div class="time-sala p">
          <ul>
            <li :class="tapeOutClass==0?'red':'mal-l'">
              <span @click="tapeOut(0)">{{i18n.lower_list.referral}}</span>
            </li>
            <li :class="tapeOutClass==1?'red':'mal-l'">
              <span @click="tapeOut(1)">{{i18n.lower_list.referral}}</span>
            </li>
            <li :class="tapeOutClass==2?'red':'mal-l'">
              <span @click="tapeOut(2)">{{i18n.lower_list.referral}}</span>
            </li>
          </ul>
        </div>

        <div class="he"></div>
        <!-- 有数据  -->
        <div v-if="bool">
          <div class="orderbook-list">
            <div class="book-tit">
              <ul>
                <li class="sx2">{{i18n.lower_list.member_id}}</li>
                <li class="sx2">{{i18n.lower_list.email}}</li>
                <li class="sx2">{{i18n.lower_list.nickname}}</li>
                <li class="sx2">{{i18n.lower_list.addtime}}</li>
                <li class="sx2">{{i18n.lower_list.final_landing}}</li>
                <li class="sx6">{{i18n.lower_list.rebate_orders}}</li>
              </ul>
            </div>
          </div>
          <div class="book-tit book_content p" v-for="(item) in promotionData" :key="item.user_id">
            <ul>
              <li class="sx6">{{item.user_id}}</li>
              <li class="sx5">{{item.email}}</li>
              <li class="sx5">{{item.nickname}}</li>
              <li class="sx5">{{getLocalDate(item.reg_time)}}</li>
              <li class="sx5">{{getLocalDate(item.last_login)}}</li>
              <li class="sx6">
                <div class="rbac">
                  <p class="inspect">
					<router-link :to="{ name: 'income', query:{buy_user_id:item.user_id}}">{{i18n.lower_list.examine}}</router-link>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <div class="paging" style="margin-top:20px;">
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
        <!-- 没有数据 -->
        <div class="car-none-pl" v-else>
          <i class="account-acco1"></i>{{i18n.lower_list.there_offline}}，
          <!--<a href="/">快去邀请好友吧~</a>-->
        </div>
      </div>
    </div>
    <div class="operating fixed" id="bottom">
      <div class="fn_page clearfix"></div>
    </div>
  </div>
</template>

<script>
import { minePromotion } from "@/utils/api.js";
export default {
  data() {
    return {
      bool: true, //是否有数据
      currentPage: 1, //初始页面为1
      pageSize: 10, //默认数据条
      promotionData: [], //我的推广数据
      handleSize: 10, //当页面几条数据
      handleCurrent: 1, //第几页
      total: 0, //总共多少条数据
      tapeOutClass:0,  //类名切换
    };
  },
  computed:{
    i18n () {  
  	  return this.$t('user')  
  	}
  },
  methods: {
    tapeOut(i){
      this.tapeOutClass = i;
      this.handleCurrent = 1;
      var params = {
        level:i,
        p:this.handleCurrent,
        size:this.handleSize
      }
      this.proMotion(params)
    },
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.handleSize = val;
       var params = {
        level:this.tapeOutClass,
        p:this.handleCurrent,
        size:this.handleSize
      }
      this.proMotion(params)
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.handleCurrent = val;
      var params = {
        level:this.tapeOutClass,
        p:this.handleCurrent,
        size:this.handleSize
      }
      this.proMotion(params)
    },
    //我的推广数据
    proMotion(data) {
      minePromotion(data).then(res => {
        if(res.records.length>0){
          this.bool = true
        }else{
          this.bool = false
        }
        this.total = res.total
        this.promotionData = res.records
      });
    },
    // 时间戳转换为日期
    add0(m){
      return m<10?'0'+m:m 
    },
    getLocalDate(nS) {
      var time = new Date(nS*1000);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      return y+'-'+this.add0(m)+'-'+this.add0(d);   
    }
  },
  created() {
    var params = {
      level:0,
      p:1,
      size:10
    }
    this.proMotion(params)
  },
  components: {}
};
</script>

<style scoped>
.pageContent .fl, .fr span{
  cursor: pointer;
}
.sx2, .sx3, .sx4, .sx5, .sx6{
  width: 167px;
  height: 38px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

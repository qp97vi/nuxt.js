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
        <h1>{{i18n.integral.i_integral}}</h1>
		<nuxt-link :to="{name:'article/index/detail/id'}">
		  <span class="co_blue">{{i18n.integral.help}}</span>
		</nuxt-link>
      </div>
      <div class="shopcard myjfhg ma-to-20 p">
        <div class="cuschan">
          <span class="kycha">
            <i class="kyjf"></i>{{i18n.integral.now_integral}}：
          </span>
          <span class="co">{{userInfo.pay_points}}</span>
          <nuxt-link class="jfhg" :to="{name:'integralMall'}">{{i18n.integral.redemption}}</nuxt-link>
        </div>
        <div class="cuschan">
          <span class="kycha">
            <i class="dsxjf"></i>{{i18n.integral.now_balance}}：
          </span>
          <span class="co">{{userInfo.user_money}}</span>
        </div>
        <!-- 即将过期的积分 -->
        <!-- <div class="cuschan">
          <span class="kycha">
            <i class="gqjf"></i>即将过期积分：
          </span>
          <span class="co">0</span>
        </div>-->
      </div>
      <form>
        <div class="time-sala timsearch">
          <ul>
            <li :class="integralClass === '' ? 'red':'mal-l'">
              <span @click="integralClassification('')">{{i18n.integral.detail}}</span>
            </li>
            <li :class="integralClass == '1' ? 'red':'mal-l'">
              <span @click="integralClassification(1)">{{i18n.integral.appup}}</span>
            </li>
            <li :class="integralClass == '0' ? 'red':'mal-l'">
              <span @click="integralClassification(0)">{{i18n.integral.consumption}}</span>
            </li>
          </ul>

          <div class="time-qjc" style="display: flex;align-items:center;">
            {{i18n.integral.order_time}}：
            <!-- <input type="text" id="start_time" name="order_start" value lay-key="1" />
            <span>至</span>
            <input type="text" id="end_time" name="order_end" value lay-key="2" />-->
            <div class="block">
              <el-date-picker
                v-model="value"
                type="daterange"
                :range-separator="i18n.until"
                :start-placeholder="i18n.start_date"
                :end-placeholder="i18n.end_date"
                format="yyyy-MM-dd"
                value-format="timestamp">
              ></el-date-picker>
            </div>
            <input class="cx_subb" type="button" style="border-radius: 5px;border: 1px solid #ccc;padding:10px 0;" @click="time_search()" :value="i18n.inquire" />
          </div>
          <div class="search-ss-lit">
            <input type="text" id="order_sn" name="order_sn" v-model="order_sn" :placeholder="i18n.enter_order_number" />
            <i class="litt-sexx" @click="order_search()"></i>
          </div>
        </div>
        <div class="he"></div>
        <div class="searc_sx" v-show="integralClass === ''">
          <span>{{i18n.integral.filtrate}}：</span>
          <em @click="screen('')" :class="screenClass==='' ? 'red':''">{{i18n.all}}</em>
          <em @click="screen(0)" :class="screenClass=='0' ? 'red':''">{{i18n.integral.order_to_inegral}}</em>
          <em @click="screen(1)" :class="screenClass=='1' ? 'red':''">{{i18n.integral.order_consume}}</em>
          <em @click="screen(2)" :class="screenClass=='2' ? 'red':''">{{i18n.integral.order_return}}</em>
          <em @click="screen(3)" :class="screenClass=='3' ? 'red':''">{{i18n.integral.refund_user_balance}}</em>
        </div>
        <div class="card-list accbala bor-acc">
          <ul>
            <li>
              <a href="javascript:void(0);">{{i18n.integral.integral}}</a>
            </li>
            <li>
              <a href="javascript:void(0);">{{i18n.integral.order_id}}</a>
            </li>
            <li>
              <a href="javascript:void(0);">{{i18n.details}}</a>
            </li>
            <li>
              <a href="javascript:void(0);">{{i18n.time}}</a>
            </li>
          </ul>
        </div>
      </form>
      <p class="ncyekjl" v-if="bool">--{{i18n.norecord}}--</p>
      <div v-else>
        <div
          v-for="(item) in integralData"
          :key="item.log_id"
          class="card-list c_contan accbala-list"
        >
          <ul>
            <li :class="item.pay_points > 0 ? 'green_car' : 'red_car'">
              <a href="javascript:void(0);">{{item.pay_points}}</a>
            </li>
            <li>
              <a href="javascript:void(0);">{{item.order_sn || i18n.without}}</a>
            </li>
            <li>
              <a href="javascript:void(0);">{{item.desc}}</a>
            </li>
            <li>
              <a
                href="javascript:void(0);"
              >{{new Date(parseInt(item.change_time)*1000).toLocaleString().replace(/:\d{1,2}$/,' ')}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 分页 -->
      <div class="paging" style="margin-top:10px;">
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
      <div class="operating fixed" id="bottom">
        <div class="fn_page clearfix">
          <div class="dataTables_paginate paging_simple_numbers">
            <ul class="pagination"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIntegralList,getBaseInfo } from "@/utils/api.js";
import { getUser } from "@/utils/auth.js";
export default {
  data() {
    return {
      bool: true, //是否有积分数据
      currentPage: 1, //初始页面为1
      pageSize: 10, //默认数据条
      integralData: [], //我的订单数据
      handleSize: 10, //当页面几条数据
      handleCurrent: 1, //第几页
      total: 0, //总共多少条数据
      integralClass: "", //类名切换
      userInfo:"", //用户信息
      screenClass: "", //筛选类名切换
      value: '',  //时间
      order_sn:'',  //订单id
    };
  },
  methods: {
    _getBaseInfo() {
      var that = this
      getBaseInfo().then((res) => {
        that.userInfo = res;
      });
    },
    //订单查询
    order_search(){
      this.handleCurrent = 1
       var data = {
        p: this.handleCurrent,
        size:this.handleSize,
        order_sn:this.order_sn
      }
      this.integralList(data)
    },
    //根据时间查询
    time_search(){
      this.handleCurrent = 1
      var data = {
        p: this.handleCurrent,
        size:this.handleSize,
        start_time:this.value[0]/1000,
        end_time:this.value[1]/1000
      }
      this.integralList(data)
    },
    //快速筛选
    screen(id) {
      this.handleCurrent = 1;
      this.screenClass = id;
      var params = {
        type: id,
        p: this.handleCurrent,
        size: this.handleSize
      };
      this.integralList(params);
    },
    //积分切换
    integralClassification(id) {
      this.integralClass = id;
      this.handleCurrent = 1;
      var params = {
        is_increase: id,
        p: this.handleCurrent,
        size: this.handleSize
      };
      this.integralList(params);
    },
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.handleSize = val;
      var params = {
        is_increase: this.integralClas,
        p: this.handleCurrent,
        size: this.handleSize
      };
      this.integralList(params);
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.handleCurrent = val;
      var params = {
        is_increase: this.integralClas,
        p: this.handleCurrent,
        size: this.handleSize
      };
      this.integralList(params);
    },
    //获取积分信息
    integralList(data) {
      getIntegralList(data).then(res => {
        if (res.records.length > 0) {
          this.bool = false;
        } else {
          this.bool = true;
        }
        this.integralData = res.records;
        this.total = res.total;
      });
    }
  },
  created() {
    if(process.client) {
      this.userInfo =  getUser()
    }
    var params = {
      p: 1,
      size: 10
    };
    this.integralList(params);
    this._getBaseInfo();
  },
  computed: {
  	i18n () {  
  	  return this.$t('user')  
  	} 
  },
  components: {
	 
  }
};
</script>

<style scoped>
>>> .timsearch .time-qjc input{
  border: none;
  padding: 0px;
}
.pageContent .fl,
.fr span {
  cursor: pointer;
}
.pageContent .fl,
.fr span:hover {
  color: #e23435;
}
.searc_sx em {
  cursor: pointer;
  padding: 4px 10px;
  border: 1px solid #dadada;
  margin-right: 10px;
  white-space: nowrap;
  position: relative;
}
</style>

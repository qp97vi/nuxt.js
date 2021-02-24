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
  <div class="ri-menu tradejf fr">
    <div class="menumain p">
      <div class="coup-tit p">
        <h1>{{i18n.dispute.trade_dispute}}</h1>
        <div class="tu">
          <div class="sclq">
            <i class="trade"></i>
            <span>
              <a href>{{i18n.dispute.dispute_explain}}</a>
            </span>
            <div class="introducetrade">
              <div class="pc">
                <p>
                  <strong>{{i18n.dispute.what_dispute}}</strong>
				  {{i18n.dispute.what_explain}}
                  <br />
                </p>
                <p>
                  <strong> {{i18n.dispute.solve_dispute}}</strong>
                  <br />{{i18n.dispute.solution_one}}
                  <br />{{i18n.dispute.solution_two}}
                  <br />{{i18n.dispute.solution_two_one}}
                  <br />{{i18n.dispute.solution_two_two}}
                  <br />{{i18n.dispute.solution_two_three}}
                  <br />{{i18n.dispute.solution_three}}
                  <br />{{i18n.dispute.solution_four}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="applyaum p ma-to-20">
      <div class="cn-apply">
        <span @click="tabDeal(0)" :class="dealClass==0 ? 'curp':''">{{i18n.dispute.may_apply_order}}</span>
        <span @click="tabDeal(1)" :class="dealClass==1 ? 'curp':''">{{i18n.dispute.already_apply_order}}</span>
      </div>
      <div class="warning" style="padding: 6px;">
        <i class="las-warning"></i>
        <span>{{i18n.dispute.order_be_not_allowed}}</span>
      </div>
      <!-- 可申请订单 -->
      <div class="orderlist-servecenter" v-if="dealClass==0">
        <div class="orderbook-list">
          <div class="book-tit">
            <ul>
              <li class="sx1">{{i18n.order_details}}</li>
              <li class="sx2">{{i18n.consignee}}</li>
               <li class="sx3">{{i18n.order_total_prices}}</li> 
              <li class="sx4">{{i18n.operation}}</li>
            </ul>
          </div>
        </div>
        <div class="order-alone-li">
          <table
            width="100%"
            border
            cellspacing
            cellpadding
            v-for="(item) in complaintData"
            :key="item.order_id"
          >
            <tbody>
              <tr class="time_or">
                <td colspan="6">
                  <div class="fl_ttmm">
                    <span class="time-num time">{{item.add_time}}</span>
                    <span class="time-num">
                      {{i18n.integral.order_id}}：
                      <em class="num">
                        <router-link
                          class="co_blue"
                          :to="{name:'order_detail',query:{order_id:item.order_id}}"
                        >{{item.order_sn}}</router-link>
                      </em>
                    </span>
                    <span class="time-num">
                        <em class="num">
                          {{item.store_name}}
                          <i class="ear"></i>
                        </em>
                    </span>
                  </div>
                </td>
              </tr>
              <tr class="conten_or">
                <td class="sx1">
                  <div
                    class="duoal"
                    v-for="orderGoods in item.order_goods"
                    :key="orderGoods.rec_id"
                  >
                    <router-link :to="{name:'goodsInfo',query:{id:orderGoods.goods_id}}">
                      <img
                        :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + orderGoods.goods_id"
                      />
                    </router-link>
                    <div class="shop_name">
                      <router-link
                        :to="{name:'goodsInfo',query:{id:orderGoods.goods_id}}"
                      >{{orderGoods.goods_name}}</router-link>
                    </div>
                    <div class="iu">x{{orderGoods.goods_num}}</div>
                  </div>
                </td>
                <td class="sx2">
                  <span class="xuname">{{item.consignee}}</span>
                  <i class="las-pp"></i>
                </td>
                <td class="sx3">
                  <span>{{i18nCommon.symbol}}</span>
                  <span>{{item.total_amount.toFixed(2)}}</span>
                </td>
                <td class="sx4">
                  <router-link :to="{ name: 'order_index',query:{order_sn:item.order_sn}}">{{i18n.dispute.apply_trade_dispute}}</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 已申请订单 -->
      <div class="orderlist-servecenter applyrecord" v-else>
        <div class="returnmagament">
          <div class="returngoods">
            <div class="book-tit">
              <ul>
                <!-- sxbb -->
                <li
                  class="sx1 s5clic"
                  :class="disputeClass ? 'sxbb' :''"
                  style="opacity: 1;"
                  @click="singleDispute"
                >
                  {{disputeTitle}}
                  <i class="jt-x shorw"></i>
                </li>
                <li class="sx5">{{i18n.dispute.dispute_details}}</li>
                <li class="sx2">{{i18n.dispute.dispute_type}}</li>
                <li
                  class="sx3 s5clic"
                  style="opacity: 1;"
                  :class="stateClass ? 'sxbb':''"
                  @click="allState"
                >
                  {{sotreTitle}}
                  <i class="jt-x shorl"></i>
                </li>
                <li class="sx4">{{i18n.operation}}</li>
              </ul>
            </div>
            <div class="hid-derei sq_der" :class="disputeClass ? 'active' :''">
              <ul>
                <li>
                  <span @click="timeChange(1,i18n.dispute.three_months_dispute)">{{i18n.dispute.three_months_dispute}}</span>
                  <!-- <a href="#">三个月内纠纷单</a> -->
                </li>
                <li>
                  <span @click="timeChange(2,i18n.dispute.three_outer_dispute)">{{i18n.dispute.three_outer_dispute}}</span>
                  <!-- <a href="#">三个月前纠纷单</a> -->
                </li>
              </ul>
            </div>
            <div class="hid-derei" :class="stateClass ? 'active' :''">
              <ul>
                <li>
                  <span @click="stateChanges('',i18n.dispute.all_state)">{{i18n.all}}{{i18n.condition}}</span>
                </li>
                <li>
                  <span @click="stateChanges('2,3',i18n.dispute.being_processed)">{{i18n.dispute.being_processed}}</span>
                </li>
                <li>
                  <span @click="stateChanges('4',i18n.dispute.accomplish)">{{i18n.dispute.accomplish}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="order-alone-li">
          <table width="100%" border cellspacing cellpadding>
            <tbody v-for="(item) in complaintData" :key="item.complain_id">
              <tr class="time_or">
                <td colspan="6">
                  <div class="fl_ttmm">
                    <span class="time-num time">{{item.complain_time_show}}</span>
                    <span class="time-num">
                      {{i18n.integral.order_id}}：
                      <em class="num">{{item.order_sn}}</em>
                    </span>
                    <span class="time-num">
                       {{i18n.dispute.complaint_seller}}：
					  <a :href="'tencent://message/?uin=' + item.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
						<em class="num">
							{{item.store_name}}
							<i class="ear"></i>
						</em>
					  </a>
                    </span>
                  </div>
                </td>
              </tr>
              <tr class="conten_or">
                <td class="sx1">
                  <div class="duoal">
                    <div v-if="item.prder_goods_id>0">
                      <img
                        :src="apiHead + '/mall/goods/thumb_image?width=60&height=60&goods_id=' + item.goods_id"
                      />
                      <router-link
                        :to="{name:'goodsInfo',query:{id:orderGoods.goods_id}}"
                      >{{item.goods_name}}</router-link>
                    </div>
                    <div v-else>
                      <img
                        @/static/images/icon_goods_thumb_empty_300.png"
                        style="width:60px;height:60px;"
                      />
                      <router-link
                        :to="{name:'order_detail',query:{order_id:item.order_id}}"
                      >{{item.complain_content}}</router-link>
                    </div>
                  </div>
                </td>
                <td class="sx2">
                  <span class="xuname">{{item.complain_subject_name}}</span>
                </td>
                <td class="sx3">
                  <span class="red">{{item.complain_state_detail}}</span>
                </td>
                <td class="sx4">
                  <router-link
                    :to="{ name: 'dispute_info',query:{complain_id:item.complain_id}}"
                  >{{i18n.dispute.view_dispute_details}}</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="operating fixed" id="bottom">
          <div class="dataTables_paginate paging_simple_numbers">
            <ul class="pagination"></ul>
          </div>
        </div>
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
</template>

<script>
import { userOrderPaging, getComplainPage } from "@/utils/api.js";
export default {
  data() {
    return {
      bool: true, //有数据时显示
      currentPage: 1, //初始页面为1
      pageSize: 10, //默认数据条
      complaintData: [], //交易投诉数据
      handleSize: 10, //当页面几条数据
      handleCurrent: 1, //第几页
      total: 0, //总共多少条数据
      dealClass: 0, //切换
      disputeClass: false, //纠纷单显示隐藏
      stateClass: false, //状态显示隐藏
      status: "", //状态
      getTime: 0, //时间戳
      timeStatu: "start_time", //三月前后属性
      sotreTitle: "全部状态", //状态的字
      disputeTitle: "三个月内纠纷单", //时间状态的字
    };
  },
  computed: {
  	i18n () {  
      this.sotreTitle = this.$t('user.dispute.all_state');
      this.disputeTitle = this.$t('user.dispute.three_months_dispute');
  	  return this.$t('user')  
    },
    i18nCommon () {
      return this.$t('common')  
    }
  },
  methods: {
    stateChanges(value, title) {
      var _this = this;
      this.currentPage = 1;
      this.status = value;
      var params = {
        status: this.status,
        p: this.currentPage,
        size: this.pageSize,
      };
      if (this.timeStatu == "end_time") {
        params.end_time = this.getTime;
      } else {
        params.start_time = this.getTime;
      }
      this.sotreTitle = title;
      this.stateClass = false;
      this.getComplainPage(params);
    },
    marchTimestamp() {
      var dt = new Date();
      dt.setMonth(dt.getMonth() - 3);
      var time = dt.toLocaleString();
      var _this = this;
      var times = time.substring(0, time.indexOf("午") - 1);
      var getTime = new Date(times).getTime() / 1000;
      this.getTime = getTime;
    },
    //时间改变
    timeChange(value, title) {
      this.marchTimestamp();
      var params = {};
      this.currentPage = 1;
      if (value == 1) {
        params = {
          status: this.status,
          p: this.currentPage,
          size: this.pageSize,
          start_time: this.getTime,
        };
        this.timeStatu = "start_time";
      } else if (value == 2) {
        params = {
          status: this.status,
          p: this.currentPage,
          size: this.pageSize,
          end_time: this.getTime,
        };
        this.timeStatu = "end_time";
      }
      this.disputeClass = false;
      this.disputeTitle = title;
      this.getComplainPage(params);
    },
    allState() {
      this.stateClass = !this.stateClass;
    },
    //纠纷单显示
    singleDispute() {
      this.disputeClass = !this.disputeClass;
    },
    //切换
    tabDeal(id) {
      this.dealClass = id;
      if (this.dealClass == 0) {
        this.complaintData = [];
        this.complaintsDeal();
      }
      if (this.dealClass == 1) {
        this.complaintData = [];
        var params = {
          p: this.handleCurrent,
          size: this.handleSize,
          start_time: this.getTime,
        };
        this.getComplainPage(params);
      }
    },
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.handleSize = val;
      if (this.dealClass == 0) {
        this.complaintsDeal();
      }
      if (this.dealClass == 1) {
        var params = {
          status: this.status,
          p: this.currentPage,
          size: this.pageSize,
        };
        if (this.timeStatu == "end_time") {
          params.end_time = this.getTime;
        } else {
          params.start_time = this.getTime;
        }
        this.getComplainPage(params);
      }
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.handleCurrent = val;
      if (this.dealClass == 0) {
        this.complaintsDeal();
      }
      if (this.dealClass == 1) {
        var timeStatu = this.timeStatu;
        var params = {
          status: this.status,
          p: this.currentPage,
          size: this.pageSize,
        };
        if (this.timeStatu == "end_time") {
          params.end_time = this.getTime;
        } else {
          params.start_time = this.getTime;
        }
        this.getComplainPage(params);
      }
    },
    // 投诉交易
    complaintsDeal() {
      var params = {
        type: "COMPLAIN",
        p: this.handleCurrent,
        size: this.handleSize,
      };
      userOrderPaging(params).then((res) => {
        this.complaintData = res.records;
        this.total = res.total;
      });
    },
    getComplainPage(params) {
      getComplainPage(params).then((res) => {
        this.complaintData = res.records;
        this.total = res.total;
      });
    },
  },
  created() {
    this.complaintsDeal();
    this.marchTimestamp();
  },
  components: {},
};
</script>

<style scoped>
.applyrecord .returnmagament .hid-derei {
  right: 272px;
}
.applyrecord .returnmagament .hid-derei ul li {
  text-align: center;
}
.applyrecord .returnmagament .hid-derei ul li span {
  cursor: pointer;
}
.applyrecord .returnmagament .hid-derei ul li span:hover {
  color: #e83632;
}
.applyrecord .returnmagament .sq_der ul li span {
  cursor: pointer;
  /* padding: 6px 0px 6px 25px; */
}
.applyrecord .returnmagament .sq_der ul li span:hover {
  color: #e83632;
}
.active {
  display: block;
}
.cn-apply span {
  cursor: pointer;
  font-size: 16px;
  font-family: "微软雅黑";
  margin-right: 30px;
}
.paging {
  text-align: center;
}
</style>

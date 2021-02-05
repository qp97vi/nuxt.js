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
      <div class="return-top p">
        <ul>
          <li :class="bool == '1' ? 'red' : ''">
            <span @click="returnRecord('1')">{{i18n.return_goods_index.changing_refunding}}</span>
          </li>
          <li :class="bool == '2' ? 'red' : ''">
            <span @click="returnRecord('2')">{{i18n.return_goods_index.return_record}}</span>
          </li>
          <li :class="bool == '3' ? 'red' : ''">
            <span @click="returnRecord('3')">{{i18n.return_goods_index.refund_detail}}</span>
          </li>
        </ul>
      </div>
      <form name id="searchform" method action v-if="bool==1">
        <div class="greatco-se">
          <div class="chx-se">
            <input type="text" name="keywords" v-model="orderReference" :placeholder="i18n.return_goods_index.order_number" />
            <span @click="inquire">{{i18n.return_goods_index.inquire}}</span>
          </div>
        </div>
        <div class="sheetbd" style="display: ;">
          <table width="100%" border cellspacing cellpadding>
            <tbody>
              <tr class="ttoda">
                <td class="r_1">{{i18n.return_goods_index.order_number}}</td>
                <td class="r_2">{{i18n.return_goods_index.orders_goods}}</td>
                <td class="r_1">{{i18n.return_goods_index.contact_seller}}</td>
                <td class="r_2">{{i18n.return_goods_index.order_time}}</td>
              </tr>
              <tr v-for="(item) in refundData" :key="item.order_id">
                <td class="r_1">
                  <router-link class="co_blue" :to="{name:'order_detail',query:{order_id:item.order_id}}">{{item.order_sn}}</router-link>
                </td>
                <td class="r_2">
                  <div
                    class="shop-app-trac"
                    v-for="orderGoods in item.order_goods"
                    :key="orderGoods.rec_id"
                  >
                    <div class="jt-shp">
                      <img
                        :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + orderGoods.goods_id"
                      />
                    </div>
                    <div class="jt-butan">
                      <router-link
                        :to="orderGoods.unsend==1 ? '':{name:'return_goods_rec',query:{rec_id:orderGoods.rec_id}}"
                        :class="orderGoods.unsend==1 ? 'active':''"
                      >{{i18n.return_goods_index.applyfor}}</router-link>
                    </div>
                  </div>
                </td>
                <td class="r_1">
				  <a :href="'tencent://message/?uin=' + item.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
				    <i class="ear"></i>&nbsp;&nbsp;{{i18n.return_goods_index.contact_seller}}
				  </a>
                </td>
                <td class="r_2">
                  <p class="lig6">
                    <span>{{item.add_time_detail}}</span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="page usercenter ma-to-20 p">
            <div class="fr"></div>
          </div>
        </div>
      </form>
      <form action method="get" id="searchform" v-else-if="bool==2">
        <div class="greatco-se">
          <div class="chx-se">
            <input
              type="text"
              name="order_sn"
              id="order_sn"
              v-model="orderReference"
              :placeholder="i18n.return_goods_index.order_number"
            />
            <span @click="inquire">{{i18n.return_goods_index.inquire}}</span>
          </div>
        </div>
        <div class="sheetbd spitysheet">
          <table width="100%" border cellspacing cellpadding>
            <tbody>
              <tr class="ttoda">
                <td class="rt_1">{{i18n.return_goods_index.repair}}</td>
                <td class="rt_1">{{i18n.return_goods_index.order_numbers}}</td>
                <td class="rt_2">{{i18n.return_goods_index.product_name}}</td>
                <td class="rt_1">
                  <select class="sele_t" name="addtime" @change="timeChange">
                    <option value>{{i18n.return_goods_index.time_application}}</option>
                    <option value="1">{{i18n.return_goods_index.last_three}}</option>
                    <option value="2">{{i18n.return_goods_index.months_ago}}</option>
                  </select>
                </td>
                <td class="rt_1">
                  <select class="sele_t" name="status" @change="stateChanges">
                    <option value>{{i18n.return_goods_index.allstate}}</option>
                    <option value="-2">{{i18n.return_goods_index.canceled}}</option>
                    <option value="-1">{{i18n.return_goods_index.audit_failure}}</option>
                    <option value="0">{{i18n.return_goods_index.check_pending}}</option>
                    <option value="1">{{i18n.return_goods_index.inhand}}</option>
                    <option value="2">{{i18n.return_goods_index.shipped}}</option>
                    <option value="3">{{i18n.return_goods_index.received}}</option>
                    <option value="4">{{i18n.return_goods_index.barter_achieve}}</option>
                    <option value="5">{{i18n.return_goods_index.retreat_achieve}}</option>
                  </select>
                </td>
                <td class="rt_1">{{i18n.return_goods_index.operate}}</td>
              </tr>
              <tr class="testrac" v-for="(item) in returnGoods" :key="item.id">
                <td class="rt_1">
                  <span class="co_blue" style="cursor: pointer;">{{item.id}}</span>
                </td>
                <td class="rt_1">
                  <router-link class="co_blue" :to="{name:'order_detail',query:{order_id:item.order_id}}">{{item.order_sn}}</router-link>
                </td>
                <td class="rt_2 te-al-le">
                  <router-link class="co_blue" :to="{name:'goodsInfo',query:{id:item.goods_id}}">{{item.order_goods.goods_name}}</router-link>
                </td>
                <td class="rt_1">
                  <p class="lig6">
                    <span>{{item.add_time_format}}</span>
                  </p>
                </td>
                <td class="rt_1">{{item.status_desc}}</td>
                <td class="rt_1">
                  <p>
                    <router-link
                      class="co_blue"
                      :to="{name:'return_goods_info',query:{rec_id:item.rec_id}}"
                    >{{i18n.return_goods_index.examine}}</router-link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <form action method="get" id="searchform" v-else>
        <div class="greatco-se">
          <div class="chx-se">
            <input type="text" name="order_sn" v-model="orderReference" :placeholder="i18n.return_goods_index.order_number" />
            <span @click="inquire">{{i18n.return_goods_index.inquire}}</span>
          </div>
        </div>

        <div class="sheetbd spitysheet">
          <table width="100%" border cellspacing cellpadding>
            <tbody>
              <tr class="ttoda">
                <td class="sx1">{{i18n.return_goods_index.service_data}}</td>
                <td class="rc_1">{{i18n.return_goods_index.refund_detail}}</td>
                <td class>{{i18n.return_goods_index.difference_reason}}</td>
                <td class="rc_1">{{i18n.return_goods_index.refund_information}}</td>
                <td class>{{i18n.return_goods_index.operate}}</td>
              </tr>
              <template v-for="(item) in returnGoods">
                <tr class="time_or" :key="item.order_id">
                  <td colspan="5">
                    <div class="fl_ttmm">
                      <span class="time-num fl">
                        {{i18n.return_goods_index.time_application}}：
                        <em class="num">{{item.add_time_format}}</em>
                      </span>
                      <span class="time-num">
                        {{i18n.return_goods_index.order_number}}：
                        <em class="num">{{item.order_sn}}</em>
                      </span>
                    </div>
                    <div class="fr_ttmm"></div>
                  </td>
                </tr>
                <tr class="testrac" :key="item.id">
                  <td class="sx1">
                    <div class="shop-if-dif">
                      <div class="shop-difimg">
                        <img
                          :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.goods_id"
                        />
                      </div>
                      <div class="shop_name">
                        <router-link :to="{name:'goodsInfo',query:{id:item.goods_id}}">{{item.order_goods.goods_name}}</router-link>
                      </div>
                    </div>
                  </td>
                  <td class="rc_1">
                    <div class="xindw">
                      <p>
                        {{i18n.return_goods_index.refund_amount}}：
                        <b style="color: #e4393c;">{{i18nCommon.symbol}}{{item.refund_money}}</b>
                      </p>
                      <p>
                        {{i18n.return_goods_index.return_balance}}：
                        <b>{{i18nCommon.symbol}}{{item.refund_deposit}}</b>
                      </p>
                      <p>
                        {{i18n.return_goods_index.return_integral}}：
                        <b>{{item.refund_integral}}</b>
                      </p>
                    </div>
                  </td>
                  <td class>{{item.gap_reason}}</td>
                  <td class="rc_1">{{item.status_desc}}</td>
                  <td class>
                    <router-link :to="{name:'return_goods_info',query:{rec_id:item.rec_id}}">{{i18n.return_goods_index.examine}}</router-link>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </form>
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
    <div class="menumain ma-to-20 p" v-if="bool==1">
      <div class="goodpiece">
        <h1>{{i18n.return_goods_index.common_problem}}</h1>
        <!--<a href=""><span class="co_blue">成长值说明<em class="thoma">></em></span></a>-->
      </div>
      <div class="app-con">
        <p>1.{{i18n.return_goods_index.inreturn}}</p>
        <p>
          2. {{i18n.return_goods_index.examine}}&nbsp;
          <router-link :to="{name:'detail'}">{{i18n.return_goods_index.sales_policy}};</router-link>
        </p>
      </div>
    </div>
    <div class="menumain ma-to-20 p" v-else-if="bool==2">
      <div class="goodpiece">
        <h1>{{i18n.return_goods_index.common_problem}}</h1>
        <!--<a href=""><span class="co_blue">成长值说明<em class="thoma">></em></span></a>-->
      </div>
      <div class="app-con">
        <p>1.{{i18n.return_goods_index.inreturn}}</p>
        <p>2. {{i18n.return_goods_index.examine}}&nbsp;</p>
      </div>
    </div>
    <div class="menumain ma-to-20 p" v-else>
      <div class="goodpiece">
        <h1>{{i18n.return_goods_index.common_problem}}</h1>
        <!--<a href=""><span class="co_blue">成长值说明<em class="thoma">></em></span></a>-->
      </div>
      <div class="app-con">
        <p>1.{{i18n.return_goods_index.inreturn}}</p>
        <p>2. {{i18n.return_goods_index.examine}}&nbsp;</p>
      </div>
    </div>
  </div>
</template>

<script>
import { userOrderPaging, getUserReturnGoodsPage } from "@/utils/api.js";
export default {
  data() {
    return {
      refundData: [], //退款数据
      returnGoods: [], //退换货记录
      bool: this.$route.query.bool || 1, //切换
      currentPage: 1, //初始页面为1
      pageSize: 10, //默认数据条
      handleSize: 10, //当页面几条数据
      handleCurrent: 1, //第几页
      total: 0, //总共多少条数据
      status: null, //退换货状态
      type: null, //服务类型
      orderReference: "" //订单编号
    };
  },
  computed:{
		i18n () {  
		  return this.$t('user')  
    },
    i18nCommon () {
        return this.$t('common')  
    }
	},
  methods: {
    //查询
    inquire() {
      var _this = this;
      this.currentPage = 1;
      var params = "";
      if (this.bool == 1) {
        params = {
          type: "WAITCCOMMENT",
          p: this.currentPage,
          size: this.pageSize,
          order_sn: this.orderReference
        };
        userOrderPaging(params).then(res => {
          this.refundData = res.records;
          this.total = res.total;
        });
      }
      if (this.bool == 2) {
        this.returnGoods = [];
        this.status = null;
        params = {
          order_sn: this.orderReference,
          p: this.currentPage,
          size: this.pageSize,
          status: this.status
        };
      }
      if (this.bool == 3) {
        this.returnGoods = [];
        this.status = "5";
        params = {
          order_sn: this.orderReference,
          p: this.currentPage,
          size: this.pageSize,
          status: this.status
        };
      }
      if (this.bool == 2 || this.bool == 3) {
        getUserReturnGoodsPage(params).then(res => {
          _this.returnGoods = res.records;
          _this.total = res.total;
        });
      }
    },
    //状态改变
    stateChanges(value) {
      this.currentPage = 1;
      this.status = value.srcElement.value;
      this.getUserReturnGoodsPage()
    },
    //时间改变
    timeChange(value) {
      var dt = new Date();
      dt.setMonth(dt.getMonth() - 3);
      var time = dt.toLocaleString();
      var _this = this;
      var times = time.substring(0, time.indexOf("午") - 1);
      var getTime = new Date(times).getTime() / 1000;
      var params = "";
      this.currentPage = 1;
      if (value.srcElement.value == 1) {
        params = {
          status: this.status,
          p: this.currentPage,
          size: this.pageSize,
          start_time: getTime
        };
      } else if (value.srcElement.value == 2) {
        params = {
          status: this.status,
          p: this.currentPage,
          size: this.pageSize,
          end_time: getTime
        };
      }
      getUserReturnGoodsPage(params).then(res => {
        _this.returnGoods = res.records;
        _this.total = res.total;
      });
    },
    //tab切换
    returnRecord(i) {
      this.bool = i;
      this.currentPage = 1
      this.orderReference = "";
       if (i == 1) {
        this.refundReturn();
      }
      if (i == 2) {
        this.returnGoods = [];
        this.status = null;
        this.getUserReturnGoodsPage();
      }
      if (i == 3) {
        this.returnGoods = [];
        this.status = "5";
        this.getUserReturnGoodsPage();
      }
    },
    refundReturn() {
      var params = {
        type: "WAITCCOMMENT",
        p: this.currentPage,
        size: this.pageSize
      };
      userOrderPaging(params).then(res => {
        this.refundData = res.records;
        this.total = res.total;
      });
    },
    getUserReturnGoodsPage() {
      var params = {
        status: this.status,
        p: this.currentPage,
        size: this.pageSize
      };
      getUserReturnGoodsPage(params).then(res => {
        this.returnGoods = res.records;
        this.total = res.total;
      });
    },
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.bool == 1) {
        this.refundReturn();
      }
      if (this.bool == 2 || this.bool == 3) {
        this.getUserReturnGoodsPage();
      }
      // this.complaintsDeal(params);
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.bool == 1) {
        this.refundReturn();
      }
      if (this.bool == 2 || this.bool == 3) {
        this.getUserReturnGoodsPage();
      }
      // this.complaintsDeal(params);
    }
  },
  created() {
    this.refundReturn();
	this.inquire();
  },
  components: {}
};
</script>

<style scoped>
.active {
  color: #fff;
  background-color: silver !important;
  border: 1px solid gray !important;
}
.return-top ul li span {
  cursor: pointer;
}
.chx-se span {
  border: 1px solid #dadada;
  color: #666666;
  padding: 11px 10px;
  background: #f9f9f9;
  cursor: pointer;
}
</style>

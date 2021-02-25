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
      <div class="coup-tit p">
        <h1> {{i18n.coupon.me_coupon}}</h1>
        <div class="tu">
          <div class="sclq">
            <i class="top-up lq"></i>
            <span>
              <nuxt-link :to="{name:'activity/coupon_list/id'}">{{i18n.coupon.get_more_coupon}}</nuxt-link>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="menumain p me-matin">
      <div class="cp-type-tit p">
        <div class="type p">
          <ul class="ty-fir">
            <li>{{i18n.coupon.coupon_type}}：</li>
            <li class="coupon-t-s sbs">
              <a href="javascript:void(0);">
                <span v-if="type == 0" class="alltype">{{i18n.coupon.unused}}</span>
                <span v-if="type == 1" class="alltype">{{i18n.coupon.have}}</span>
                <span v-if="type == 2" class="alltype">{{i18n.coupon.lost_efficacy}}</span>
                <i class="jt-x"></i>
              </a>
              <ul class="sec-ul">
                <li class="red">
                  <a href="#" @click="obliGation(0)">{{i18n.coupon.unused}}</a>
                </li>
                <li>
                  <a href="#" @click="obliGation(1)">{{i18n.coupon.have}}</a>
                </li>
                <li>
                  <a href="#" @click="obliGation(2)">{{i18n.coupon.lost_efficacy}}</a>
                </li>
              </ul>
            </li>
          </ul>

          <ul class="ty-las">
            <li :class="state == 0 ? 'red' : ''">
              <a href="#" @click="changeState(0)">{{i18n.default}}</a>
              <!-- <nuxt-link :to="{name:'coupon'}">默认</nuxt-link> -->
            </li>
            <li :class="state == 1 ? 'red' : ''">
              <a href="#" @click="changeState(1)">{{i18n.coupon.fast_due}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 有数据时 -->
      <div class="coupon-items" v-if="couponBool">
        <!-- :class="item.status == 0 && now < item.use_end_time ? 'coupon-item coupon-item-d' : 'coupon-item coupon-item-dgray'" :class="item.bool ? 'coupon-item-hover' : ''"  -->
        <div
          :class="`${item.bool ? 'coupon-item-hover' : ''} ${item.status == 0 && now < item.use_end_time ? 'coupon-item coupon-item-d' : 'coupon-item coupon-item-dgray'}`"
          class="coupon-item coupon-item-d"
          @mouseover="changeActive(index,item)"
          @mouseout="removeActive(index,item)"
          v-for="(item,index) in pagingData"
          :key="item.id"
        >
          <div class="c-type">
            <div class="c-price">
              <em>{{i18nCommon.symbol}}</em>
              <strong>{{item.money}}</strong>
            </div>
            <div class="c-limit">【{{item.name}}】</div>
            <div class="c-time">&nbsp;&nbsp;</div>
            <div class="c-time">{{i18n.coupon.valid_until}}：{{item.dead_time_format}}</div>
            <div class="c-type-top"></div>
            <div class="c-type-bottom"></div>
          </div>
          <div class="c-msg">
            <div class="c-range">
              <div class="range-item">
                <span class="label">{{i18n.coupon.limit_of_category}}：</span>
                <span class="txt" v-if="item.use_type == 0">{{i18n.coupon.all_use}}</span>
                <span class="txt" v-if="item.use_type == 1">{{i18n.coupon.appoint_goods}}</span>
                <span class="txt" v-if="item.use_type == 2">{{i18n.coupon.appoint_type}}</span>
              </div>
              <div class="range-item">
                <span class="label">{{i18n.coupon.limit_of_seller}}：</span>
                <span class="txt" v-if="item.store_id > 0">{{item.store_name}}</span>
                <span class="txt" v-else>{{i18n.coupon.the_whole_platform}}</span>
              </div>
              <div class="range-item">
                <span class="label">{{i18n.coupon.limit_of_condition}}：</span>
                <span class="txt">{{i18n.coupon.full}} {{item.condition}} {{i18n.coupon.yuan_use}}</span>
              </div>
              <!--<div class="range-item">-->
              <!--<span class="label">券编号：</span>-->
              <!--<span class="txt"></span>-->
              <!--</div>-->
              <div class="range-item">
                <span class="label">&nbsp;&nbsp;</span>
                <span class="txt">&nbsp;&nbsp;</span>
              </div>
            </div>
            <div class="op-btns">
              <!--指定商品-->
              <!-- <nuxt-link :to="type==1 || type == 2 ? {name:'coupon'}:{name:'goodsInfo'}" class="btncoupon">
                <span class="txt">立即使用</span>
                <b></b>
              </nuxt-link>-->
              <em class="btncoupon" @click="immediateUse(item)">
                <span class="txt">{{i18n.coupon.immediate_use}}</span>
                <b></b>
              </em>
              <!-- </a> -->
            </div>
            <div class="ftx-03 ac mt5" v-if="item.status == 0">{{i18n.coupon.this_coupon_can_be_used}}</div>
            <div class="ftx-03 ac mt5" v-if="item.status == 1">{{i18n.coupon.this_coupon_has_been_used}}</div>
            <div class="ftx-03 ac mt5" v-if="item.status == 2">{{i18n.coupon.this_coupon_is_invalid}}</div>
          </div>
          <div class="c-del" data-id="2293" @click="deleteCoupons(item)"></div>
        </div>
      </div>
      <!-- 没有数据 -->
      <p class="ncyekjl" v-else>{{i18n.norecord}}!</p>
    </div>
    <!-- 分页 -->
    <div class="paging">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 12, 16, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { userCouponPage, removeCoupon } from "@/utils/api.js";
export default {
  data() {
    return {
      bool: true,
      pagingData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      type: 0,
      now: new Date().getTime() / 1000,
      state: 0,
      couponBool: true, //是否有数据显示
    };
  },
  
  created() {
    this.pagingMethod();
  },
  computed: {
  	i18n () {  
  	  return this.$t('user')  
    },
    i18nCommon () {  
  	  return this.$t('common')  
  	} 
  },
  methods: {
    //立即使用优惠卷
    immediateUse(item) {
      if (this.type == 1 || this.type == 2) {
      }else{
        if (item.use_type == 0) {
          this.$router.push({
            name: "store",
            query: { store_id: item.store_id , bool: 2},
          });
        } else if (item.use_type == 1) {
          this.$router.push({
            name: "goodsInfo",
            query: { id: item.goods_id },
          });
        } else if (item.use_type == 2) {
          this.$router.push({
            name: "store",
            query: { store_id: item.store_id, bool: 2 },
          });
        }
      }
    },
    //删除优惠卷
    deleteCoupons(item) {
      var _this = this;
      this.$confirm(_this.i18n.coupon.delete_coupons, _this.i18n.hint, {
        confirmButtonText: _this.i18n.confirm,
        cancelButtonText: _this.i18n.cancel,
        type: "warning",
      })
        .then(() => {
          removeCoupon(item.coupon_list_id).then((res) => {
            if (res.status == 1) {
              _this.$message({
                type: "success",
                message: res.msg,
              });
              _this.pagingMethod();
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: _this.i18n.canceled,
          });
        });
    },
    //悬停添加类名
    changeActive(index, item) {
      var stu = {
        ...item,
        bool: true,
      };
      this.pagingData.splice(index, 1, stu);
    },
    //悬停离开隐藏类名
    removeActive(index, item) {
      var stu = {
        ...item,
        bool: false,
      };
      this.pagingData.splice(index, 1, stu);
    },
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.handleSize = val;
      this.pagingMethod();
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.handleCurrent = val;
      this.pagingMethod();
    },
    obliGation(type) {
      this.type = type;
      this.pagingMethod();
    },
    // 分页数据
    pagingMethod() {
      var params = {
        type: this.type,
        state: this.state,
        p: this.currentPage,
        size: this.pageSize,
      };
      userCouponPage(params).then((res) => {
        if (res.records.length > 0) {
          this.couponBool = true;
        } else {
          this.couponBool = false;
        }
        var stu = res.records;
        stu.map((item) => {
          return { ...item, bool: false };
        });
        this.pagingData = stu;
        this.total = res.total;
      });
    },
    changeState(state) {
      this.state = state;
      this.pagingMethod();
    },
  },
};
</script>

<style scoped>
.paging {
  background-color: #fff;
}
</style>

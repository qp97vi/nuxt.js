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
  <div>
    <top-bar></top-bar>
    <search-box :sidebarShow='false'></search-box>
    <div class="nav-coumain">
      <div class="couponlistb">
        <div class="w1224">
          <div class="titl_chooi p">
            <div class="f-sort">
              <a href="#" @click="changeType(1)" :class="type == 1 ? 'selted' : ''">{{i18n.defaults}}</a>
              <a href="#" @click="changeType(2)" :class="type == 2 ? 'selted' : ''">{{i18n.coupon_list.fast_expire}}</a>
              <a href="#" @click="changeType(3)" :class="type == 3 ? 'selted' : ''">{{i18n.coupon_list.maximum}}</a>
            </div>
          </div>
          <div class="coupon-ticket p">
            <div 
			:class="coupon.is_get == 1 ? 'aldw-item aldw-useing' : (coupon.is_lead_end == 1 ? 'aldw-item aldw-gray' : 'aldw-item')" 
			v-for="coupon in couponData" :key="coupon.id">
              <div class="q-type">
                <div class="q-price p">
                  <em>{{i18nCommon.symbol}}</em>
                  <div class="num">{{coupon.money}}</div>
                  <div class="txt">
                    <div class="typ-txt">{{coupon.name}}</div>
                    <div class="limit">
                      <span class="ftx-06">{{i18n.full}}{{coupon.condition}}{{i18n.usable}}</span>
                    </div>
                  </div>
                </div>
                <div class="q-range">
                  <div class="range-item">
                    <p>{{coupon.limit_store}}</p>
                  </div>
                  <div class="range-item" v-if="coupon.use_type == 0">{{i18n.coupon_list.all_general}}</div>
				  <div class="range-item" v-if="coupon.use_type == 1">{{i18n.coupon_list.assign_goods}}<span v-for="goods in coupon.goods_list" :key="goods.goods_id">{{goods.goods_name}}</span></div>
				  <div class="range-item" v-if="coupon.use_type == 2">{{i18n.coupon_list.assign_type_goods}}:{{coupon.goods_category.name}}</div>
                  <div class="range-item">{{coupon.use_start_time_desc}}-{{coupon.use_end_time_desc}}</div>
                </div>
              </div>
              <div class="q-opbtns">
				<router-link v-if="coupon.is_get == 0" :to="{name:'get_coupon',query:{id: coupon.id}}">
					<b class="semi-circle"></b>
					{{i18n.coupon_list.at_once_get}}
				</router-link>
				<router-link v-if="coupon.is_get == 1" :to="{name:'store',query:{store_id: coupon.store_id}}">
					<b class="semi-circle"></b>
					{{i18n.coupon_list.at_once_use}}
				</router-link>
				<a v-if="coupon.is_lead_end == 1" href="javascript:void(0);">
					<b class="semi-circle"></b>
					{{i18n.coupon_list.now_already_get}}
				</a>
              </div>
              <div class="q-state">
                <div v-if="coupon.is_lead_end == 1" class="btn-state"></div>
				<div v-if="coupon.is_get == 1" class="btn-state geten"></div>
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
                :page-sizes="[6, 12, 18, 24]"
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
import SearchBox from "@/components/SearchBox/index.vue";
import { getCouponPage,userCoupons } from "@/utils/api.js";
import TopBar from "@/components/TopBar/index.vue";
import { getUser } from "@/utils/auth.js";
export default {
  data() {
    return {
		user: getUser(),
		couponData: [],
		currentPage: 1,
		pageSize: 6,
		total: 0,
		type: 1, // 1、默认 2、即将过期 3、面额最大排序
	};
  },
  created() {
    this.pagingMethod();
  },
  methods: {
	  pagingMethod() {
		  var _this = this;
		  getCouponPage({
			  p: this.currentPage,
			  size: this.pageSize,
			  type: this.type
		  }).then(res => {
			  _this.couponData = res.records
			  _this.total = res.total
			  if (this.user) {
				  this.userCouponList();
			  }
		  })
	  },
	  userCouponList() {
		  var _this = this;
		  userCoupons().then(res => {
			  res.forEach(userCoupon => {
				  _this.couponData.forEach(coupon => {
					  if (coupon.id == userCoupon.cid) {
						  coupon.is_get = 1;
					  }
				  })
			  })
		  })
	  },
	  changeType(type) {
		  this.type = type;
		  this.pagingMethod();
	  }
  },
  computed: {
  	i18n () {  
  	  return this.$t('activity')  
    },
    i18nCommon () {
        return this.$t('common')  
    } 
  },
  components: {
    SearchBox,
    TopBar
  }
};
</script>

<style scoped>
</style>
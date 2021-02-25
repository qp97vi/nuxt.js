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
    <search-box></search-box>
    <div class="search-box p">
      <div class="w1224">
        <div class="search-path fl">
			<nuxt-link :to="{ name: 'integralMall'}">{{i18n.integralMall.all_results}}</nuxt-link>
          <i class="litt-xyb"></i>
          <span>{{i18n.integralMall.integral_shop}}</span>
        </div>
        <div class="search-clear fr">
          <span>
            <a @click="reset()">{{i18n.integralMall.emptyfilter_condition}}</a>
          </span>
        </div>
      </div>
    </div>
    <div class="search-opt classify">
      <div class="w1224">
        <div class="opt-list">
          <dl class="brand-section">
            <dt>{{i18n.integralMall.classify}}:</dt>
            <dd class="ri-section">
              <div class="lf-list">
                <div class="brand-list">
                  <div class="clearfix p">
                    <a @click="setCate('')">
                      <span :class="params.cat_id == ''?'red':''">{{i18n.integralMall.complete}}</span>
                    </a>
                    <a @click="setCate(item.id)" :key="index" v-for="(item,index) in categoryList">
                      <span :class="params.cat_id == item.id?'red':''">{{item.name}}</span>
                    </a>
                  </div>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="shop-list-tour ma-to-20 p">
      <div class="w1224">
        <div class="stsho pre-sts intergra">
          <div class="sx_topb presellall">
            <div class="f-sort fl">
              <ul>
                <li @click="setOrder('')" :class="params.order_by == ''?'red':''">
                  <a>
                    {{i18n.integralMall.complete}}
                    <i class="jta jta-w"></i>
                  </a>
                </li>
                <li @click="setOrder('sales_sum')" :class="params.order_by == 'sales_sum'?'red':''">
                  <a>
                    {{i18n.integralMall.change_amount}}
                    <i class="jta"></i>
                  </a>
                </li>
                <li
                  @click="setOrder('exchange_integral')"
                  :class="params.order_by == 'exchange_integral'?'red':''"
                >
                  <a>
                    {{i18n.integralMall.integral_value}}
                    <i class="jta"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="f-total fr">
              <div class="all-fy">
                <a @click="toPage(-1)">&lt;</a>
                <p class="fy-y">
                  <span class="z-cur">{{params.p}}</span>/
                  <span>{{totalPage}}</span>
                </p>
                <a @click="toPage(1)">&gt;</a>
              </div>
            </div>
          </div>
          <div class="he-rin p"></div>
          <div class="jpateki p">
            <ul>
              <li v-for="(item,index) in goodsList" :key="index">
                <div class="sbox">
                  <div class="contelim">
                    <img
                      :src="apiHead + '/mall/goods/thumb_image?goods_id='+ item.goods_id+'&width=400&height=400'"
                    />
                  </div>
                  <div class="contifo">
                    <p class="shop_name">
                      <a>{{item.goods_name}}</a>
                    </p>
                    <p>
                      {{i18n.integralMall.reference_value}}：{{i18nCommon.symbol}}
                      <span class="lithe">{{item.market_price.toFixed(2)}}</span>
                    </p>
                    <p>
                      {{i18n.integralMall.in_toy}}：
                      <span class="red">
                        {{i18nCommon.symbol}}
                        <em>{{item.shop_price.toFixed(2)}}+{{item.exchange_integral}}</em>{{i18n.integralMall.integral}}
                      </span>
                    </p>
                    <div class="duchan">
                      <span>
                        <em>{{item.sales_sum}}</em>{{i18n.integralMall.people_buy}}
                      </span>
                      <nuxt-link :to="{name:'goodsInfo',query:{id:item.goods_id}}">{{i18n.integralMall.immediately}}</nuxt-link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="page p">
            <div class="operating fixed" id="bottom">
              <div class="fn_page clearfix">
                <div class="dataTables_paginate paging_simple_numbers">
                  <ul class="pagination"></ul>
                </div>
              </div>
            </div>
          </div>
          <div class="reco-bouti">
            <h2 class="litt-titt">{{i18n.integralMall.recommendation}}</h2>
            <div class="reacommque">
              <ul>
                <li v-for="(item,index) in recommendList" :key="index">
                  <div class="boxque">
                    <img
                      :src="apiHead + '/mall/goods/thumb_image?goods_id='+ item.goods_id+'&width=400&height=400'"
                    />
                    <p class="shop_name">
                      <a>{{item.goods_name}}</a>
                    </p>
                    <div class="coan-j p">
                      <div class="fl">
                        <p class="ckf">
                          {{i18n.integralMall.reference_value}}：{{i18nCommon.symbol}}
                          <span class="lithe">{{item.market_price.toFixed(2)}}</span>
                        </p>
                        <p class="ckf">
                          {{i18n.integralMall.in_toy}}：
                          <span class="red">
                            {{i18nCommon.symbol}}
                            <em>{{item.shop_price.toFixed(2)}}+{{item.exchange_integral}}</em>{{i18n.integralMall.integral}}
                          </span>
                        </p>
                      </div>
                      <div class="fr">
                        <nuxt-link :to="{name:'goodsInfo'}">{{i18n.integralMall.immediately}}</nuxt-link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="hotchane">
            <h2 class="litt-titt">{{i18n.integralMall.hotfor}}</h2>
            <div class="hot-change">
              <ul>
                <li v-for="(item,index) in hotList" :key="index">
                  <div class="lit-shcha">
                    <img
                      :src="apiHead + '/mall/goods/thumb_image?goods_id='+ item.goods_id+'&width=400&height=400'"
                    />
                    <div class="duchan">
                      <span>
                        <em>{{item.sales_sum}}</em>{{i18n.integralMall.people_buy}}
                      </span>
                      <nuxt-link :to="{name:'goodsInfo'}">{{i18n.integralMall.immediately}}</nuxt-link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox/index.vue";
import TopBar from "@/components/TopBar/index.vue";
import { getGoods, getGoodsCategoryList } from "@/utils/api.js";

export default {
  data() {
    return {
      goodsList: [],
      recommendList: [],
      hotList: [],
      categoryList: [], //分类列表
      level: 1, //分类等级
      params: {
        cat_id: "", //搜索分类
        p: 1, //当前页
        order_by: "", //排序字段
        is_exchange_integral: true //搜索类型为积分搜索
      },
      totalPage: 1
    };
  },
  components: {
    SearchBox,
    TopBar
  },
  computed:{
			i18n () {
				return this.$t('goods')  
      },
      i18nCommon () {
        return this.$t('common')  
      } 
		},
  created() {
    this._getGoodsCategoryList(this.level);
    this._getGoods(this.params);
    this._getRecommend({
      p: 1, //当前页
      is_exchange_integral: 1, //搜索类型为积分搜索
      is_recommend: 1
    });
    this._getHotList({
      p: 1, //当前页
      is_exchange_integral: 1, //搜索类型为积分搜索
      is_hot: 1
    })
  },
  methods: {
    _getGoodsCategoryList(level) {
      getGoodsCategoryList(level).then(res => {
        this.categoryList = res;
      });
    },
    _getGoods(params) {
      getGoods(params).then(res => {
        this.goodsList = res.records;
        this.totalPage = res.pages;
      });
    },
    _getRecommend(params) {
      //获取推荐
      getGoods(params).then(res => {
        this.recommendList = res.records;
      });
    },
    _getHotList(params) {
      //获取热门
      getGoods(params).then(res => {
        this.hotList = res.records;
      });
    },
    setCate(id) {
      this.params.cat_id = id;
      this.params.p = 1;
      this._getGoods(this.params);
    },
    setOrder(str) {
      this.params.order_by = str;
      this.params.p = 1;
      this._getGoods(this.params);
    },
    reset() {
      //清空搜索
      this.params = {
        cat_id: "", //搜索分类
        title: "", //活动名称
        p: 1, //当前页
        order_by: "" //排序字段，start_time时间排序，comment_count 评论排序
      };
      this._getGroup(this.params);
    },
    toPage(num) {
      this.params.p = this.params.p + num;
      if (this.params.p < 1) {
        this.params.p = 1;
        return;
      } else if (this.params.p > this.totalPage) {
        this.params.p = this.totalPage;
        return;
      }
      this._getGoods(this.params);
    }
  }
};
</script>

<style scoped>
.jpateki ul {
  display: flex;
  flex-wrap: wrap;
}
.jpateki ul li {
  margin-right: 10px;
  margin-top: 15px;
}
.jpateki ul li:nth-child(-n + 3) {
  margin-top: 0;
}
a:hover {
  text-decoration: none;
}
.boxque img{
  width: 198px;
  height: 198px;
}
.lit-shcha img{
  width: 145px;
  height: 145px;
}
.boxque .coan-j .fl{
  max-width: 149px;
}
.boxque .coan-j .ckf{
  white-space: nowrap;
}
</style>

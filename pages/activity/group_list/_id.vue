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
          <a>{{i18n.group_list.all_result}}</a>
          <i class="litt-xyb"></i>
          <span>{{i18n.group_list.group_purchase}}</span>
        </div>
        <div class="search-clear fr">
          <span>
            <a @click="reset()">{{i18n.group_list.del_fer_condition}}</a>
          </span>
        </div>
      </div>
    </div>
    <div class="search-opt classify">
      <div class="w1224">
        <div class="opt-list">
          <dl class="brand-section">
            <dt>{{i18n.group_list.classify}}:</dt>
            <dd class="ri-section">
              <div class="lf-list">
                <div class="brand-list">
                  <div class="clearfix p">
                    <a @click="setCate('')">
                      <span :class="params.cat_id == ''?'red':''">{{i18n.alls}}</span>
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
        <div class="stsho pre-sts">
          <div class="sx_topb presellall group-act">
            <div class="f-sort fl">
              <ul>
                <li @click="setOrder('')" :class="params.order_by == ''?'red':''">
                  <a>{{i18n.defaults}}</a>
                </li>
                <li @click="setOrder('start_time')" :class="params.order_by == 'start_time'?'red':''">
                  <a>{{i18n.group_list.newest}}</a>
                </li>
                <li @click="setOrder('comment_count')" :class="params.order_by == 'comment_count'?'red':''">
                  <a>{{i18n.group_list.recommend}}</a>
                </li>
              </ul>
              <div class="actionname">
                <span>{{i18n.group_list.activity_name}}：</span>
                <input v-model="params.title" class="text-act" type="text" id="title" value />
                <input class="sub-act" type="submit" @click="search()" :value="i18n.confirm" />
              </div>
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
          <div class="shop-list-splb pre-set-suma groupcy p">
            <ul>
              <li v-for="(item,index) in goodsList" :key="index">
				<router-link :to="{ name:'goodsInfo', query:{id:item.goods_id} }">
					<div class="s_xsall">
					  <div class="xs_img">
						<a>
						  <img
							class="lazy-list"
							:src="apiHead + '/mall/goods/thumb_image?goods_id='+ item.goods_id+'&width=400&height=400'"
							style="display: inline;"
						  />
						</a>
					  </div>
					  <div class="shop_name2">
						{{item.goods_name}}
					  </div>
					  <div class="price-tag">
						<span class="now">
						  <em class="li_xfo">5</em>
						  <em>{{i18n.group_list.minute}}</em>
						</span>
						<span class="pre-per">
						  <em>{{item.sales_sum}}</em>{{i18n.group_list.person_join}}
						</span>

						<div class="gb_nastr p">
						  <div class="squetrian">
							<div class="arrow-right">
							  <em>{{item.rebate}}</em>&nbsp;
							  <span>{{i18n.group_list.break}}</span>
							</div>
						  </div>
						  <div class="old-new-prices">
							<p class="old">
                <span>原价:</span>
							  <span>{{i18nCommon.symbol}}</span>
							  <span>{{item.market_price}}</span>
							</p>

							<p class="new" style="width:auto;">
                <span>团购价:</span>
							  <span>{{i18nCommon.symbol}}</span>
							  <span>{{item.shop_price}}</span>
							</p>
						  </div>
						</div>
					  </div>
					</div>
					<div class="attendgorb-ocl">
                  <a
                    style="color: white"
                  >
                    <span>
                      {{i18n.group_list.fast_group_purchase}}
                      <i>&gt;</i>
                    </span>
                  </a>
                </div>
				</router-link>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox/index.vue";
import TopBar from "@/components/TopBar/index.vue";
import { getGroup, getGoodsCategoryList } from "@/utils/api.js";
export default {
  data() {
    return {
      goodsList: [],
      categoryList: [], //分类列表
      level: 1, //分类等级
      params: {
        cat_id: "", //搜索分类
        title: "", //活动名称
        p: 1, //当前页
        order_by: "" //排序字段，start_time时间排序，comment_count 评论排序
      },
      totalPage: 1
    };
  },
  components: {
    SearchBox,
    TopBar
  },
  computed: {
			i18n() {
				return this.$t('activity')
      },
      i18nCommon () {
        return this.$t('common')  
      } 
		},
  created() {
    this._getGoodsCategoryList(this.level);
    this._getGroup(this.params);
  },
  methods: {
    _getGroup(params) {
      getGroup(params).then(res => {
        this.goodsList = res.records
        this.totalPage = res.pages
      });
    },
    _getGoodsCategoryList(level) {
      getGoodsCategoryList(level).then(res => {
        this.categoryList = res;
      });
    },
    search() {
      this.params.p = 1
      this._getGroup(this.params);
    },
    setOrder(str) {
      this.params.order_by = str
      this.params.p = 1
      this._getGroup(this.params);
    },
    setCate(id){
      this.params.cat_id = id
      this.params.p = 1
      this._getGroup(this.params);
    },
    reset(){    //清空搜索
      this.params = {
        cat_id: "", //搜索分类
        title: "", //活动名称
        p: 1, //当前页
        order_by: "" //排序字段，start_time时间排序，comment_count 评论排序
      }
      this._getGroup(this.params);
    },
    toPage(num){
      this.params.p = this.params.p+(num)
      if(this.params.p<1){
        this.params.p = 1
        return
      }else if(this.params.p>this.totalPage){
        this.params.p=this.totalPage
        return
      }
      this._getGroup(this.params);
    }
  }
};
</script>

<style scoped>
a:hover{
  text-decoration: none;
}
</style>
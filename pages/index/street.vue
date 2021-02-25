
<template>
  <div>
    <top-bar></top-bar>
    <search-box :sidebarShow="true"></search-box>
    <div class="search-box p">
      <div class="w1224">
        <div class="search-path fl">
          <a>{{i18n.street.all_results}}</a>
          <i class="litt-xyb"></i>
          <span>{{i18n.street.depot_island}}</span>
        </div>
      </div>
    </div>
    <div class="search-opt classify">
      <div class="w1224">
        <div class="opt-list">
          <dl class="brand-section">
            <dt>{{i18n.street.classify}}:</dt>
            <dd class="ri-section">
              <div class="lf-list">
                <div class="brand-list">
                  <div class="clearfix p">
                    <a @click="setCate('')">
                      <span :class="params.sc_id == ''?'red':''">{{i18n.street.entire}}</span>
                    </a>
                    <a @click="setCate(item.sc_id)" :key="index" v-for="(item,index) in categoryList">
                      <span :class="params.sc_id == item.sc_id?'red':''">{{item.sc_name}}</span>
                    </a>
                  </div>
                </div>
              </div>
            </dd>
          </dl>
          <dl class="brand-section">
            <dt>{{i18n.street.province}}:</dt>
            <dd class="ri-section">
              <div class="lf-list">
                <div class="brand-list">
                  <div class="clearfix p">
                    <a @click="setProvince('')" :class="params.province_id == ''?'cored':''">
                      <span>{{i18n.street.entire}}</span>
                    </a>
                    <a  @click="setProvince(item.id)" :class="params.province_id == item.id?'cored':''" :key="index" v-for="(item,index) in provinceList">
                      <span>{{item.name}}</span>
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
          <div class="sx_topb presellall group-act">
            <div class="f-sort fl">
              <div class="actionname">
                <span>{{i18n.street.sortord}}</span>
              </div>
              <ul>
                <li @click="setOrder('store_sort')" :class="params.order_by == 'store_sort'?'red':''">
                  <a>
                    {{i18n.street.default}}
                    <i class="jta jta-w"></i>
                  </a>
                </li>
                <li @click="setOrder('store_recommend')" :class="params.order_by == 'store_recommend'?'red':''">
                  <a>
                    {{i18n.street.recommend}}
                    <i class="jta"></i>
                  </a>
                </li>
                <li @click="setOrder('store_sales')" :class="params.order_by == 'store_sales'?'red':''">
                  <a>
                    {{i18n.street.sales_volume}}
                    <i class="jta"></i>
                  </a>
                </li>
                <li @click="setOrder('store_servicecredit')" :class="params.order_by == 'store_servicecredit'?'red':''">
                  <a>
                    {{i18n.street.score}}
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
          <div class="storestreet p ma-to-20">
            <ul>
              <li v-for="(item,index) in storeList" :key="index">
                <div class="deoe">
                  <nuxt-link :to="{name:'store',query:{store_id:item.store_id}}" class="deoe-pic-wrap" >
                    <img
                      class="gejr lazy"
                      :src="item.store_banner"
                      style="display: inline;"
                    />
                  </nuxt-link>
                  <nuxt-link :to="{name:'store',query:{store_id:item.store_id}}" >
                    <div class="logoansome">
                      <div class="neleu">
                        <img
                          class="lazy"
                          :src="item.store_avatar"
                          style="display: inline;"
                        />
                      </div>
                      <div class="inetrjol">
                        <p class="names">{{item.store_name}}</p>
                        <p class="main">{{item.seo_description}}</p>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </li>
            </ul>
      
          </div>
          <div class="operating fixed" id="bottom">
            <div class="fn_page clearfix">
              <div class="dataTables_paginate paging_simple_numbers">
                <ul class="pagination"></ul>
              </div>
            </div>
          </div>
          <div class="hot-shop ma-to-20">
            <div class="layout-title">
              <span class="fl">{{i18n.street.hot_saleval}}</span>
              <span class="update_h fr" @click="changePage()">
                <i class="litt-hyh"></i>
                {{i18n.street.change}}
              </span>
            </div>
            <div class="sixshop-box">
              <ul id="favourite_goods">
                <li :key="index" v-for="(item,index) in goodsList" class>
                  <div class="shde">
					<nuxt-link :to="{name:'goodsInfo',query:{id:item.goods_id}}">
            <p class="hotgoodsname">{{item.goods_name}}</p>
						<a>
						  <img
							class="sjhe lazy"
							:src="apiHead + '/mall/goods/thumb_image?goods_id='+ item.goods_id+'&width=400&height=400'"
							style="display: inline;"
						  />
						</a>
					</nuxt-link>
                    <div class="box-hotshui">
                      <div class="price-tag">
                        <span class="now">
                          <em class="li_xfo">{{i18nCommon.symbol}}</em>
                          <em>{{item.shop_price}}</em>
                        </span>
                        <span class="old">
                          <em>{{i18nCommon.symbol}}</em>
                          <em>{{item.market_price}}</em>
                        </span>
                      </div>
                      <p class="shop_name">
						   <nuxt-link :to="{name:'goodsInfo',query:{id:item.goods_id}}">{{item.goods_name}}</nuxt-link>
                      </p>
                      <div class="shop_name2">
						  <nuxt-link
						    class="co_hchh"
						    :to="{name:'store',query:{store_id:item.store_id}}"
						  >{{item.store_name}}</nuxt-link>
                      </div>
                      <div class="chejancns p">
                        <span class="fl">
                          {{i18n.street.clinch_deal}}
                          <em class="red">{{item.sales_sum}}{{i18n.street.pen}}</em>
                        </span>
                        <span class="fr">
                          {{i18n.street.evaluate}}
                          <em class="co_blue">{{item.comment_count}}</em>
                        </span>
                      </div>
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
import { getGoods , getStoreStreet , getStoreClassify , getRegionList } from "@/utils/api.js"
export default {
  data() {
    return {
      storeList: [], //店铺列表
      goodsList: [], //商品列表
      categoryList: [], //分类列表
      provinceList:[],
      params: {
        sc_id: "", //搜索分类
        p: 1, //当前页
        size:9,//每页个数
        order_by: "store_sort", //排序字段
        province_id: "",
		store_name: this.$route.query.words || ""
      },
      goods:{
        p:1,
        size:10
      },
      totalPage: 1
    };
  },
  created(){
    this._getStoreClassify();
    this._getRegionList({
      parent_id:0
    });
    this._getStoreStreet(this.params)
    this._getGoods(this.goods)
  },
  components: {
    SearchBox,
    TopBar
  },
  computed:{
		i18n () {  
	  	return this.$t('login')  
    },
    i18nCommon () {
      return this.$t('common')  
    } 
	},
  methods:{
    _getStoreClassify() {
      getStoreClassify().then(res => {
        this.categoryList = res;
      });
    },
    _getGoods(goods){
      getGoods(goods).then((res)=>{
        this.goodsList = res.records
        if(this.goods.p>1&&this.goodsList.length == 0){
          this.goods.p = 1
          this._getGoods(this.goods)
        }
      })
    },
    setCate(id){
      this.params.sc_id = id
      this.params.p = 1
      this._getStoreStreet(this.params);
    },
    setProvince(id){
      this.params.province_id = id
      this.params.p = 1
      this._getStoreStreet(this.params)
    },
    _getStoreStreet(params){
      getStoreStreet(params).then(res => {
        this.storeList = res.records
        this.totalPage = res.pages
      })
    },
    setOrder(str) {
      this.params.order_by = str
      this.params.p = 1
      this._getStoreStreet(this.params);
    },
    _getRegionList(params) {
      getRegionList(params).then((res) =>{
        this.provinceList = res
      })
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
      this._getStoreStreet(this.params);
    },
    changePage(){
      this.goods.p++
      if(this.goods.p > 5){
        this.goods.p = 1
      }
      this._getGoods(this.goods)
    }
  }
};
</script>

<style scoped>
  .logoansome{
    height: 62px;
  }
.storestreet ul li{
  margin-right: 15px;
  margin-bottom: 40px;
}
a:hover{
  text-decoration: none;
}
.hotgoodsname{
  height: 50px;
  overflow: hidden;
  line-height: 25px;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  word-break:break-word
}
</style>

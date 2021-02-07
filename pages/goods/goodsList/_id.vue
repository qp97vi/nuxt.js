/** * VUEshop *
============================================================================ * *
版权所有 2015-2027 深圳搜豹网络科技有限公司，并保留所有权利。 * 网站地址:
http://www.vueshop.com.cn *
---------------------------------------------------------------------------- *
这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和使用 . *
不允许对程序代码以任何形式任何目的的再发布。 *
============================================================================ *
$Author: soubao-java 2020-07-22 $ */
<template>
  <div>
    <top-bar @site="getsite"></top-bar>
    <search-box :sidebarShow="true"></search-box>
    <div class="search-box p">
      <div class="w1430">
        <div class="search-path fl" v-if="!query.brand_ids">
          <a href="javascript:void(0)">{{ i18n.goodsList.all_results }}</a>
          <i class="litt-xyb"></i>
          <template v-if="!query.cat_id && !query.brand_ids">
            <a href="javascript:void(0)">{{ query.words }}</a>
            <i class="litt-xyb"></i>
          </template>
          <template v-if="query.cat_id || query.brand_ids">
            <a href="javascript:void(0)">{{ firstData.name }}</a>
            <i class="litt-xyb"></i>
            <!--如果当前分类是三级分类 则二级也要显示-->
            <template v-if="this.parent_ids.length > 1 ? true : false">
              <div class="havedox">
                <div class="disenk">
                  <span>{{ firstArr.select.name }}</span>
                  <i class="litt-xxd"></i>
                </div>
                <div class="hovshz">
                  <ul>
                    <li v-for="(item, index) in firstArr.data" :key="index">
                      <!-- <a href="javascript:void(0)" @click="changeData(item.id)">{{ item.name }}ww</a> -->
                       <nuxt-link :to="{name:'goods-goodsList-id',query:{cat_id:item.id}}">{{ item.name }}ww</nuxt-link> 
                    </li>
                  </ul>
                </div>
              </div>
              <i class="litt-xyb"></i>
            </template>
            <template v-if="this.parent_ids.length > 2 ? true : false">
              <div class="havedox">
                <div class="disenk">
                  <span>{{ secondArr.select.name }}</span>
                  <i class="litt-xxd"></i>
                </div>
                <div class="hovshz">
                  <ul>
                    <li v-for="(item, index) in secondArr.data" :key="index">
                      <a href="javascript:void(0)" @click="changeData(item.id)">{{ item.name }}ee</a>
                    </li>
                  </ul>
                </div>
              </div>
              <i class="litt-xyb"></i>
            </template>
          </template>
          <!--如果当前分类是三级分类 则二级也要显示-->
          <!--当前分类-->
        </div>
        <template v-if="filterData && filterData.length > 0">
          <a
            :title="item.type + ':' + item.text"
            href="javascript:void(0)"
            v-for="(item, index) in filterData"
            :key="index"
            class="u-av-label"
            @click="clearFilter(item.typeText)"
          >
            {{ item.type }}:{{ item.text }}
            <i>x</i>
          </a>
        </template>

        <div class="search-clear fr" @click="clearAllFilter">
          <span>
            <a href="javascript:void(0)">
              {{
              i18n.goodsList.emptyfilter_condition
              }}
            </a>
          </span>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="search-opt troblect">
      <div class="w1430">
        <div class="opt-list" :class="showMin ? 'min-show' : ''">
          <!-- 分类筛选 start -->
          <dl class="brand-section m-tr" v-if="this.parent_ids.length == 2 && query.cat_id">
            <dt>{{ i18n.goodsList.sorting }}</dt>
            <dd class="ri-section">
              <div class="lf-list">
                <div class="brand-list">
                  <div class="clearfix p">
                    <a
                      href="javascript:void(0)"
                      v-for="(item, index) in secondArr.data"
                      :key="index"
                      @click="changeData(item.id)"
                    >
                      <span>{{ item.name }}</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="lr-more">
                <a href="javascript:void(0)">
                  <span class="gd_more">{{ i18n.goodsList.more }}</span>
                  <i class="litt-tcr"></i>
                </a>
              </div>
            </dd>
          </dl>
          <!-- 分类筛选 end -->
          <!-- 品牌筛选 start -->
          <dl
            class="brand-section m-tr"
            v-if="
              goodsFilter.filter_brand && goodsFilter.filter_brand.length > 0
            "
          >
            <dt>{{ i18n.goodsList.brand }}</dt>
            <dd class="ri-section" :class="[isMore ? 'sum_ov_inh' : '']">
              <div class="lf-list">
                <div class="brand-box brand-list">
                  <div class="clearfix p">
                    <a
                      :class="brand.select ? 'red_hov_cli' : ''"
                      v-for="(brand, index) in goodsFilter.filter_brand"
                      :key="index"
                      v-if="index < brandNum"
                      @click="selectAttr('brand', index, 'idx', brand.href)"
                    >
                      <i class="litt-zd"></i>
                      <img :src="brand.src" />
                      <span style="line-height: 33px">{{ brand.name }}</span>
                    </a>
                  </div>
                  <div class="surclofix p">
                    <a
                      href="javascript:void(0)"
                      class="u-confirm"
                      @click="determine('brand', index)"
                    >{{ i18n.goodsList.confirm }}</a>
                    <a
                      href="javascript:;"
                      class="u-cancel"
                      @click="cancel('brand')"
                    >{{ i18n.goodsList.cancel }}</a>
                  </div>
                </div>
              </div>
              <div class="lr-more">
                <a href="javascript:void(0)" @click="moreSelect('brand')" v-if="!isMore">
                  <span class="dx_choice">
                    {{
                    i18n.goodsList.multiple_choice
                    }}
                  </span>
                  <i class="litt-pluscr"></i>
                </a>
                <template v-if="!isMore">
                  <a
                    href="javascript:void(0)"
                    v-if="
                      goodsFilter.filter_brand &&
                        goodsFilter.filter_brand.length > brandNum
                    "
                    @click="moreShow('brand')"
                  >
                    <span class="gd_more">{{ i18n.goodsList.more }}</span>
                    <i class="litt-tcr"></i>
                  </a>
                  <a
                    href="javascript:void(0)"
                    v-if="
                      goodsFilter.filter_brand &&
                        goodsFilter.filter_brand.length == brandNum
                    "
                    @click="moreHide('brand')"
                  >
                    <span class="gd_more">{{ i18n.goodsList.packup }}</span>
                    <i class="litt-tcr"></i>
                  </a>
                </template>
              </div>
            </dd>
          </dl>
          <!-- 品牌筛选 end -->
          <!-- 规格筛选 start -->
          <!-- 规格筛选 end -->
          <!-- 属性筛选 start -->
          <dl
            class="brand-section m-tr"
            v-for="(attr, index) in goodsFilter.filter_attr"
            :key="index"
            v-if="goodsFilter.filter_attr && goodsFilter.filter_attr.length > 0"
          >
            <dt>{{ attr.name }}</dt>
            <dd class="ri-section" :class="[attr.isMore ? 'sum_ov_inh' : '']">
              <div class="lf-list">
                <div class="brand-list">
                  <div class="clearfix p">
                    <a
                      v-for="(item, idx) in attr.item"
                      :key="idx"
                      :class="item.select ? 'red_hov_cli' : ''"
                      @click="selectAttr('attr', index, idx, item.href)"
                      :data-href="item.href"
                      v-if="idx < attr.showLenght"
                    >
                      <input
                        class="shaix_la"
                        type="checkbox"
                        :checked="item.select"
                        v-if="attr.isMore"
                      />
                      <span>{{ item.name }}</span>
                    </a>
                  </div>
                  <div class="surclofix p">
                    <a
                      href="javascript:;"
                      class="u-confirm"
                      @click="determine('attr', index)"
                    >{{ i18n.goodsList.confirm }}</a>
                    <a
                      href="javascript:;"
                      class="u-cancel"
                      @click="cancel('attr', index)"
                    >{{ i18n.goodsList.cancel }}</a>
                  </div>
                </div>
              </div>
              <div class="lr-more">
                <a
                  href="javascript:void(0)"
                  @click="moreSelect('attr', index)"
                  v-if="
                    !attr.isMore ||
                      (attr.showLenght == attr.item.length && attr.packUp)
                  "
                >
                  <span class="dx_choice">
                    {{
                    i18n.goodsList.multiple_choice
                    }}
                  </span>
                  <i class="litt-pluscr"></i>
                </a>

                <a
                  href="javascript:void(0)"
                  v-if="attr.showLenght < attr.item.length && !attr.isMore"
                  @click="moreShow('attr', index)"
                >
                  <span class="gd_more">{{ i18n.goodsList.more }}</span>
                  <i class="litt-tcr"></i>
                </a>
                <a
                  href="javascript:void(0)"
                  v-if="attr.showLenght == attr.item.length && attr.packUp"
                  @click="moreHide('attr', index)"
                >
                  <span class="gd_more">{{ i18n.goodsList.packup }}</span>
                  <i class="litt-tcr"></i>
                </a>
              </div>
            </dd>
          </dl>

          <!-- 属性筛选 end -->
          <!-- 价格筛选 start -->
          <dl
            class="brand-section m-tr"
            style="display: block"
            v-if="
              goodsFilter.filter_price && goodsFilter.filter_price.length > 0
            "
          >
            <dt>{{ i18n.goodsList.price }}</dt>
            <dd class="ri-section">
              <div class="lf-list">
                <div class="brand-list">
                  <div class="clearfix p">
                    <a
                      v-for="(item, index) in goodsFilter.filter_price"
                      :key="index"
                      :class="item.select ? 'red_hov_cli' : ''"
                      @click="selectAttr('price', index, idx, item.href)"
                    >
                      <span>{{i18nCommon.symbol}}{{item.name.substr(1)}}</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="lr-more">
                <!--<a href="javascript:void(0)"><span class="dx_choice">多选</span><i class="litt-pluscr"></i></a>-->
                <!--<a href="javascript:void(0)"><span class="gd_more">更多</span><i class="litt-tcr"></i></a>-->
                <!--填写筛选价格区间-s-->
                <input type="number" v-model="start_price" />
                <span>-</span>
                <input type="number" v-model="end_price" />
                <input type="submit" :value="i18n.goodsList.confirm" @click="submit" />
                <!--填写筛选价格区间-e-->
              </div>
            </dd>
          </dl>
          <!-- 价格筛选 end -->
        </div>
        <p class="moreamore" @click="showMin = !showMin">
          <a v-if="showMin" class="red">{{ i18n.goodsInfo.unfold }}</a>
          <a v-else class="red">{{ i18n.goodsList.packup }}</a>
        </p>
      </div>
    </div>
    <!-- 推荐热卖 -->
    <div class="shop-list-tour ma-to-20 p">
      <div class="w1430">
        <div class="tjhot fl">
          <div class="sx_topb" v-if="hotGoods && hotGoods.length > 0">
            <h3>{{ i18n.goodsList.recommend_hotsale }}</h3>
          </div>
          <div class="tjhot-shoplist" id="ajax_hot_goods" v-if="hotGoods && hotGoods.length > 0">
            <div class="alone-shop" v-for="(item, index) in hotGoods" :key="index" v-if="index < 5">
              <router-link :to="{ name: 'goods-goodsInfo-id', query: { id: item.goods_id } }">
                <img class="lazy" :src="item.original_img" style="display: inline" />
              </router-link>
              <p class="line-two-hidd">
                <router-link
                  :to="{ name: 'goods-goodsInfo-id', query: { id: item.goods_id } }"
                >{{ item.goods_name }}</router-link>
              </p>
              <p class="price-tag">
                <span class="li_xfo">{{ i18nCommon.symbol }}</span>
                <span>{{ item.shop_price.toFixed(2) }}</span>
              </p>
              <p class="store-alone">
                <router-link
                  :to="{ name: 'goods-goodsInfo-id', query: { id: item.goods_id } }"
                >{{ item.goods_name }}</router-link>
              </p>
            </div>
          </div>
          <div class="sx_topb ma-to-20" v-if="recommendGoods.length > 0">
            <h3>{{ i18n.goodsList.recommend_list }}</h3>
          </div>
          <template v-if="recommendGoods && recommendGoods.length > 0">
            <div
              class="tjhot-shoplist"
              id="ajax_sales_goods"
              v-for="(item, index) in recommendGoods"
              :key="index"
              v-if="index < 5"
            >
              <div class="alone-shop">
                <router-link :to="{ name: 'goods-goodsInfo-id', query: { id: item.goods_id } }">
                  <img class="lazy" :src="item.original_img" style="display: inline" />
                </router-link>
                <p class="line-two-hidd">
                  <router-link
                    :to="{ name: 'goods-goodsInfo-id', query: { id: item.goods_id } }"
                  >{{ item.goods_name }}</router-link>
                </p>
                <p class="price-tag">
                  <span class="li_xfo">{{ i18nCommon.symbol }}</span>
                  <span>{{ item.shop_price.toFixed(2) }}</span>
                </p>
                <p class="store-alone">
                  <router-link
                    :to="{ name: 'store', query: { id: item.store_id } }"
                  >{{ item.cat_name }}</router-link>
                </p>
              </div>
            </div>
          </template>
        </div>
        <div class="stsho fr">
          <div class="sx_topb ba-dark-bg">
            <div class="f-sort fl">
              <ul>
                <li
                  :class="query.order_by == item.order_by ? 'red' : ''"
                  @click="tabChange(item.clickType, item.id)"
                  v-for="(item, index) in type"
                  :key="index"
                >
                  <a href="javascript:void(0)">{{ item.text }}</a>
                  <i class="litt-zzx1" v-if="item.id == 2"></i>
                </li>
              </ul>
            </div>
            <div class="f-total fr">
              <div class="all-sec">
                {{ i18n.goodsList.common }}
                <span>{{ total }}</span>
                {{ i18n.goodsList.commodity }}
              </div>
              <div class="all-fy">
                <a @click="prev()">&lt;</a>
                <p class="fy-y">
                  <span class="z-cur">{{ current }}</span>/
                  <span>{{ pages }}</span>
                </p>
                <a @click="next()">&gt;</a>
              </div>
            </div>
          </div>
          <div class="sx_topb">
            <div class="choice-mo-shop">
              <ul>
                <li v-for="(item, index) in selectType" :key="item.id" @click="selectGoods(index)">
                  <div class="sel-item" :class="item.select ? 'red' : ''">
                    <i class="litt-zzdg1" :class="item.select ? 'litt-zzdg2' : ''"></i>
                    {{ item.text }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="shop-list-splb p">
            <ul v-if="goodsData && goodsData.length > 0">
              <li v-for="(item, index) in goodsData" :key="index">
                <div class="s_xsall">
                  <div class="xs_img">
                    <router-link :to="{ name: 'goods-goodsInfo-id', query: { id: item.goods_id } }">
                      <img class="lazy-list" :src="item.original_img" style="display: inline" />
                    </router-link>
                  </div>
                  <div class="xs_slide">
                    <div class="small-xs-shop">
                      <ul>
                        <li
                          :class="item.selectImg == idx ? 'bored' : ''"
                          v-for="(item_img, idx) in item.goodsImg"
                          :key="idx"
                          @mouseenter="changnBigPic(index, idx)"
                        >
                          <a href="javascript:void(0);" v-if="item.goods_id == item_img.goods_id">
                            <img class="lazy-list" :src="item_img.image_url" style="display: block" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="price-tag">
                    <span class="now">
                      <em class="li_xfo">{{ i18nCommon.symbol }}</em>
                      <em>{{ item.shop_price.toFixed(2) }}</em>
                    </span>
                    <span class="old">
                      <em>{{ i18nCommon.symbol }}</em>
                      <em>{{ item.market_price.toFixed(2) }}</em>
                    </span>
                  </div>
                  <div v-if="item.prom_type_detail" style="color: #ff8f22;">{{i18n.goodsList.participating}}{{item.prom_type_detail}}</div>
                  <div v-else style="height: 21px;"></div>
                  <div class="shop_name2">
                    <router-link
                      :to="{ name: 'goods-goodsInfo-id', query: { id: item.goods_id } }"
                    >{{ item.goods_name }}</router-link>
                  </div>
                  <div class="shop_name2">
                    <span
                      v-if="item.is_own_shop == 1"
                      style="
                        width: 30px;
                        color: #fff;
                        background: #e3101e;
                        text-align: center;
                        margin-right: 5px;
                      "
                    >{{ i18n.goodsList.autotrophy }}</span>
                    <router-link
                      class="co_hchh"
                      :to="{ name: 'store', query: { store_id: item.store_id } }"
                    >{{ item.store_name }}</router-link>
                  </div>
                  <div class="J_btn_statu">
                    <div class="p-num">
                      <input
                        class="J_input_val"
                        id="number_2077"
                        type="text"
                        @input="changeNum"
                        :data-index="index"
                        v-model="item.num"
                      />
                      <p class="act">
                        <a href="javascript:void(0);" @click="goods_add(index)" class="litt-zzyl1"></a>
                        <a href="javascript:void(0);" @click="goods_cut(index)" class="litt-zzyl2"></a>
                      </p>
                    </div>
                    <div class="p-btn">
                      <!--虚拟商品去详情-->
                      <a href="javascript:void(0);" @click="addCart(index)">
                        {{
                        i18n.goodsList.add_shopping_cart
                        }}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-else class="nodata">-- {{ i18n.goodsList.change_conditions }}！--</div>
          </div>
          <template v-if="goodsData">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="current"
              :page-sizes="[20, 25, 30, 35]"
              :page-size="pageData.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </template>
        </div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="underheader-floor p specilike">
      <div class="w1430">
        <div class="layout-title">
          <span class="fl">{{ i18n.goodsList.what_youlike }}</span>
          <span class="update_h fr" @click="favourite">
            <i class="litt-hyh"></i>
            {{ i18n.goodsList.sing_exchange }}
          </span>
        </div>
        <ul class="ul-li-column p" id="favourite_goods">
          <li v-for="index in arr" :key="index">
            <div class="pad">
              <router-link
                :to="{
                  name: 'goods-goodsInfo-id',
                  query: { id: guessYoulikeGoodsList[index].goods_id },
                }"
              >
                <img
                  class="lazy"
                  style="display: inline"
                  :src="guessYoulikeGoodsList[index].original_img"
                />
              </router-link>
              <div class="shop_name2">
                <router-link
                  :to="{
                    name: 'goods-goodsInfo-id',
                    query: { id: guessYoulikeGoodsList[index].goods_id },
                  }"
                >{{ guessYoulikeGoodsList[index].goods_name }}</router-link>
              </div>
              <div class="price-tag">
                <span class="now">
                  <em class="li_xfo">{{ i18nCommon.symbol }}</em>
                  <em>
                    {{
                    guessYoulikeGoodsList[index].shop_price.toFixed(2)
                    }}
                  </em>
                </span>
                <span class="old">
                  <em>{{ i18nCommon.symbol }}</em>
                  <em>
                    {{
                    guessYoulikeGoodsList[index].market_price.toFixed(2)
                    }}
                  </em>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <add-cart-pop :visible="visible" @updateHide="Hide" ref="addcart"></add-cart-pop>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import TopBar from "@/components/TopBar/index.vue";
import AddCartPop from "@/components/AddCartPop/index.vue";
import SearchBox from "@/components/SearchBox/index.vue";
import common from "@/utils/common.js";
import {
  getGoodsList,
  getGoodsFilter,
  getGoodsImages,
  getGoodsId,
  getGoodsFirstId,
  getGuessYouLike,
  getSpecPrice,
  addCart,
  getCartUnlisted,
  getGoodsFreight
} from "@/utils/api.js";
import { getUser } from "@/utils/auth.js";
export default {
  data() {
    return {
      user: getUser(),
      visible: false,
      goodsData: "",
      goodsImg: "",
      goodsFilter: "",
      isMore: false,
      allMore: false,
      brandNum: 10,
      hotGoods: "", //热卖商品
      recommendGoods: "", //推荐商品
      total: "", //总数
      pages: "", //总页数
      query: "", //当前页面参数
      pageData: {
        page: 1,
        size: 20
      },
      current: "", //当前页数
      end_price: "",
      start_price: "",
      brand_ids: [],
      parent_ids: "",
      filterData: [],
      firstId: "", //父级id index=0  第一级
      secondId: "", //二级id
      firstData: "",
      showMin: true,
      firstArr: {
        data: "",
        select: ""
      }, //第一级
      secondArr: {
        data: "",
        select: ""
      }, //第二级
      type: [
        {
          id: 0,
          clickType: "",
          text: "综合",
          select: true,
          order_by: ""
        },
        {
          id: 1,
          clickType: "",
          text: "销量",
          select: false,
          order_by: "sales_sum"
        },
        {
          id: 2,
          clickType: "",
          text: "价格",
          select: false,
          order_by: "shop_price",
          sort: "desc"
        },
        {
          id: 3,
          clickType: "",
          text: "评论",
          select: false,
          order_by: "comment_count"
        },
        {
          id: 4,
          clickType: "",
          text: "新品",
          select: false,
          order_by: "is_new"
        }
      ],
      selectType: [
        // {
        //   id: 0,
        //   text: "TPshop商城自营",
        //   select: false,
        //   type: "is_own_shop",
        // },
        {
          id: 0,
          text: "推荐好货",
          select: false,
          type: "is_recommend"
        },
        {
          id: 1,
          text: "优惠促销",
          select: false,
          type: "prom_type"
        },
        {
          id: 2,
          text: "仅显示有货",
          select: false,
          type: "is_has_count"
        }
      ],
      guessYoulikeGoodsList: [],
      arr: [], //随机数
      sit_id:null,//顶部地址id
    };
  },
  components: {
    TopBar,
    SearchBox,
    AddCartPop
  },
  computed: {
    i18n() {
      this.type[0].text = this.$t("goods.goodsList.synthesize");
      this.type[1].text = this.$t("goods.goodsList.sales_sum");
      this.type[2].text = this.$t("goods.goodsList.shop_price");
      this.type[3].text = this.$t("goods.goodsList.comment_count");
      this.type[4].text = this.$t("goods.goodsList.is_new");
      // this.selectType[0].text = this.$t("goods.goodsList.is_own_shop");
      this.selectType[0].text = this.$t("goods.goodsList.is_recommend");
      this.selectType[1].text = this.$t("goods.goodsList.prom_type");
      this.selectType[2].text = this.$t("goods.goodsList.is_has_count");
      // this.selectType[3].text = this.$t("goods.goodsList.is_has_count");
      return this.$t("goods");
    },
    i18nCommon() {
      return this.$t("common");
    }
  },
  watchQuery: true,
  validate({ params, query }) {
    // return true // 如果参数有效
    // return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    console.log("刷新",query)
    return true
  },
  created() {
    this.query = this.$route.query;
    let params = {
      p: this.query.p,
      size: this.query.size,
      searchType: this.query.searchType
    };
    if (this.query.cat_id) {
      params.cat_id = this.query.cat_id;
    }
    if (this.query.brand_ids) {
      params.brand_ids = this.query.brand_ids;
    }
    if (this.query.searchType == 3) {
      params.goods_sn = this.query.words;
    } else if (this.query.searchType == 4) {
      params.brand_name = this.query.words;
    } else {
      params.words = this.query.words;
    }
    if (!params.p) {
      params.p = this.pageData.page;
    } else {
      this.pageData.page = params.p;
    }
    if (!params.size) {
      params.size = this.pageData.size;
    } else {
      this.pageData.size = Number(params.size);
    }
    for (let type in params) {
      this.selectType.map(item => {
        if (item.type == type) {
          item.select = true;
        } else {
          item.select = false;
        }
      });
    }
    this.getGoodsList(params);
    console.log(this.goodsData)
  },
  mounted() {
    if (getUser() != null) {
      //获取猜你喜欢
      this.getGuessYouLikeGoods();
    } else {
      this.getLikeGoods();
    }
  },
  methods: {
    getsite(data){
	  this.sit_id=data.value[data.value.length-1]
    },
    getGoodsList(params) {
      var that = this;
      let query = that.$route.query;
      console.log(query);
      if (query.start_price && query.end_price) {
        params.start_price = Number(query.start_price)
        params.end_price = Number(query.end_price)
      }
      getGoodsList(params)
        .then(res => {
          if (res.records.length > 0) {
            res.records.map(i => {
              i.num = 1;
            });
          }
          this.goodsData = res.records;
          this.total = res.total;
          this.pages = res.pages;
          this.current = res.current;
          return res.records;
        })
        .then(res => {
          if (res.length > 0) {
            let arr = [];
            res.map(item => {
              arr.push(item.goods_id);
              item.selectImg = 0; //默认选择0
            });
            arr = arr.join(","); // 商品小图
            // let goodsImg=new Array();
            getGoodsImages({
              goods_id: arr
            }).then(res => {
              this.goodsData.map(goods => {
                goods.goodsImg = new Array();
                res.map(item => {
                  if (goods.goods_id == item.goods_id) {
                    goods.goodsImg.push(item);
                  }
                });
              });
            });
          }
        })
        .then(() => {
          let url = this.$route.fullPath.split("?")[1];
          getGoodsFilter(encodeURIComponent(url)).then(res => {
            let query = this.$route.query;
            if (res.filter_brand.length > 0) {
              let brandId = new Array();
              let params = {
                typeText: "brand_ids",
                type: that.i18n.goodsList.brand,
                text: ""
              };
              if (query.brand_ids) {
                brandId = query.brand_ids.split(",");
              }

              res.filter_brand.map((item, index) => {
                item.select = false;
                let strIndex = item.href.indexOf("brand_ids");
                let data = item.href.substring(strIndex);
                data = data.split("=")[1];
                item.brand_ids = data;
                if (url.indexOf("brand_ids")) {
                  let strIndex = url.indexOf("brand_ids");
                  let data = url.substring(strIndex);
                  data = data.split("=")[1];
                  if (brandId.length != 0) {
                    brandId.map(v => {
                      if (item.brand_ids == v) {
                        item.select = true;
                      }
                    });
                  }
                }
                if (item.select && params.text == "") {
                  params.text = item.name;
                } else if (item.select && params.text != "") {
                  params.text = params.text.concat(",", item.name);
                }
              });
              if (query.brand_ids) {
                this.filterData.push(params);
              }
            }
            if (res.filter_attr.length > 0) {
              let params = {
                type: "",
                text: ""
              };
              res.filter_attr.map(item => {
                item.isMore = false;
                item.packUp = false;
                item.showLenght = 1; //
                let dataAttrs = new Array();
                if (item.item.length > 0) {
                  item.item.map(v => {
                    let strIndex = v.href.indexOf("attr");
                    let AttrData = decodeURI(v.href.substring(strIndex));
                    AttrData = AttrData.split("=")[1];
                    AttrData = AttrData.split("_");
                    v.typeNum = AttrData[0];
                    v.typeText = AttrData[1];
                    v.typeName = item.name;
                    item.typeNum = AttrData[0];
                    v.select = false;
                    if (query.attr) {
                      if (query.attr.indexOf("@") != -1) {
                        let data;
                        let queryData = query.attr.split("@");
                        queryData.map(j => {
                          data = j.split("_");
                          data.map(i => {
                            dataAttrs.push(i);
                          });
                        });
                        dataAttrs.map(i => {
                          if (v.typeText == i) {
                            v.select = true;
                          }
                        });
                      } else {
                        let data = query.attr.split("_");
                        data.map(i => {
                          if (v.typeText == i) {
                            v.select = true;
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
            if (res.filter_price.length > 0) {
              let params = {
                typeText: "price",
                type: that.i18n.goodsList.price,
                text: ""
              };
              res.filter_price.map(item => {
                let startPriceIndex = item.href.indexOf("start_price");
                let start = item.href.substring(startPriceIndex);
                let startData = start.split("&")[0];
                let endData = start.split("&")[1];
                item.startPrice = startData.split("=")[1];
                item.endPrice = endData.split("=")[1];
                item.select = false;
                if (query.start_price && query.end_price) {
                  if (
                    item.startPrice == query.start_price &&
                    item.endPrice == query.end_price
                  ) {
                    item.select = true;
                  } else {
                    this.start_price = query.start_price;
                    this.end_price = query.end_price;
                  }
                  params.text = query.start_price;
                  params.text = params.text.concat("-", query.end_price);
                }
              });
              if (query.start_price && query.end_price) {
                this.filterData.push(params);
              }
            }
            this.type[0].clickType = res.orderby_default; //默认
            this.type[1].clickType = res.orderby_sales_sum; //销量
            this.type[2].clickType = res.orderby_price; //价格
            this.type[3].clickType = res.orderby_comment_count; //评论
            this.type[4].clickType = res.orderby_is_new; //新品
            this.goodsFilter = res;
            let hash = [];
            this.goodsFilter.filter_brand = this.goodsFilter.filter_brand.reduce(
              function(arr, current) {
                hash[current.brand_ids]
                  ? ""
                  : (hash[current.brand_ids] = true && arr.push(current));
                return arr;
              },
              []
            );
          });
        })
        .then(() => {
          //商品热搜
          let params = {
            is_hot: 1
          };
          if (this.query.cat_id) {
            params.cat_id = this.query.cat_id;
          } else if (this.query.words) {
            params.words = this.query.words;
          } else if (this.query.brand_ids) {
            params.brand_ids = this.query.brand_ids;
          } else if (this.query.cat_id1) {
            params.cat_id1 = this.query.cat_id1;
          }
          getGoodsList(params).then(res => {
            this.hotGoods = res.records;
          });
        })
        .then(() => {
          //推荐商品
          let params = {
            is_recommend: 1
            // cat_id: this.query.cat_id
          };
          if (this.query.cat_id) {
            params.cat_id = this.query.cat_id;
          } else if (this.query.words) {
            params.words = this.query.words;
          } else if (this.query.brand_ids) {
            params.brand_ids = this.query.brand_ids;
          } else if (this.query.cat_id1) {
            params.cat_id1 = this.query.cat_id1;
          }
          getGoodsList(params).then(res => {
            this.recommendGoods = res.records;
          });
        })
        .then(() => {
          let params = new Object();
          if (this.$route.query.cat_id) {
            params.id = this.$route.query.cat_id;
          } else if (this.$route.query.brand_ids) {
            params.id = this.goodsData[0].cat_id3;
          }
          getGoodsId(params)
            .then(res => {
              if (res.length > 0) {
                this.parent_ids = res[0].parent_ids;
                this.firstId = res[0].parent_ids[0];
                this.secondId = res[0].parent_ids[1];
                return res[0].parent_ids[0];
              }
            })
            .then(id => {
              //获取第二级 参数
              let params = {
                parent_id: id
              };
              getGoodsId(params)
                .then(res => {
                  if (res.length > 0) {
                    res.map(item => {
                      this.parent_ids.map(v => {
                        if (item.id == v) {
                          this.firstArr.select = item;
                        }
                      });
                    });
                    this.firstArr.data = res;
                  }
                })
                .then(() => {
                  let params = {
                    parent_id: this.parent_ids[1]
                  };
                  getGoodsId(params).then(res => {
                    if (res.length > 0) {
                      res.map(item => {
                        if (
                          item.id ==
                          (this.query.cat_id || this.goodsData[0].cat_id3)
                        ) {
                          this.secondArr.select = item;
                        }
                      });
                      this.secondArr.data = res;
                      return res[0].parent_id;
                    }
                  });
                })
                .then(() => {
                  getGoodsFirstId({
                    id: this.firstId
                  }).then(res => {
                    this.firstData = res;
                  });
                });
            });
        });
    },
    //多选
    moreSelect(e, index) {
      let type = e;
      let idx = index;
      if (type == "brand") {
        //品牌
        this.isMore = true;
      }
      if (type == "attr") {
        this.isMore = false;
        if (this.goodsFilter.filter_attr.length > 0) {
          this.goodsFilter.filter_attr[idx].isMore = true;
          this.goodsFilter.filter_attr.map((item, index) => {
            if (index != idx) {
              item.isMore = false;
            }
          });
        }
      }
    },
    // 取消
    cancel(e, index) {
      let type = e;
      let idx = index;
      if (type == "brand") {
        //品牌
        this.isMore = false;
      }
      if (type == "attr") {
        this.isMore = false;
        if (this.goodsFilter.filter_attr.length > 0) {
          this.goodsFilter.filter_attr[idx].isMore = true;
          this.goodsFilter.filter_attr[idx].showLenght = 1;
          this.goodsFilter.filter_attr[idx].isMore = false;
          this.goodsFilter.filter_attr[idx].packUp = false;
        }
      }
    },
    // 确定
    determine(e, index) {
      let type = e;
      let idx = index;
      let query = this.$route.query;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      if (newQuery.p) {
        newQuery.p = 1;
      }
      if (type == "brand") {
        //品牌
        this.isMore = false;
        // newQuery.brand_ids=
        let arr = [];
        if (this.goodsFilter.filter_brand.length > 0) {
          this.goodsFilter.filter_brand.map((item, index) => {
            if (this.goodsFilter.filter_brand[index].select) {
              arr.push(this.goodsFilter.filter_brand[index].brand_ids);
            }
          });
          arr = arr.join(",");
          newQuery.brand_ids = arr;
        }
      }
      if (type == "attr") {
        this.isMore = false;
        if (this.goodsFilter.filter_attr.length > 0) {
          // this.goodsFilter.filter_attr[idx].isMore=true;
          this.goodsFilter.filter_attr[idx].showLenght = 1;
          this.goodsFilter.filter_attr[idx].isMore = false;
          this.goodsFilter.filter_attr[idx].packUp = false;

          let hrefArr = new Array();
          let str = this.goodsFilter.filter_attr[idx].typeNum;
          let itemData = this.goodsFilter.filter_attr[idx];
          let strData = new String();
          itemData.item.map(item => {
            if (item.select) {
              strData = strData.concat("_", item.typeText);
            }
          });
          if (newQuery.attr) {
            str = str.concat(strData);
            if (newQuery.attr.indexOf(str) == -1) {
              newQuery.attr = newQuery.attr.concat("@", str);
            }
          } else {
            newQuery.attr = str.concat(strData);
          }
        }
      }
      if (type == "price") {
      }
      this.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
    },
    // 勾选多个商品属性
    selectAttr(e, index, idx, url) {
      let type = e;
      let query = this.$route.query;
      let newQuery = JSON.parse(JSON.stringify(query));
      if (newQuery.p) {
        newQuery.p = 1;
      }
      if (type == "brand") {
        //品牌
        if (this.isMore) {
          this.goodsFilter.filter_brand[index].select = true;
        } else {
          let strIndex = url.indexOf("brand_ids");
          let data = url.substring(strIndex);
          data = data.split("=")[1];
          newQuery.brand_ids = data;
        }
      }
      if (type == "attr") {
        if (this.goodsFilter.filter_attr[index].isMore) {
          if (!this.goodsFilter.filter_attr[index].item[idx].select) {
            this.goodsFilter.filter_attr[index].item[idx].select = true;
          }
        } else {
          if (!this.goodsFilter.filter_attr[index].item[idx].select) {
            let strIndex = url.indexOf("attr");
            let data = url.substring(strIndex);
            data = data.split("=")[1];
            let str = "@";
            if (newQuery.attr) {
              let oldData = newQuery.attr;
              data = str.concat(data);
              newQuery.attr = oldData.concat(data);
            } else {
              newQuery.attr = data;
            }
          }
        }
      }
      if (type == "price") {
        this.goodsFilter.filter_price[index].select = true;
        newQuery.start_price = this.goodsFilter.filter_price[index].startPrice;
        newQuery.end_price = this.goodsFilter.filter_price[index].endPrice;
      }
      this.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
    },
    // 更多
    moreShow(e, index) {
      let type = e;

      let idx = index;

      if (type == "brand") {
        //品牌
        this.brandNum = this.goodsFilter.filter_brand.length;
      }
      if (type == "attr") {
        if (this.goodsFilter.filter_attr.length > 0) {
          this.goodsFilter.filter_attr[
            idx
          ].showLenght = this.goodsFilter.filter_attr[idx].item.length;
          this.goodsFilter.filter_attr[idx].isMore = true;
          this.goodsFilter.filter_attr[idx].packUp = true;
        }
      }
    },
    tabChange(e, id) {
      //导航栏点击
      let that = this;
      let query = that.$route.query;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      if (newQuery.p) {
        newQuery.p = 1;
      }
      that.type.map(item => {
        if (id == item.id) {
          if (query.order_by != item.order_by || !query.order_by) {
            newQuery.order_by = item.order_by;
          }
        }
        if (id == 2) {
          //价格
          if (item.sort == "desc") {
            newQuery.sort = "asc";
            item.sort = "asc";
          } else {
            newQuery.sort = "desc";
            item.sort = "desc";
          }
        }
      });
      that.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
      // let data=e.split("&");
      // let arr=new Array();
      // data.map(item=>{
      //   let a= item.split("=");
      // })
    },
    getGuessYouLikeGoods() {
      getGuessYouLike().then(res => {
        this.guessYoulikeGoodsList = res.records;
        this.favourite();
      });
    },
    getLikeGoods() {
      getGoodsList().then(res => {
        this.guessYoulikeGoodsList = res.records;
        this.favourite();
      });
    },
    submit() {
      //价格确定
      let that = this;
      let query = that.$route.query;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      if (newQuery.p) {
        newQuery.p = 1;
      }
      newQuery.start_price = this.start_price;
      newQuery.end_price = this.end_price;
      that.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
    },
    // 切换大小图
    changnBigPic(index, idx) {
      this.goodsData[index].original_img = this.goodsData[index].goodsImg[
        idx
      ].image_url;
      this.goodsData[index].selectImg = idx;
    },
    // 收起
    moreHide(e, index) {
      let type = e;
      let idx = index;
      if (type == "brand") {
        //品牌
        this.brandNum = 11;
      }
      if (type == "attr") {
        if (this.goodsFilter.filter_attr.length > 0) {
          this.goodsFilter.filter_attr[idx].showLenght = 1;
          this.goodsFilter.filter_attr[idx].isMore = false;
          this.goodsFilter.filter_attr[idx].packUp = false;
        }
      }
    },
    selectGoods(index) {
      //筛选
      let that = this;
      let query = that.$route.query;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      for (let i = 0; i < that.selectType.length; i++) {
        that.selectType[i].select = false;
      }
      if (that.selectType[index].select) {
        that.selectType[index].select = false;

        delete newQuery[that.selectType[index].type];
      } else {
        if (index != 2) {
          newQuery[that.selectType[index].type] = 1;
        } else {
          newQuery[that.selectType[index].type] = 3;
        }

        that.selectType[index].select = true;
      }
      if (newQuery.p) {
        newQuery.p = 1;
      }
      let params = {}
      if (newQuery.is_recommend) {
        //推荐好货
        params.is_recommend = newQuery.is_recommend
        that.getGoodsList(params)
      } else if (newQuery.is_has_count) {
        //显示有货
        params.is_has_count = true
        that.getGoodsList(params)
      } else if (newQuery.prom_type) {
        //优惠促销
        params.prom_type = 3
        that.getGoodsList(params)
      }
      
      // let params = {}
      // that.getGoodsList(params)
      // that.$router.push({
      //   name: 'goods-goodsList-id',
      //   query: newQuery
      // });
    },
    changeData(id) {
      let query = this.$route.query;
      let newQuery = JSON.parse(JSON.stringify(query));
      if (newQuery.p) {
        newQuery.p = 1;
      }
      newQuery.cat_id = id;
      this.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
      console.log("跳转")
    },
    clearFilter(e) {
      //清空筛选条件
      let query = this.$route.query;
      let newQuery = JSON.parse(JSON.stringify(query));
      if (newQuery.p) {
        newQuery.p = 1;
      }
      if (e == "price") {
        delete newQuery.start_price;
        delete newQuery.end_price;
      } else if (e == "brand_ids") {
        delete newQuery.brand_ids;
      }

      this.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
    },
    clearAllFilter() {
      let query = this.$route.query;
      let newQuery = JSON.parse(JSON.stringify(query));
      if (newQuery.p) {
        newQuery.p = 1;
      }
      for (let key in newQuery) {
        if (key != "cat_id") {
          delete newQuery[key];
        }
      }
      this.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
    },
    handleCurrentChange(e) {
      this.pageData.page = e;
      let query = this.$route.query;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      newQuery.p = e;
      this.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
    },
    handleSizeChange(e) {
      this.pageData.size = e;
      let query = this.$route.query;
      //对象的拷贝
      let newQuery = JSON.parse(JSON.stringify(query));
      newQuery.size = e;
      this.$router.push({
        name: 'goods-goodsList-id',
        query: newQuery
      });
    },
    next() {
      //下一页
      if (this.query.p < this.pages || !this.query.p) {
        let query = this.$route.query;
        //对象的拷贝
        let newQuery = JSON.parse(JSON.stringify(query));
        // 地址栏的参数值赋值
        if (newQuery.p) {
          newQuery.p++;
        } else {
          newQuery.p = 2;
        }
        // newQuery.id = val;
        this.$router.push({
          name: 'goods-goodsList-id',
          query: newQuery
        });
      }
    },
    prev() {
      //上一页
      if (this.query.p > 1 || this.query.p) {
        let query = this.$route.query;
        let newQuery = JSON.parse(JSON.stringify(query));
        if (newQuery.p) {
          newQuery.p--;
        }
        this.$router.push({
          name: 'goods-goodsList-id',
          query: newQuery
        });
      }
    },
    favourite() {
      this.replace();
    },
    replace() {
      //随机数
      var a = [];
      var j = 0;
      while (j < 7) {
        var b = Math.floor(Math.random() * this.guessYoulikeGoodsList.length);
        if (a.indexOf(b) == -1) {
          a.push(b);
          j++;
        }
      }
      this.arr = a;
    },
    goods_add(e) {
      //函数加
      this.goodsData[e].num++;
    },
    goods_cut(e) {
      //减
      if (this.goodsData[e].num == 1) {
        return;
      } else {
        this.goodsData[e].num--;
      }
	},
	
    addCart(e) {
      ga('send', 'event', 'ecommerce', 'add product to cart');
    //加入购物车
      let ItemId = this.goodsData[e].item_id || 0;
      let goods_id = this.goodsData[e].goods_id;
      let goods_num = this.goodsData[e].num;
      let params = {
        item_id: ItemId,
        goods_id: goods_id, //商品id
        goods_num: goods_num //商品数量
    };
		getGoodsFreight({
			goods_id: goods_id,
			goods_num: goods_num,
			region_id: this.sit_id
		}).then((res) => {
			if(!res.status){
				/*多规格商品跳转到商品详情去选择规格*/ 
				getSpecPrice({goods_id:goods_id}).then(res=>{
					return res;	
				}).then(res=>{
					if(res.length > 0) {
						this.$router.push({
						name: "goodsInfo",
						query: {
							id: goods_id
						}
						});
					}else {
						/*用户信息不为空的时候（登录状态下）直接加入购物车 未登录状态下加入购物车*/
						if (getUser() != null) {
							addCart(params).then(res => {
							if (res.status == 1) {
								this.visible = true;
								this.$refs.addcart.getGoods();
								bus.$emit("getBill");
							} else {
								this.$router.push({
								name: "goodsInfo",
								query: {
									id: goods_id
								}
								});
							}
							});
							return false;
						}
						/*检测能否加入购物车 （未登录下）*/ 
						getCartUnlisted(params).then(res=>{
							if(res.status == 1) {
								let storeageData = common.getSessionData("shopCartList");
								if (storeageData == null) {
									let arr = new Array();
									arr.push(params);
									this.visible = true;
									common.setSessionData("shopCartList", arr);
									bus.$emit("getBill");
									// this.$router.push({name: "login"})
									return false;
								}
								let index = null;
								storeageData.forEach((item, i) => {
									if (
									item.goods_id == params.goods_id &&
									item.item_id == params.item_id
									) {
									index = i;
									this.visible = true;
									return index;
									}
								});
								if (index != null) {
									storeageData[index].goods_num =
									storeageData[index].goods_num + params.goods_num;
								} else {
									storeageData.push(params);
								}
								this.visible = true;
								common.setSessionData("shopCartList", storeageData);
								bus.$emit("getBill");
								/*加入到购物车就跳转到登录页*/
								// this.$router.push({name: "login"})
							}
						})
				
					}
				})
			}else{
				this.$message({
					message: '该地区不支持配送',
					type: 'error'
				})
			}
		})
	  
	
      
      
	},
    Hide(e) {
      this.visible = e;
    },
    changeNum(e) {
      let index = e.srcElement.dataset.index;
      this.goodsData[index].num = e.target.value;
    }
  }
};
</script>

<style scoped>
.red_hov_cli {
  color: #e23435;
}

.ri-section .lf-list .brand-box .red_hov_cli {
  border-color: #e23435;
}

.nodata {
  text-align: center;
  height: 50px;
  line-height: 50px;
}

.ri-section .lr-more input[type="number"] {
  width: 40px;
  height: 22px;
  text-align: center;
  border: 1px solid #eee;
  outline: none;
}
.min-show {
  max-height: 99px;
  overflow: hidden;
}
</style>

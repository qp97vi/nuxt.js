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
  <div data-v-2648786f class="nav-middan-z p home-index-head">
    <div data-v-2648786f class="header w1224">
      <div data-v-2648786f class="ecsc-logo">
        <nuxt-link :to="{ name: 'index' }" class="logo">
          <img 
		   v-if="$store.state.shop_config" 
		   :src="apiHead+$store.state.shop_config.store_logo||imgUrl"
		   style="max-width: 194px; max-height: 70px;" />
		  
        </nuxt-link>
      </div>
      <div data-v-2648786f class="m-index">
        <nuxt-link :to="{ name: 'user' }" class="index">{{
          i18n.TopInfo.mymall
        }}</nuxt-link>
        <nuxt-link :to="{ name: 'index' }" class="home">{{
          i18n.TopInfo.return_shophome
        }}</nuxt-link>
      </div>
      <div data-v-2648786f class="m-navitems">
        <ul data-v-2648786f class="fixed p">
          <li data-v-2648786f>
            <nuxt-link :to="{ name: 'index' }">{{
              i18n.TopInfo.home_page
            }}</nuxt-link>
          </li>
          <li data-v-2648786f>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ i18n.TopInfo.account_setting }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in accountSetting"
                  :key="item.id"
                  :command="item"
                  >{{ item.command }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li data-v-2648786f class="u-msg">
            <nuxt-link :to="{ name: 'message_notice' }">
              {{ i18n.TopInfo.news }}
              <span data-v-2648786f>{{ newsNub }}</span>
            </nuxt-link>
          </li>
          <li data-v-2648786f>
            <nuxt-link :to="{ name: 'integralMall' }">{{
              i18n.TopInfo.integral
            }}</nuxt-link>
          </li>
          <li data-v-2648786f class="search_li">
            <form data-v-2648786f>
              <input
                type="text"
                v-model="words"
                class="search_usercenter_text"
              />
              <a class="search_usercenter_btn" @click="search()">{{
                i18n.TopInfo.seek
              }}</a>
            </form>
          </li>
        </ul>
      </div>
      <div data-v-2648786f class="shopingcar-index fr">
        <div data-v-2648786f id="hd-my-cart" class="u-g-cart fr fixed">
          <nuxt-link :to="{ name: 'cart' }">
            <p data-v-2648786f class="c-n fl">{{ i18n.TopInfo.mycart }}</p>
            <p data-v-2648786f class="c-num fl">
              <span data-v-2648786f id="cart_quantity" class="count cart_quantity">({{ cartBill.goods_num }})</span>
              <i data-v-2648786f class="i-c oh"></i>
            </p>
          </nuxt-link>
          <div data-v-2648786f id="show_minicart" class="u-fn-cart u-mn-cart">
            <!--有商品时-s-->
            <div class="mn-c-m oh" v-if="cartBill.store_cart_list.length > 0">
              <div
                v-for="(store_cart,
                store_cart_index) in cartBill.store_cart_list"
                :key="store_cart_index"
              >
                <div
                  class="mn-c-box J-sdb-cb js_cart_top"
                  v-for="(item, index) in store_cart.cart_list"
                  :key="index"
                >
                  <dl class="c-store mb15">
                    <dt class="c-store-tt fixed">
                      <a href="#" class="n fl">{{
                        item.add_time | datefmtAll
                      }}</a>
                    </dt>
                    <dd class="c-list">
                      <div class="c-prod">
                        <div class="c-item fixed js_cart_pro_list">
                          <a
                            href="javascript:void(0);"
                            class="del js_delete"
                          ></a>

                          <p class="i fl mr5">
                            <nuxt-link
                              :to="{
                                name: 'goods/goodsInfo/id',
                                query: { id: item.goods_id },
                              }"
                            >
                              <img
                                :src="
                                  apiHead +
                                    '/mall/goods/thumb_image?width=50&height=50&goods_id=' +
                                    item.goods_id
                                "
                                height="50"
                                width="50"
                                alt
                                :title="item.goods_name"
                              />
                            </nuxt-link>
                          </p>

                          <p class="n fl">
                            <nuxt-link
                              :to="{
                                name: 'goods/goodsInfo/id',
                                query: { id: item.goods_id },
                              }"
                            >
                              {{ item.goods_name }}
                              {{ item.spec_key_name }}</nuxt-link
                            >
                          </p>

                          <p class="fl js_mini_num">
                            * {{ item.goods_num }} 件
                          </p>
                          <p class="p fr mt5">
                            <em>{{ i18nCommon.symbol }}</em>
                            <span>{{ item.member_goods_price }}</span>
                          </p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mn-c-total">
                <div class="c-t fixed">
                  <p class="t-n fl">
                    <span>{{ cartBill.goods_num }}</span
                    >{{ i18n.TopInfo.piece }}
                  </p>
                  <p class="t-p fr">
                    <em>{{ i18nCommon.symbol }}</em>
                    <span>{{ cartBill.goods_price }}</span>
                  </p>
                </div>
                <div class="c-btn">
                  <nuxt-link :to="{ name: 'cart' }"
                    >{{ i18n.TopInfo.goshopping_cart }} &gt;&gt;</nuxt-link
                  >
                </div>
              </div>
            </div>
            <!-- 没有商品时 -->
            <div data-v-2648786f class="empty-c" v-else>
              <span data-v-2648786f class="ma">
                <i data-v-2648786f class="c-i oh"></i
                >{{ i18n.TopInfo.noitems }}~
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNews, getCartBill } from "@/utils/api.js";
import { getUser } from "@/utils/auth.js";
import {mapState} from "vuex";
export default {
  data() {
    return {
      newsNub: "", //消息数量
      accountSetting: [
        {
          command: "个人信息",
          name: "info",
          id: 1,
        },
        {
          command: "安全设置",
          name: "safety_settings",
          id: 2,
        },
        {
          command: "收货地址",
          name: "address_list",
          id: 3,
        },
      ],
      cartBill: {
        //购物车列表
        order: {},
        store_cart_list: [], //
        goods_num: 0,
        goods_price: 0,
      },
      user: getUser(),
      words: "",
    };
  },
  mounted() {
    if (this.user == null) {
      //没有登录状态
    } else {
      //登录状态下
      this.getBill();
    }
    // this.getBill();
	console.log(this.shop_basic,this.shop_config)
  },
  computed: {
	...mapState(['shop_config','shop_basic']),
    i18n() {
      this.accountSetting = [
        {
          command: this.$t("components.TopInfo.info"),
          name: "info",
          id: 1,
        },
        {
          command: this.$t("components.TopInfo.safety_settings"),
          name: "safety_settings",
          id: 2,
        },
        {
          command: this.$t("components.TopInfo.address_list"),
          name: "address_list",
          id: 3,
        },
      ];
      return this.$t("components");
    },
    i18nCommon() {
      return this.$t("common");
    },
  },
  methods: {
    handleCommand(command) {
      this.$router.push({
        name: command.name,
      });
    },
    news() {
      getNews().then((res) => {
        if (res.status != 0) {
          this.newsNub = res;
        }
      });
    },
    getBill() {
      var that = this;
      getCartBill({}).then(function(res) {
        that.cartBill = res;
        that.cartBill.goods_num = 0;
        that.cartBill.goods_price = 0;
        for (
          var storeIndex = 0;
          storeIndex < that.cartBill.store_cart_list.length;
          storeIndex++
        ) {
          for (
            var cartIndex = 0;
            cartIndex <
            that.cartBill.store_cart_list[storeIndex].cart_list.length;
            cartIndex++
          ) {
            that.cartBill.goods_num =
              that.cartBill.goods_num +
              that.cartBill.store_cart_list[storeIndex].cart_list[cartIndex]
                .goods_num;
            that.cartBill.goods_price =
              that.cartBill.goods_price +
              that.cartBill.store_cart_list[storeIndex].cart_list[cartIndex]
                .total_fee;
            that.cartBill.goods_price = parseFloat(that.cartBill.goods_price).toFixed(2);
          }
        }
      });
    },
    search() {
      var that = this;
      that.$router.push({
        name: "goodsList",
        query: { words: that.words, searchType: 1 },
      });
    },
  },
  created() {
    this.news();
  },
};
</script>

<style scoped>
@import "../../static/css/myaccount.css";

.mn-c-m {
  overflow-y: auto;
}

.header {
  background-color: #e23435;
  /* overflow: hidden; */
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

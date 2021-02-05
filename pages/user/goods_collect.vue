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
        <h1>{{i18n.goods_collect.myfavorite}}</h1>
      </div>
      <div class="time-sala ma-to-20">
        <ul>
          <li :class="tabBool ? 'red' :'mal-l'" style="margin-left: 0px;">
            <span @click="tabCut(1)" class="shou">{{i18n.goods_collect.goods_collection}}</span>
          </li>
          <li :class="tabBool ? 'mal-l' :'red'">
            <span @click="tabCut(2)" class="shou">{{i18n.goods_collect.collection}}</span>
          </li>
        </ul>
      </div>
      <div class="he"></div>
      <!-- 商品收藏 -->
      <div class="goodscollection" v-if="tabBool">
        <div class="collec_list">
          <ul>
            <li class="bg-dar">
              <a href="javascript:void(0);">{{i18n.goods_collect.goods_collection}}</a>
            </li>
            <li>
              <span @click="goodsCollection">{{i18n.goods_collect.complete}}（{{total}}）</span>
            </li>
          </ul>
          <ul>
            <li class="bg-dar">
              <a href="javascript:void(0);">{{i18n.goods_collect.selling}}</a>
            </li>
            <li>
              <span @click="activitiesGoods">{{i18n.goods_collect.complete}}（{{promtotal}}）</span>
            </li>
          </ul>
        </div>
        <div class="orderbook-list sc_collect">
          <div class="book-tit">
            <ul>
              <li class="sx2" style="height:1px;">&nbsp;</li>
              <li class="sx1">{{i18n.goods_collect.commodity}}</li>
              <li class="sx3">{{i18n.goods_collect.unit_price}}</li>
              <li class="sx4">{{i18n.goods_collect.inventory}}</li>
              <li class="sx5">{{i18n.goods_collect.operate}}</li>
            </ul>
          </div>
        </div>
        <div v-if="bool">
          <div class="sc_collect book-tit shop-listanadd">
            <ul v-for="(item,index) in goodsRecordData" :key="item.collect_id">
              <li class="sx2">
                <input
                  class="checkall_annt"
                  type="checkbox"
                  name="selected[]"
                  v-model="item.bool"
                  @change="multipleChoice()"
                />&nbsp;&nbsp;
              </li>
              <li class="sx1">
                <div class="shop-if-dif texle">
                  <div class="shop-difimg">
                    <img :src="item.original_img" width="100" height="100" />
                  </div>
                  <div class="shop_name">
                    <router-link
                      :to="{name:'goodsInfo',query:{id:item.goods_id}}"
                    >{{item.goods_name}}</router-link>
                  </div>
                </div>
              </li>
              <li class="sx3">
                <span>
                  <em>{{i18nCommon.symbol}}</em>
                  {{item.shop_price.toFixed(2)}}
                </span>
              </li>
              <li class="sx4">
                <span>{{item.store_count}}</span>
              </li>
              <li class="sx5">
                <div class="adhscar">
                  <router-link :to="{ name: 'goodsInfo',query:{id:item.goods_id}}">{{i18n.goods_collect.view_details}}</router-link>
                  <br />
                  <span class="dele_g" @click="removeCollect(item,index)">{{i18n.goods_collect.delete}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="all_pluscar p">
            <div class="sx2">
              <!-- <input
                class="checkall_annt"
                onclick="$('input[name*=\'selected\']').prop('checked', this.checked);"
                type="checkbox"
                id="all2"
              />-->
              <span @change="checkAll">
                <input type="checkbox" v-model="selectAll" />
                {{i18n.goods_collect.check_all}}
              </span>
              <!-- <label for="all2">全选</label> -->
            </div>
            <div class="addcar_plus">
              <a class="add_p_shop" href="javascript:;" style="display:none">{{i18n.goods_collect.add_shopping_cart}}</a>
              <span class="dele_p_shop" @click="del_all()">{{i18n.goods_collect.delete}}</span>
              <!-- <a class="dele_p_shop" href="javascript:;" onclick="del_all();">删除</a> -->
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
        <div class="sc_collect book-tit shop-listanadd" v-else>
          <p class="ncyekjl">--{{i18n.goods_collect.norecord}}--</p>
        </div>
      </div>
      <!-- 店铺收藏 -->
      <div class="shopcollect flow" v-else>
        <div class="cate_attr clearfix">
          <div class="nav-tag">
            <h5 class="filter-label-ab">{{i18n.goods_collect.classify}}</h5>
            <div class="cate_attr_con">
              <div class="filter-all-ab">
                <span :class="scid==='' ? 'selected':''" @click="tabShop('')">
                  <span>{{i18n.goods_collect.complete}}</span>
                </span>
              </div>
              <div class="district-tab">
                <span
                  :class="scid==item.sc_id ? 'selected':''"
                  v-for="(item) in shopData"
                  :key="item.sc_id"
                  @click="tabShop(item.sc_id)"
                >
                  <span>{{item.sc_name}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flow-wrap" v-if="shopBool">
          <div
            class="flow-item first"
            id="del_store_154"
            v-for="(item,index) in shopCollectData"
            :key="item.log_id"
          >
          <router-link :title="item.store_name" class="flow-datu" :to="{name:'store',query:{store_id:item.store_id}}">
              <img :title="item.store_name" width="150" height="150" alt :src="item.store_avatar" />
            <!-- </a> -->
          </router-link>
            <div class="flow-content">
              <h4 class="flow-title">
                <router-link :to="{name:'store',query:{store_id:item.store_id}}">
                  <span class="cutout">{{item.store_name}}</span>
                </router-link>
                <span class="guanzhu" @click="cancelCollect(item,index);">{{i18n.goods_collect.cancel}}</span>
              </h4>
              <p class="flow-logo" style="overflow: hidden;">
                <router-link :to="{name:'store',query:{store_id:item.store_id}}">
                  <img id="j_logo_5" alt width="90" height="45" :src="item.store_logo" />
                </router-link>
              </p>
              <!-- <p class="flow-desc">
                <span>{{i18n.goods_collect.seller}}：</span>
                <a href :title="i18n.goods_collect.send_mailman" target="_blank"></a>
                <a
                  :href="'http://wpa.qq.com/msgrd?v=3&amp;uin=' + item.store.store_qq + '&amp;site=qq&amp;menu=yes'"
                  target="_blank"
                  :alt="i18n.goods_collect.contact_here"
                  :title="i18n.goods_collect.contact_here"
                  class="flow-qq"
                >
                  <img src="../../static/images/button_old_41.gif" height="16" border="0" alt="QQ" />
                </a>
                <a
                  :href="'http://amos1.taobao.com/msg.ww?v=2&amp;uid=' + item.store.store_phone + '13800138006&amp;s=2'"
                  target="_blank"
                  class="flow-qq"
                >
                  <img
                    src="../../static/images/wangwang16.gif"
                    width="16"
                    height="16"
                    border="0"
                    :alt="i18n.goods_collect.liangejun"
                  />
                </a>
              </p> -->
              <p class="flow-desc">
                <span>{{i18n.goods_collect.location}}：</span>
                {{item.store.store_address}}
              </p>
              <p class="flow-desc">
                  <router-link :title="i18n.goods_collect.view_product" :to="{name:'store',query:{store_id:item.store_id}}">
                  {{i18n.goods_collect.common}}
                  <strong>{{item.store.store_collect}}</strong>{{i18n.goods_collect.ababy}}&gt;&gt;
                  </router-link>
              </p>
            </div>
            <div class="flow-score">
              <h3>{{i18n.goods_collect.dsr}}</h3>
              <p>
                {{i18n.goods_collect.description_consistent}}：
                <span>{{item.store.store_desccredit}}</span>
              </p>
              <p>
                {{i18n.goods_collect.service_attitude}}：
                <span>{{item.store.store_servicecredit}}</span>
              </p>
              <p>
                {{i18n.goods_collect.delivery_speed}}：
                <span>{{item.store.store_deliverycredit}}</span>
              </p>
            </div>
            <div class="flow-main flow-main1">
              <div class="picMarquee-left">
                <div class="bda">
                  <div class="picListta">
                    <ul>
                      <li v-for="goods in item.goods_list" :key="goods.goods_id">
                         <router-link
                          :to="{name:'goodsInfo',query:{id:goods.goods_id}}"
                          :title="goods.goods_name"
                          target="_blank"
                          class="img"
                         >
                          <img
                            :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + goods.goods_id"
                          />
                          <span>{{i18nCommon.symbol}}{{goods.shop_price}}</span>
                          </router-link>
                         <router-link
                          :to="{name:'goodsInfo',query:{id:goods.goods_id}}"
                          :title="goods.goods_name"
                          target="_blank"
                          class="name"
                         >
                        {{goods.goods_name}}
                         </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mui-page">
            <div class="mui-page-wrap">
              <div class="dataTables_paginate paging_simple_numbers">
                <ul class="pagination"></ul>
              </div>
            </div>
          </div>
        </div>
        <div class="flow-wrap" v-else>
          <p class="ncyekjl">--{{i18n.goods_collect.norecord}}--</p>
          <div class="mui-page">
            <div class="mui-page-wrap"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  collectionRecords,
  removeGoodsCollection,
  getShopCollect,
  getStoreClassify,
  storeCancelCollection,
} from "@/utils/api.js";
export default {
  data() {
    return {
      bool: true,
      tabBool: true, //收藏切换
      goodsRecordData: [], //商品收藏数据
      selectAll: false, //全选
      total: 0, //商品收藏数量
      promtotal: 0, //活动商品数量
      shopCollectData: [], //店铺收藏数据
      shopBool: true, //店铺是否有数据
      shopData: [], //店铺分类数据
      scid: "", // 类名切换
      is_prom: false, //商品类型
      // userInfo:getUser(), //个人用户信息
    };
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
    //取消收藏店铺
    cancelCollect(item) {
      var _this = this;
      this.$confirm(_this.i18n.goods_collect.confirm_collect, _this.i18n.message, {
        confirmButtonText: _this.i18n.confirm,
        cancelButtonText: _this.i18n.cancel,
        type: "warning",
      })
        .then(() => {
          storeCancelCollection(item.store_id).then((res) => {
            var argu = {};
            if (res.status == 1) {
              _this.shopCollect();
              argu = {
                showClose: true,
                message: res.msg,
                type: "success",
              };
            } else {
              argu = {
                showClose: true,
                message:_this.i18n.goods_collect.failed  + res.msg,
                type: "error",
              };
            }
            _this.$message(argu);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: _this.i18n.undeleted,
          });
        });
    },
    // 店铺切换
    tabShop(id) {
      this.scid = id;
      this.shopCollect();
    },
    //商品收藏
    goodsCollection() {
      (this.type = ""), this.myCollect();
    },
    //活动商品
    activitiesGoods() {
      this.is_prom = true;
      var data = {
        is_prom: true,
      };
      this.myCollect(data);
    },
    //反选
    multipleChoice() {
      for (var i = 0; i < this.goodsRecordData.length; i++) {
        if (!this.goodsRecordData[i].bool) {
          this.selectAll = false;
          return;
        }
        this.selectAll = true;
      }
    },
    //全选
    checkAll() {
      for (var i = 0; i < this.goodsRecordData.length; i++) {
        this.goodsRecordData[i].bool = this.selectAll;
      }
    },
    //选择删除
    del_all() {
      var params = "";
      var _this = this;
      for (var i = 0; i < this.goodsRecordData.length; i++) {
        if (this.goodsRecordData[i].bool) {
          params += this.goodsRecordData[i].goods_id + ",";
        }
      }
      params = params.substr(0, params.length - 1);
      removeGoodsCollection(params).then((res) => {
        var argu = {};
        if (res.status == 1) {
          // that.footprintData.splice(index,1)
          _this.myCollect();
          _this.promCollect()
          argu = {
            showClose: true,
            message: res.msg,
            type: "success",
          };
        } else {
          argu = {
            showClose: true,
            message: _this.i18n.fail_delete + res.msg,
            type: "error",
          };
        }
        _this.$message(argu);
      });
    },
    //删除商品收藏
    removeCollect(item) {
      var _this = this;
      removeGoodsCollection(item.goods_id).then((res) => {
        var argu = {};
        if (res.status == 1) {
          // _this.goodsRecordData.splice(index, 1);
          var data = {
            is_prom: _this.is_prom,
          };
          this.myCollect(data);
          argu = {
            showClose: true,
            message: res.msg,
            type: "success",
          };
        } else {
          argu = {
            showClose: true,
            message: _this.i18n.fail_delete + res.msg,
            type: "error",
          };
        }
        _this.$message(argu);
      });
    },
    //隐藏，显示
    tabCut(i) {
      if (i == 1) {
        this.tabBool = true;
      } else {
        this.tabBool = false;
      }
    },
    //店铺收藏
    shopCollect() {
      var data = {
        sc_id: this.scid,
      };
      getShopCollect(data).then((res) => {
        if (res.records.length > 0) {
          this.shopBool = true;
        } else {
          this.shopBool = false;
        }
        this.shopCollectData = res.records;
      });
    },
    //我的收藏
    myCollect(data) {
      collectionRecords(data).then((res) => {
        if (res.records.length > 0) {
          this.bool = true;
          var stu = [];
          res.records.map((item) => {
            stu.push({ ...item, bool: false });
          });
          if (data == undefined) {
            this.total = res.total;
          } else {
            if (!data.is_prom) {
              this.total = res.total;
            }
          }
          this.goodsRecordData = stu;
        } else {
          this.bool = false;
        }
      });
    },
    //活动商品
    promCollect() {
      var data = {
        is_prom: true,
      };
      collectionRecords(data).then((res) => {
        this.promtotal = res.total;
      });
    },
    //店铺收藏分类
    shopCollection() {
      getStoreClassify().then((res) => {
        this.shopData = res;
      });
    },
  },
  created() {
    this.shopCollection();
    this.shopCollect();
    this.myCollect();
    this.promCollect();
    this.tabBool = this.$route.query.tabBool
  },
  components: {},
};
</script>

<style scoped>
@import "../../static/css/bookmark.css";
@import "../../static/css/myaccount.css";
.flow {
  margin: 0px;
}
.cate_attr_con {
  margin-top: 3px;
}
.shou {
  cursor: pointer;
}
.time-sala ul .mal-l span:hover {
  color: #e23435;
  transition: 0.5s all ease;
}
.time-sala ul .red span {
  color: #ff3b3b;
}
.collec_list ul li span {
  cursor: pointer;
}
.collec_list ul li span:hover {
  color: #ff3b3b;
}
.flow .cate_attr .nav-tag span {
  cursor: pointer;
}
</style>

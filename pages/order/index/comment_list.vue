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
    <top-info></top-info>
    <div class="home-index-middle">
      <div class="w1224">
        <div class="home-main">
          <div id="container">
            <div class="w"></div>
            <div class="mycomment-detail" v-if="(orderData.order_status == 4 && orderData.is_virtual == 0) || (orderData.is_comment == 1 && orderData.is_virtual == 1)">
              <div class="detail-hd">
                <div class="m-success-tip">
                  <div class="tip-inner">
                    <i class="tip-icon"></i>
                    <h3 class="tip-title">{{i18n.all_evaluation}}~</h3>
                    <div class="tip-hint">
                      <router-link :to="{name:'comment'}">{{i18n.list_evaluated}} &gt;</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w" v-else>
              <div class="mycomment-detail">
                <div
                  class="detail-hd"
                  id="o-info-orderinfo"
                  oid="20703525920"
                  payid="4"
                  ot="0"
                  shipmentid="70"
                  venderid="32+ro+cdrp0="
                >
                  <div class="orderinfo">
                    <h3 class="o-title">{{i18n.evaluation_order}}</h3>
                    <div class="o-info">
                      <span class="mr20">{{i18n.order_number}}：{{orderData.order_sn}}</span>
                      <span>{{orderData.pay_time_detail}}</span>
                    </div>
                  </div>
                </div>
                <form id="add_comment" method="post">
                  <input type="hidden" id="order_id" name="order_id" value="5135" />
                  <input type="hidden" id="order_sn" name="order_sn" value="202003301643548781" />
                  <input type="hidden" id="store_id" name="store_id" value="49" />
                  <input type="hidden" name="prom_type" value="0" />
                  <div class="mycomment-form">
                    <!-- page -->
                    <div class="form-part1">
                      <div
                        id="activityVoucher"
                        style
                        class="f-item f-service"
                        v-if="orderData.is_comment==0"
                      >
                        <div class="fi-info">
                          <div class="comment-service">
                            <div class="s-img">
                              <a href="javascript:void(0)">
                                <img
                                  :src="store.store_avatar"
                                  alt
                                />
                              </a>
                            </div>
                            <div class="s-main">
                              <div class="s-name">{{i18n.order_service}}</div>
                              <div class="s-info">{{store.store_name}}&nbsp;&nbsp;</div>
                              <div class="s-info"></div>
                            </div>
                          </div>
                        </div>
                        <div class="fi-operate z-tip-warn">
                          <div class="commstar-wrap">
                            <div class="commstar-group">
                              <div class="item" data-key="ro1827">
                                <span class="label">{{i18n.describe_conform}}</span>
                                <el-rate v-model="describeValue" show-score></el-rate>
                              </div>
                              <div class="item" data-key="ro1828">
                                <span class="label">{{i18n.seller_service}}</span>
                                <el-rate v-model="sellerValue" show-score></el-rate>
                              </div>
                              <div class="item" data-key="ro1829">
                                <span class="label">{{i18n.logistics_service}}</span>
                                <el-rate v-model="logisticsValue" show-score></el-rate>
                              </div>
                              <input
                                type="hidden"
                                id="store_packge_hidden"
                                name="store_packge_hidden"
                              />
                              <input
                                type="hidden"
                                id="store_speed_hidden"
                                name="store_speed_hidden"
                              />
                              <input
                                type="hidden"
                                id="store_sever_hidden"
                                name="store_sever_hidden"
                              />
                            </div>
                            <div class="fi-tip">
                              <i class="tip-icon"></i>
                              <em class="tip-text">{{i18n.service_evaluation}}</em>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div id="installVoucher" style="display:none" class="f-item f-service">
                        <div class="fi-info">
                          <div class="comment-service cs-others">
                            <div class="s-img">
                              <span class="i-install"></span>
                            </div>
                            <div class="s-main">
                              <div class="s-name">安装服务</div>
                              <div class="s-info">请对安装服务打分吧~</div>
                            </div>
                          </div>
                        </div>
                        <div class="fi-operate">
                          <div class="commstar-wrap">
                            <div class="commstar-group">
                              <div class="item">
                                <span class="label">安装服务态度</span>
                                <span
                                  id="A4"
                                  class="commstar z-star-checked"
                                  style="cursor: pointer;"
                                >
                                  <span class="star-info">0分</span>
                                  <img
                                    alt="1"
                                    src="/public/images/comment/star-off.png"
                                    title="bad"
                                  />&nbsp;
                                  <img
                                    alt="2"
                                    src="/public/images/comment/star-off.png"
                                    title="poor"
                                  />&nbsp;
                                  <img
                                    alt="3"
                                    src="/public/images/comment/star-off.png"
                                    title="regular"
                                  />&nbsp;
                                  <img
                                    alt="4"
                                    src="/public/images/comment/star-off.png"
                                    title="good"
                                  />&nbsp;
                                  <img
                                    alt="5"
                                    src="/public/images/comment/star-off.png"
                                    title="gorgeous"
                                  />
                                  <input name="score" type="hidden" />
                                </span>
                              </div>
                              <div class="item">
                                <span class="label">安装服务及时性</span>
                                <span
                                  id="A5"
                                  class="commstar z-star-checked"
                                  style="cursor: pointer;"
                                >
                                  <span class="star-info">0分</span>
                                  <img
                                    alt="1"
                                    src="/public/images/comment/star-off.png"
                                    title="bad"
                                  />&nbsp;
                                  <img
                                    alt="2"
                                    src="/public/images/comment/star-off.png"
                                    title="poor"
                                  />&nbsp;
                                  <img
                                    alt="3"
                                    src="/public/images/comment/star-off.png"
                                    title="regular"
                                  />&nbsp;
                                  <img
                                    alt="4"
                                    src="/public/images/comment/star-off.png"
                                    title="good"
                                  />&nbsp;
                                  <img
                                    alt="5"
                                    src="/public/images/comment/star-off.png"
                                    title="gorgeous"
                                  />
                                  <input name="score" type="hidden" />
                                </span>
                              </div>
                              <div class="item">
                                <span class="label">出示收费标准</span>
                                <span
                                  id="A6"
                                  class="commstar z-star-checked"
                                  style="cursor: pointer;"
                                >
                                  <span class="star-info">0分</span>
                                  <img
                                    alt="1"
                                    src="/public/images/comment/star-off.png"
                                    title="bad"
                                  />&nbsp;
                                  <img
                                    alt="2"
                                    src="/public/images/comment/star-off.png"
                                    title="poor"
                                  />&nbsp;
                                  <img
                                    alt="3"
                                    src="/public/images/comment/star-off.png"
                                    title="regular"
                                  />&nbsp;
                                  <img
                                    alt="4"
                                    src="/public/images/comment/star-off.png"
                                    title="good"
                                  />&nbsp;
                                  <img
                                    alt="5"
                                    src="/public/images/comment/star-off.png"
                                    title="gorgeous"
                                  />
                                  <input name="score" type="hidden" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> -->
                      <input type="hidden" id="rec_id" name="remark[5189][goods_id]" value="2981" />
                      <div class="f-cutline"></div>
                      <div
                        class="f-item f-goods product-741538"
                        voucherstatus="0"
                        catefi="670"
                        catese="677"
                        cateth="680"
                        v-for="(item,index) in orderGoodsList"
                        :key="item.rec_id"
                      >
                        <!-- 左边 -->
                        <!-- v-for="(item) in orderData.order_goods"
                        :key="item.order_id"-->
                        <div class="fi-info" v-if="item.is_comment!=1">
                          <div class="comment-goods">
                            <div class="p-img">
							  <router-link
							    :to="{ name: 'goodsInfo', query:{id:item.goods_id}}"
								target="_blank"
							  >
								<img
								  :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.goods_id"
								/>
                              </router-link>
                            </div>
                            <!-- <div> -->
                            <div class="p-name">
							  <router-link
							    :to="{ name: 'goodsInfo', query:{id:item.goods_id}}"
							  	target="_blank"
							  >{{item.goods_name}}</router-link>
                            </div>
                            <div class="p-price">
                              <strong>{{i18nCommon.symbol}}{{Number(item.goods_price).toFixed(2)}}</strong>
                            </div>
                          </div>
                        </div>
                        <!-- 右边 v-for="(item,index) in list"
                        :key="item.rec_id"-->
                        <div class="fi-operate" id="div_5189" v-if="item.is_comment!=1">
                          <div class="fop-item fop-star z-tip-warn">
                            <div class="fop-label">{{i18n.merchandise_satisfaction}}</div>
                            <div class="fop-main">
                              <el-rate v-model="list[index].goods_rank" show-score></el-rate>
                            </div>
                            <div class="fop-tip">
                              <i class="tip-icon"></i>
                              <em class="tip-text"></em>
                            </div>
                            <div class="fi-tip">
                              <i class="tip-icon"></i>
                              <em class="tip-text">{{i18n.product_evaluation}}</em>
                            </div>
                          </div>
                          <div class="fop-item J-mjyx">
                            <div class="fop-label">{{i18n.buyers_impression}}</div>
                            <div class="fop-main">
                              <div class="m-tagbox m-multi-tag">
                                <a
                                  href="javascript:void(0)"
                                  class="tag-item"
                                  v-for="(commit) in list[index].impression"
                                  :key="commit+conte"
                                >
                                  {{commit}}
                                  <i class="t-check"></i>
                                </a>
                                <div class="tag-define" data-_id="tag_5189">
                                  <span
                                    class="define-label"
                                    v-show="sellerBool"
                                    @click="clickSeller"
                                  >
                                    <i class="i-pen"></i>
                                    <em>{{i18n.custom_tag}}</em>
                                  </span>
                                  <input
                                    type="text"
                                    v-model="vendorValue"
                                    class="define-input"
                                    :class="!sellerBool ? 'active' :''"
                                    v-show="!sellerBool"
                                    @blur="blurSelller(index)"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="fop-tip">
                              <i class="tip-icon"></i>
                              <em class="tip-text"></em>
                            </div>
                          </div>
                          <div class="fop-item">
                            <div class="fop-label">{{i18n.evaluation_single}}</div>
                            <div class="fop-main">
                              <div class="f-textarea">
                                <textarea
                                  v-model="list[index].content"
                                  name="remark[5189][content]"
                                  data-id="5189"
                                  class="content comment_content"
                                  :placeholder="i18n.whether_goods+'~'"
                                  style="height:140px"
                                  maxlength="500"
                                  minlength="10"
                                ></textarea>
                                <div class="textarea-ext">
                                  <em class="textarea-num">
                                    <b id="textarea_5189">{{list[index].content.length}}</b> / 500
                                  </em>
                                  <span class="tips">
                                    （{{i18n.evaluation_least}}
                                    <span class="ftc1">10</span>{{i18n.word}}~）
                                  </span>
                                </div>
                              </div>
                              <div class="m-imgshow f-imgshow">
                                <div
                                  class="thumbnail-list"
                                  id="img_container"
                                  style="position: relative;"
                                >
                                  <div class="ev-img po-re fl" id="add_img">
                                    <el-upload
                                      class="upload-demo"
                                      :action="apiHead + '/mall/upload?type=comment/'"
                                      :on-success="handleAvatarSuccess"
                                      :before-upload="beforeAvatarUpload"
                                      @click="handleClick(index)"
                                      multiple
                                    >
                                      <i class="btn-upload img_span"></i>
                                    </el-upload>
                                  </div>
                                  <span class="upload-num">{{i18n.up_upload}}</span>
                                </div>
                                <div class="bigimg-switch hide">
                                  <div class="bigimg-operate">
                                    <a href="#" class="op-rotate1">
                                      <i></i>
                                      <em>{{i18n.turn_left}}</em>
                                    </a>
                                    <a href="#" class="op-rotate2">
                                      <i></i>
                                      <em>{{i18n.turn_right}}</em>
                                    </a>
                                    <a href="#" class="op-delete">
                                      <i></i>
                                      <em>{{i18n.delete}}</em>
                                    </a>
                                  </div>
                                  <div class="switch-inner">
                                    <img src alt class="bigimg" />
                                    <div class="cursor-small"></div>
                                    <div class="cursor-prev"></div>
                                    <div class="cursor-next"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="fop-tip">
                              <i class="tip-icon"></i>
                              <em class="tip-text"></em>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- page -->
                    <div class="f-btnbox">
                      <!-- <a href="javascript:void(0);" onclick="check_submit();" class="btn-submit">提交</a> -->
                      <el-button type="danger" @click="check_submit()" :loading="loading">{{i18n.submit}}</el-button>
                      <span class="f-checkbox">
                        <input
                          id="check1"
                          name="hide_username"
                          class="i-check"
                          type="checkbox"
                          :checked="checked"
                        />
                        <label for="check1">{{i18n.anonymous_evaluation}}</label>
                      </span>
                      <!-- <el-checkbox v-model="checked">匿名评价</el-checkbox> -->
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/index2.vue";
import TopInfo from "@/components/TopInfo/index.vue";
import {
  submitEvaluation,
  orderEvaluate,
  getorderDetails,
  getOrderGoodsList,
  getStore
} from "@/utils/api.js";
export default {
  data() {
    return {
      describeValue: null, //描述相符
      sellerValue: null, //卖家服务
      logisticsValue: null, //物流服务
      shopValue: null, //商品满意度
      sellerEvaluation: [], //买家印象
      sellerBool: true, //是否为Input框
      vendorValue: "", //卖家评价
      evaluateValue: "", //评价晒单
      img: "", //图片路径
      checked: true, //是否匿名评价
      orderData: {}, //订单商品数据
      loading: false, //是否加载中状态
      conter: 0,
      list: [],
      index: 0 ,//图片下标
	  orderGoodsList: [],
	  store: {}
      // is_anonymous:0,
      // texts:['1分','2分','3分','4分','5分'], //
    };
  },
   computed: {
      i18n() {
        return this.$t('order.comment_list') 
      },
      i18nCommon () {
        return this.$t('common')  
      }
    },
  methods: {
    //图片点击
    handleClick(index) {
      this.index = index;
    },
    //提交评价
    check_submit() {
      var _this = this;
      var a = [];
      var Boolean = true;
      if (this.orderData.is_comment != 1) {
        if (!_this.describeValue) {
          _this.$message({
            message: _this.i18n.describe_agree,
            type: "warning"
          });
          return;
        }
        if (!_this.logisticsValue) {
          _this.$message({
            message: _this.i18n.seller_serve,
            type: "warning"
          });
          return;
        }
        if (!_this.sellerValue) {
          _this.$message({
            message: _this.i18n.logistics_serve,
            type: "warning"
          });
          return;
        }
      }
      //商品判断
      for (let index = 0; index < this.list.length; index++) {
        if (
          this.list[index].goods_rank != 0
          // this.list[index].content != ""
        ) {
          a.push(index);
          // if (this.list[index].content.length >= 10) {
          //   a.push(index);
          //   Boolean = true;
          // } else {
          //   Boolean = false;
          // }
        } else {
          if (
            a.length > 0 &&
            this.list[index].goods_rank == 0 
            // this.list[index].content == ""
          ) {
            Boolean = true;
          } else {
            Boolean = false;
          }
        }
      }
      var is_anonymous = this.checked ? "0" : "1"; //是否匿名
      var params = {
        describe_score: this.describeValue,
        logistics_score: this.logisticsValue,
        seller_score: this.sellerValue,
        order_id: this.orderData.order_id
      };
      if (Boolean) {
        for (var j = 0; j < a.length; j++) {
          var element = _this.list[a[j]];
          var data = {
            ...element,
            is_anonymous: is_anonymous,
            img: element.img.join(","),
            impression: element.impression.join(",")
          };
          _this.loading = true;
          _this.commentsSubmitted(params, data);
        }
      } else {
        _this.$message({
          message: _this.i18n.complete_evaluation,
          type: "warning"
        });
      }
    },
    //提交
    commentsSubmitted(params, data) {
      var datas = {
        order_id: this.$route.query.order_id
      };
      submitEvaluation(data).then(res => {
        if(res.status == 1){
          this.orderGoods(datas);
        }else{
        }
      });
      if (this.orderData.is_comment != 1) {
        orderEvaluate(params).then(res => {
           if(res.status == 1){
              this.orderGoods(datas);
            }else{
            }
        });
      }
      this.loading = false;
    },
    handleAvatarSuccess(res, file) {
      var _this = this
      if (res.status == 1) {
        this.list[this.index].img.push(res.result);
      } else {
        this.$message.error(_this.i18n.fail_upload);
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error(_this.i18n.picture_size);
      }
      return isLt5M;
    },
    //input框显示
    clickSeller() {
      this.sellerBool = false;
    },
    //input框失去焦点添加评价
    blurSelller(index) {
      this.sellerBool = true;
      if (this.vendorValue != "") {
        this.conte = this.conter++;
        this.list[index].impression.push(this.vendorValue);
        this.vendorValue = "";
      }
    },
    orderGoods(data) {
      getorderDetails(data).then(res => {
        this.orderData = res;
      }).then(() => {
		  getOrderGoodsList({
			  order_ids: this.orderData.order_id
		  }).then(res => {
			  this.orderGoodsList = res;
			  for (var i = 0; i < this.orderGoodsList.length; i++) {
				  this.list.push({
				    content: "", //评价晒单
				    goods_rank: 0, //商品满意度
				    img: [], //上传图片
				    impression: [], //买家印象
				    rec_id: this.orderGoodsList[i].rec_id
				  });
			  }
		  })
		  getStore({
		    store_id: this.orderData.store_id
		  }).then (res => {
		    this.store = res;
		  })
	  })
    }
  },
  created() {
    var data = {
      order_id: this.$route.query.order_id
    };
    this.orderGoods(data);
  },
  components: {
    TopBar,
    TopInfo
  }
};
</script>

<style scoped>
@import "@/static/css/saved_resource.css";
@import "@/static/css/saved_resource2.css";
.active {
  display: block !important;
}
</style>

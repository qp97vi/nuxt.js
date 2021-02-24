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
    <div class="col_main noHidden">
      <!--下面内内容自己添加 -->
      <div class="return_area">
        <div class="user-head clearfix" style="width:100%;">
          <h3>{{i18n.apply_rc}}</h3>
          <a :href="'tencent://message/?uin=' + store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'" target="_blank">{{i18n.touch_seller}}</a>
          <a class href>{{i18n.sale_policy}}</a>
        </div>
        <!-- tab -->
        <div class="ui_tab">
          <div class="ui_tab_content J_order_list">
            <!--退货记录-->
            <div class="wi940">
              <form name="return_form" id="return_form" autocomplete="off" method="post">
                <div class="mod-main mod-comm" id="air03">
                  <div class="mc">
                    <table class="tb-void mb10">
                      <thead>
                        <tr>
                          <th>{{i18n.goods}}</th>
                          <th>{{i18n.buy_price}}</th>
                          <th>{{i18n.buy_amount}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <ul class="list-proinfo" id="removeTheSingleGife">
                              <li class="fore1">
								<router-link :to="{name:'goodsInfo',query:{id:orderGoods.goods_id}}">
                                  <img
                                    :src="apiHead + '/mall/goods/thumb_image?width=50&height=50&goods_id=' + orderGoods.goods_id"
                                  />
                                  {{orderGoods.goods_name}}
                                </router-link>
                              </li>
                            </ul>
                          </td>
                          <td>{{orderGoods.goods_price}}</td>
                          <td id="buynum">{{orderGoods.goods_num}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div name="productInfo_zp-info" style="display:none"></div>
                  </div>
                  <div class="form">
                    <div class="item kfarea" id="sellerPrompt">
                      <div class="ml20">
                        <span>
                          <em>*</em>
                          <span style="color: red; ">{{i18n.warm_prompt}}：</span>
                        </span>
                        <label>
                          {{i18n.after_made}}
                          <span id="sellerNamePrompt" style="color: red; ">{{store_name}}</span>{{i18n.provide_with}}；
                        </label>
                        <label>
                          <span style="color: red; ">{{i18n.only_refund}}：</span>{{i18n.not_sign}}
                        </label>
                        <label>
                          <span style="color: red; ">{{i18n.sales_return}}：</span>{{i18n.received_aog_text}}
                        </label>
                      </div>
                      <div class="clr"></div>
                    </div>
                    <div class="repair-steps" id="repairSteps">
                      <div class="repair-step repair-step-curr pt10 mb10" id="firstRepairStep">
                        <!-- 服务类型 -->
                        <div class="item">
                          <span class="label">
                            <em>*</em> {{i18n.service_type}}：
                          </span>
                          <div class="clr">
                            <ul class="list-type list-type-new">
                              <li tvalue="0" :class="form.type == 0 ? 'selected' : ''">
                                <span @click="typeService(0,i18n.only_refund)">
                                  {{i18n.only_refund}}
                                  <b></b>
                                </span>
                                <input type="radio" name="type" value="0" hidden />
                              </li>
                              <li tvalue="1" :class="form.type == 1 ? 'selected' : ''">
                                <span @click="typeService(1,i18n.sales_return)">
                                  {{i18n.sales_return}}
                                  <b></b>
                                </span>
                                <input type="radio" name="type" value="1" hidden />
                              </li>
                              <li tvalue="2" :class="form.type == 2 ? 'selected' : ''">
                                <span @click="typeService(2,i18n.barter)">
                                  {{i18n.barter}}
                                  <b></b>
                                </span>
                                <input type="radio" name="type" value="2" hidden />
                              </li>
                              <li tvalue="3" :class="form.type == 3 ? 'selected' : ''">
                                <span @click="typeService(3,i18n.maintain)">
                                  {{i18n.maintain}}
                                  <b></b>
                                </span>
                                <input type="radio" name="type" value="3" hidden />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="item">
                          <span class="label">
                            <em>*</em> {{i18n.qty_Commited}}：
                          </span>
                          <div class="fl tjsl" style="margin-top:0px;">
                            <el-input-number
                              size="mini"
                              v-model="form.goods_num"
                              :max="orderGoods.goods_num"
                              :min="orderGoods.goods_num"
                            ></el-input-number>
                          </div>
                          <div class="clr">{{i18n.submission}}{{orderGoods.goods_num}}{{i18n.box}}</div>
                        </div>

                        <div class="item">
                          <span class="label">
                            <em>*</em> {{i18n.state_goods}}：
                          </span>
                          <div class="clr">
                            <label class="clr_unfinished" v-show="form.type==0||form.type==2">
                              <input
                                style="width:20px;"
                                v-model="form.is_receive"
                                type="radio"
                                name="is_receive"
                                value="0"
                                checked
                              />{{i18n.uncollected_aog}}
                            </label>
                            <label class="clr_achieve">
                              <input
                                style="width:20px;"
                                v-model="form.is_receive"
                                type="radio"
                                name="is_receive"
                                value="1"
                              />{{i18n.received_aog}}
                            </label>
                          </div>
                        </div>

                        <div class="item">
                          <span class="label">
                            <em>*</em> {{i18n.submit_reason}}：
                          </span>
                          <div class="fl new">
                            <select
                              v-model="form.reason"
                              class="select new_select"
                              id="reason"
                              name="reason"
                            >
                              <option :value="i18n.please_select">{{i18n.please_select}}</option>
                              <option
                                :value="item"
                                v-for="(item) in submitReason[form.type].option"
                                :key="item"
                              >{{item}}</option>
                            </select>
                          </div>
                          <div class="clr">{{i18n.suggest_one}}</div>
                        </div>
                        <!-- 问题描述 外层div-->
                        <div id="miaoShuDiv" style>
                          <!-- 问题描述 -->
                          <div class="item">
                            <span class="label">
                              <em>*</em> {{i18n.issue_describe}}：
                            </span>
                            <div class="fl">
                              <textarea
                                v-model="form.describe"
                                name="describe"
                                id="describe"
                                cols
                                rows
                                class="area"
                              ></textarea>
                              <div class="msg-text-01">{{i18n.issue_condition}}</div>
                            </div>
                            <div class="clr"></div>
                          </div>

                          <!-- 图片信息 -->

                          <div class="item item01">
                            <span class="label"><em>*</em>{{i18n.picture_data}}：</span>
                            <div class="fl">
                              <div class="i-btns" style="text-align: left;">
                                <el-upload
                                  class="upload-demo"
                                  :action="apiHead+'/mall/upload?type=return_goods/'"
                                  :on-success="handleAvatarSuccess"
                                  :before-upload="beforeAvatarUpload"
                                  accept=".bmp, .gif, .jpg, .png, .jpeg"
                                >
                                  <input type="button" :value="i18n.upload_pictures" />
                                </el-upload>
                                <!--  -->
                                <input type="hidden" name="imgs" id="return_img" value />
                                <div id="i-btns"></div>
                              </div>
                              <span id="uploadImgLoading" class="fl"></span>
                              <span id="img_des" class="fl">{{i18n.suggest_two}}</span>
                              <div class="clr"></div>
                              <span
                                class="msg-text"
                              >{{i18n.image_conditions}}</span>
                              <div class="clr"></div>
                              <div name="mscolluploadImg-info" style="display:none"></div>
                            </div>
                            <div class="clr">{{i18n.suggest_three}}</div>
                          </div>
                          <!-- 问题描述 外层div-->
                        </div>
                      </div>
                      <div id="defaultQueRenDiv" style class="repair-step">
                        <!-- 确认信息 -->
                        <div class="mt-10">
                          <strong>{{i18n.affirm_message}}</strong>
                        </div>
                        <!-- 申请凭据 -->
                        <div
                          class="item"
                          id="reserveDate_small_div_defaultShow"
                          style="display: block;"
                        >
                          <span class="label">
                            <em>*</em>{{i18n.apply_proof}}：
                          </span>
                          <div class="fl" id="reserveDate_small_div_defaultShow_fl">
                            <input
                              type="radio"
                              v-model="form.evidence"
                              name="evidence"
                              :value="1"
                              checked
                            />{{i18n.have_invoice}}&nbsp;&nbsp;
                          </div>
                        </div>
                        <!-- 取货地址 -->
                        <!-- <div class="item" id="pickWareAddress_defaultShow" style="display: block;"> <span class="label"><em>*</em>返回方式：</span>
                                 <div class="fl">快递至第三方卖家</div>
                                 <div class="fr">商品返回地址将在服务单审核通过后以短信形式告知，或在“退换货记录”中查询。</div>
                        </div>-->
                        <!-- 客服电话 -->
                        <div class="item" style="display: block;">
                          <span class="label">
                            <em>*</em>
                            {{i18n.service_tel}}：
                          </span>
                          <div class="fl">{{delivryInfo.store_address_mobile}}</div>
                          <div class="clr"></div>
                        </div>
                        <div class="item" style="display: block;">
                          <span class="label">
                            <em>*</em>
                            {{i18n.delivery_address}}：
                          </span>
                          <div class="fl">{{delivryInfo.full_address}}</div>
                          <div class="clr"></div>
                        </div>
                        <div class="item" style="display: block;">
                          <span class="label">
                            <em>*</em>{{i18n.client_name}}：
                          </span>
                          <div class="fl">
                            <input v-model="form.consignee" type="text" name="consignee" />
                          </div>
                          <div class="clr"></div>
                        </div>
                        <div class="item" style="display: block;">
                          <span class="label">
                            <em>*</em>{{i18n.phone_number}}：
                          </span>
                          <div class="fl">
                            <input v-model="form.mobile" type="text" name="mobile" maxlength="15" />
                          </div>
                          <div class="clr">{{i18n.suggest_four}}</div>
                        </div>
                        <!-- now -->
                        <!-- 确认信息 外层div 结束 -->
                      </div>
                      <!-- 提交按钮 -->
                      <div class="item" id="submitDiv" style="margin-bottom: -20px;margin-top: 20px;">
                        <span class="label">&nbsp;</span>
                        <div class="fl" name="divSubmit">
                          <div name="submitTips" style="display:none"></div>
                          <span
                            href="javascript:void(0)"
                            @click="onSubmit()"
                            class="btn btn-7"
                            name="btnSubmit"
                          >
                            <s></s>{{i18n.affirm_submit}}
                          </span>
                        </div>
                        <div class="clr"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- tab end-->
      </div>
      <!-- 以上为中间内容区域 注释自己2删除-->
    </div>
  </div>
</template>

<script>
import {
  getOrderGoods,
  getStore,
  addReturnGoods,
  getDeliveryDoc
} from "@/utils/api.js";
export default {
  data() {
    return {
      submitReason: [
        {
          option: [
            "不喜欢/不想要",
            "拍错了/订单信息错误",
            "未按约定时间发货",
            "快递/物流一直未送到",
            "快递/物流无跟踪记录",
            "货物破损/空包裹已拒签"
          ]
        },
        {
          option: [
            "退运费",
            "收到的商品与描述不符（大小/尺寸/颜色/图案/款式/材质面料等）",
            "功能/效果与商品描述不符",
            "快递/物流无跟踪记录",
            "商品质量问题",
            "少件/漏发",
            "包装/商品破损/污渍",
            "假冒品牌",
            "未按约定时间发货",
            "发票问题",
            "卖家发错货"
          ]
        },
        {
          option: [
            "7天无理由换货",
            "大小/尺寸不合适",
            "商品质量问题",
            "假冒品牌",
            "收到的商品破损/漏件",
            "发票问题",
            "卖家发错货"
          ]
        },
        { option: ["功能性故障或商品质量问题", "其它"] }
      ],
      orderGoods: {},
      form: {
      	rec_id: this.$route.query.rec_id || null,
        type: 0, //服务类型
        is_receive: 0, //货物状态
        goods_num: 1, //数量
        reason: "请选择", //提交原因
        describe: "", //问题描述
        evidence: 1, //申请凭据
        consignee: "", //客户姓名
        mobile: "", //手机号码
        imgs: "" //上传图片
      },
	  delivryInfo: {}, //发货信息
      store_name: "", //店铺名称
	  store_qq: "", //联系店铺
      serviceClass: 0, //服务类型类名切换
      imageUrl: "" //图片
    };
  },
  computed: {
  	i18n() {
      this.submitReason = [
        {
          option: [
            this.$t('order.return_goods_rec.unwanted'),
            this.$t('order.return_goods_rec.take_wrong'),
            this.$t('order.return_goods_rec.not_time'),
            this.$t('order.return_goods_rec.never_delivered'),
            this.$t('order.return_goods_rec.notrack_record'),
            this.$t('order.return_goods_rec.have_visa')
          ]
        },
        {
          option: [
            this.$t('order.return_goods_rec.return_freight'),
            this.$t('order.return_goods_rec.goods_describe_disagree'),
            this.$t('order.return_goods_rec.function_describe_disagree'),
            this.$t('order.return_goods_rec.notrack_record'),
            this.$t('order.return_goods_rec.quality_problem'),
            this.$t('order.return_goods_rec.leakage_hair'),
            this.$t('order.return_goods_rec.blot'),
            this.$t('order.return_goods_rec.fake_brand'),
            this.$t('order.return_goods_rec.not_time'),
            this.$t('order.return_goods_rec.invoice_issue'),
            this.$t('order.return_goods_rec.del_money'),
          ]
        },
        {
          option: [
            this.$t('order.return_goods_rec.hebdomad_barter'),
            this.$t('order.return_goods_rec.inappropriate_size'),
            this.$t('order.return_goods_rec.quality_problem'),
            this.$t('order.return_goods_rec.fake_brand'),
            this.$t('order.return_goods_rec.missing_part'),
            this.$t('order.return_goods_rec.invoice_issue'),
            this.$t('order.return_goods_rec.del_money'),
          ]
        },
        { option: [this.$t('order.return_goods_rec.function_quality_problem'), this.$t('order.return_goods_rec.other'),] }
      ]
        this.form.reason = this.$t('order.return_goods_rec.please_select') 
        return this.$t('order').return_goods_rec
			}
	},
  methods: {
    handleAvatarSuccess(res, file) {
      var that = this
      if (res.status == 1) {
        this.form.imgs = res.result;
      } else {
        this.$message.error(that.i18n.failed_upload_avatar);
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      var that = this
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error(that.i18n.picture_size);
      }
      return isLt5M;
    },
    //服务类型切换
    typeService(id) {
      this.form.type = id;
    },
    //获取信息
    getOrderGoods() {
      var params = {
        rec_id: this.form.rec_id
      };
      getOrderGoods(params)
        .then(res => {
          //   this.form = res
		  this.orderGoods = res;
		  this.form.goods_num = res.goods_num
        })
        .then(() => {
          //   发货信息
		  getDeliveryDoc(this.orderGoods.delivery_id).then(res => {
			  this.form.mobile = res.mobile;
			  this.form.consignee = res.consignee;
			  this.delivryInfo = res;
		  })
        })
        .then(() => {
          //   店铺信息
          var data = { store_id: this.orderGoods.store_id };
          getStore(data).then(res => {
            this.store_name = res.store_name;
			this.store_qq = res.store_qq;
          });
        });
    },
    onSubmit() {
      var that = this;
      console.log(this.form);
      if (this.form.imgs=='') {
        return this.$message.error(that.i18n.suggest_two);
      }
      addReturnGoods(this.form).then(res => {
      	if (res != null) {
      		that.$message.success({
      		  message: that.i18n.submit_successfully,
      		  onClose: function() {
      		    that.$router.push({ name: "return_goods_index", query:{bool: 2} });
      		  }
      		});
      	}
      })
    }
  },
  created() {
    this.getOrderGoods();
  },
  components: {}
};
</script>

<style scoped>
@import "@/static/css/myaccount.css";
@import "@/static/css/return.add.css";
.return_area span:hover {
  cursor: pointer;
  color: #323333;
}
.list-type-new li.selected span {
  border: 2px solid #e4393c;
  padding: 5px 27px;
}
.list-type-new li span {
  display: block;
  border: 1px solid #ebebeb;
  text-align: center;
  height: 18px;
  line-height: 18px;
  padding: 6px 28px;
  cursor: pointer;
}
>>> .repair-step.repair-step-curr input {
  width: 130px;
}
.col_main {
  width: 1000px;
  float: right;
  background: #fff;
}

.item input {
  vertical-align: middle;
}

#air03 .fl.new,
#air03 .fl.new .new_select {
  width: 420px;
  max-width: 420px;
  margin-right: 10px;
}
</style>

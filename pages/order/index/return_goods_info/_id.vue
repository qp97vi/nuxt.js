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
      <div class="menu-ri-t progse p">
        <div class="goodpiece p">
          <h1>{{i18n.service_plan}}</h1>
          <div class="twibtn_r">
            <!--qq客服-->
            <a class="shhear" :href="'tencent://message/?uin=' + storeData.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
              <i class="earp"></i>{{i18n.touch_seller}}
            </a>
          </div>
        </div>
        <div class="fu_serdetail ma-to-20">
          <div class="serft_fl">
            <span>
              {{i18n.after_sales}}
              <nuxt-link class="red" :to="{name:'store',query:{store_id:storeData.store_id}}">{{storeData.store_name}}</nuxt-link>
              {{i18n.provide_with}}
            </span>
          </div>
          <div class="serft_fr">
            <div class="shop-if-dif">
              <div class="shop-difimg">
                <nuxt-link
                 :to="{name:'goodsInfo',query:{id:serviceDetailsData.goods_id}}"
                 :title="serviceDetailsData.goods_name"
                >
                <img :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + serviceDetailsData.goods_id" />
                </nuxt-link>
              </div>
              <div class="cebigeze">
                <p class="may_zco">
                  <span>{{i18n.order_number}}：</span>
                  <span>
					<nuxt-link :to="{name:'order_detail',query:{order_id:serviceDetailsData.order_id}}">
                    {{serviceDetailsData.order_sn}}</nuxt-link>
                  </span>
                </p>
                <p class="may_zco">
                  <nuxt-link
                   :to="{name:'goodsInfo',query:{id:serviceDetailsData.goods_id}}"
                   :title="serviceDetailsData.goods_name"
                  >{{orderGoodsData.goods_name}}</nuxt-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--发货表单-s-->
    <!--  -->
    <!-- action method="post" -->
    <form
      id="return_form"
      v-if="serviceDetailsData.status == 1 && serviceDetailsData.is_receive==1 && serviceDetailsData.type > 0"
    >
      <div class="repair-steps" id="repairSteps">
        <div class="repair-step repair-step-curr pt10" id="firstRepairStep" style="height:100px;">
          <p>
            {{i18n.warm_prompt}}
            <!--<a href="">补偿标准>></a>-->
          </p>
          <div class="item" style="display: initial;">
            <span class="label fl">
              <em>*</em> {{i18n.express_company}}：
            </span>
            <div class="fl">
              <input type="text" name="delivery[express_name]" v-model="form.express_name" />
            </div>
          </div>
          <div class="item" style="display: initial;">
            <span class="label fl">
              <em>*</em> {{i18n.express_cost}}({{i18n.unit}})：
            </span>
            <div class="fl">
              <!-- onpaste="this.value=this.value.replace(/[^\d.]/g,'')" -->
              <!-- onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" -->
              <!-- onblur="checkInputNum(this.name,0,9999);" -->
              <input
                type="text"
                name="delivery[express_fee]"
                v-model="form.express_sn"
                maxlength="4"
              />
            </div>
          </div>
          <div class="item" style="display: initial;">
            <span class="label fl">
              <em>*</em> {{i18n.express_odd}}：
            </span>
            <div class="fl">
              <input type="text" name="delivery[express_sn]" v-model="form.express_time" />
            </div>
          </div>
          <div class="item" style="display: initial;">
            <span class="label fl">
              <em>*</em> {{i18n.delivery_time}}：
            </span>
            <div class="fl">
              <input
                type="text"
                id="express_time"
                value
                name="delivery[express_time]"
                v-model="form.express_money"
              />
            </div>
          </div>

          <div class="item" id="submitDiv">
            <span class="label">&nbsp;</span>
            <div name="divSubmit">
              <input type="hidden" name="id" value="116" />
              <el-button
                size="mini"
                style="float:right;"
                type="success"
                plain
                @click="submit_form()"
              >{{i18n.affirm_submit}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!--发货表单-e-->
    <div class="menumain p ma-to-20">
      <div class="goodpiece">
        <h1>{{i18n.after_message}}</h1>
        <!--<a href=""><span class="co_blue">成长值说明<em class="thoma">></em></span></a>-->
      </div>
      <div class="diffenprp">
        <div class="shencharsub p">
          <el-steps :space="200" :active="active" finish-status="success">
            <template v-if="serviceDetailsData.status != -2 && serviceDetailsData.type > 0">
              <el-step :title="i18n.submit_apply"></el-step>
              <el-step :title="i18n.seller_approved"></el-step>
              <el-step :title="i18n.user_shipped"></el-step>
              <el-step :title="serviceDetailsData.type < 2 ? i18n.seller_received : i18n.seller_resend_goods"></el-step>
              <el-step :title="i18n.service_order_completed"></el-step>
            </template>
            <template v-else>
              <el-step :title="i18n.submit_apply"></el-step>
              <el-step :title="i18n.seller_approved"></el-step>
              <el-step :title="i18n.service_order_completed"></el-step>
            </template>
          </el-steps>
        </div>

        <!--进度说明-s-->
        <div class="sheefshjk">
          <div class="jindudoc">
            <h2>{{i18n.progress}}：</h2>
            <span v-if="serviceDetailsData.status==0">
              <p>{{i18n.progress_one}}{{storeData.store_name}}{{i18n.review_service}}</p>
            </span>
            <span v-else-if="serviceDetailsData.status==1">
              <p>
                {{i18n.progress_two}}
              </p>
            </span>
            <span v-else-if="serviceDetailsData.status==-1">{{serviceDetailsData.remark}}</span>
            <span v-else-if="serviceDetailsData.status==2">{{i18n.progress_three}}{{storeData.store_name}}{{i18n.delivery_goods}}</span>
            <span
              v-else-if="serviceDetailsData.receivetime>0 && serviceDetailsData.type>0"
            >{{i18n.dear_customer}}，{{storeData.store_name}}{{i18n.progress_four}}</span>
            <span
              v-else-if="serviceDetailsData.status==3 && serviceDetailsData.type==0"
            >{{i18n.progress_six}}</span>
            <span
              v-else-if="serviceDetailsData.status==4 || serviceDetailsData.status==5"
            >{{i18n.progress_seven}}{{storeData.store_name}}{{i18n.strongly_support}}</span>
            <span v-else-if="serviceDetailsData.status==6">{{i18n.progress_eight}}</span>
            <span
              v-else-if="serviceDetailsData.status==-2"
            >{{i18n.progress_nine}}{{storeData.store_name}}{{i18n.strongly_support}}</span>
            <!-- </div>
            </div>-->
          </div>
          <el-button
            type="danger"
            style="margin-top:20px;"
            size="small"
            @click="return_goods_cancel()"
            v-if="serviceDetailsData.status!=-2 && serviceDetailsData.status<2"
          >{{i18n.cancel_service_order}}</el-button>
          <el-button
            type="danger"
            style="margin-top:20px;"
            v-else-if="serviceDetailsData.status==4"
            size="small"
          >{{i18n.apply_trade_dispute}}</el-button>
        </div>
        <!--进度说明-e-->
      </div>

      <!--审核环节进度说明-s-->
      <div class="liaduebox" :style="'overflow:'+disposeOverflow+';height:'+disposeHeight+';'">
        <!-- 一 -->
        <div class="sheefshjk firshe">
          <span class="kediorse">{{i18n.processing_steps}}</span>
          <div class="jindudoc">
            <h2>{{i18n.progress}}：</h2>
            <p>{{i18n.dispose_one}}</p>
            <p class="caozpero">
              <span class="boldjh">{{i18n.operator}}：</span>
              <span>{{i18n.system}}（{{serviceDetailsData.add_time_format}}）</span>
            </p>
          </div>
          <p class="cilckmor" id="cilckstart" v-show="disposeBool">
            <span @click="show_more()">{{i18n.see_more}}</span>
          </p>
        </div>
        <!-- 二 -->
        <div class="sheefshjk" v-if="serviceDetailsData.checktime > 0">
          <div class="jindudoc">
            <h2>{{i18n.progress}}：</h2>
            <p>{{i18n.dispose_two}}</p>
            <p class="caozpero">
              <span class="boldjh">{{i18n.operator}}：</span>
              <span>{{i18n.seller}}（{{serviceDetailsData.check_time_format}}）</span>
            </p>
          </div>
        </div>
        <div v-if="serviceDetailsData.status < 6">
          <div v-if="serviceDetailsData.receivetime > 0">
            <div class="sheefshjk">
              <div class="jindudoc">
                <h2>{{i18n.progress}}：</h2>
                <p>{{i18n.dispose_three}}</p>
                <p class="caozpero">
                  <span class="boldjh">{{i18n.operator}}：</span>
                  <span>{{i18n.seller}}（{{serviceDetailsData.receivetime}}）</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="serviceDetailsData.refund_time> 0">
            <div class="sheefshjk">
              <div class="jindudoc">
                <h2>{{i18n.progress}}：</h2>
                <p>{{i18n.dispose_four}}</p>
                <p class="caozpero">
                  <span class="boldjh">{{i18n.operator}}：</span>
                  <span>{{i18n.platformkezel}}（{{serviceDetailsData.refund_time_format}}）</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="serviceDetailsData.seller_delivery">
            <div class="sheefshjk">
              <div class="jindudoc">
                <h2>{{i18n.progress}}：</h2>
                <p>{{i18n.dispose_five}}：{{storeData.express_name}},{{i18n.express_odd}}：{$return_goods[seller_delivery][express_sn]}</p>
                <p class="caozpero">
                  <span class="boldjh">{{i18n.operator}}：</span>
                  <span>{{i18n.seller}}（{{storeData.express_time}}）</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="serviceDetailsData.canceltime > 0">
            <div class="sheefshjk">
              <div class="jindudoc">
                <h2>{{i18n.progress}}：</h2>
                <p>{{i18n.dispose_six}}</p>
                <p class="caozpero">
                  <span class="boldjh">{{i18n.operator}}：</span>
                  <span>{{serviceDetailsData.nickname}}（{{serviceDetailsData.canceltime}}）</span>
                </p>
              </div>
            </div>
          </div>
          <div class="sheefshjk">
            <div class="jindudoc">
              <p class="cilckmor" id="cilckstop">
                <span @click="show_stop()">{{i18n.pack_up}}</span>
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="sheefshjk">
            <div class="jindudoc">
              <h2>{{i18n.progress}}：</h2>
              <p>{{i18n.dispose_seven}}</p>
              <p class="caozpero">
                <span class="boldjh">{{i18n.operator}}：</span>
                <span>{{i18n.platformkezel}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--审核环节进度说明-e-->
      <h2 class="Important-reminder">
        <em>v{{i18n.important_reminder}}</em>：{{i18n.warn_one}}
        <em>{{i18n.any_reason}}</em> ，{{i18n.require_one}}
        <em>{{i18n.any_url}}</em> {{i18n.refund_operation}}。
      </h2>
    </div>

    <div class="menumain p ma-to-20 serverschdule" style>
      <div class="goodpiece">
        <h1>{{i18n.order_information}}</h1>
      </div>
      <div class="sheet manone">
        <table border="1" width="100%" cellspacing cellpadding>
          <tbody>
            <tr>
              <td>
                <span>{{i18n.goods_return_method}}</span>
              </td>
              <td class="lastd">
                <span>{{i18n.mode_one}}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{i18n.goods_mode}}</span>
              </td>
              <td class="lastd">
                <span>{{i18n.expect_way}}“{{serviceDetailsData.type_desc}}”</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{i18n.application_credentials}}</span>
              </td>
              <td class="lastd">
                <span v-if="serviceDetailsData.evidence==1">{{i18n.have_invoice}}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{i18n.problem_description}}</span>
              </td>
              <td class="lastd">
                <span>{{serviceDetailsData.describe}}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{i18n.seller_information}}</span>
              </td>
              <td class="lastd">
                <strong>
                  {{i18n.profile}}：{{storeData.store_address}}
                  <br />
                  {{i18n.recipients}}：{{storeData.store_name}}({{i18n.collect}})
                  <br />
                  {{i18n.phone}}：{{storeData.store_phone}}
                </strong>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{i18n.contact_information}}</span>
              </td>
              <td class="lastd">
                <span>
                  {{i18n.contacts}}：
                  <em>{{serviceDetailsData.consignee}}</em>
                </span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  {{i18n.cellphone}}：
                  <em>{{serviceDetailsData.mobile}}</em>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  returnRecord,
  getOrderGoods,
  getStore,
  balanceCompensation,
  cancelServiceOrder,
} from "@/utils/api.js";
export default {
  data() {
    return {
      serviceDetailsData: {}, //服务详情数据
      storeData: {}, //店铺信息
      orderGoodsData: {}, //定单商品信息
      disposeHeight: "160px", //处理环节高度
      disposeOverflow: "hidden", //查看更多显示
      disposeBool: true, //查看更多显示
      form: {
        express_name: "", //快递公司
        express_sn: "", //快递费用
        express_time: "", //快递单号
        express_money: "", //发货时间
      }, //余额补偿表单
      active: 1, //步骤及
    };
  },
  computed: {
    i18n() {
				return this.$t('order.return_goods_info') 
    }
  },
  methods: {
    //余额补偿提交
    submit_form() {
      var _this = this;
      if (
        !this.form.express_name ||
        !this.form.express_sn ||
        !this.form.express_time ||
        !this.form.express_money
      ) {
        _this.$message({
          message: _this.i18n.full_message,
          type: "warning",
        });
        return;
      }
      balanceCompensation(this.serviceDetailsData.id, this.form).then(
        (res) => {
          var arun = "";
          if (res.status == 1) {
            arun = {
              message: res.msg,
              type: "success",
            };
          } else {
            arun = {
              message: res.msg,
              type: "error",
            };
          }
          var data = {
            rec_id: _this.$route.query.rec_id || null,
          };
          _this.serviceDetails(data);
          _this.$message(arun);
        }
      );
    },
    //收起
    show_stop() {
      this.disposeBool = true;
      this.disposeHeight = "160px";
      this.disposeOverflow = "hidden";
    },
    //查看更多
    show_more() {
      this.disposeBool = false;
      this.disposeHeight = "inherit";
      this.disposeOverflow = "inherit";
    },
    //取消服务单
    return_goods_cancel() {
      var _this = this
      var params = {
        id: Number(this.serviceDetailsData.id),
      };
      this.$confirm(_this.i18n.cancel_after_sales, _this.i18n.message, {
        confirmButtonText: _this.i18n.confirm,
        cancelButtonText: _this.i18n.cancel,
        type: "warning",
      })
        .then(() => {
          cancelServiceOrder(params).then((res) => {
            if (res.status == 1) {
              _this.$message({
                type: "success",
                message: res.msg,
              });
              _this.serviceDetails({rec_id: _this.$route.query.rec_id});
            } else {
              _this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: _this.i18n.canceled,
          });
        });
    },
    //服务详情
    serviceDetails(data) {
      returnRecord(data)
        .then((res) => {
          this.serviceDetailsData = res;
        })
        .then(() => {
          getOrderGoods(data).then((res) => {
            this.orderGoodsData = res;
          });
          this.stepBarJudgment();
        })
        .then(() => {
          var params = {
            store_id: this.serviceDetailsData.store_id,
          };
          getStore(params).then((res) => {
            this.storeData = res;
          });
        });
    },
    //步骤条判断
    stepBarJudgment() {
      if (this.serviceDetailsData.type == 0) {
        if (this.serviceDetailsData.status == 1) {
          this.active = 2;
        }
        if (
          this.serviceDetailsData.status == 5 ||
          this.serviceDetailsData.status < 0
        ) {
          this.active = 3;
        }
      }
      if (this.serviceDetailsData.type == 1) {
        if (this.serviceDetailsData.status == 1) {
          this.active = 2;
        }
        if (this.serviceDetailsData.status == 2) {
          this.active = 3;
        }
        if (this.serviceDetailsData.status == 3) {
          this.active = 4;
        }
        if (
          this.serviceDetailsData.status == 5 ||
          this.serviceDetailsData.status < 0
        ) {
          this.active = 5;
        }
        if (this.serviceDetailsData.status == -2) {
          this.active = 3;
        }
      }
      if (
        this.serviceDetailsData.type == 2 ||
        this.serviceDetailsData.type == 3
      ) {
        if (this.serviceDetailsData.status == 1) {
          this.active = 2;
        }
        if (this.serviceDetailsData.status == 2) {
          this.active = 3;
        }
        if (this.serviceDetailsData.status == 2 && this.serviceDetailsData.receivetime > 0) {
          this.active = 4;
        }
		// if (this.serviceDetailsData.is_receive == 0 && this.serviceDetailsData.status == 1) {
		// 	this.active = 4;
		// }
        if (
          this.serviceDetailsData.status == 4 ||
          this.serviceDetailsData.status < 0
        ) {
          this.active = 5;
        }
        if (this.serviceDetailsData.status == -2) {
          this.active = 3;
        }
      }
    },
  },
  created() {
    var data = {
      rec_id: this.$route.query.rec_id || null,
    };
    this.serviceDetails(data);
  },
};
</script>

<style scoped>
@import "@/static/css/myaccount.css";
@import "@/static/css/return.add.css";
.liaduebox .sheefshjk .cilckmor span {
  color: #005ea7;
  cursor: pointer;
}
</style>
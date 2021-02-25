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
  <div class="home-index-middle">
    <div class="w1224">
      <div class="g-crumbs">
        <nuxt-link :to="{ name: 'user_index'}">{{i18n.my_mall}}</nuxt-link>
        <i class="litt-xyb"></i>
		 <nuxt-link :to="{name:'dispute'}">{{i18n.trade_dispute}}</nuxt-link>
        <i class="litt-xyb"></i>
        <span>{{i18n.dispute_application}}</span>
      </div>
      <div class="apply-list-flowpath p">
        <div class="flowpath">
          <div class="line-flowpath">
            <span class="green now">
              <i class="las-flo"></i>
              <em>{{i18n.submit_single_dispute}}</em>
            </span>
            <span>
              <i class="las-flo2"></i>
              <em>{{i18n.seller_deal_with}}</em>
            </span>
            <span>
              <i class="las-flo3"></i>
              <em>{{i18n.client_affirm}}</em>
            </span>
            <span>
              <i class="las-flo4"></i>
              <em>{{i18n.complete}}</em>
            </span>
          </div>
          <div class="warning">
            <i class="las-warning"></i>
            <span>{{i18n.remind_one}}</span>
            <span class="fr">
              {{i18n.conditions_met}}？
			  <nuxt-link
			    :to="{name:'return_goods_index'}"
			  >{{i18n.click_apply}}</nuxt-link>
            </span>
          </div>
        </div>
        <div class="applydamage">
          <h2>{{i18n.apply_single_dispute}}</h2>
          <div class="formsinm">
            <div class="titin_form p">
              <span>
                <em class="light">{{i18n.order_number}}：</em>
                <em>
				  <nuxt-link :to="{name:'order_detail',query:{order_id:orderDetailsData.order_id}}">{{orderDetailsData.order_sn}}</nuxt-link>
                </em>
              </span>
              <span>
                <em class="light">{{i18n.order_time}}：</em>
                <em>{{orderDetailsData.add_time_detail}}</em>
              </span>
              <span class="teri">
				<a :href="'tencent://message/?uin=' + store.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
				  <em class="num">
				    {{store.store_name}}
				    <i class="ear"></i>
				  </em>
				</a>
              </span>
            </div>
            <div class="contcs_form p">
              <div class="lort-l" v-if="order_goods.length>0">
                <div class="infoemx">	
                  <!--只有一件商品时，商品名显示
                  大于一件商品时商品名不显示-->
                  <div v-for="(item) in order_goods" :key="item.rec_id" >
					<nuxt-link :to="{ name: 'goods/goodsInfo/id',query:{id:item.goods_id}}" target="_blank">
                      <img
                        :src="apiHead + '/mall/goods/thumb_image?width=60&height=60&goods_id=' + item.goods_id"
                      />
					  <div v-if="order_goods.length==1" class="aloneli">{{order_goods[0].goods_name}}</div>
                    </nuxt-link>
                  </div>
                  <!-- {{order_goods.length}} -->
				
                </div>
              </div>
              <div class="lort-r">
                <span>{{i18n.order_total}}{{i18nCommon.symbol}}{{Number(orderDetailsData.total_amount).toFixed(2)}}</span>
              </div>
            </div>
          </div>
          <form action id="disputeform" method="post">
            <div class="formsatrdad cantsubmit p">
              <!--cantsubmit控制售后服务单和纠纷提示信息的显示和隐藏还有提交按钮背景-->
              <ul class="birth_jz">
                <li class="serve_lifir">
                  <em>*</em>
                  <span>{{i18n.dispute_type}}：</span>
                </li>
                <li class="wifull">
                  <div class="choosetyp">
                    <el-select
                      v-model="subject_id"
                      :placeholder="i18n.please_select"
                      size="mini"
                      @change="checkComplainType"
                    >
                      <el-option
                        v-for="item in disputeData"
                        :key="item.subject_id"
                        :label="item.subject_name"
                        :value="item.subject_id"
                      ></el-option>
                    </el-select>
                  </div>
                  <p class="jins tipcant" v-if="this.msg != ''">
                    <i class="las-wty"></i>
                    <!-- <span>该纠纷类型暂无法提交，可能是您的订单已完成，或您已申请过同类型的纠纷单，建议您优先联系卖家客服处理。前往帮助中心了解<a href="">纠纷发起规则</a>。</span> -->
                    <span v-html="msg"></span>
                  </p>
                </li>
              </ul>
              <!--纠纷类型无法提交时显示-s-->
              <ul class="birth_jz tipcant" id="birth_jzul" v-if="selectReturnGoods">
                <li class="serve_lifir">
                  <em>*</em>
                  <span>{{i18n.dispute_type}}：</span>
                </li>
                <li class="wifull" id="wifulldata" v-if="returnGoods.length > 0">
                  <div class="choosetyp6">
                    <span style="width:20%">{{i18n.whether_choose}}</span>
                    <span style="width:20%">{{i18n.after_service_order}}</span>
                    <span style="width:40%">{{i18n.parallelism_goods}}</span>
                    <span style="width:20%">{{i18n.service_order_status}}</span>
                  </div>
                  <div class="choosetyp6" v-for="item in returnGoods" :key="item.rec_id">
                    <span style="width:20%">
                      <input @change="checkReturnGoods(item)" checked type="radio" />&nbsp;&nbsp;117
                    </span>
                    <span style="width:20%">
                      <a href="#" target="_blank">
                        <img
                          :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.goods_id"
                        />
                      </a>
                    </span>
                    <span style="width:40%">
                      <a
                        class="shop_name_ir"
                        href="#"
                        target="_blank"
                      >
                        {{item.goods_name}}
                      </a>
                    </span>
                    <span style="width:20%">{{item.status_desc}}</span>
                  </div>
                </li>
                <li class="wifull" id="wifulldata" v-if="returnGoods.length == 0">
                  <div class="choosetyp6">
                    <span style="width:20%">{{i18n.whether_choose}}</span>
                    <span style="width:20%">{{i18n.after_service_order}}</span>
                    <span style="width:40%">{{i18n.parallelism_goods}}</span>
                    <span style="width:20%">{{i18n.service_order_status}}</span>
                  </div>
                  <div class="applyrestore">
                    <p class="tit">{{i18n.nomeet_conditions}}</p>
                    <p class="mali">{{i18n.conditions_one}}</p>
                    <nuxt-link
                      :to="{name:'return_goods_index'}"
                    >{{i18n.exchanged}}</nuxt-link>
                  </div>
                </li>
              </ul>
              <!--纠纷类型无法提交时显示-e-->
              <ul class="birth_jz">
                <li class="serve_lifir">
                  <em>*</em>
                  <span>{{i18n.problem_description}}：</span>
                </li>
                <li class="wifull">
                  <div class="choosetyp2">
                    <el-input
                      type="textarea"
                      :placeholder="i18n.please_enter_content"
                      v-model="form.complain_content"
                      maxlength="500"
                      show-word-limit
                    ></el-input>
                  </div>
                  <p
                    class="warjs"
                  >{{i18n.type_one}}</p>
                </li>
              </ul>
              <ul class="birth_jz">
                <li class="serve_lifir">
                  <em>&nbsp;</em>
                  <span>{{i18n.evidence_upload}}：</span>
                </li>
                <li class="wifull">
                  <div class="choosetyp3">
                    <ul id="imgli">
                      <li>
                        <!-- <a href="javascript:;" onclick="imgupload()">
                          <img src="/template/pc/rainbow/static/images/tj.jpg" />
                        </a>-->
                        <el-upload
                          action="/mall/upload?type=complain"
                          list-type="picture-card"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                      </li>
                    </ul>
                  </div>
                  <p>
                    <em id="imgnum">0</em>/5 {{i18n.size_picture}}
                  </p>
                </li>
              </ul>
              <ul class="birth_jz">
                <li class="serve_lifir">
                  <em>*</em>
                  <span>{{i18n.contact_way}}：</span>
                </li>
                <li class="wifull">
                  <div class="choosetyp4">
                    <span @click="contactWay(0)" :class="nexyt==0 ? 'nexyt' : ''">
                      {{userInfo.nickname}}-{{userInfo.mobile}}
                      <i class="las-pd"></i>
                    </span>
                    <span @click="contactWay(1)" :class="nexyt==1 ? 'nexyt' : ''">
                      {{i18n.consignee}}-{{orderDetailsData.consignee}}-{{orderDetailsData.mobile}}
                      <i
                        class="las-pd"
                      ></i>
                    </span>
                    <!-- <input type="hidden" name="user_contact" value="波哥-13888888888" /> -->
                  </div>
                </li>
              </ul>

              <ul class="birth_jz">
                <li class="wifull">
                  <div class="choosetyp5">
                    <el-button
                      type="danger"
                      :disabled="msg != '' || subject_id==null ?true:false "
                      @click="applysubmit()"
                    >{{i18n.affirm_submit}}</el-button>
                    <!-- <a href="javascript:;" id="disputesubmit" onclick="applysubmit()">确认提交</a> -->
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getorderDetails,
  getDisputeType,
  returnRecordList,
  applicationDispute,
  getOrderGoodsList,
  getStore
} from "@/utils/api.js";
import { getUser } from "@/utils/auth.js";
export default {
  data() {
    return {
      dialogImageUrl: "", //图片路径
      dialogVisible: false, //
      orderDetailsData: {
        order_goods: []
      }, //订单数据
      userInfo: getUser(), //个人信息
      order_goods: [], //
      disputeData: [], //纠纷类型
      subject_id: null, //投诉类型id
      msg: "",
      returnGoods: [],
      selectReturnGoods: false,
      form: {
        user_name: "", //原告名称
        user_contact: "", //原告联系方式
        complain_subject_id: null,
        order_id: "",
        order_sn: "",
        store_id: "",
        order_goods_id: "",
        complain_pic: "", //投诉图片
        complain_content: ""
      },
      nexyt: 0, //联系方式
      imageUrl: [], //证据上传
      shopClone: {},//克隆下来的商品
	  time: new Date().getTime() / 1000,
	  store: {} //店铺信息
    };
  },
  computed: {
    i18n() {
			return this.$t('order.order_index') 
    },
    i18nCommon () {
      return this.$t('common')  
    }
  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl.push(res.result);
    },
    beforeAvatarUpload(file) {
      var that = this
      const isLt5M = file.size / 1024 / 1024 < 5;
      const isLength = this.imageUrl.length < 5;
      if (!isLength) {
        this.$message.error(that.i18n.five_pictures);
      }
      if (!isLt5M) {
        this.$message.error(that.i18n.picture_size);
      }
      return isLength && isLt5M;
    },
    //图片删除
    handleRemove(file, fileList) {
      if (file.response != undefined) {
        this.imageUrl = this.imageUrl.filter(function(item, index, array) {
          return item != file.response.result;
        });
      }
    },
    //图片放大查看
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //提交
    applysubmit() {
      var _this = this;
      var image = this.imageUrl.join(",");
      this.form = {
        user_name: "", //原告名称
        user_contact: "", //原告联系方式
        complain_content: this.form.complain_content,
        complain_subject_id: this.subject_id,
        order_id: this.orderDetailsData.order_id,
        order_sn: this.orderDetailsData.order_sn,
        store_id: this.orderDetailsData.store_id,
        order_goods_id: this.order_goods.length == 1 ? this.order_goods[0].rec_id : 0, //0
        complain_pic: image //投诉图片
      };
      if (this.nexyt == 0) {
        this.form.user_name = this.userInfo.nickname;
        this.form.user_contact = this.userInfo.mobile;
      } else {
        this.form.user_name = this.orderDetailsData.consignee;
        this.form.user_contact = this.orderDetailsData.mobile;
      }
      if (this.selectReturnGoods) {
        this.form.order_goods_id = this.shopClone.rec_id;
      }
      applicationDispute(this.form).then(res => {
        if (res.status == 1) {
          _this.$alert(_this.i18n.complaint_succeed, _this.i18n.message, {
            confirmButtonText: _this.i18n.confirm,
            callback: action => {
              _this.$router.push({ name: "dispute" });
            }
          });
        } else {
			 this.$message.error(_this.i18n.complaint_lose);
        }
      });
    },
    //联系方式
    contactWay(i) {
      this.nexyt = i;
    },
    orderDetails(data) {
	  var _this = this;
      getorderDetails(data).then(res => {
        this.orderDetailsData = res;
      }).then(() => {
		  if (this.orderDetailsData.order_id != null) {
			  getOrderGoodsList({
			  	  order_ids: this.orderDetailsData.order_id
			  }).then(res => {
			  	  _this.order_goods = res;
			  }).then(() => {
				  returnRecordList({
				    order_id: _this.orderDetailsData.order_id
				  }).then(res => {
					  _this.returnGoods = res;
					  // _this.returnGoods.push(res[0])
					  if (_this.returnGoods.length > 0) {
						  _this.order_goods.forEach(og => {
						  	  _this.returnGoods.forEach(rg => {
						  		  if (rg.goods_id == og.goods_id) {
						  			  rg.goods_name = og.goods_name;
						  		  }
						  	  })
						  })
					  }
				  })
				  getStore({
					  store_id: this.orderDetailsData.store_id
				  }).then(res => {
					  _this.store = res;
				  })
			  })
		  }
	  })
    },
    disputeType() {
      getDisputeType().then(res => {
        this.disputeData = res;
      });
    },
    checkComplainType() {
      var _this = this
      this.msg = "";
      this.selectReturnGoods = false;
      var arr = [2, 3, 7, 8, 9, 10];
      if (this.subject_id == 1 && this.orderDetailsData.shipping_status == 1) {
        //配送投诉，如果卖家已经发货，所以不能提交
        this.msg =
          `${_this.i18n.msg_one}<a href=''>${_this.i18n.dispute}</a>。`;
      }
      if (arr.indexOf(this.subject_id) > -1) {
        this.selectReturnGoods = true;
		if (this.returnGoods.length == 0) {
		this.msg =
		  `${_this.i18n.msg_two}<a href=''>${_this.i18n.dispute}</a>。`;
		} else if (this.returnGoods.length == 1) {
			if (this.returnGoods[0].status == 0) {
				if (this.returnGoods[0].addtime + 48 * 3600 > this.time) {
					this.msg = _this.i18n.msg_three;
				}
			}
		}
      }
    },
    checkReturnGoods(row) {
      // var time = new Date().getTime() / 1000;
      var _this =this
      this.shopClone = JSON.parse(JSON.stringify(row));
      if (row.status == -2) {
        this.msg =_this.i18n.msg_four;
      }
      if (row.status == 0) {
        if (row.addtime + 48 * 3600 > this.time) {
          this.msg = _this.i18n.msg_three;
        }
      }
      if (row.status >= 1) {
        if (this.subject_id == 10) {
          if (row.delivery == null) {
            this.msg =_this.i18n.msg_five;
          } else if (row.receivetime + 48 * 3600 > this.time) {
            this.msg =_this.i18n.msg_six;
          }
        }
        if (this.subject_id == 9 && row.status < 4) {
          this.msg =_this.i18n.msg_seven;
        }
      }
      //未找到退货退款服务单
      if (!(this.subject_id < 4 && row.type == 1)) {
        this.msg =_this.i18n.msg_eight;
      }
      //未找到换货维修服务单
      if (this.subject_id > 6 && row.type == 0) {
        this.msg =_this.i18n.msg_eight;
      }
    }
  },
  created() {
    var data = {
      order_sn: this.$route.query.order_sn
    };
    this.orderDetails(data);
    this.disputeType();
  }
};
</script>

<style scoped>
>>> .el-upload--picture-card {
  width: 60px;
  height: 60px;
  line-height: 60px;
}
>>> .el-upload-list--picture-card .el-upload-list__item {
  width: 60px;
  height: 60px;
}
</style>

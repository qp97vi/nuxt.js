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
    <div class="main-banner-warp">
      <div class="main-banner">
        <img src="@/static/images/join-banner.jpg" alt />
        <a class="join-btn btn-item" @click="apply()">{{i18n.promptly_enter}}</a>
        <a class="selete-btn btn-item" @click="apply()">{{i18n.inquire_progress}}</a>
      </div>
    </div>
    <div class="hot-brand show-center-1224">
      <h3 class="title">
        {{i18n.rezhao_brand}}
        <span></span>
      </h3>
      <h4 class="sub-title">
        <span></span>Business brand
      </h4>
      <p class="des">{{i18n.serve_one}}</p>
      <ul class="pros-list children-a-100 clearfix">
        <li>
          <a href="javascript:;">
            <i class="ico-food pro-icon"></i>
            <h5 class="pro-name">{{i18n.classify_one}}</h5>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="ico-maintain pro-icon"></i>
            <h5 class="pro-name">{{i18n.classify_two}}</h5>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="ico-digital pro-icon"></i>
            <h5 class="pro-name">{{i18n.classify_three}}</h5>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="ico-fruits pro-icon"></i>
            <h5 class="pro-name">{{i18n.classify_four}}</h5>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="ico-clothes pro-icon"></i>
            <h5 class="pro-name">{{i18n.classify_five}}</h5>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="ico-drinks pro-icon"></i>
            <h5 class="pro-name">{{i18n.classify_six}}</h5>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="ico-snacks pro-icon"></i>
            <h5 class="pro-name">{{i18n.classify_seven}}</h5>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="ico-pregnant pro-icon"></i>
            <h5 class="pro-name">{{i18n.classify_eight}}</h5>
          </a>
        </li>
      </ul>
    </div>
    <div class="business-join show-center-1224">
      <h3 class="title">{{i18n.merchant_enter}}</h3>
      <h4 class="sub-title">Merchants settled</h4>
      <ul class="business-list clearfix" id="business-list">
        <li>
          <i class="ico-business item-icon"></i>
          <h5 class="item-title">{{i18n.attract_plan}}</h5>
          <p class="item-des">{{i18n.attract_rule}}</p>
		  <router-link class="item-btn" :to="{name:'help',query:{help_id: 1}}">{{i18n.view_investment_plan}}</router-link>
        </li>
        <li>
          <i class="ico-cooperation item-icon"></i>
          <h5 class="item-title">{{i18n.in_process}}</h5>
          <p class="item-des">{{i18n.view_notes}}</p>
		  <router-link class="item-btn" :to="{name:'help',query:{help_id: 4}}">{{i18n.check_process}}</router-link>
        </li>
        <li>
          <i class="ico-standard item-icon"></i>
          <h5 class="item-title">{{i18n.inqualification}}</h5>
          <p class="item-des">{{i18n.standard_review}}</p>
		  <router-link class="item-btn" :to="{name:'help',query:{help_id: 2}}">{{i18n.check_qualification}}</router-link>
        </li>
        <li style="margin-right: 0px;">
          <i class="ico-more item-icon"></i>
          <h5 class="item-title">{{i18n.tariff_standard}}</h5>
          <p class="item-des">{{i18n.check_category_rates}}</p>
		  <router-link class="item-btn" :to="{name:'help',query:{help_id: 3}}">{{i18n.check_rates}}</router-link>
        </li>
      </ul>
      <!-- <script>
  /*兼容ie8*/
  $("#business-list")
    .find("li:nth-child(4n+4)")
    .css("margin-right", "0");
      </script>-->
    </div>
    <div class="join-step show-center-1224">
      <h3 class="title">
        <span class="left-line"></span>{{i18n.in_process}}
        <span class="right-line"></span>
      </h3>
      <div class="step-cont clearfix">
        <div class="left-pic">
          <img src="@/static/images/join-process.png" alt />
        </div>
        <div class="right-list">
          <ul class="step-list clearfix">
            <li>
              <i class="ico-step1 left-icon"></i>
              <p class="step-title">
                <span class="step-num">1</span>{{i18n.applicationin}}
              </p>
              <p class="step-des">{{i18n.prepare_store_data}}</p>
              <p class="step-des">{{i18n.fill_house}}</p>
              <p class="step-des">{{i18n.upload_qualification}}</p>
            </li>
            <li>
              <i class="ico-step2 left-icon"></i>
              <p class="step-title">
                <span class="step-num">2</span>{{i18n.sign_agreement}}
              </p>
              <p class="step-des">{{i18n.online_reviews}}</p>
              <p class="step-des">{{i18n.confirmed_both_sides}}</p>
              <p class="step-des">{{i18n.merchants_mail}}</p>
            </li>
            <li>
              <i class="ico-step3 left-icon"></i>
              <p class="step-title">
                <span class="step-num">3</span>{{i18n.open_shop}}
              </p>
              <p class="step-des">{{i18n.setout_one}}</p>
              <p class="step-des">{{i18n.setout_two}}</p>
              <p class="step-des">{{i18n.setout_three}}</p>
            </li>
            <li>
              <i class="ico-step4 left-icon"></i>
              <p class="step-title">
                <span class="step-num">4</span>{{i18n.commodity_sales}}
              </p>
              <p class="step-des">{{i18n.goods_entry}}</p>
              <p class="step-des">{{i18n.decoration_shop}}</p>
              <p class="step-des">{{i18n.online_sales}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="join-cooperation">
      <div class="show-center-1224">
        <h3 class="title">
          {{i18n.cooperation_model}}
          <span></span>
        </h3>
        <h4 class="sub-title">
          <span></span>Mall cooperation model
        </h4>
      </div>
      <p class="des">{{i18n.pattern_one}}</p>
      <div class="tab-warp">
        <div class="tab-inner show-center-1224 clearfix" id="join-tab1">
          <ul class="tab-nav">
            <li class="checked">
              <i class="ico-tabitem1 tab-icon"></i>
              <p class="tab-title">{{i18n.platform_model}}</p>
              <span class="white-arrow"></span>
            </li>
            <li>
              <i class="ico-tabitem2 tab-icon"></i>
              <p class="tab-title">{{i18n.selfoperation_model}}</p>
              <span class="white-arrow"></span>
            </li>
            <li>
              <i class="ico-tabitem3 tab-icon"></i>
              <p class="tab-title">{{i18n.joint_model}}</p>
              <span class="white-arrow"></span>
            </li>
            <li>
              <i class="ico-tabitem4 tab-icon"></i>
              <p class="tab-title">{{i18n.overseas_shopping_model}}</p>
              <span class="white-arrow"></span>
            </li>
            <li>
              <i class="ico-tabitem5 tab-icon"></i>
              <p class="tab-title">{{i18n.sale_model}}</p>
              <span class="white-arrow"></span>
            </li>
            <li style="margin-bottom: 0px;">
              <i class="ico-tabitem6 tab-icon"></i>
              <p class="tab-title">{{i18n.swl_model}}</p>
              <span class="white-arrow"></span>
            </li>
          </ul>
          <ul class="tab-cont">
            <li class="active clearfix">
              <div class="left-des">
                <p class="des-title">{{i18n.platform_introduction}}</p>
                <p class="des-cont">1、{{i18n.introduce_one}}</p>
                <p class="des-cont">2、{{i18n.introduce_two}}</p>
                <p class="des-cont">3、{{i18n.introduce_therr}}</p>
                <p class="des-cont">4、{{i18n.introduce_four}}</p>
                <p class="des-cont">
                  5、{{i18n.introduce_five}}
                </p>
                <a class="more-btn" href="javascript:;">
                  {{i18n.find_details}}
                  <span></span>
                </a>
              </div>
              <div class="right-pic">
                <img src="@/static/images/join-ally-module.png" alt />
              </div>
            </li>
            <li class="clearfix">
              <div class="left-des">
                <p class="des-title">{{i18n.platform_introduction}}</p>
                <p class="des-cont">1、{{i18n.introduce_one}}</p>
                <p class="des-cont">2、{{i18n.introduce_two}}</p>
                <p class="des-cont">3、{{i18n.introduce_therr}}</p>
                <p class="des-cont">4、{{i18n.introduce_four}}</p>
                <p class="des-cont">
                  5、{{i18n.introduce_five}}
                </p>
                <a class="more-btn" href="javascript:;">
                  {{i18n.find_details}}
                  <span></span>
                </a>
              </div>
            </li>
            <li class="clearfix">
              <div class="right-pic">
                <img src="@/static/images/join-ally-module.png" alt />
              </div>
            </li>
            <li class="clearfix">
              <div class="left-des">
                <p class="des-title">{{i18n.platform_introduction}}</p>
                <p class="des-cont">1、{{i18n.introduce_one}}</p>
                <p class="des-cont">2、{{i18n.introduce_two}}</p>
                <p class="des-cont">3、{{i18n.introduce_therr}}</p>
                <p class="des-cont">4、{{i18n.introduce_four}}</p>
                <p class="des-cont">
                  5、{{i18n.introduce_five}}
                </p>
                <a class="more-btn" href="javascript:;">
                  {{i18n.find_details}}
                  <span></span>
                </a>
              </div>
              <div class="right-pic">
                <img src="@/static/images/join-ally-module.png" alt />
              </div>
            </li>
            <li class="clearfix">
              <div class="left-des">
                <p class="des-title">{{i18n.platform_introduction}}</p>
                <p class="des-cont">1、{{i18n.introduce_one}}</p>
                <p class="des-cont">2、{{i18n.introduce_two}}</p>
                <p class="des-cont">3、{{i18n.introduce_therr}}</p>
                <p class="des-cont">4、{{i18n.introduce_four}}</p>
                <p class="des-cont">
                  5、{{i18n.introduce_five}}
                </p>
                <a class="more-btn" href="javascript:;">
                  {{i18n.find_details}}
                  <span></span>
                </a>
              </div>
              <div class="right-pic">
                <img src="@/static/images/join-ally-module.png" alt />
              </div>
            </li>
            <li class="clearfix">
              <div class="left-des">
                <p class="des-title">{{i18n.platform_introduction}}</p>
                <p class="des-cont">1、{{i18n.introduce_one}}</p>
                <p class="des-cont">2、{{i18n.introduce_two}}</p>
                <p class="des-cont">3、{{i18n.introduce_therr}}</p>
                <p class="des-cont">4、{{i18n.introduce_four}}</p>
                <p class="des-cont">
                  5、{{i18n.introduce_five}}
                </p>
                <a class="more-btn" href="javascript:;">
                  {{i18n.find_details}}
                  <span></span>
                </a>
              </div>
              <div class="right-pic">
                <img src="@/static/images/join-ally-module.png" alt />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <script>
  var $_tab1 = $("#join-tab1");
  /*兼容ie8*/
  $_tab1.find(".tab-nav li:last-child").css("margin-bottom", "0");
  $_tab1.find(".tab-nav li").click(function() {
    //点击切换列表
    $(this)
      .addClass("checked")
      .siblings()
      .removeClass("checked");
    $_tab1
      .find(".tab-cont li")
      .eq($(this).index())
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
      </script>-->
    </div>
  </div>
</template>

<script>
import { getStoreApplyInfo } from "@/utils/api.js";
export default {
  data() {
    return {
      form: {
        apply_type: 1
      }
    };
  },
  computed: {
    i18n() {
		  return this.$t('newjoin.newjoin_index')
    }
  },
  methods: {
    apply() {
      // this.$router.push("agreement");
      let that = this;
      getStoreApplyInfo().then(res => {
        if (res.msg) {
          that.$message.error(res.msg);
          return;
        }
        if (!res) {
          //未入驻，进入第一步
          that.$router.push("agreement");
        } else {
          let state = res.apply_state;
          if (state == 0) {
            //未审核
            if (res.apply_type == 1) {
              //个人入驻
              //店铺身份信息是否完成
              if (res.store_name) {
                //审核结果页
                that.$router.push("apply_info");
              } else {
                //填写店铺身份信息
                that.$router.push("seller_info");
              }
            } else {
              //企业入驻
              //公司信息是否完成
              if (!res.company_name) {
                //填写公司信息表单页
                that.$router.push("basic_info");
              } else if (!res.store_name) {
                //填写店铺身份信息
                that.$router.push("seller_info");
              } else if (!res.business_licence_cert) {
                //资质上传页
                that.$router.push("remark");
              } else {
                that.$router.push("apply_info");
              }
            }
          } else if (state == 1 || state == 2) {
            //审核通过/失败
            that.$router.push("apply_info");
          }
        }
      });
    }
  }
};
</script>
<style>
@import "@/static/css/join.css";
.main-banner-warp {
  margin-top: 154px;
}
</style>
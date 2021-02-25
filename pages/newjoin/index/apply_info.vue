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
  <div id="apply_info">
    <div class="gome-layout-area pb50 clearfix">
      <ul class="steps clearfix">
        <li class="first prev ok">
          <b>1</b>
          <span class="going"></span>
          <em class="f">{{i18n.in_instructions}}</em>
        </li>
        <li class="prev ok">
          <b>2</b>
          <span class="going"></span>
          <em class="f">{{i18n.write_company_message}}</em>
        </li>
        <li class="prev ok">
          <b>3</b>
          <span class="going"></span>
          <em class="f">{{i18n.write_shop_message}}</em>
        </li>
        <li class="prev ok">
          <b>4</b>
          <span class="going"></span>
          <em class="f">{{i18n.qualification_upload}}</em>
        </li>
        <li class="last">
          <b>5</b>
          <em class="f">{{i18n.wait_review}}</em>
        </li>
      </ul>
      <div class="store-joinin-apply">
        <div class="main">
          <div class="main" v-if="apply_state === 0">
            <div class="explain">
              <i></i>
              <p style="text-align:center;">{{i18n.review_one}}</p>
            </div>
          </div>
          <div class="main" v-if="apply_state == 2">
            <div class="explain">
              <i></i>
              <p style="text-align:center;color:red;">{{i18n.review_tow}}</p>
            </div>
            <div class="bottom">
			<nuxt-link :to="{ name: 'basic_info'}" class="btn btn-primary">{{i18n.amend_application}}</nuxt-link>
              <nuxt-link :to="{ name: 'index'}" class="btn">{{i18n.return_home}}</nuxt-link>
            </div>
          </div>
          <div class="main" v-else-if="apply_state == 1">
            <div class="explain">
              <i></i>
              <div class="operat-tips success">
                <h4>
                  <i></i>{{i18n.found_succeed}}
                </h4>
                <ul class="operat-panel">
                  <li>
                    <span>{{i18n.release_commodities}}</span>
                  </li>
                  <li>
                    <span>
                      {{i18n.also_log}}
                      <a class="btn-link" href="/Seller/Admin/login.html">{{i18n.incenter}}</a>
                      {{i18n.view_status}}
                    </span>
                  </li>
                  <li>
                    <span>{{i18n.customer_service}}</span>
                  </li>
                </ul>

                <div class="bottom">
                  <a class="btn btn-primary" href="http://jseller.tpsns.com">{{i18n.seller_center}}</a>
				  <nuxt-link :to="{ name: 'index'}" class="btn">{{i18n.return_home}}</nuxt-link>
                </div>
                <p class="handle">
                  {{i18n.canalso}}
                  <a class="btn-link" href="http://jseller.tpsns.com">{{i18n.perfect_information}}</a>
                </p>
              </div>
            </div>
            <div class="bottom"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStoreApplyInfo } from "@/utils/api.js";
export default {
  data() {
    return {
      apply_state: 0
    };
  },
  created() {
    this.apply();
  },
  computed: {
    i18n() {
	  	return this.$t('newjoin.apply_info') 
    }
  },
  methods: {
    apply() {
      let that = this;
      getStoreApplyInfo().then(res => {
        if (res) {
          that.apply_state = res.apply_state;
        } else {
          that.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
@import "@/static/css/qt_style.css";
@import "@/static/css/apply_info.css";
#apply_info {
  margin-top: 150px;
  display: flex;
}
</style>
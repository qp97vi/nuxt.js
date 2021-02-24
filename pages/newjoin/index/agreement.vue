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
  <div id="agreement">
    <div class="agreement-e">
      <form action id="queryForm" name="query" method="post">
        <div class="gome-layout-area pb50 clearfix">
          <ul class="steps clearfix">
            <li class="first cur ok">
              <b>1</b>
              <span class="going"></span>
              <em class="f">{{i18n.in_instructions}}</em>
            </li>
            <li>
              <b>2</b>
              <span></span>
              <em class="f">{{i18n.basic_information}}</em>
            </li>
            <li>
              <b>3</b>
              <span></span>
              <em class="f">{{i18n.write_shop_message}}</em>
            </li>
            <li>
              <b>4</b>
              <span></span>
              <em class="f">{{i18n.qualification_upload}}</em>
            </li>
            <li class="last">
              <b>5</b>
              <em class="f">{{i18n.wait_review}}</em>
            </li>
          </ul>
          <div class="settled-agreement">
            <div class="agreement-title">
              <span>{{i18n.protocol_validation}}</span>
            </div>
            <div class="agreement-con">
              <div class="agreement-article">
                <p>
                  {{i18n.terms_compliance}}
                  <br />
                  <br />1.{{i18n.user_qualification}}
                  <br />{{i18n.status_one}}
                  <br />
                  <br />2.{{i18n.information}}
                  <br />*{{i18n.information_one}}
                  <br />*{{i18n.information_two}}
                  <br />*{{i18n.information_three}}
                  <br />*{{i18n.information_four}}
                  <br />*{{i18n.information_five}}
                  <br />*{{i18n.information_six}}
                  <br />
                  <br />3.{{i18n.violate_treaty}}
                  <br />{{i18n.default_one}}
                  <br />(a){{i18n.default_two}}
                  <br />(b){{i18n.default_three}}
                  <br />(c){{i18n.default_four}}
                  <br />
                  <br />4.{{i18n.limitation_liability}}
                  <br />{{i18n.disclaimers_one}}
                  <br />
                  <br />5.{{i18n.agentless}}
                  <br />{{i18n.agentless_one}}
                  <br />
                  <br />6.{{i18n.general_rule}}
                  <br />{{i18n.stipulate_one}}
                </p>
              </div>
            </div>
          </div>
          <label class="agree clearfix">
            <input
              type="checkbox"
              hidefocus="ture"
              name="check2"
              v-model="check"
              id="check2"
              class="inputcheck"
            />{{i18n.accept}}
          </label>
          <div class="gome-btn">
            <!-- <a href="javascript:nextStep();" >同意并继续</a> -->
            <a href="javascript:void(0)" class="gome-btn-red" @click="agreeAndNext()">{{i18n.agree_ahead}}</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      check: false
    };
  },
  computed: {
    i18n() {
	  	return this.$t('newjoin.agreement') 
    }
  },
  methods: {
    agreeAndNext() {
      var _this = this
      if (this.check) {
        this.$router.push("contact");
      } else {
        this.$message.error(_this.i18n.next);
      }
    }
  }
};
</script>

<style scoped>
@import "@/static/css/qt_style.css";
#agreement {
  margin-top: 150px;
  display: flex;
}
.agreement-e {
  margin: auto;
}
</style>
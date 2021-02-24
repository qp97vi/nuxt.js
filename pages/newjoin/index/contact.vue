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
  <div id="contact">
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
          <em class="f">{{i18n.fillin}}{{form.apply_type == 1 ? i18n.store:i18n.company}}{{i18n.message}}</em>
        </li>
        <li>
          <b>3</b>
          <span></span>
          <em class="f">{{i18n.fillin}}{{form.apply_type == 1 ? i18n.identity:i18n.store}}{{i18n.message}}</em>
        </li>
        <li>
          <b>4</b>
          <span></span>
          <em class="f">{{form.apply_type == 1 ? i18n.settlement_account:i18n.qualification_upload}}</em>
        </li>
        <li class="last">
          <b>5</b>
          <em class="f">{{i18n.wait_review}}</em>
        </li>
      </ul>
      <div class="settled-agreement-table pb50">
        <div class="agreement-title">
          <span>{{i18n.contact_way}}</span>
        </div>
        <form id="contact_info">
          <table cellpadding="0" cellspacing="0" border="0" class="information-table">
            <tbody>
              <tr>
                <th class="fw700 pr7">{{i18n.contact_information}}</th>
                <td class="color01">{{i18n.explain_one}}</td>
              </tr>
              <tr>
                <th>
                  <em class="em-red">*</em>{{i18n.contact_name}}：
                </th>
                <td width="495">
                  <input
                    v-model="form.contacts_name"
                    maxlength="20"
                    type="text"
                    id="contacterName"
                    name="contacts_name"
                    class="input260 fl"
                  />
                  <p
                    class="err-msg"
                    v-if="errResult.contacts_name && !form.contacts_name"
                  >{{errResult.contacts_name}}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <em class="em-red">*</em>{{i18n.contact_phone}}：
                </th>
                <td>
                  <input
                    v-model="form.contacts_mobile"
                    type="text"
                    id="contacterMobile"
                    name="contacts_mobile"
                    class="input260 fl"
                  />
                  <p class="err-msg" v-if="errResult.contacts_mobile">{{errResult.contacts_mobile}}</p>
                </td>
              </tr>
              <tr>
                <th>
                  <em class="em-red">*</em>{{i18n.contact_email}}：
                </th>
                <td>
                  <input
                    v-model="form.contacts_email"
                    type="text"
                    id="email"
                    name="contacts_email"
                    class="input260 fl"
                  />
                  <p class="err-msg" v-if="errResult.contacts_email">{{errResult.contacts_email}}</p>
                </td>
              </tr>
              <tr v-if="$store.state.shop_config.store_entry_type == 0">
                <th>
                  <em class="em-red">*</em>{{i18n.application_type}}：
                </th>
                <td>
                  <input
                    v-model="form.apply_type"
                    style="width: 14px; height: 12px;"
                    type="radio"
                    checked
                    :value="1"
                  />{{i18n.individualsin}}
                  <input
                    v-model="form.apply_type"
                    style="width: 14px; height: 12px;"
                    type="radio"
                    :value="0"
                  />{{i18n.enterprises}}
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div class="gome-btn">
          <a href="javascript:void(0);" class="gome-btn-red" @click="nextStep()">{{i18n.next_fill}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveStoreApply } from "@/utils/api.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        apply_type: 1
      },
      errResult: {}
    };
  },
  computed: {
    i18n() {
		  return this.$t('newjoin.contact')
    }
  },
  created() {
	this.shopConfig()
	if (this.$store.state.shop_config.store_entry_type == 1) {
		this.form.apply_type = 0
	}
  },
  methods: {
  ...mapActions(['shopConfig']),
    nextStep() {
      let checkFail = false;
      let that = this;
      if (!this.form.contacts_name) {
        checkFail = true;
        this.errResult.contacts_name = that.i18n.write_contact_name;
      }
      if (!this.form.contacts_mobile) {
        checkFail = true;
        this.errResult.contacts_mobile = that.i18n.write_contact_phone;
      }
      if (!this.form.contacts_email) {
        checkFail = true;
        this.errResult.contacts_email = that.i18n.write_contact_email;
      } else {
        // var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //正则表达式
        // var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        // if (regEmail.test(this.form.contacts_email)) {
        //   this.errResult.contacts_email = "";
        // } else {
        //   checkFail = true;
        //   this.errResult.contacts_email = that.i18n.email_format_error;
        // }
      }
      this.$forceUpdate();
      if (checkFail) {
        return;
      }
      saveStoreApply(this.form).then(res => {
        if (res.status == 1) {
          that.$message.success({
            message: that.i18n.save_successfully_next,
            duration: 1000,
            onClose() {
              if (that.form.apply_type === 1) {
                //个人
                that.$router.push("seller_info");
              } else {
                //企业
                that.$router.push("basic_info");
              }
            }
          });
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
#contact {
  margin-top: 150px;
  display: flex;
}
</style>
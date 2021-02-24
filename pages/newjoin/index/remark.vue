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
  <div id="remark">
    <div class="gome-layout-area pb50 clearfix">
      <ul class="steps clearfix">
        <li class="first prev ok">
			<router-link :to="{ name: 'agreement'}">
            <b>1</b>
            <span class="going"></span>
            <em class="f">{{i18n.in_instructions}}</em>
          </router-link>
        </li>
        <li class="prev ok">
			<router-link :to="{ name: 'basic_info'}">
            <b>2</b>
            <span class="going"></span>
            <em class="f">{{i18n.write_company_message}}</em>
          </router-link>
        </li>
        <li class="prev ok">
			<router-link :to="{ name: 'seller_info'}">
            <b>3</b>
            <span class="going"></span>
            <em class="f">{{i18n.write_shop_message}}</em>
          </router-link>
        </li>
        <li class="cur ok">
          <b>4</b>
          <span class="going"></span>
          <em class="f">{{i18n.qualification_upload}}</em>
        </li>
        <li class="last">
          <b>5</b>
          <em class="f">{{i18n.wait_review}}</em>
        </li>
      </ul>
      <div class="settled-agreement-table pb50">
        <div class="agreement-title">
          <span>{{i18n.qualification_upload}}</span>
        </div>
        <el-form ref="form" :model="form" label-width="250px">
          <el-form-item :label="i18n.business_license">
            <el-upload
              class="avatar-uploader"
              :action="apiHead + '/mall/upload?type=cert'"
              :show-file-list="false"
              :on-success="handleBusinessLicenceCertSuccess"
              :before-upload="beforeUpload"
            >
              <el-image
                v-if="form.business_licence_cert"
                :src="form.business_licence_cert"
                style="width: 230px; height: 115px"
              ></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="note">1. {{i18n.require_one}}</p>
            <p class="note">2. {{i18n.require_two}}</p>
            <p class="note">3. {{i18n.require_three}}</p>
          </el-form-item>
          <el-form-item :label="i18n.authority_certificate">
            <el-upload
              class="avatar-uploader"
              :action="apiHead + '/mall/upload?type=cert'"
              :show-file-list="false"
              :on-success="handleTaxpayerCertSuccess"
              :before-upload="beforeUpload"
            >
              <el-image
                v-if="form.taxpayer_cert"
                :src="form.taxpayer_cert"
                style="width: 230px; height: 115px"
              ></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="note">1. {{i18n.require_one}}</p>
            <p class="note">2. {{i18n.require_two}}</p>
            <p class="note">3. {{i18n.require_three}}</p>
          </el-form-item>
          <el-form-item :label="i18n.code_certificate">
            <el-upload
              class="avatar-uploader"
              :action="apiHead + '/mall/upload?type=cert'"
              :show-file-list="false"
              :on-success="handleOrgnizationCertSuccess"
              :before-upload="beforeUpload"
            >
              <el-image
                v-if="form.orgnization_cert"
                :src="form.orgnization_cert"
                style="width: 230px; height: 115px"
              ></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="note">1. {{i18n.require_one}}</p>
            <p class="note">2. {{i18n.require_two}}</p>
            <p class="note">3. {{i18n.require_three}}</p>
          </el-form-item>
          <el-form-item :label="i18n.identity_card">
            <el-upload
              class="avatar-uploader"
              :action="apiHead + '/mall/upload?type=cert'"
              :show-file-list="false"
              :on-success="handleLegalIdentityCertSuccess"
              :before-upload="beforeUpload"
            >
              <el-image
                v-if="form.legal_identity_cert"
                :src="form.legal_identity_cert"
                style="width: 230px; height: 115px"
              ></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="note">1. {{i18n.require_one}}</p>
            <p class="note">2. {{i18n.require_two}}</p>
            <p class="note">3. {{i18n.require_three}}</p>
          </el-form-item>

          <el-form-item :label="i18n.identity_card_person_charge" v-if="$store.state.shop_config.store_entry_type == 0">
            <el-upload
              class="avatar-uploader"
              :action="apiHead + '/mall/upload?type=cert'"
              :show-file-list="false"
              :on-success="handleStorePersonCertSuccess"
              :before-upload="beforeUpload"
            >
              <el-image
                v-if="form.store_person_cert"
                :src="form.store_person_cert"
                style="width: 230px; height: 115px"
              ></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="note">1. {{i18n.require_one}}</p>
            <p class="note">2. {{i18n.require_two}}</p>
            <p class="note">3. {{i18n.require_three}}</p>
          </el-form-item>
        </el-form>
        <div class="gome-btn pt30">
          <router-link class="gome-btn-gray" :to="{ name: 'seller_info'}">{{i18n.last_step}}</router-link>
          <a href="javascript:void(0)" class="gome-btn-red" @click="submit()">{{i18n.save_data}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateStoreApply, getStoreApplyInfo } from "@/utils/api.js";
export default {
  data() {
    return {
      form: {},
      errResult: {}
    };
  },
  created() {
    this.apply();
  },
  computed: {
    i18n() {
		  return this.$t('newjoin.remark')
    }
  },
  methods: {
    apply() {
      let that = this;
      getStoreApplyInfo().then(res => {
        if (res.msg) {
          that.$message.error(res.msg);
        } else {
          // that.store_person_cert = res.store_person_cert;
          that.form = res;
        }
      });
    },
    submit() {
      let that = this;
      updateStoreApply(this.form).then(res => {
        if (res.status == 1) {
          that.$message.success({
            message: that.i18n.save_successfully_next,
            duration: 1000,
            onClose() {
              that.$router.push("apply_info");
            }
          });
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    handleBusinessLicenceCertSuccess(res) {
      this.form.business_licence_cert = res.result;
      this.$forceUpdate();
    },
    handleTaxpayerCertSuccess(res) {
      this.form.taxpayer_cert = res.result;
      this.$forceUpdate();
    },
    handleOrgnizationCertSuccess(res) {
      this.form.orgnization_cert = res.result;
      this.$forceUpdate();
    },
    handleLegalIdentityCertSuccess(res) {
      this.form.legal_identity_cert = res.result;
      this.$forceUpdate();
    },
    handleStorePersonCertSuccess(res) {
      this.form.store_person_cert = res.result;
      this.$forceUpdate();
    },
    beforeUpload(file) {
      var _this = this
      const isPic =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      const isLt4M = file.size / 1024 / 1024 < 4;

      if (!isPic) {
        this.$message.error(_this.i18n.picture_format);
      }
      if (!isLt4M) {
        this.$message.error(_this.i18n.picture_size);
      }
      return isPic && isLt4M;
    }
  }
};
</script>

<style scoped>
@import "@/static/css/qt_style.css";
@import "@/static/css/remark.css";
#remark {
  margin-top: 150px;
  display: flex;
}

/* 图片上传组件样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 230px;
  height: 115px;
  line-height: 115px;
  text-align: center;
}
.avatar {
  width: 230px;
  height: 115px;
  display: block;
}

/* 表单数据异常样式 */
.err-msg {
  color: red;
  font-size: 80%;
}

/* 提示文字样式 */
p.note {
  line-height: 18px;
  color: #aaa;
  margin-top: 4px;
  clear: both;
  font-size: 12px;
}

p.note:hover {
  color: #148eff;
}
</style>
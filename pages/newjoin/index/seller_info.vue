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
  <div id="seller_info">
    <div class="seller_info_e">
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
            <em class="f">{{i18n.fillin}}{{form.apply_type == 1 ? i18n.store:i18n.company}}{{i18n.message}}</em>
          </li>
          <li class="prev ok">
            <b>3</b>
            <span class="going"></span>
            <em class="f">{{i18n.fillin}}{{form.apply_type == 1 ? i18n.identity:i18n.store}}{{i18n.message}}</em>
          </li>
          <li class="cur ok">
            <b>4</b>
            <span class="going"></span>
            <em class="f">{{form.apply_type == 1 ? i18n.settlement_account : i18n.qualification_upload}}</em>
          </li>
          <li class="last">
            <b>5</b>
            <em class="f">{{i18n.wait_review}}</em>
          </li>
        </ul>
        <div class="settled-agreement-table pb50">
          <div class="agreement-title">
            <span>{{i18n.fill_store_information}}</span>
          </div>
          <form>
            <div class="table-part clearfix">
              <div class="table-part-title">{{i18n.store_information}}</div>
              <table cellpadding="0" cellspacing="0" border="0" class="information-table1">
                <tbody>
                  <tr>
                    <th>
                     <!-- <em class="em-red">*</em> -->{{i18n.store_name}}：
                    </th>
                    <td>
                      <input type="text" maxlength="40" class="input260" v-model="form.store_name" />
                      <span
                        class="err-msg"
                        v-if="errResult.store_name && !form.store_name"
                      >{{errResult.store_name}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.login_main_account}}：
                    </th>
                    <td>
                      <input
                        type="text"
                        maxlength="20"
                        v-model="form.seller_name"
                        autocomplete="off"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.seller_name && !form.seller_name"
                      >{{errResult.seller_name}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                     <!-- <em class="em-red">*</em> -->{{i18n.store_main_categories}}
                    </th>
                    <td>
                      <el-select
                        v-model="form.sc_id"
                        size="mini"
                        clearable
                        filterable
                        :placeholder="i18n.please_select"
                        @change="getScName"
                      >
                        <el-option
                          v-for="item in storeClassArr"
                          :key="item.sc_id"
                          :label="item.sc_name"
                          :value="item.sc_id"
                        ></el-option>
                      </el-select>
                      <span
                        class="err-msg"
                        v-if="errResult.sc_id && !form.sc_id"
                      >{{errResult.sc_id}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                     <!-- <em class="em-red">*</em> -->{{i18n.store_nature}}：
                    </th>
                    <td>
                      <el-select
                        v-model="form.store_type"
                        size="mini"
                        clearable
                        filterable
                        :placeholder="i18n.please_select"
                      >
                        <el-option
                          v-for="item in storeType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <span
                        class="err-msg"
                        v-if="errResult.store_type && !form.store_type"
                      >{{errResult.store_type}}</span>
                      <span id="shopTypeSpan" class style="display: none;"></span>
                    </td>
                  </tr>

                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.name_store_owner}}：
                    </th>
                    <td>
                      <input
                        type="text"
                        maxlength="64"
                        v-model="form.store_person_name"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.store_person_name && !form.store_person_name"
                      >{{errResult.store_person_name}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.responsible_phone}}：
                    </th>
                    <td>
                      <input
                        type="text"
                        v-model="form.store_person_mobile"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.store_person_mobile && !form.store_person_mobile"
                      >{{errResult.store_person_mobile}}</span>
                    </td>
                  </tr>
                  <tr v-if="$store.state.shop_config.store_entry_type == 0">
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.responsible_qq}}：
                    </th>
                    <td>
                      <input
                        type="text"
                        maxlength="11"
                        v-model="form.store_person_qq"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.store_person_qq && !form.store_person_qq"
                      >{{errResult.store_person_qq}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.email_address}}：
                    </th>
                    <td>
                      <input
                        type="text"
                        v-model="form.store_person_email"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.store_person_email"
                      >{{errResult.store_person_email}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.store_address}}：
                    </th>
                    <td>
                      <Regions
                        v-if="form.apply_type !== 0"
                        :initVal="oldStoreAddress"
                        @choose="getStoreRegion"
                        :level="3"
                        data-name="local"
                        style="float:left"
                      ></Regions>
                      <input
                        type="text"
                        v-model="form.store_address"
                        maxlength="32"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.company_district && !form.company_district"
                      >{{errResult.company_district}}</span>
                      <span
                        class="err-msg"
                        v-if="errResult.store_address && !form.store_address"
                      >{{errResult.store_address}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.business_category}}：
                    </th>
                    <td style="width: 600px;">
                      <el-cascader
                        v-model="categoryIds"
                        :options="goodsCategoryTree"
                        :props="{label: 'name', value: 'id', expandTrigger: 'hover', disabled:'no_children',multiple:true}"
                        clearable
                        filterable
                        collapse-tags
                        size="mini"
                        :placeholder="i18n.please_business_category"
                      />
                      <el-button size="mini" @click="addStoreApplyStoreClass()">{{i18n.addition}}</el-button>
                      <span
                        class="err-msg"
                        v-if="errResult.storeApplyStoreClassArr && !storeApplyStoreClassArr.length"
                      >{{errResult.storeApplyStoreClassArr}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <el-table
                        v-if="storeApplyStoreClassArr"
                        :data="storeApplyStoreClassArr"
                        style="width: 100%"
                      >
                        <el-table-column prop="class1_name" :label="i18n.classify_one" width="150"></el-table-column>
                        <el-table-column prop="class2_name" :label="i18n.classify_two" width="150"></el-table-column>
                        <el-table-column prop="class3_name" :label="i18n.classify_three" width="220">
                          <template
                            slot-scope="scope"
                          >{{scope.row.class3_name}}（{{i18n.commission_rate}}：{{scope.row.commission || 0}}%）</template>
                        </el-table-column>
                        <el-table-column prop="name" :label="i18n.operate" width="180">
                          <template slot-scope="scope">
                            <el-button-group>
                              <el-button
                                size="small"
                                @click="removeStoreApplyStoreClass(scope.row.class3_id)"
                                icon="el-icon-delete"
                              >{{i18n.delete}}</el-button>
                            </el-button-group>
                          </template>
                        </el-table-column>
                      </el-table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 个人入驻时显示 -->
            <div class="table-part clearfix" v-if="form.apply_type == 1">
              <div class="table-part-title bt pt30 j-tabclick">
                <span>{{i18n.idcard_information}}</span>
              </div>
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                class="information-table1 j-information-table"
              >
                <tbody>
                  <tr>
                    <th>
                      <em class="em-red">*</em>{{i18n.idnumber}}：
                    </th>
                    <td>
                      <input
                        maxlength="18"
                        type="text"
                        v-model="form.store_person_identity"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.store_person_identity"
                      >{{errResult.store_person_identity}}</span>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>
                      <em class="em-red">*</em>{{i18n.front_back_copy}}：
                    </th>
                    <td>
                      <el-upload
                        class="avatar-uploader"
                        :action="apiHead + '/mall/upload?type=id_card'"
                        :show-file-list="false"
                        :on-success="successUpload"
                        :before-upload="beforeUpload"
                      >
                        <el-image
                          v-if="form.store_person_cert"
                          :src="form.store_person_cert"
                          style="width:100px; height:100px; display:block;"
                        ></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <span
                        class="err-msg"
                        v-if="errResult.store_person_cert && !form.store_person_cert"
                      >{{errResult.store_person_cert}}</span>
                    </td>
                    <td>
                      <div v-if="store_person_cert">
                        <el-image
                          style="width: 100px; height: 100px"
                          :src="store_person_cert"
                          :preview-src-list="[store_person_cert]"
                        />{{i18n.photo_submitted_time}}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-part clearfix">
              <div class="table-part-title bt pt30 j-tabclick">
                <span>{{i18n.clearing_bank_account}}</span>
              </div>
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                class="information-table1 j-information-table"
              >
                <tbody>
                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.bank_account_name}}：
                    </th>
                    <td>
                      <input
                        maxlength="20"
                        type="text"
                        v-model="form.bank_account_name"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.bank_account_name && !form.bank_account_name"
                      >{{errResult.bank_account_name}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.bank_account}}：
                    </th>
                    <td>
                      <input
                        maxlength="19"
                        type="text"
                        v-model="form.bank_account_number"
                        class="input260"
                      />
                      <span
                        class="err-msg"
                        v-if="errResult.bank_account_number && !form.bank_account_number"
                      >{{errResult.bank_account_number}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <!-- <em class="em-red">*</em> -->{{i18n.bank_branch_name}}：
                    </th>
                    <td>
                      <input
                        type="text"
                        v-model="form.bank_branch_name"
                        class="input260 ac_input"
                        autocomplete="off"
                      />
                      <input type="hidden" id="bankCode" name="bankCode" />
                      <span
                        class="err-msg"
                        v-if="errResult.bank_branch_name && !form.bank_branch_name"
                      >{{errResult.bank_branch_name}}</span>
                    </td>
                  </tr>
                  <!-- <tr>
                    <th> -->
                      <!-- <em class="em-red">*</em> --><!-- {{i18n.location_bank_branch}}： -->
                    <!-- </th>
                    <td>
                      <Regions
                        :initVal="oldBankAddress"
                        @choose="getBankRegion"
                        :level="2"
                        data-name="local"
                        style="float:left"
                      ></Regions>
                      <span
                        class="err-msg"
                        v-if="errResult.bank_city && !form.bank_city"
                      >{{errResult.bank_city}}</span>
                    </td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </form>
          <div class="gome-btn pt30">
            <a class="gome-btn-gray" href="javascript:void(0)" @click="preStep()">{{i18n.last_step}}</a>
            <a
              href="javascript:void(0)"
              class="gome-btn-red"
              @click="submit()"
            >{{form.apply_type == 1 ? i18n.save_data : i18n.next_step}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  updateStoreApply,
  getStoreClassify,
  getGoodsCategoryTree,
  getStoreApplyStoreClassInfo,
  getStoreApplyInfo
} from "@/utils/api.js";
import Regions from "@/components/Regions";
export default {
  data() {
    return {
      form: {
        apply_type: 1
      },
      storeClassArr: [],
      storeType: [
        {
          value: 0,
          label: "未选择"
        },
        {
          value: 1,
          label: "旗舰店"
        },
        {
          value: 2,
          label: "专卖店"
        },
        {
          value: 3,
          label: "专营店"
        }
      ],
      oldStoreAddress: ["请选择"], //上次提交申请的店铺地址，用于回显
      oldBankAddress: ["请选择"], //上次提交申请的开户银行所在地
      errResult: {},
      goodsCategoryTree: [], //商品分类/经营类目树形数据
      categoryIds: [], //当前经营类目选择的经营类目的三个id
      selectedCategoryId3: [], //预申请的经营类目第三级id
      storeApplyStoreClassArr: [], //申请的经营类目列表
      store_person_cert: "", //上次提交申请上传的照片
      oldCompanyAddress: []
    };
  },
  created() {
    this.apply();
    this.getStoreClass();
    this.getGoodsCatCascade();
  },
  computed: {
    i18n() {
      this.storeType = [
        {
          value: 0,
          label: this.$t('newjoin.seller_info.unselected')
        },
        {
          value: 1,
          label: this.$t('newjoin.seller_info.flagship_store')
        },
        {
          value: 2,
          label: this.$t('newjoin.seller_info.exclusive_shop')
        },
        {
          value: 3,
          label: this.$t('newjoin.seller_info.speciality_shop')
        }
      ]
		  return this.$t('newjoin.seller_info')
    }
  },
  components: {
    Regions
  },
  methods: {
    apply() {
      let that = this;
      getStoreApplyInfo().then(res => {
        if (res.msg) {
          that.$message.error(res.msg);
        } else {
          that.store_person_cert = res.store_person_cert;
          that.form = res;
          //地址组件回显原地址
          if (res.apply_type == 1) {
            let storeAddressArr = [];
            storeAddressArr.push(res.province_name);
            storeAddressArr.push(res.city_name);
            storeAddressArr.push(res.district_name);
            that.oldStoreAddress = storeAddressArr;
          }
          if (res.bank_city_name) {
            let bankAddressArr = [];
            bankAddressArr.push(res.bank_province_name);
            bankAddressArr.push(res.bank_city_name);
            that.oldBankAddress = bankAddressArr;
          }
          if (res.store_class_ids) {
            that.selectedCategoryId3 = res.store_class_ids.split(",");
            //获取申请的分类信息
            getStoreApplyStoreClassInfo({
              class_ids: res.store_class_ids
            }).then(res => {
              that.storeApplyStoreClassArr = res;
            });
          }
        }
      });
    },
    getStoreClass() {
      let that = this;
      getStoreClassify().then(res => {
        that.storeClassArr = res;
      });
    },
    getStoreRegion(msg) {
      this.form.company_province = msg.value[0];
      this.form.company_city = msg.value[1];
      this.form.company_district = msg.value[2];
    },
    getBankRegion(msg) {
      this.form.bank_province = msg.value[0];
      this.form.bank_city = msg.value[1];
    },
    //获取商品分类Tree数据
    getGoodsCatCascade() {
      var that = this;
      getGoodsCategoryTree({
        levels: "1,2,3"
      }).then(function(res) {
        that.goodsCategoryTree = res;
      });
    },
    getScName(val) {
      if (val == "") return;
      this.form.sc_name = this.storeClassArr.find(item => {
        return item.sc_id === val;
      }).sc_name;
    },
    addStoreApplyStoreClass() {
      var _this = this
      // if (
      //   this.selectedCategoryId3.find((value, index, arr) => {
      //     return value == this.categoryIds[2];
      //   })
      // ) {
      //   this.$message.error(_this.i18n.preliminary_apply);
      //   return;
      // }
        this.categoryIds.forEach(arr=>{
          let storeApplyStoreClassInfo = { class3_id: arr[2] };
          this.goodsCategoryTree.forEach(e => {
          if (e.id == arr[0]) {
            storeApplyStoreClassInfo.class1_name = e.name;
            e.children.forEach(e2 => {
              if (e2.id == arr[1]) {
                storeApplyStoreClassInfo.class2_name = e2.name;
                e2.children.forEach(e3 => {
                  if (e3.id == arr[2]) {
                    storeApplyStoreClassInfo.class3_name = e3.name;
                    storeApplyStoreClassInfo.commission = e3.commission;
                    this.selectedCategoryId3.push(e3.id);
                    this.storeApplyStoreClassArr.push(storeApplyStoreClassInfo);
                    let hash=[]
                    this.storeApplyStoreClassArr = this.storeApplyStoreClassArr.reduce(function(arr, current) {
                        hash[current.class3_id] ? '' : hash[current.class3_id] = true && arr.push(current);
                        return arr
                    }, [])
                    return;
                  }
                });
                return;
              }
            });
            return;
          }
        });
      })
    },
    removeStoreApplyStoreClass(class3_id) {
      this.selectedCategoryId3.forEach((e, i) => {
        if (class3_id == e) {
          this.selectedCategoryId3.splice(i, 1);
        }
      });
      this.storeApplyStoreClassArr.forEach((e, i) => {
        if (e.class3_id == class3_id) {
          this.storeApplyStoreClassArr.splice(i, 1);
          return false;
        }
      });
    },
    submit() {
      let that = this;
      this.form.store_class_ids = this.selectedCategoryId3.join(",");
      let checkFail = false;
      if (!this.form.store_name) {
        checkFail = true;
        this.errResult.store_name = that.i18n.please_shop_name;
      }
      if (!this.form.seller_name) {
        checkFail = true;
        this.errResult.seller_name = that.i18n.please_shop_account;
      }
      if (!this.form.sc_id) {
        checkFail = true;
        this.errResult.sc_id = that.i18n.please_shop_ldep;
      }
      if (!this.form.store_type) {
        checkFail = true;
        this.errResult.store_type = that.i18n.please_shop_properties;
      }
      if (!this.form.store_person_name) {
        checkFail = true;
        this.errResult.store_person_name = that.i18n.please_shop_principalname;
      }
      if (!this.form.store_person_mobile) {
        checkFail = true;
        this.errResult.store_person_mobile = that.i18n.please_shop_principalphone;
      } 
	  // else {
   //      if (/^1[3456789]\d{9}$/.test(this.form.store_person_mobile)) {
   //        this.errResult.store_person_mobile = "";
   //      } else {
   //        checkFail = true;
   //        this.errResult.store_person_mobile = that.i18n.mobile_error;
   //      }
   //    }
      // if (!this.form.store_person_qq) {
      //   checkFail = true;
      //   this.errResult.store_person_qq = that.i18n.please_shop_principalqq;
      // }
      // if (!this.form.store_person_email) {
      //   checkFail = true;
      //   this.errResult.store_person_email = that.i18n.please_email;
      // } else {
      //   var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //正则表达式
      //   if (regEmail.test(this.form.store_person_email)) {
      //     this.errResult.store_person_email = "";
      //   } else {
      //     checkFail = true;
      //     this.errResult.store_person_email = that.i18n.email_error;
      //   }
      // }
      // if (!this.form.company_district) {
      //   checkFail = true;
      //   this.errResult.company_district = that.i18n.please_shop_site;
      // }
      // if (!this.form.store_address) {
      //   checkFail = true;
      //   this.errResult.store_address = that.i18n.please_shop_address;
      // }
      if (!this.storeApplyStoreClassArr.length) {
        checkFail = true;
        this.errResult.storeApplyStoreClassArr = that.i18n.add_least_one;
      }
      //个人入驻时验证身份证信息
      if (this.form.apply_type == 1) {
        if (!this.form.store_person_identity) {
          checkFail = true;
          this.errResult.store_person_identity = that.i18n.eighteen_numbers;
        } 
		// else {
  //         var regIDCard = /^\d{18}$|^\d{17}(\d|X|x)$/; //正则表达式
  //         if (regIDCard.test(this.form.store_person_identity)) {
  //           this.errResult.store_person_identity = "";
  //         } else {
  //           checkFail = true;
  //           this.errResult.store_person_identity = that.i18n.number_wrong;
  //         }
  //       }
        if (!this.form.store_person_cert) {
          checkFail = true;
          this.errResult.store_person_cert = that.i18n.uploading_front_back_copy;
        }
      }
      // if (!this.form.bank_account_name) {
      //   checkFail = true;
      //   this.errResult.bank_account_name = that.i18n.please_account_name;
      // }
      // if (!this.form.bank_account_number) {
      //   checkFail = true;
      //   this.errResult.bank_account_number = that.i18n.please_bank_account;
      // }
      // if (!this.form.bank_branch_name) {
      //   checkFail = true;
      //   this.errResult.bank_branch_name = that.i18n.please_bank_branchname;
      // }
      // if (!this.form.bank_city) {
      //   checkFail = true;
      //   this.errResult.bank_city = that.i18n.please_bank_branchlocation;
      // }
      this.$forceUpdate();
      if (checkFail) {
        this.$message.error(that.i18n.parameter_error);
        return;
      }
      updateStoreApply(this.form).then(res => {
        if (res.status == 1) {
          that.$message.success({
            message: that.i18n.save_successfully_next,
            duration: 1000,
            onClose() {
              that.nextStep();
            }
          });
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    nextStep() {
      if (this.form.apply_type == 1) {
        //个人，进入审核结果页
        this.$router.push("apply_info");
      } else {
        //企业，进入资质上传页
        this.$router.push("remark");
      }
    },
    preStep() {
      if (this.form.apply_type == 1) {
        //个人，退回基础信息页
        this.$router.push("contact");
      } else {
        //企业，退回公司信息页
        this.$router.push("basic_info");
      }
    },
    successUpload(res) {
      this.form.store_person_cert = res.result;
      this.$forceUpdate();
    },
    beforeUpload(file) {
      var _this = this
      const isPic =
        file.type === "image/gif" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPic) {
        this.$message.error(_this.i18n.picture_format);
      }
      if (!isLt2M) {
        this.$message.error(_this.i18n.picture_size);
      }
      return isPic && isLt2M;
    }
  }
};
</script>

<style scoped>
@import "@/static/css/qt_style.css";
#seller_info {
  margin-top: 150px;
}
.seller_info_e {
  display: flex;
}
>>> .el-table th {
  text-align: unset;
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

/* 表单数据异常样式 */
.err-msg {
  color: red;
  font-size: 80%;
}
</style>
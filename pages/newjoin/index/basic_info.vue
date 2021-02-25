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
	<div id="basic_info">
		<div class="gome-layout-area pb50">
			<ul class="steps clearfix">
				<li class="first prev ok">
					<nuxt-link :to="{ name: 'agreement'}">
						<b>1</b>
						<span class="going"></span>
						<em class="f">{{i18n.in_instructions}}</em>
					</nuxt-link>
				</li>
				<li class="cur ok">
					<b>2</b>
					<span class="going"></span>
					<em class="f">{{i18n.write_company_message}}</em>
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
			<div class="settled-agreement-table pb50">
				<div class="agreement-title">
					<span>{{i18n.write_company_message}}</span>
				</div>
				<form action id="queryForm" method="post">
					<div class="table-part clearfix">
						<div class="table-part-title">{{i18n.company_information}}</div>
						<table cellpadding="0" cellspacing="0" border="0" class="information-table1">
							<tbody>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.company_name}}：
									</th>
									<td>
										<input type="text" maxlength="35" v-model="form.company_name" value class="input260" />
										<span class="err-msg" v-if="errResult.company_name && !form.company_name">{{errResult.company_name}}</span>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.company_nature}}：
									</th>
									<td>
										<el-select v-model="form.company_type" size="small">
											<el-option v-for="(item,index) in form.companys" :key="index" :label="item" :value="index + 1"></el-option>
										</el-select>
										<span class="err-msg" v-if="errResult.company_type && !form.company_type">{{errResult.company_type}}</span>
									</td>
								</tr>
								<tr>
									<th>{{i18n.kawaii_url}}：</th>
									<td>
										<input type="text" maxlength="30" v-model="form.company_website" class="input260" />
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.company_address}}：
									</th>
									<td>
										<Regions :initVal="oldCompanyAddress" @choose="getCompanyRegion" :level="3" data-name="local" style="float:left"></Regions>
										<span class="err-msg" v-if="errResult.company_district && !form.company_district">{{errResult.company_district}}</span>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.company_minute_address}}：
									</th>
									<td>
										<input type="text" v-model="form.company_address" maxlength="32" class="input260" />
										<span class="err-msg" v-if="errResult.company_address && !form.company_address">{{errResult.company_address}}</span>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.telephone}}：
									</th>
									<td>
										<input type="text" maxlength="32" v-model="form.company_telephone" class="input260" />
										<span class="err-msg" v-if="errResult.company_telephone">{{errResult.company_telephone}}</span>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.email_address}}：
									</th>
									<td>
										<input type="text" maxlength="32" v-model="form.company_email" class="input260" />
										<span class="err-msg" v-if="errResult.company_email">{{errResult.company_email}}</span>
									</td>
								</tr>
								<tr v-if="$store.state.shop_config.store_entry_type == 0">
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.fax}}：
									</th>
									<td>
										<input type="text" maxlength="16" v-model="form.company_fax" class="input260" />
										<span class="err-msg" v-if="errResult.company_fax && !form.company_fax">{{errResult.company_fax}}</span>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.postal_code}}：
									</th>
									<td>
										<input type="text" maxlength="10" v-model="form.company_zipcode" class="input260" />
										<span class="err-msg" v-if="errResult.company_zipcode">{{errResult.company_zipcode}}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="table-part clearfix" v-if="$store.state.shop_config.store_entry_type == 0">
						<div class="table-part-title bt pt30 j-tabclick">
							<span>
								{{i18n.license_information}}
								<b class="micon-down"></b>
							</span>
						</div>
						<table cellpadding="0" cellspacing="0" border="0" class="information-table1 j-information-table">
							<tbody>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.acard_ayard}}：
									</th>
									<td>
										<input v-model="form.threeinone" style="width: 16px; height: 14px;" type="radio" checked :value="1" />{{i18n.are}}
										<input v-model="form.threeinone" style="width: 16px; height: 14px;" type="radio" :value="0" />{{i18n.deny}}
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.registered_fund}}：
									</th>
									<td>
										<input type="text" maxlength="10" v-model="form.reg_capital" class="input260" />
										<span style="line-height:24px;padding-left:5px;">{{i18n.thousand_yuan}}</span>
										<span class="err-msg" v-if="errResult.reg_capital && !form.reg_capital">{{errResult.reg_capital}}</span>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->
										<span>{{i18n.social_credit_code}}：</span>
									</th>
									<td>
										<input type="text" maxlength="18" v-model="form.business_licence_number" class="input260" />
										<span class="err-msg" v-if="errResult.business_licence_number">{{errResult.business_licence_number}}</span>
										<span style="line-height:24px;padding-left:5px;">{{i18n.creditrules_one}}</span>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.representatives}}：
									</th>
									<td>
										<input type="text" maxlength="20" v-model="form.legal_person" class="input260" />
										<span class="err-msg" v-if="errResult.legal_person && !form.legal_person">{{errResult.legal_person}}</span>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.validity}}：
									</th>
									<td>
										<el-date-picker v-model="form.business_date_start" value-format="yyyy-MM-dd" type="date" size="mini"
										 :placeholder="i18n.option_date"></el-date-picker>&nbsp;-
										<el-date-picker v-model="businessDateEnd" value-format="yyyy-MM-dd" type="date" size="mini" :placeholder="endTimeDesc"
										 :disabled="endTimeDisabled"></el-date-picker>&nbsp;
										<el-checkbox v-model="isLongTime" @change="changeLongTime()">{{i18n.long_time}}</el-checkbox>
										<span class="err-msg" v-if="errResult.business_date">{{errResult.business_date}}</span>
									</td>
								</tr>
								<tr>
									<th class="ver-t">
										<!-- <em class="em-red">*</em> -->{{i18n.business_scope}}：
									</th>
									<td>
										<textarea maxlength="100" v-model="form.business_scope" autocomplete="off" class="input370"></textarea>
									</td>
								</tr>
								<tr v-if="errResult.business_scope && !form.business_scope">
									<th></th>
									<td>
										<p class="err-msg">{{errResult.business_scope}}</p>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.taxpayer_type}}：
									</th>
									<td>
										<el-select v-model="form.taxpayer" size="mini" :placeholder="i18n.please_select">
											<el-option v-for="item in taxpayerArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th>
										<!-- <em class="em-red">*</em> -->{{i18n.taxtype_taxcode}}：
									</th>
									<td>
										<el-select v-model="form.tax_rate" size="mini" :placeholder="i18n.please_select">
											<el-option v-for="item in taxRateArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</form>
				<div class="gome-btn pt30">
					<nuxt-link class="gome-btn-gray" :to="{ name: 'contact'}">{{i18n.last_step}}</nuxt-link>
					<a href="javascript:void(0)" class="gome-btn-red" @click="submit()">{{i18n.next_step_shop}}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		updateStoreApply,
		getStoreApplyInfo
	} from "@/utils/api.js";
	import Regions from "@/components/Regions";
	export default {
		data() {
			return {
				form: {
					threeinone: 1
				},
				errResult: {},
				oldCompanyAddress: ["请选择"], //上次提交申请的店铺地址，用于回显
				businessDateEnd: null,
				isLongTime: false,
				endTimeDesc: "长期",
				endTimeDisabled: false,
				taxpayerArr: [{
						value: 1,
						label: "一般纳税人"
					},
					{
						value: 2,
						label: "小规模纳税人"
					},
					{
						value: 3,
						label: "非增值税纳税人"
					}
				],
				taxRateArr: [{
						value: 0,
						label: "0%"
					},
					{
						value: 3,
						label: "3%"
					},
					{
						value: 6,
						label: "6%"
					},
					{
						value: 7,
						label: "7%"
					},
					{
						value: 11,
						label: "11%"
					},
					{
						value: 13,
						label: "13%"
					},
					{
						value: 17,
						label: "17%"
					}
				]
			};
		},
		components: {
			Regions
		},
		computed: {
			i18n() {
				this.endTimeDesc = this.$t('order.basic_info.long_time')
				this.taxpayerArr = [{
						value: 1,
						label: this.$t('newjoin.basic_info.general_taxpayer')
					},
					{
						value: 2,
						label: this.$t('newjoin.basic_info.smallscale_taxpayer')
					},
					{
						value: 3,
						label: this.$t('newjoin.basic_info.nonvat_payer')
					}
				]
				return this.$t('newjoin.basic_info')
			}
		},
		created() {
			this.apply();
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
						let companyAddressArr = [];
						if(res.province_name){
							companyAddressArr.push(res.province_name);
						}
						if(res.city_name){
							companyAddressArr.push(res.city_name);
						}
						if(res.district_name){
							companyAddressArr.push(res.district_name);
						}
						if(companyAddressArr.length>0){
							that.oldCompanyAddress = companyAddressArr;
						}
						if (res.business_date_end == that.i18n.long_time) {
							that.endTimeDesc = that.i18n.long_time;
							that.endTimeDisabled = true;
							that.isLongTime = true;
						} else {
							that.businessDateEnd = res.business_date_end;
						}
					}
				});
			},
			getCompanyRegion(msg) {
				this.form.company_province = msg.value[0];
				this.form.company_city = msg.value[1];
				this.form.company_district = msg.value[2];
			},
			changeLongTime() {
				if (this.isLongTime) {
					this.form.business_date_end = that.i18n.long_time;
					this.businessDateEnd = null;
					this.endTimeDesc = that.i18n.long_time;
					this.endTimeDisabled = true;
					this.errResult.businessDateEnd = "";
				} else {
					this.businessDateEnd = null;
					this.endTimeDesc = that.i18n.please_select;
					this.endTimeDisabled = false;
				}
			},
			submit() {
				if (this.businessDateEnd != null) {
					this.form.business_date_end = this.businessDateEnd;
				}
				let checkFail = false;
				let that = this;
				if (this.$store.state.shop_config.store_entry_type == 0) {
					if (!this.form.company_name) {
						checkFail = true;
						this.errResult.company_name = that.i18n.please_company_name;
					}
					if (!this.form.company_type) {
						checkFail = true;
						this.errResult.company_type = that.i18n.please_company_nature;
					}
					if (!this.form.company_district) {
						checkFail = true;
						this.errResult.company_district = that.i18n.please_company_address;
					}
					if (!this.form.company_address) {
						checkFail = true;
						this.errResult.company_address = that.i18n.please_company_minute_address;
					}
					if (!this.form.company_telephone) {
						checkFail = true;
						this.errResult.company_telephone = that.i18n.please_telephone;
					}
					// else {
					//      if (/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(this.form.company_telephone)) {
					//        this.errResult.company_telephone = "";
					//      } else {
					//        checkFail = true;
					//        this.errResult.company_telephone = that.i18n.telephone_formal_error;
					//      }
					//    }
					if (!this.form.company_email) {
						checkFail = true;
						this.errResult.company_email = that.i18n.please_email_address;
					} else {
						var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
						if (regEmail.test(this.form.company_email)) {
							this.errResult.company_email = "";
						} else {
							checkFail = true;
							this.errResult.company_email = that.i18n.email_address_error;
						}
					}
					if (!this.form.company_fax) {
						checkFail = true;
						this.errResult.company_fax = that.i18n.please_fill_fax;
					} else {
						// if (
						//   /^((\+?[0-9]{2,4}\-[0-9]{3,4}\-)|([0-9]{3,4}\-))?([0-9]{7,8})(\-[0-9]+)?$/.test(
						//     this.form.company_fax
						//   )
						// ) {
						//   this.errResult.company_fax = "";
						// } else {
						//   checkFail = true;
						//   this.errResult.company_fax = "传真格式错误";
						// }
					}
					if (!this.form.company_zipcode) {
						checkFail = true;
						this.errResult.company_zipcode = that.i18n.please_fill_code;
					} else {
						if (/^[0-9]{6}$/.test(this.form.company_zipcode)) {
							this.errResult.company_zipcode = "";
						} else {
							checkFail = true;
							this.errResult.company_zipcode = that.i18n.code_format_error;
						}
					}
					//==============================================================
					if (!this.form.reg_capital) {
						checkFail = true;
						this.errResult.reg_capital = that.i18n.please_registered_fund;
					}
					if (!this.form.business_licence_number) {
						checkFail = true;
						this.errResult.business_licence_number = that.i18n.please_fill_credit_code;
					} else {
						if (this.checkSocialCreditCode(this.form.business_licence_number)) {
							this.errResult.business_licence_number = "";
						} else {
							checkFail = true;
							this.errResult.business_licence_number = that.i18n.fill_credit_code_error;
						}
					}
					if (!this.form.legal_person) {
						checkFail = true;
						this.errResult.legal_person = that.i18n.please_fill_personname;
					}
					if (
						!this.form.business_date_start ||
						(!this.endTimeDisabled && !this.businessDateEnd)
					) {
						checkFail = true;
						this.errResult.business_date = that.i18n.please_license_term;
					} else {
						this.errResult.business_date = "";
					}
					if (!this.form.business_scope) {
						checkFail = true;
						this.errResult.business_scope = that.i18n.please_business_scope;
					}
					if (!this.form.taxpayer) {
						checkFail = true;
						this.errResult.taxpayer = that.i18n.select_taxpayer_type;
					}
					if (this.form.tax_rate < 0) {
						checkFail = true;
						this.errResult.tax_rate = that.i18n.select_taxpayer_type;
					}
				}
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
								that.$router.push("seller_info");
							}
						});
					} else {
						that.$message.error(res.msg);
					}
				});
			},
			//统一社会信用代码校验
			checkSocialCreditCode(Code) {
				var patrn = /^[0-9A-Z]+$/;
				//18位校验及大写校验
				if (Code.length != 18 || patrn.test(Code) == false) {
					return false;
				} else {
					var Ancode; //统一社会信用代码的每一个值
					var Ancodevalue; //统一社会信用代码每一个值的权重
					var total = 0;
					var weightedfactors = [
						1,
						3,
						9,
						27,
						19,
						26,
						16,
						17,
						20,
						29,
						25,
						13,
						8,
						24,
						10,
						30,
						28
					]; //加权因子
					var str = "0123456789ABCDEFGHJKLMNPQRTUWXY";
					//不用I、O、S、V、Z
					for (var i = 0; i < Code.length - 1; i++) {
						Ancode = Code.substring(i, i + 1);
						Ancodevalue = str.indexOf(Ancode);
						total = total + Ancodevalue * weightedfactors[i];
						//权重与加权因子相乘之和
					}
					var logiccheckcode = 31 - (total % 31);
					if (logiccheckcode == 31) {
						logiccheckcode = 0;
					}
					var Str =
						"0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
					var Array_Str = Str.split(",");
					logiccheckcode = Array_Str[logiccheckcode];

					var checkcode = Code.substring(17, 18);
					if (logiccheckcode != checkcode) {
						return false;
					}
					return true;
				}
			}
		}
	};
</script>

<style scoped>
	@import "@/static/css/qt_style.css";

	#basic_info {
		margin-top: 150px;
	}

	/* 表单数据异常样式 */
	.err-msg {
		color: red;
		font-size: 80%;
	}
</style>

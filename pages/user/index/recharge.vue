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
    <div class="menumain p mywallets" v-if="rechargeBool">
      <div class="goodpiece">
        <h1>{{i18n.recharge.account_balance}}</h1>
        <!--<a href=""><span class="co_blue">账户余额说明</span></a>-->
      </div>
      <div class="shopcard frozen-cha ma-to-20 p">
        <div class="cuschan">
          <span class="kycha">
            <i class="money"></i>{{i18n.recharge.credit_available}}
          </span>
          <br />
          <span class="co">
            <em>{{i18nCommon.symbol}}</em>
            {{Number(userInfo.user_money).toFixed(2)}}
          </span>
        </div>
        <div class="cuschan">
          <span class="kycha">
            <i class="frozen"></i>{{i18n.recharge.account_frozen}}
          </span>
          <br />
          <span class="co">
            <em>{{i18nCommon.symbol}}</em>
            {{Number(userInfo.frozen_money).toFixed(2)}}
          </span>
        </div>
        <div class="cuschan jhove">
          <span class="kycha">
            {{i18n.recharge.account_status}}：
            <em>{{i18n.recharge.activated}}</em>
          </span>
        </div>
        <div class="cuschan tc-uic">
          <router-link class="topup-mom" :to="{ name: 'withdrawals'}">{{i18n.recharge.withdraw_deposit}}</router-link>
        </div>
		<div class="cuschan tc-uic" style="margin-top: 10px;">
		  <router-link class="topup-mom" :to="{ name: 'invest'}">充值</router-link>
		</div>
      </div>
      <div class="time-sala">
        <ul>
          <li :class="taxonRecord == 1 ? 'red' : 'mal-l'">
            <span @click="tabRecord(1)">{{i18n.recharge.recharge_record}}</span>
          </li>
          <li :class="taxonRecord == 2 ? 'red' : 'mal-l'">
            <span @click="tabRecord(2)">{{i18n.recharge.expense_calendar}}</span>
          </li>
          <li :class="taxonRecord == 3 ? 'red' : 'mal-l'">
            <span @click="tabRecord(3)">{{i18n.recharge.withdrawal_record}}</span>
          </li>
        </ul>
      </div>
      <div class="he"></div>
      <!-- 充值记录 -->
      <div class="card-list accbala" v-if="taxonRecord==1">
        <ul>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.date}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.money}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.state}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.remark}}</a>
          </li>
        </ul>
      </div>
      <!-- 消费记录 -->
      <div class="card-list accbala" v-else-if="taxonRecord==2">
        <ul>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.date}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.money}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.order_number}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.remark}}</a>
          </li>
        </ul>
      </div>
      <!-- 提现记录 -->
      <div class="card-list accbala" v-else-if="taxonRecord==3">
        <ul>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.date}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.money}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.order_number}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{i18n.recharge.remark}}</a>
          </li>
        </ul>
      </div>
      <!--无记录时-s-->
      <p class="ncyekjl" v-if="bool">--{{i18n.norecord}}--</p>
      <!-- 充值记录 -->
      <div
        class="card-list c_contan accbala-list"
        v-for="(item,index) in rechargeData"
        :key="index + '-only'"
        v-else-if="taxonRecord==1"
      >
        <ul>
          <li>
            <a href="javascript:void(0);">{{item.ctime_show}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{Number(item.account).toFixed(2)}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{item.pay_status_desc}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{item.remark}}</a>
          </li>
          <li>
            <a href="javascript:void(0);"></a>
          </li>
        </ul>
      </div>
      <!--消费记录-e-->
      <div
        class="card-list c_contan accbala-list"
        v-for="(item) in rechargeData"
        :key="item.log_id"
        v-else-if="taxonRecord==2"
      >
        <ul>
          <li>
            <a href="javascript:void(0);">{{item.change_time_show}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{Number(item.user_money).toFixed(2)}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{item.order_sn}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{item.remark}}</a>
          </li>
          <li>
            <a href="javascript:void(0);"></a>
          </li>
        </ul>
      </div>
      <!-- 提现记录 -->
      <div
        class="card-list c_contan accbala-list"
        v-for="(item) in rechargeData"
        :key="item.id"
        v-else-if="taxonRecord==3"
      >
        <ul>
          <li>
            <a href="javascript:void(0);">{{item.create_time_detail}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{Number(item.money).toFixed(2)}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{item.id}}</a>
          </li>
          <li>
            <a href="javascript:void(0);">{{item.remark}}</a>
          </li>
          <li>
            <a href="javascript:void(0);"></a>
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <!--提现记录-s-->
      <!--提现记录-e-->
    </div>
    <div class="aboutmoney addmon" v-else>
      <div class="usermoney topup-money">
        <div class="userdown-top">
          <span>{{i18n.recharge.recharge}}</span>
        </div>
        <hr style="height: 1px; background: #dedede; border: none; margin-top: -1px;" />
        <div class="choicetu">
          <form method="post" id="recharge_form" action>
            <div class="monettu">
              <div class="fop-main">
                <div class="remain-cash">
                  {{i18n.recharge.current_balance}}：
                  <em>{{i18nCommon.symbol}}</em>
                  <b>{{Number(userInfo.user_money).toFixed(2)}}</b>
                </div>
                <div class="tag-define" data-_id="tag_157">
                  <span class="define-label">
                    {{i18n.recharge.recharge_amount}}：
                    <em>{{i18nCommon.symbol}}</em>
                  </span>
                  <input
                    type="text"
                    name="account"
                    class="define-input"
                    v-model="rechargeAmount"
                    :placeholder="i18n.recharge.please_recharge_amount"
                    id="input_val"
                  />
                  <i :class="rechargeAmount.length>0 ? 'active' :''" @click="deleteAmount"></i>
                </div>
                <div class="m-tagbox m-multi-tag">
                  <span class="tag-item" @click="selectAmoun(50)">
                    {{i18nCommon.symbol}}50.00
                    <i class="t-check" :class="rechargeAmount == '50' ? 'tptig' :''"></i>
                  </span>
                  <span class="tag-item" @click="selectAmoun(100)">
                    {{i18nCommon.symbol}}100.00
                    <i class="t-check" :class="rechargeAmount == '100' ? 'tptig' :''"></i>
                  </span>
                  <span class="tag-item" @click="selectAmoun(200)">
                    {{i18nCommon.symbol}}200.00
                    <i class="t-check" :class="rechargeAmount == '200' ? 'tptig' :''"></i>
                  </span>
                  <span class="tag-item" @click="selectAmoun(500)">
                    {{i18nCommon.symbol}}500.00
                    <i class="t-check" :class="rechargeAmount == '500' ? 'tptig' :''"></i>
                  </span>
                </div>
              </div>
              <div class="fop-choice">
                <div class="orde-sjyy">
                  <h3 class="titls">{{i18n.recharge.method}}</h3>
                  <div class="bsjy-g">
                    <dl>
                      <dd>
                        <div class="order-payment-area">
                          <div class="po-re dsfzf-ee">
                            <ul>
                              <li>
                                <div class="payment-area">
                                  <input
                                    type="radio"
                                    value="pay_code=unionpay"
                                    class="radio vam"
                                    name="pay_radio"
                                  />
                                  <label for>
                                    <img
                                      src="/plugins/payment/unionpay/logo.jpg"
                                      width="40"
                                      height="40"
                                      onclick="change_pay(this);"
                                    />
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div class="payment-area">
                                  <input
                                    type="radio"
                                    value="pay_code=weixin"
                                    class="radio vam"
                                    name="pay_radio"
                                  />
                                  <label for>
                                    <img
                                      src="/plugins/payment/weixin/logo.jpg"
                                      width="40"
                                      height="40"
                                      onclick="change_pay(this);"
                                    />
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div class="payment-area">
                                  <input
                                    type="radio"
                                    value="pay_code=tenpay"
                                    class="radio vam"
                                    name="pay_radio"
                                  />
                                  <label for>
                                    <img
                                      src="/plugins/payment/tenpay/logo.jpg"
                                      width="40"
                                      height="40"
                                      onclick="change_pay(this);"
                                    />
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div class="payment-area">
                                  <input
                                    type="radio"
                                    value="pay_code=newalipay"
                                    class="radio vam"
                                    name="pay_radio"
                                  />
                                  <label for>
                                    <img
                                      src="/plugins/payment/newalipay/logo.jpg"
                                      width="40"
                                      height="40"
                                      onclick="change_pay(this);"
                                    />
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <!--第三方网银支付 start-->
                        <!--第三方网银支付 end -->
                      </dd>
                    </dl>
                    <input type="hidden" name="account" id="add_money" value="50" />
                    <div class="order-payment-action-area">
                      <!-- <a
                        href="javascript:void(0);"
                        class="return-wallet"
                        onclick="mywalletsa();"
                      >取消并返回</a>-->
                      <span class="return-wallet" @click="cancel()">{{i18n.recharge.cancel_return}}</span>
                      <a
                        class="button-style-5 button-confirm-payment"
                        href="javascript:void(0);"
                        onclick="recharge_submit();"
                      >{{i18n.recharge.immediate_payment}}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="operating fixed consume_log" id="bottom">
      <div class="fn_page clearfix"></div>
    </div>
  </div>
</template>

<script>
import {
  getBaseInfo,
  getUserRechargeRecord,
  getapplicationWithdrawal,
  getfundBalance
} from "@/utils/api.js";
import {getUser} from "@/utils/auth.js";
export default {
  data() {
    return {
      bool: true, //是否有数据
      currentPage: 1, //初始页面为1
      pageSize: 10, //默认数据条
      rechargeData: [], //我的订单数据
      handleSize: 10, //当页面几条数据
      handleCurrent: 1, //第几页
      total: 0, //总共多少条数据
      taxonRecord: 1, //类名控制
      userInfo: "", //用户信息
      rechargeBool: true, //充值显示
      rechargeAmount: "" //充值金额
    };
  },
  computed:{
		i18n () {  
		  return this.$t('user')  
    },
    i18nCommon () {
      return this.$t('common')  
    }
	},
  methods: {
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.handleSize = val;
      if (this.taxonRecord == 1) {
        this.userRechargeRecord();
      } else if (this.taxonRecord == 2) {
        this.fundBalance();
      } else {
        this.applicationWithdrawal();
      }
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.handleCurrent = val;
      if (this.taxonRecord == 1) {
        this.userRechargeRecord();
      } else if (this.taxonRecord == 2) {
        this.fundBalance();
      } else {
        this.applicationWithdrawal();
      }
    },
    //充值删除金额
    deleteAmount() {
      this.rechargeAmount = "";
    },
    //充值给金额赋值
    selectAmoun(sum) {
      this.rechargeAmount = sum;
    },
    //充值
    mywalletstopup() {
      this.rechargeBool = false;
    },
    //取消充值
    cancel() {
      this.rechargeBool = true;
    },
    //切换
    tabRecord(i) {
      this.taxonRecord = i;
      this.handleCurrent = 1
      if (i == 1) {
        this.userRechargeRecord();
      } else if (i == 2) {
        this.fundBalance();
      } else {
        this.applicationWithdrawal();
      }
    },
    //获取个人信息
    userInformation() {
      getBaseInfo().then(res => {
        this.userInfo = res;
      });
    },
    //资金余额数据
    fundBalance() {
      var params = {
          p: this.handleCurrent,
          size: this.handleSize
        };
      getfundBalance(params).then(res => {
        if (res.records.length > 0) {
          this.bool = false;
        }else{
          this.bool = true;
        }
        this.rechargeData = res.records;
        this.total = res.total;
      });
    },
    //提现记录数据
    applicationWithdrawal() {
      var params = {
        p: this.handleCurrent,
        size: this.handleSize
      };
      getapplicationWithdrawal(params).then(res => {
        if (res.records.length > 0) {
          this.bool = false;
        }else{
          this.bool = true;
        }
        this.rechargeData = res.records;
        this.total = res.total;
      });
    },
    //充值记录数据
    userRechargeRecord() {
      var params = {
		user_id: getUser().user_id,
        p: this.handleCurrent,
        size: this.handleSize
      };
      getUserRechargeRecord(params).then(res => {
        if (res.records.length > 0) {
          this.bool = false;
        }else{
          this.bool = true
        }
        this.rechargeData = res.records;
        this.total = res.total;
      });
    }
  },
  created() {
    this.userInformation();
    this.userRechargeRecord();
  },
  components: {}
};
</script>

<style scoped>
@import "@/static/css/jh.css";
.active {
  display: block;
}
.pageContent .fl,
.fr span {
  cursor: pointer;
}
.pageContent .fl,
.fr span:hover {
  color: #e83632;
  transition: all 0.4s ease;
}

.order-payment-action-area span {
  margin-left: 50px;
  border-radius: 4px;
}

.topup-money {
  background-color: #ffffff;
  padding: 15px;
}
.usermoney {
  border: 1px solid #dedede;
  overflow: hidden;
}
.userdown-top {
  width: 100%;
}
.userdown-top span {
  display: inline-block;
  cursor: pointer;
  width: 120px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border: 1px solid #dedede;
  border-bottom: 1px solid #fff;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 3px;
}
.choicetu {
  overflow: hidden;
  padding: 10px;
  margin-top: 16px;
}
.fop-main {
  overflow: hidden;
  margin-bottom: 50px;
}

.m-tagbox {
  margin-top: 20px;
  overflow: hidden;
}
.m-tagbox .tag-define,
.m-tagbox .tag-item {
  float: left;
  width: 98px;
  height: 38px;
  line-height: 38px;
  border: 1px solid #e0e0e0;
  margin-right: 20px;
  text-align: center;
  color: #333;
}
.m-tagbox .tag-item {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.m-tagbox .t-check {
  display: none;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  background-position: -40px 0;
}
.m-tagbox .tptig {
  display: inline-block;
  background-image: url(../../../static/images/sprite-operate.png);
  background-repeat: no-repeat;
}
.orde-sjyy {
  font-family: "Tahoma", "\5FAE\8F6F\96C5\9ED1";
}
.titls {
  font-size: 14px;
  border-left: 3px solid #e5e5e5;
  padding-left: 6px;
  line-height: 20px;
  margin-bottom: 20px;
}
.bsjy-g dl {
  border: 1px solid #dedede;
  border-bottom: 0 none;
}
</style>

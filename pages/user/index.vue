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
    <top-bar></top-bar>
    <top-info></top-info>
    <div class="home-index-middle">
		<div class="w1224">
			<div class="g-crumbs">
				<router-link :to="{ name: 'user_index'}">
				{{i18n.index.mymall}}
				</router-link>
				<span v-if="routerName!='user_index'">&nbsp;>&nbsp; {{$route.meta.title}}</span>
			</div>
		</div>
      <div class="w1224">
       
        <div class="home-main">
          <div class="le-menu fl">
            <div class="menu-ul">
              <ul>
                <li class="ma">
                  <i class="account-acc1"></i>{{i18n.index.trading_center}}
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/order_list'?'menu_check':''" :to="{ name: 'user/index/order_list'}">{{i18n.index.myorder}}</router-link>
                </li>
                <!-- <li>
                  <router-link :class="routerName == 'virtual_list'?'menu_check':''" :to="{ name: 'virtual_list'}">虚拟订单</router-link>
                </li> -->
                <!--给钱才能解开封印 -->
                <li>
                  <router-link :class="routerName == 'user/index/comment'?'menu_check':''" :to="{ name: 'user/index/comment'}">{{i18n.index.myrating}}</router-link>
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/my_trial'?'menu_check':''" :to="{ name: 'user/index/my_trial'}">试用单</router-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc2"></i>{{i18n.index.assethub}}
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/coupon'?'menu_check':''" :to="{ name: 'user/index/coupon'}">{{i18n.index.mycoupons}}</router-link>
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/recharge'?'menu_check':''"  :to="{ name: 'user/index/recharge'}">{{i18n.index.account_balance}}</router-link>
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/account'?'menu_check':''" :to="{ name: 'user/index/account'}">{{i18n.index.myintegral}}</router-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc3"></i>{{i18n.index.focus_center}}
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/goods_collect'?'menu_check':''" :to="{ name: 'user/index/goods_collect'}">{{i18n.index.myfavorite}}</router-link>
                </li>
                <!--<li><a href="">曾经购买</a></li>-->
                <li>
                  <router-link :class="routerName == 'user/index/visit_log'?'menu_check':''" :to="{ name: 'user/index/visit_log'}">{{i18n.index.mytracks}}</router-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc4"></i>{{i18n.index.personal_center}}
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/info'?'menu_check':''" :to="{ name: 'user/index/info'}">{{i18n.index.personal_details}}</router-link>
                </li>
                <!-- <li>
                  <router-link :class="routerName == 'user/index/bind_auth'?'menu_check':''" :to="{ name: 'user/index/bind_auth'}">账号绑定</router-link>
                </li> -->
                <li>
                  <router-link :class="routerName == 'user/index/address_list'?'menu_check':''" :to="{ name: 'user/index/address_list'}">{{i18n.index.address_administration}}</router-link>
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/safety_settings'?'menu_check':''" :to="{ name: 'user/index/safety_settings'}">{{i18n.index.security_settings}}</router-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc5"></i>{{i18n.index.distribution_center}}
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/lower_list'?'menu_check':''" :to="{ name: 'user/index/lower_list'}">{{i18n.index.mypromotion}}</router-link>
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/income'?'menu_check':''"  :to="{ name: 'user/index/income'}">{{i18n.index.myearnings}}</router-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc6"></i>{{i18n.index.customer_service}}
                </li>
                <!--<li><a href="">我的发票</a></li>-->
                <li>
                  <router-link  :class="routerName == 'user/index/return_goods_index'?'menu_check':''" :to="{ name: 'user/index/return_goods_index'}">{{i18n.index.refund_exchange}}</router-link>
                </li>
                <li>
                 <router-link :class="routerName == 'order/index/dispute'?'menu_check':''" :to="{ name: 'order/index/dispute'}">{{i18n.index.trade_complaints}}</router-link>
                </li>
                <li>
                  <router-link :class="routerName == 'user/index/expose_list'?'menu_check':''" :to="{ name: 'user/index/expose_list'}">{{i18n.index.violation_report}}</router-link>
                </li>

                <li>
                 <router-link :class="routerName == 'user/index/consult_list'?'menu_check':''" :to="{ name: 'user/index/consult_list'}">{{i18n.index.search_record}}</router-link>
                </li>
              </ul>
            </div>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar/index2.vue";
import TopInfo from "@/components/TopInfo/index.vue";

export default {
  data() {
    return {};
  },
  created() {},
  computed:{
    routerName:function(){
      return this.$route.name
    },
    i18n () {  
  	  return this.$t('user')  
  	}
  },
  components: {
    TopBar,
    TopInfo
  }
};
</script>

<style scoped>
@import "@/static/css/myaccount.css";
.home-index-middle {
  background: #f5f5f5;
}
.menu_check{
    color: #e23435;
    font-weight: bold;
}
.g-crumbs{
	display: inline-table;
}
</style>

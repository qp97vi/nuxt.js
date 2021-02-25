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
				<nuxt-link :to="{ name: 'user_index'}">
				{{i18n.index.mymall}}
				</nuxt-link>
				<span v-if="routerName!='user_index'">&nbsp;>&nbsp; {{title}}</span>
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
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/order_list/id'}">{{i18n.index.myorder}}</nuxt-link>
                </li>
                <!-- <li>
                  <nuxt-link active-class="menu_check" :class="routerName == 'virtual_list'?'menu_check':''" :to="{ name: 'virtual_list'}">虚拟订单</nuxt-link>
                </li> -->
                <!--给钱才能解开封印 -->
                <li>
                  <nuxt-link active-class="menu_check" :to="{ name: 'user/index/comment'}">{{i18n.index.myrating}}</nuxt-link>
                </li>
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/my_trial'}">试用单</nuxt-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc2"></i>{{i18n.index.assethub}}
                </li>
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/coupon'}">{{i18n.index.mycoupons}}</nuxt-link>
                </li>
                <li>
                  <nuxt-link active-class="menu_check"   :to="{ name: 'user/index/recharge'}">{{i18n.index.account_balance}}</nuxt-link>
                </li>
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/account'}">{{i18n.index.myintegral}}</nuxt-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc3"></i>{{i18n.index.focus_center}}
                </li>
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/goods_collect/id'}">{{i18n.index.myfavorite}}</nuxt-link>
                </li>
                <!--<li><a href="">曾经购买</a></li>-->
                <li>
                  <nuxt-link active-class="menu_check" :to="{ name: 'user/index/visit_log'}">{{i18n.index.mytracks}}</nuxt-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc4"></i>{{i18n.index.personal_center}}
                </li>
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/info'}">{{i18n.index.personal_details}}</nuxt-link>
                </li>
                <!-- <li>
                  <nuxt-link active-class="menu_check" :to="{ name: 'user/index/bind_auth'}">账号绑定</nuxt-link>
                </li> -->
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/address_list'}">{{i18n.index.address_administration}}</nuxt-link>
                </li>
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/safety_settings'}">{{i18n.index.security_settings}}</nuxt-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc5"></i>{{i18n.index.distribution_center}}
                </li>
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/lower_list'}">{{i18n.index.mypromotion}}</nuxt-link>
                </li>
                <li>
                  <nuxt-link active-class="menu_check"   :to="{ name: 'user/index/income'}">{{i18n.index.myearnings}}</nuxt-link>
                </li>
              </ul>
              <ul>
                <li class="ma">
                  <i class="account-acc6"></i>{{i18n.index.customer_service}}
                </li>
                <!--<li><a href="">我的发票</a></li>-->
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/return_goods_index'}">{{i18n.index.refund_exchange}}</nuxt-link>
                </li>
                <li>
                 <nuxt-link active-class="menu_check"  :to="{ name: 'order/index/dispute_info'}">{{i18n.index.trade_complaints}}</nuxt-link>
                </li>
                <li>
                  <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/expose_list'}">{{i18n.index.violation_report}}</nuxt-link>
                </li>

                <li>
                 <nuxt-link active-class="menu_check"  :to="{ name: 'user/index/consult_list'}">{{i18n.index.search_record}}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <nuxt-child></nuxt-child>
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
    return {
		routerName:"",
		title:"",
	};
  },
  asyncData ({ params, route, error }) {   
    console.log("路由信息",route)
    return {
      routerName: route.name
    }
  },
  created() {
	//   console.log("路由信息",this.$route)
  },
  mounted() {
	  this.title = document.title;
  },
  computed:{
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

<style >
@import "@/static/css/myaccount.css";
.home-index-middle {
  background: #f5f5f5;
}
.le-menu .menu_check{
    color: #e23435;
    font-weight: bold;
}
.g-crumbs{
	display: inline-table;
}
</style>

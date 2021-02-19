
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
    <div class="topic-banner" style="background: #f37c1e;">
      <div class="w1224">
        <adv ad_id="1"></adv>
        <i></i>
      </div>
    </div>
    <div>
      <top-bar></top-bar>
      <div class="nav-middan-z p">
        <div class="header w1224">
          <div class="ecsc-logo fon_gwcshcar">
            <a href="/" class="logo">
              <img v-if="$store.state.shop_config" :src="apiHead+$store.state.shop_config.store_logo" style="width:100%;height:58px" /> 
            </a>
            <span>{{i18n.cart2.shopping_trolley}}</span>
          </div>
          <div class="liucsell">
            <div class="line-flowpath">
              <span class="green">
                <i class="las-flo"></i>
                <em>{{i18n.cart2.i_shopping_trolley}}</em>
              </span>
              <span class="green now">
                <i class="las-flo2"></i>
                <em>{{i18n.cart2.fill_in_order}}</em>
              </span>
              <span>
                <i class="las-flo3"></i>
                <em>{{i18n.cart2.sub_order}}</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fillorder">
      <div class="w1224">
        <p class="tit">{{i18n.cart2.fill_in_sub_order}}</p>

        <div class="spriteform" v-if="this.isVirtual != 1">
          <div class="top_leg p">
            <span class="paragraph fl"><i class="ddd"></i>{{i18n.cart2.consignee_msg}}</span>
            <span class="newadd fr" style="cursor: pointer;" @click="address_edit()">{{i18n.cart2.now_add_address}}</span>
            <!-- <a class="newadd fr" href="javascript:void(0);">新增收货地址</a> -->
          </div>
          <div class="consignee-list p" :style="'height:'+listHeight+';'">
            <ul>
              <li class="addressItem" v-for="(item,index) in addressList" :key="index">
                <div class="item_select_t fl" :class="index == addressIndex ? 'curtr' :''" @click="tabAddress(item,index)">
                  <span>{{item.consignee}}&nbsp;{{item.province_name}}</span>
                  <b></b>
                </div>
                <div class="addrdetail fl">
                  <span class="addr-name">{{item.consignee}}</span>
                  <span class="addr-info">
                    {{item.province_name}} {{item.city_name}} {{item.district_name}} {{item.twon_name}} {{item.address}}
                  </span>
                  <span class="addr-tel">{{item.mobile}}</span>
                  <span class="addr-default" v-if="item.is_default == 1">{{i18n.cart2.df_address}}</span>
                </div>
                <div class="opbtns_editdel">
                  <a href="javascript:void(0);" class="ftx" v-if="item.is_default == 0" @click="set_address_default(index)">{{i18n.cart2.setdf_address}}</a>
                  <a href="javascript:void(0);" class="ftx" @click="amendLocation(item)">{{i18n.compile}}</a>
                  <a href="javascript:void(0);" class="ftx" @click="deleteAddress(item,index)">{{i18n.del}}</a>
                </div>
              </li>
            </ul>
          </div>
          <div class="addr-switch" v-if="addressList.length > 1">
            <span @click="moreAddress()" v-if="siteBool">{{i18n.cart2.more_address}}</span>
            <span @click="putAddress()" v-else>{{i18n.cart2.out_address}}</span>
            <b></b>
          </div>
        </div>
      </div>
    </div>
    <div class="sendgoodslist">
      <div class="w1224">
        <div class="top_leg p ma-to-20">
          <span class="paragraph fl">
            <i class="ddd"></i>{{i18n.cart2.delivery_inventory}}
            <router-link :to="{name:'cart'}">返回购物车</router-link>
          </span>
          <a class="newadd fr hover-y">
            <i class="las-warning"></i>{{i18n.cart2.price_explain}}
            <div class="pairgoods">
              <p class="tit">{{i18n.cart2.remind}}</p>
            </div>
          </a>
        </div>
        <div class="shopping-listpay" v-for="(storeOrder, storeOrderIndex) in cartBill.order.order_list" :key="storeOrderIndex">
          <div class="dis-modes-li p express_delivery_modes">
            <div class="shipment" v-if="isVirtual != 1" >
              <div class="fore1 p">
                <span class="mode-label">{{i18n.cart2.distribution_time}}</span>

                <div class="mode-infor hover-y">
                  <p>
                    <label>{{i18n.cart2.rest_may_delivery}}</label>
                  </p>
                </div>
              </div>
            </div>
            <div class="standard_wei buy-remarks p">
              <span>{{i18n.cart2.remark}}:</span>
              <textarea class="user_note_txt fl" maxlength="50" :placeholder="i18n.cart2.most_input" v-model="user_notes[cartBill.store_cart_list[storeOrderIndex].store_id]"></textarea>
            </div>
          </div>
          <div class="goods-list-ri">
            <div class="goodsforma">
              <div class="modti p">
                <h2>{{i18n.cart2.seller}}：{{cartBill.store_cart_list[storeOrderIndex].store_name}}</h2>
                <span class="tp-bold tp-c-red1" style="margin-right: 12px;" v-if="storeOrder.store_free_shipping">满{{storeOrder.store_free_shipping}}包邮</span>
              </div>
              <div class="goods-last-suit ma-to-10 p">
                <div class="goods-suit-tit" v-if="storeOrder.order_prom_amount">
                  <span class="sales-icon">{{i18n.cart2.order_discounts}}</span>
                  <strong>{{storeOrder.order_prom_title}}</strong>
                </div>
              </div>
              <ul class="buy-shopping-list">
                <li v-for="(item, index) in storeOrder.order_goods" :key="index">
                  <div class="goods-extra clearfix">
                    <div class="p-img">
                      <router-link :to="{ name:'goods/goodsInfo/id' , query:{id:item.goods_id}}" target="_blank">
                        <img :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.goods_id" alt />
                      </router-link>
                      <div class="p-img-tips goods_shipping_img" v-if="item.is_delivery == 0">{{i18n.cart2.not_goods}}</div>
                    </div>
                    <div class="goods-msg clearfix">
                      <div class="tp-cart-goods-name">
                        <span class="tp-bold tp-c-red1" style="margin-right: 12px;" v-if="item.prom_type==1">抢购</span>
                        <span class="tp-bold tp-c-red1" style="margin-right: 12px;" v-if="item.prom_type==2">团购</span>
                        <span class="tp-bold tp-c-red1" style="margin-right: 12px;" v-if="item.prom_type==3">优惠促销</span>
                        <span class="tp-bold tp-c-red1" style="margin-right: 12px;" v-if="item.prom_type==4">预售</span>
                        <span class="tp-bold tp-c-red1" style="margin-right: 12px;" v-if="item.prom_type==6">拼团</span>
                        <router-link :to="{ name:'goods/goodsInfo/id' , query:{id:item.goods_id}}" target="_blank">
                          {{item.goods_name}}
                        </router-link>
                      </div>
                      <ul class="tp-cart-goods-mes">
                        <li>
                          <span>{{item.spec_key_name}}</span>
                          <span class="tp-bold tp-c-red1">x{{item.goods_num}}</span>
                        </li>
                        <li>
                          <span class="tp-bold tp-c-red1">{{i18nCommon.symbol}}{{item.member_goods_price}}</span>
                        </li>
                        <li v-if="tax_config && tax_config.open == 1 && item.tax_price > 0">
                          <span class="tp-bold tp-c-red1">{{i18n.cart2.taxes_and_dues}}:{{i18nCommon.symbol}}{{item.tax_price}}</span>
                        </li>
                        <li v-if="isVirtual != 1">
                          <span class="goods_shipping_title" :class="{red:item.is_delivery==1}">{{item.is_delivery == 1 ? i18n.cart2.available : i18n.cart2.out_stock}}</span>
                          <!-- <span class="tp-c-red1">0g</span> -->
                        </li>
                      </ul>
                      <div class="msp_return">
                        <p class="guarantee-item">
                          <!-- 7天无理由退货 -->
                          <template v-if="cartBill.store_cart_list[storeOrderIndex].qitian == 1">
                            <i class="return7"></i><span class="f_blue">{{i18n.cart2.support_hebdomad_gratuitous}}</span>
                          </template>
                          <!-- <template v-else>
														<i class="return7 return7-dark"></i><span class="f_dark">{{i18n.cart2.no_hebdomad_gratuitous}}</span>
													</template> -->
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="total-weight">
						<span>总重量 :</span>0g
					</div> -->
        </div>
      </div>
    </div>
    <div class="addremark" v-if="$store.state.shop_config&&shop_config.invoice_enable == '1'">
      <div class="w1224">
        <div class="top_leg p ma-to-20">
          <span class="paragraph fl">
            <i class="ddd"></i>{{i18n.cart2.invoice_information}}
          </span>
        </div>
        <div class="invoice-cont ma-to-20">
          <template v-if="userExtend.invoice_desc!=i18n.cart2.no_open_invoice">
            <span>{{i18n.cart2.ordinary_invoice_paper}}</span>
            <span>{{userExtend.invoice_title}}</span>
          </template>
          <span>{{userExtend.invoice_desc}}</span>
          <a href="javascript:void(0);" @click="invoiceDialogVisible = true">{{i18n.puts}}</a>
        </div>
      </div>
    </div>
    <div class="usecou-step-tit">
      <div class="w1224">
        <div class="top_leg p ma-to-20">
          <span class="paragraph usewhilejs fl">
            <i class="ddd"></i>{{i18n.cart2.use_coupon}}
          </span>
          <p class="coupon-des">
            {{i18n.cart2.yes_coupon}}
            <i class="coupon-num">{{ableCouponCount}}</i>{{i18n.cart2.sheet}}
          </p>
          <span style="color: #666;" v-if="isPerSell">
            不能使用优惠券/积分抵扣
            <el-popover placement="bottom" width="300" visible-arrow="true" trigger="hover">
              <div>预售商品不能使用，因为预售定金有阶梯价，补差价时，优惠券/积分退不了</div>
              <i slot="reference" style="color: #999; font-size: 16px;" class="el-icon-warning-outline" size="16"></i>
            </el-popover>
          </span>
        </div>
        <div class="coupon-detail" :class="isPerSell?'coupon':''">
          <div class="detail-title clearfix">
            <ul class="available-title">
              <li :class="{active:couponChoose}" @click="couponChoose=true">
                <a href="javascript:;">
                  {{i18n.cart2.yes_coupon}} (
                  <i class="available-num">{{ableCouponCount}}</i> )
                </a>
              </li>
              <li :class="{active:!couponChoose}" @click="couponChoose=false">
                <a href="javascript:;">
                  {{i18n.cart2.no_coupon}} (
                  <i class="unavailable-num">{{disableCouponCount}}</i> )
                </a>
              </li>
            </ul>
            <!-- <a class="for-details" href="javascript:;">了解优惠券使用规则</a> -->
          </div>
          <div class="detail-cont" style="margin-top: -5px;">
            <ul class="available">
              <li style="display: list-item;" v-if="couponChoose">
                <div class="coupon-list coupon-able-list p">
                  <div v-for="(storeOrder, storeOrderIndex) in cartBill.order.order_list" :key="storeOrderIndex">
                    <div class="coupon-item" v-for="(coupon,index) in storeOrder.usable_coupons" :key="index">
                      <p class="direct">{{coupon.name}}</p>
                      <p class="total"><sub>{{i18nCommon.symbol}}</sub>{{coupon.money}}</p>
                      <p class="des">{{i18n.cart2.full}}<sub>{{i18nCommon.symbol}}</sub>{{coupon.condition}}{{i18n.cart2.use}}</p>
                      <p class="shop-name des">{{cartBill.store_cart_list[storeOrderIndex].store_name}}</p>
                      <p class="time-over">{{i18n.cart2.valid_until}}:{{coupon.use_end_time | datefmt}}</p>
                      <i class="checked-ico"></i>
                    </div>
                  </div>
                </div>
                <p class="coupon-list-des">
                  <i class="ico-warn"></i>{{i18n.cart2.portion_coupon_no_and_use}}
                </p>
              </li>
              <li v-if="!couponChoose">
                <div class="coupon-list p">
                  <div v-for="(storeOrder, storeOrderIndex) in cartBill.order.order_list" :key="storeOrderIndex">
                    <div class="coupon-item" :class="coupon.status==2?'coupon-invalid':'coupon-useless'" v-for="(coupon,index) in storeOrder.disable_coupons" :key="index">
                      <p class="direct">{{coupon.name}}</p>
                      <p class="total"><sub>{{i18nCommon.symbol}}</sub>{{coupon.money}}</p>
                      <p class="des">>{{i18n.cart2.full}}<sub>{{i18nCommon.symbol}}</sub>{{coupon.condition}}{{i18n.cart2.use}}</p>
                      <p class="shop-name des">{{cartBill.store_cart_list[storeOrderIndex].store_name}}</p>
                      <p class="time-over">{{i18n.cart2.valid_until}}:{{coupon.use_end_time | datefmt}}</p>
                      <i class="checked-ico"></i>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="score-list">
            <p class="item">
              <label>
                <el-checkbox :disabled="user.pay_points <= 0 ? true : false" v-model="useIntegral" @change="changePoints()">{{i18n.cart2.use_integral_balance}}:</el-checkbox>
                <input type="text" :disabled="!useIntegral" v-model="tempOrder.integral" onpaste="this.value=this.value.replace(/[^\d]/g,'')" onkeyup="this.value = this.value.replace(/[^\d]/g, '')" @change="_getCartOrder()" />
                {{i18n.cart2.now_integral}}
                <span>{{user.pay_points}}</span> {{i18n.cart2.dot}}
              </label>
            </p>
            <p class="item">
              <label>
                <el-checkbox :disabled="user.user_money <= 0 ? true : false" v-model="useMoney" @change="changeMoney()">使用账户余额:</el-checkbox>
                <input type="text" :disabled="!useMoney" v-model="tempOrder.user_money" onpaste="this.value=this.value.replace(/[^\d]/g,'')" onkeyup="this.value = this.value.replace(/[^\d]/g, '')" @change="_getCartOrder()" />
                {{i18nCommon.symbol}} (您当前账户余额<span>{{i18nCommon.symbol}}{{user.user_money}}</span>)
              </label>
            </p>
            <p class="item">
              <label>
                <el-checkbox v-model="useConponCode" @change="changeCode()">{{i18n.cart2.use_coupon_code}}:</el-checkbox>
                <input type="text" :disabled="!useConponCode" v-model="coupon_code" />
                <el-button type="danger" style="margin-left: 10px;" @click="exchangeCoupon" :disabled="!useConponCode" size="mini" class="coupon_exchange">
                  {{i18n.cart2.conversion}}
                </el-button>
              </label>
            </p>
            <p class="item" v-if="(useIntegral && tempOrder.integral > 0)  || (useMoney && tempOrder.user_money > 0) && shop_basic.is_without != '1'">
              <label>
                {{i18n.cart2.pay_pswd}}:
                <input type="password" v-model="payPwdTmp" />
                <span v-if="user.pay_pwd == '' || typeof(user.pay_pwd) == 'undefined'">{{i18n.cart2.please_first}}
                  <router-link :to="{path:'/user/paypwd'}" style="color: #e23435;">{{i18n.cart2.set_pay_pswd}}</router-link>
                </span>
              </label>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="usecou-step-tit" v-if="isCanUseTip">
      <div class="w1224">
        <div class="top_leg p ma-to-20">
          <span class="paragraph usewhilejs fl">
            <i class="ddd"></i>{{i18n.cart2.tip}}
          </span>
        </div>
        <div class="coupon-detail">
          <div class="score-list">
            <p class="item">
              <label>
                <!-- <el-checkbox v-model="payTip" @change="payTipHandle">支付小费:</el-checkbox> -->
                <input type="text" v-model="tempOrder.tip_money" onpaste="this.value=this.value.replace(/[^\d]/g,'')" onkeyup="this.value = this.value.replace(/[^\d]/g, '')" @input="_getCartOrder()" class="tips-input" />
              </label>
              <el-radio-group v-model="tipSelection" size="small" @change="tipSelectionHandle">
                {{i18nCommon.symbol}}
                <el-radio :label="item" border v-for="(item,index) in tipOption" :key="index">{{item}}</el-radio>
              </el-radio-group>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="order-summary p">
      <div class="w1224">
        <div class="statistic fr">
          <div class="list">
            <span>
              <em class="ftx-01">{{cartBill.order.goods_num}}</em> {{i18n.cart2.total_pic}}
            </span>
            <em class="price">{{i18nCommon.symbol}}{{cartBill.order.goods_price}}</em>
          </div>
          <div class="list" v-if="isVirtual != 1">
            <span>{{i18n.cart2.freight}}：</span>
            <em class="price">{{i18nCommon.symbol}}{{cartBill.order.shipping_price}}</em>
          </div>
          <div class="list" v-if="isCanUseTip && cartBill.order.tip_money && cartBill.order.tip_money > 0">
            <span>{{i18n.cart2.tip}}：</span>
            <em class="price">{{i18nCommon.symbol}}{{cartBill.order.tip_money}}</em>
          </div>
          <div class="list" v-if="tax_config && tax_config.open == 1 && cartBill.order.tax_price && cartBill.order.tax_price > 0">
            <span>{{i18n.cart2.taxes_and_dues}}：</span>
            <em class="price">{{i18nCommon.symbol}}{{cartBill.order.tax_price}}</em>
          </div>
          <div class="list">
            <span>{{i18n.cart2.discounts}}：</span>
            <em class="price">-{{i18nCommon.symbol}}{{cartBill.order.order_prom_amount}}</em>
          </div>
          <div class="list">
            <span>{{i18n.cart2.coupon}}：</span>
            <em class="price">-{{i18nCommon.symbol}}{{cartBill.order.coupon_price}}</em>
          </div>
          <div class="list">
            <span>{{i18n.cart2.integral_pay}}：</span>
            <em class="price">-{{i18nCommon.symbol}}{{typeof(cartBill.order.integral_money) != 'undefined' ? cartBill.order.integral_money : 0}}</em>
          </div>
          <div class="list" v-if="cartBill.order.user_money > 0">
            <span>余额支付：</span>
            <em class="price">{{i18nCommon.symbol}}{{cartBill.order.user_money}}</em>
          </div>
          <div class="list" v-if="cartBill.order.paid_money > 0">
            <span>{{i18n.cart2.deposit}}：</span>
            <em class="price">{{i18nCommon.symbol}}{{cartBill.order.paid_money}}</em>
          </div>
          <div class="list" v-if="cartBill.order.tail_amount > 0">
            <span>{{i18n.cart2.Balance}}：</span>
            <em class="price">{{i18nCommon.symbol}}{{cartBill.order.tail_amount}}</em>
          </div>
        </div>
      </div>
    </div>
    <div class="trade-foot p">
      <div class="w1224">
        <div class="trade-foot-detail-com">
          <div class="fc-price-info">
            <span class="price-tit">{{i18n.cart2.should_rental}}：</span>
            <span class="price-num">{{i18nCommon.symbol}}{{cartBill.order.order_amount}}</span>
          </div>
          <div class="fc-consignee-info" v-if="address.address_id > 0">
            <span class="mr20">
              {{i18n.cart2.send_to}}：
              <span>{{address.province_name}} {{address.city_name}} {{address.district_name}} {{address.twon_name}}
                {{address.address}}</span>
            </span>
            <span id="sendMobile">
              {{i18n.cart2.consignee}}：
              <span>{{address.consignee}} {{address.mobile}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="submitorder_carpay p">
      <div class="w1224">
        <el-button type="danger" class="checkout-submit" @click="submitOrder()" :loading="submitLoading">{{i18n.cart2.submit_order}}</el-button>
      </div>
    </div>
    <el-dialog :title="i18n.cart2.invoice_information" :visible.sync="invoiceDialogVisible">
      <div class="ui-dialog-content" style="height: 350px">
        <div class="invoice-dialog">
          <div class="tab-nav p">
            <ul>
              <li>
                <div class="item_select_t curtr">
                  <span>{{i18n.cart2.ordinary_invoice}}</span>
                  <b></b>
                </div>
              </li>
            </ul>
          </div>
          <div class="zinvoice-tips">
            <i></i>
            <span class="tip-cont">
              {{i18n.cart2.invoice_no_coupon}}
            </span>
            <i></i>
            <span class="tip-cont"> {{i18n.cart2.taxpayer_identify}}</span>
          </div>
          <div class="ui-switchable-panel">
            <div class="switchable-wrap" v-if="tempUserExtend.invoice_desc!=i18n.cart2.no_open_invoice">
              <div class="invoice_title p">
                <span class="label">{{i18n.cart2.invoice_title}}：</span>
                <div class="fl">
                  <a class="setlesbtn" :class="{'setles-bg':tempUserExtend.invoice_title==i18n.cart2.personage}" @click="personalInvoice()">{{i18n.cart2.personage}}<b></b></a>
                  <a class="setlesbtn" :class="{'setles-bg':tempUserExtend.invoice_title!=i18n.cart2.personage}" @click="unitInvoice()">{{i18n.cart2.unit}}<b></b></a>
                </div>
              </div>
              <div class="invoice_title p">
                <div style="display: block;" class="invoice_title" v-if="tempUserExtend.invoice_title!=i18n.cart2.personage">
                  <div class="p">
                    <span class="label high_line_height">{{i18n.cart2.look_up_the_content}}&nbsp;&nbsp;&nbsp;：</span>
                    <div class="fl">
                      <el-input v-model="tempUserExtend.invoice_title" :placeholder="i18n.cart2.enter_unitname" class="invoice_tt"></el-input>
                    </div>
                  </div>
                  <div class="p">
                    <span class="label high_line_height">{{i18n.cart2.taxpayer_number}}：</span>
                    <div class="fl">
                      <el-input v-model="tempUserExtend.taxpayer" :placeholder="i18n.cart2.identification_number" class="invoice_tt"></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="invoice_title p">
              <span class="label">{{i18n.cart2.invoice_content}}：</span>

              <div class="fl">
                <div class="tab-nav p">
                  <ul>
                    <li>
                      <div class="item_select_t" :class="{curtr:tempUserExtend.invoice_desc==i18n.cart2.goods_detail}" @click="tempUserExtend.invoice_desc=i18n.cart2.goods_detail">
                        <span>{{i18n.cart2.goods_detail}}</span>
                        <b></b>
                      </div>
                    </li>
                    <li>
                      <div class="item_select_t " :class="{curtr:tempUserExtend.invoice_desc==i18n.cart2.goods_type}" @click="tempUserExtend.invoice_desc=i18n.cart2.goods_type">
                        <span>{{i18n.cart2.goods_type}}</span>
                        <b></b>
                      </div>
                    </li>
                    <li>
                      <div class="item_select_t" :class="{curtr:tempUserExtend.invoice_desc==i18n.cart2.no_open_invoice}" @click="tempUserExtend.invoice_desc=i18n.cart2.no_open_invoice">
                        <span>{{i18n.cart2.no_open_invoice}}</span>
                        <b></b>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="invoiceDialogVisible = false">{{i18n.cancel}}</el-button>
        <el-button type="primary" @click="confirmInvoice()">{{i18n.confirm}}</el-button>
      </div>
    </el-dialog>

    <!-- 弹框 -->
    <div>
      <po-pout :dialogFormVisible.sync="dialogFormVisible" @closeBindWarnStandard="handleCloseBindWarnStandard" @updatesiteData="updatesiteData" :form="form" :title="title" :shippingAddres="shippingAddress"></po-pout>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import {
  customerAddress,
  removeAddress,
  getCartOrder,
  getCartBill,
  getUserExtend,
  addOrUpdateUserExtend,
  exchangeCoupon,
  getBaseInfo,
  addCartOrder,
  addCartOrderByGoodsSku,
  singleUserAddress,
  modifyUserAddress,
} from "@/utils/api.js";
import TopBar from "@/components/TopBar/index.vue";
import Adv from "@/components/Adv/index.vue";
import poPout from "@/components/Popout/index";
import { mapState } from "vuex";

export default {
  data() {
    return {
      goods: {
        goods_id: this.$route.query.goods_id,
        item_id: this.$route.query.item_id,
        goods_num: this.$route.query.goods_num,
      }, //立即购买商品
      addressList: [], //地址列表
      addressIndex: 0, //收货人信息类名判断
      address: {}, //使用地址
      cartBill: {
        order: {}, //购物车订单
        store_cart_list: [], //购物车
      },
      userExtend: {
        invoice_title: "个人",
        taxpayer: "",
        invoice_desc: "不开发票",
      }, //用户上次使用的发票
      tempUserExtend: {
        invoice_title: "",
        taxpayer: "",
        invoice_desc: "不开发票",
      },
      isInvoice: false, //是否开发票
      invoiceDialogVisible: false, //发票弹出
      ableCouponCount: 0, //可用优惠券数量
      disableCouponCount: 0, //不可用优惠券数量
      user: {},
      tipOption: [], //小费档位
      useIntegral: false, //是否使用积分抵扣
      useMoney: false, //是否使用余额抵扣
      useConponCode: false, //是否兑换优惠券
      coupon_code: "", //优惠券兑换码
      tempOrder: {
        address_id: "", //地址id
        integral: "", //积分
        pay_pwd: "", //支付密码
        order_use_coupon_ids: "", //使用的优惠券id集合,逗号分隔
      },
      user_notes: {}, //备注
      submitLoading: false, //加载中
      couponChoose: true, //优惠券选项卡
      form: {
        consignee: "", //收货人
        address: "", //详细地址
        zipcode: "", //邮编
        mobile: "", //手机
        is_default: 0, //默认地址
      },
      title: "新增",
      dialogFormVisible: false,
      shippingAddress: [],
      listHeight: "42px", //收货人高度
      siteBool: true, //更多收起显示
      cloneAddress: {}, //当行数据克隆下来A
      tipSelection: "",
      payPwdTmp: "", //支付密码明文
      isCanUseTip: false, //是否能使用小费
      isCanUseDeduct: false, //是否能使用各种抵扣
			isPerSell: false, //是否是预售订单
			isVirtual: false, //是否是虚拟订单
    };
  },
  created() {
		 this._getCartBill();
		 this._getUser();
		 this._getUserExtend();
	},
  computed: {
    ...mapState(["shop_config", "shop_basic", "tip_config", "tax_config"]),
    i18n() {
      this.title = this.$t("cart.cart2.newly_increased");
      return this.$t("cart");
    },
    i18nCommon() {
      return this.$t("common");
    },
  },

  components: {
    TopBar,
    Adv,
    poPout,
  },
  methods: {
    changePoints() {
      if (this.useIntegral == false) {
        this.tempOrder.integral = "";
      }
    },
    changeMoney() {
      if (this.useMoney == false) {
        this.tempOrder.user_money = "";
      }
    },
    changeCode() {
      if (this.useConponCode == false) {
        this.coupon_code = "";
      }
    },
    tipSelectionHandle(val) {
      this.tempOrder.tip_money = val;
      this.$forceUpdate();
      this._getCartOrder();
    },
    //删除地址
    deleteAddress(item, index) {
      var _this = this;
      this.$confirm(_this.i18n.cart2.deleteok, _this.i18n.cart2.message, {
        confirmButtonText: _this.i18n.confirm,
        cancelButtonText: _this.i18n.cancel,
        type: "warning",
      })
        .then(() => {
          removeAddress(item.address_id).then((res) => {
            var argu = {};
            if (res.status == 1) {
              _this._getAddressList();
              argu = {
                showClose: true,
                message: res.msg,
                type: "success",
              };
            } else {
              argu = {
                showClose: true,
                message: _this.i18n.cart2.fail_delete + res.msg,
                type: "error",
              };
            }
            _this.$message(argu);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: _this.i18n.cart2.undeleted,
          });
        });
    },
    //设置默认
    set_address_default(index) {
      var _this = this;
      var form = this.addressList[index];
      form.is_default = 1;
      var argu = "";
      modifyUserAddress(form).then((res) => {
        if (res.status == 1) {
          argu = {
            showClose: true,
            message: res.msg,
            type: "success",
          };
        } else {
          argu = {
            showClose: true,
            message: _this.i18n.cart2.setup_failed + res.msg,
            type: "error",
          };
        }
        _this.addressIndex = 0;
        _this.listHeight = "42px";
        _this.siteBool = true;
        _this.$message(argu);
        _this._getAddressList();
      });
    },
    //类名切换
    tabAddress(item, index) {
      /*选择地址 将原地址删除，在地址列表第一位新增删除的地址，默认选中第一个
       */ this.cloneAddress = JSON.parse(JSON.stringify(item));
      this.addressList.splice(index, 1);
      this.addressList.unshift(this.cloneAddress);
      this.addressIndex = 0;
      this.tempOrder.address_id = item.address_id;
      this._getCartOrder();
    },
    //更多地址
    moreAddress() {
      this.listHeight = "inherit";
      this.siteBool = false;
    },
    //收起地址
    putAddress() {
      this.listHeight = "42px";
      this.siteBool = true;
      /*收起地址移除出错*/
    },
    handleCloseBindWarnStandard(data) {
      this.dialogFormVisible = false;
    },
    //点击增加地址
    address_edit() {
      this.title = this.i18n.cart2.newly_increased;
      this.shippingAddress = [];
      this.dialogFormVisible = true;
      this.form = {
        consignee: "", //收货人
        address: "", //详细地址
        zipcode: "", //邮编
        mobile: "", //手机
        is_default: 0, //默认地址
      };
    },
    //点击修改地址
    amendLocation(item) {
      var _this = this;
      this.title = _this.i18n.cart2.amend;
      this.dialogFormVisible = true;
      singleUserAddress(item.address_id).then((res) => {
        if (_this.shippingAddress) {
          _this.shippingAddress.splice(0, 1, res.province);
          _this.shippingAddress.splice(1, 1, res.city);
          _this.shippingAddress.splice(2, 1, res.district);
        } else {
          _this.shippingAddress.push(res.province);
          _this.shippingAddress.push(res.city);
          _this.shippingAddress.push(res.district);
        }
        _this.form = res;
      });
    },
    updatesiteData(data) {
      this.addressList = data;
      if (!this.tempOrder.address_id) {
        this.tempOrder.address_id = data[0].address_id;
      }
      this._getCartOrder();
    },
    submitOrder() {
      var that = this;
      this.submitLoading = true;
      this.tempOrder.user_notes = this.user_notes;
      if (this.payPwdTmp) {
        this.tempOrder.pay_pwd = md5("TPSHOP" + this.payPwdTmp);
      }
      if (this.isBuyNow()) {
        addCartOrderByGoodsSku(
          this.getTempOrder(),
          this.goods.goods_id,
          this.goods.item_id,
          this.goods.goods_num
        ).then((res) => {
          that.submitLoading = false;
          if (res.status != 1) {
            that.$message({
              message: res.msg,
              type: "error",
            });
          } else {
            this.$router.push({
              name: "cart/paymentOrder/id",
              query: {
                master_order_sn: res.result.master_order_sn,
              },
            });
          }
        });
      } else {
        addCartOrder(this.getTempOrder()).then((res) => {
          that.submitLoading = false;
          if (res.status != 1) {
            that.$message({
              message: res.msg,
              type: "error",
            });
          } else {
            this.$router.push({
              name: "cart/paymentOrder/id",
              query: {
                master_order_sn: res.result.master_order_sn,
              },
            });
          }
        });
      }
    },
    isBuyNow() {
      if (this.goods.goods_id > 0) {
        return true;
      } else {
        return false;
      }
    },
    getTempOrder() {
      if (this.goods.goods_id > 0) {
        return Object.assign(this.tempOrder, this.goods);
      } else {
        return this.tempOrder;
      }
    },
    _getCartBill() {
      var that = this;
      var query;
      if (this.isBuyNow()) {
        query = this.goods;
      } else {
        query = {
          selected: 1,
        };
      }
      getCartBill(query).then((res) => {
        this.cartBill = res;
        if (this.cartBill.store_cart_list.length == 0) {
          this.$message({
            message: that.i18n.cart2.unselected_item,
            type: "error",
            onClose: function () {
              that.$router.go(-1);
            },
          });
        }
        this.cartBill.store_cart_list.forEach(function (item) {
          that.user_notes[item.store_id] = "";
				});
				this.bookingOrder();
				if(this.isVirtual != 1){
						this._getAddressList();		
				}else{
          this._getCartOrder();
        }
      });
    },
    _getAddressList() {
      customerAddress().then((res) => {
        this.addressList = res;
        if (this.addressList.length > 0) {
          //设置选择中地址
          this.address = this.addressList[0];
          this.tempOrder.address_id = this.address.address_id;
          this._getCartOrder();
        } else {
          //打开创建地址对话框
          this.address_edit();
        }
      });
    },
    //是否能使用小费
    setIsCanUseTip() {
      if (
        this.cartBill.order.order_list[0].prom_type != 4 &&
        this.tip_config &&
        this.tip_config.open == 1
      ) {
        this.isCanUseTip = true;
      } else {
        this.isCanUseTip = false;
      }
    },
    //是否能使用各种抵扣
    setIsCanUseDeduct() {
      if (this.cartBill.order.order_list[0].prom_type != 4) {
        this.isCanUseDeduct = true;
      } else {
        this.isCanUseDeduct = false;
      }
    },
    //是否是预售订单,虚拟订单
    bookingOrder() {
      if (this.cartBill.order.order_list[0].prom_type == 4) {
        this.isPerSell = true;
      } else {
        this.isPerSell = false;
			}
			if (this.cartBill.order.order_list[0].is_virtual == 1) {
        this.isVirtual = true;
      } else {
        this.isVirtual = false;
      }
		},
    /*重排位置*/
    getStoreSort(targetArr, sortArr, sortItem) {
      /*targetArr: 目标排序数组
				  sortArr :排序数组
				  sortItem: 排序判断条件
				*/
      let arr = new Array();
      targetArr.map((item) => {
        sortArr.map((i) => {
          if (item[sortItem] == i[sortItem]) {
            arr.push(i);
          }
        });
      });
      return (sortArr = arr);
    },
    _getCartOrder() {
      var that = this;
      getCartOrder(this.getTempOrder()).then((res) => {
        if (res.status && res.status != 1) {
          this.$message({
            message: res.msg,
            type: "error",
          });
          return;
        }
        that.ableCouponCount = 0;
        that.disableCouponCount = 0;
        that.cartBill.order = res;
        /*重排数据*/
        if (typeof that.cartBill.order.order_list != undefined) {
          that.cartBill.order.order_list = that.getStoreSort(
            that.cartBill.store_cart_list,
            that.cartBill.order.order_list,
            "store_id"
          );
        }
        that.cartBill.order.order_list.forEach(function (item) {
          item.selectId = 0;
          if (typeof item.usable_coupons != "undefined") {
            that.ableCouponCount += item.usable_coupons.length;
          }
          that.disableCouponCount += item.disable_coupons.length;
        });
        that.setIsCanUseTip();
        if (that.isCanUseTip) {
          that.tipOption = [];
          var tipOptionone =
            that.cartBill.order.goods_price * 0.01 * that.tip_config.first_gear;
          var tipOptiontwo =
            that.cartBill.order.goods_price *
            0.01 *
            that.tip_config.second_gear;
          var tipOptionthree =
            that.cartBill.order.goods_price * 0.01 * that.tip_config.third_gear;
          that.tipOption.push(tipOptionone.toFixed(2));
          that.tipOption.push(tipOptiontwo.toFixed(2));
          that.tipOption.push(tipOptionthree.toFixed(2));
          if (that.tipSelection == "") {
            //默认选中小费第一档,默认选中会再次请求一遍账单api
            that.tipSelection = that.tipOption[0];
            that.tipSelectionHandle(that.tipSelection);
          }
        }
      });
    },
    _getUserExtend() {
      getUserExtend().then((res) => {
        //判断用户之前是否有填写过发票的记录
        if (res != "") {
          this.userExtend = res;
          this.tempUserExtend = JSON.parse(JSON.stringify(res));
        }
      });
    },
    personalInvoice() {
      this.tempUserExtend.invoice_title = this.i18n.cart2.personage;
      this.tempUserExtend.taxpayer = "";
    },
    unitInvoice() {
      this.tempUserExtend = this.userExtend;
    },
    _getUser() {
      getBaseInfo().then((res) => {
        this.user = res;
      });
    },
    exchangeCoupon() {
      var _this = this;
      exchangeCoupon({
        code: this.coupon_code,
      }).then((res) => {
        if (res.status == 1) {
          this.$message({
            message: _this.i18n.cart2.forsuccessfu,
            type: "success",
            onClose: function () {
              //获取列表
            },
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    confirmInvoice() {
      var _this = this;
      if (
        this.tempUserExtend.invoice_title != _this.i18n.cart2.personage &&
        this.tempUserExtend.taxpayer == ""
      ) {
        this.$message({
          message: _this.i18n.cart2.notblank,
          type: "error",
        });
        return;
      }
      this.userExtend = this.tempUserExtend;
      addOrUpdateUserExtend(this.userExtend).then((res) => {
        this.invoiceDialogVisible = false;
      });
    },
  },
};
</script>

<style scoped>
@import "@/static/css/myaccount.css";
@import "@/static/css/jh.css";
.coupon {
  background: #ececec;
}
.tips-input {
  margin-right: 30px;
  padding-left: 10px;
  height: 30px;
}
.invoice_tt {
  padding: 6px 0;
}
.high_line_height {
  height: 35px !important;
  line-height: 35px !important;
}
</style>

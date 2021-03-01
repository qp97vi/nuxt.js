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
          <nuxt-link :to="{ name: 'user'}">{{i18n.my_mall}}</nuxt-link>
          <i class="litt-xyb"></i>
          <nuxt-link :to="{ name: 'order_list'}">{{i18n.order_centre}}</nuxt-link>
          <i class="litt-xyb"></i>
          <span>
            <b>{{i18n.order}}：{{orderDetailsData.order_sn}}</b>
          </span>
        </div>
        <div class="home-main">
          <div class="com-topyue">
            <div class="wacheng fl">
              <p class="ddn1">
                <el-tag type="danger" size="small " effect="dark" v-if="orderDetailsData.is_virtual == 1">虚拟</el-tag>
                <span>{{i18n.order_number}}：</span>
                <span>{{orderDetailsData.order_sn}}</span>
              </p>
              <div v-if="orderDetailsData.prom_type == 4">
                <p class="ddn1">
                  <span>{{i18n.order_type}}：</span>
                  <span>{{i18n.booking_order}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </p>
                <div v-if="preSell.is_finished == 3">
                  <!-- 商家标记活动失败 -->
                  <p class="ddn1">
                    <span>{{i18n.cause_off}}：</span>
                    <span>{{i18n.cause_one}}</span>
                  </p>
                  <h3 style="font: 700 24px/34px 'Microsoft YaHei';color: #e4393c; padding-top:20px;">{{i18n.order_closed}}</h3>
                </div>
                <div v-if="preSell.is_finished == 2 && orderDetailsData.pay_status == 2 &&(time / 1000) > preSell.pay_end_time && preSell.pay_end_time != 0">
                  <!-- 商家标记活动成功但是超过尾款支付时间 -->
                  <div>
                    <p class="ddn1">
                      <span>{{i18n.cause_off}}：</span>
                      <span>{{i18n.cause_two}}</span>
                    </p>
                    <h3 style="font: 700 24px/34px 'Microsoft YaHei';color: #e4393c; padding-top:20px;">{{i18n.order_closed}}</h3>
                  </div>
                </div>
              </div>
              <div>
                <div v-if="orderDetailsData.pay_status==0&&orderDetailsData.order_status==0&&orderDetailsData.prom_status!=4">
                  <h3 style="font: 700 18px/20px 'Microsoft YaHei';color: #e4393c; padding-top:20px;">
                    {{i18n.call_at}}{{finally_pay_time | datefmtAll}}
                    <p>{{i18n.before_payment}}</p>
                  </h3>
                  <nuxt-link class="ddn3" style="margin-top:20px;" :to="{name:'cart/paymentOrder/id',query:{order_sn:orderDetailsData.order_sn}}">{{i18n.payment}}</nuxt-link>
                </div>
                <div v-else>
                  <h1 class="ddn2">{{orderDetailsData.order_status_detail}}</h1>
                  <div v-if="orderDetailsData.is_able_comment">
                    <nuxt-link :to="{ name: 'comment_list',query:{order_id:orderDetailsData.order_id}}" class="ddn3">{{i18n.evaluate}}</nuxt-link>
                  </div>
                </div>
              </div>
              <div v-if="orderDetailsData.is_able_confirm">
                <span class="ddn3" style="margin-top:20px;" @click="order_confirm()">{{i18n.affirm_submit}}</span>
              </div>
              <div v-if="orderDetailsData.is_able_cancel_pay">
                <div>
                  <a class="ddn3" style="margin-top:10px;color:#666;" href="javascript:;" @click="setPrice()">{{i18n.cancellation_order}}</a>
                </div>
              </div>
              <div v-if="orderDetailsData.prom_type == 4 && orderDetailsData.pay_status == 2 && preSell.is_finished == 2 && time/1000 >= preSell.pay_start_time && time/1000 <= preSell.pay_end_time">
              </div>
              <p class="ddn4"></p>
            </div>
            <div class="wacheng2 fr">
              <p class="dd2n">{{i18n.hint_one}}</p>
              <div class="liuchaar p">
                <!-- 一 -->
                <el-steps :active="active" process-status="wait " v-if="orderDetailsData.is_virtual == 0">
                  <el-step :title="i18n.submit_order" :description="orderDetailsData.add_time_detail">
                    <i class="y-comp" slot="icon"></i>
                  </el-step>
                  <el-step :title="i18n.paid" :description="orderDetailsData.prom_type == 4 && preSell.deposit_price>0 ? `${i18n.retainage_pay}${preSell.pay_start_time_show}${i18n.until}${preSell.pay_end_time_show}` :''">
                    <i class="y-comp2" slot="icon"></i>
                  </el-step>
                  <el-step :title="orderDetailsData.shop_id == 0 ? i18n.seller_shipping : i18n.wait_lift" :description="orderDetailsData.shop_id==0 ? `${orderDetailsData.shipping_time_desc}`:''">
                    <i class="y-comp3" slot="icon"></i>
                  </el-step>
                  <el-step :title="orderDetailsData.order_status==4 || orderDetailsData.order_status==2 ? i18n.received:i18n.await_reap" :description="orderDetailsData.order_status==4 || orderDetailsData.order_status==2 ? `${orderDetailsData.confirm_time_desc}`:''">
                    <i class="y-comp4" slot="icon"></i>
                  </el-step>
                  <el-step :title="i18n.achieve">
                    <i class="y-comp5" slot="icon"></i>
                  </el-step>
                </el-steps>
                <!-- 虚拟订单步骤条 -->
                <el-steps :active="virtualActive" v-if="orderDetailsData.is_virtual == 1">
                  <el-step :title="i18n.submit_order">
                    <i class="y-comp" slot="icon"></i>
                  </el-step>
                  <el-step :title="i18n.paid">
                    <i class="y-comp2" slot="icon"></i>
                  </el-step>
                  <el-step title="发放兑换码" :description="virtualCode.gmt_create">
                    <i class="y-comp3" slot="icon"></i>
                  </el-step>
                  <el-step :title="i18n.achieve">
                    <i class="y-comp5" slot="icon"></i>
                  </el-step>
                </el-steps>
              </div>
              <div class="grouupanjf">
                <div v-if="orderDetailsData.pay_status == 0">
                  <a href="javascript:;">
                    {{i18n.finalize_order}}:
                    <i class="y-comp7"></i>{{i18n.integral}}&nbsp;&nbsp;
                    <i class="y-comp8"></i>{{i18n.member_growth_value}}&nbsp;&nbsp;
                    <i class="y-comp7"></i>{{i18n.discount_coupon}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="home-main reseting ma-to-20" v-if="orderDetailsData.shipping_status == 1 && orderDetailsData.shipping_name">
          <div class="com-topyue">
            <div class="wacheng fl">
              <div class="shioeboixe">
                <div class="sohstyle p">
                  <div class="osnhptek">
                    <p>
                      <span>{{i18n.shipping_method}}：</span>
                      <span>{{orderDetailsData.shipping_name}}</span>
                    </p>
                    <p>
                      <span>{{i18n.courier_number}}：</span>
                      <span>{{deliveryDocList.invoice_no}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="wacheng2 fr">
              <div class="listchatu1">
                <br />
                <ul v-for="(item) in logisticsData.Traces" :key="item.AcceptTime">
                  <li class="first" style="margin-left:30px;margin-top:10px;">{{item.AcceptStation}}</li>
                  <li class="first" style="margin-left:30px">{{item.AcceptTime}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="home-main ma-to-20">
          <div class="rshrinfmas">
            <div class="spff" v-if="orderDetailsData.is_virtual == 0">
              <h2>{{i18n.consignee_data}}</h2>
              <div class="psbaowq">
                <p>
                  <span class="fircl">{{i18n.consignee}}：</span>
                  <span class="lascl">{{orderDetailsData.consignee}}</span>
                </p>
                <p>
                  <span class="fircl">{{i18n.site}}：</span>
                  <span class="lascl" v-for="region in userAddress" :key="region.id">{{region.name}} </span>
                </p>
                <p>
                  <span class="fircl">{{i18n.phone_number}}：</span>
                  <span class="lascl">{{orderDetailsData.mobile}}</span>
                </p>
              </div>
            </div>
            <div class="spff" v-else>
              <h2>接收通知</h2>
              <div class="psbaowq">
                <p v-if="orderDetailsData.mobile">
                  <span class="fircl">{{i18n.phone_number}}：</span>
                  <span class="lascl">{{orderDetailsData.mobile}}</span>
                </p>
                <p v-if="orderDetailsData.email">
                  <span class="fircl">邮箱：</span>
                  <span class="lascl">{{orderDetailsData.email}}</span>
                </p>
              </div>
            </div>
            <div class="spff" v-if="orderDetailsData.is_virtual == 0">
              <h2>{{i18n.delivery_data}}</h2>
              <div class="psbaowq">
                <p>
                  <span class="fircl">{{i18n.mode_distribution}}：</span>
                  <span class="lascl">
                    <span v-if="deliveryDocList.send_type==0">手填单号</span>
                    <span v-if="deliveryDocList.send_type==1">预约到店</span>
                    <span v-if="deliveryDocList.send_type==2">电子面单</span>
                    <span v-if="deliveryDocList.send_type==3">自己配送</span>
                  </span>
                  <span class="lascl" v-for="(item) in orderDetailsData.delivery_doc_list" :key="item.order_id">{{item.shipping_name}}</span>
                  <!-- <span class="lascl">无需物流</span> -->
                </p>
                <p>
                  <span class="fircl">{{i18n.freight}}：</span>
                  <span class="lascl">
                    <em>{{i18nCommon.symbol}}</em>
                    {{Number(orderDetailsData.shipping_price).toFixed(2)}}
                  </span>
                </p>
              </div>
            </div>
            <div class="spff" v-if="orderDetailsData.is_virtual == 1">
              <h2>兑换码</h2>
              <div class="psbaowq">
                <p>
                  <span class="fircl">兑换码：</span>
                  <span class="lascl">
                    <el-popover trigger="hover" placement="top" width="160">
                      <p>未支付/已取消，导致没有兑换码</p>
                      <div style="text-align: right; margin: 0" v-if="orderDetailsData.is_able_pay">
                        <nuxt-link :to="{name:'cart/paymentOrder/id',query:{order_sn:orderDetailsData.order_sn}}">
                          <el-button type="danger" size="mini">
                            去支付

                          </el-button>
                        </nuxt-link>
                      </div>
                      <el-button size="mini" type="warning" slot="reference" v-if="orderDetailsData.pay_status == 0">未生成</el-button>
                    </el-popover>

                    <el-popover trigger="hover" placement="top" width="600">
                      <span style="font-size:60px">{{virtualCode.code}}</span>
                      <el-button size="mini" type="danger" slot="reference" v-if="virtualCode">{{virtualCode.code}}</el-button>
                    </el-popover>
                  </span>

                </p>
                <p v-if="virtualCode">
                  <span class="fircl">是否兑换：</span>
                  <span class="lascl">
                    <el-tag type="warning" size="small" v-if="!virtualCode.is_use" effect="dark">未兑换</el-tag>
                    <el-tag type="success" size="small" v-if="virtualCode.is_use" effect="dark">已兑换</el-tag>
                  </span>
                </p>
                <p v-if="virtualCode && !virtualCode.is_use">
                  <span class="fircl">是否过期：</span>
                  <span class="lascl">
                    <el-tag type="success" size="small" v-if="!virtualCode.is_exprie" effect="dark">未过期</el-tag>
                    <el-tag type="warning" size="small" v-if="virtualCode.is_exprie" effect="dark">已过期</el-tag>
                  </span>
                </p>
                <p v-if="virtualCode && !virtualCode.is_use">
                  <span class="fircl">过期时间：</span>
                  <span class="lascl">
                    <el-tag type="danger" size="small" v-if="!virtualCode.is_exprie" effect="plain">{{virtualCode.expire_time}}</el-tag>
                    <el-tag type="info" size="small" v-if="virtualCode.is_exprie" effect="plain">{{virtualCode.expire_time}}</el-tag>
                  </span>
                </p>
              </div>
            </div>

            <div class="spff">
              <h2>{{i18n.payment_data}}</h2>
              <div class="psbaowq">
                <p>
                  <span class="fircl">{{i18n.payment_method}}：</span>
                  <span class="lascl" v-if="orderDetailsData.pay_status==1 && orderDetailsData.pay_name!=''">{{i18n.online_payment}}</span>
                  <span class="lascl" v-else>{{orderDetailsData.pay_name}}</span>
                </p>
                <p>
                  <span class="fircl">{{i18n.time_payment}}：</span>
                  <span class="lascl" v-if="orderDetailsData.pay_status==1">{{orderDetailsData.pay_time}}</span>
                  <span class="lascl" v-else>{{i18n.non_payment}}</span>
                </p>
                <div v-if="orderDetailsData.prom_type != 4">
                  <p>
                    <span class="fircl">{{i18n.order_price}}：</span>
                    <span class="lascl">
                      <em>{{i18nCommon.symbol}}</em>
                      {{Number(orderDetailsData.total_amount).toFixed(2)}}
                    </span>
                  </p>
                  <p>
                    <span class="fircl">{{i18n.amount_payable}}：</span>
                    <span class="lascl">
                      <em>{{i18nCommon.symbol}}</em>
                      {{Number(orderDetailsData.order_amount).toFixed(2)}}
                    </span>
                  </p>
                  <p>
                    <span class="fircl">{{i18n.freight_amount}}：</span>
                    <span class="lascl">
                      <em>{{i18nCommon.symbol}}</em>
                      {{Number(orderDetailsData.shipping_price).toFixed(2)}}
                    </span>
                  </p>
                </div>
                <p v-if="orderDetailsData.tax_price && orderDetailsData.tax_price > 0">
                  <span class="fircl">{{i18n.taxes_dues}}：</span>
                  <span class="lascl">
                    <em>{{i18nCommon.symbol}}</em>
                    {{Number(orderDetailsData.tax_price).toFixed(2)}}
                  </span>
                </p>
                <p>
                  <span class="fircl">{{i18n.discount_coupon}}：</span>
                  <span class="lascl">
                    <em>{{i18nCommon.symbol}}</em>
                    {{Number(orderDetailsData.coupon_price).toFixed(2)}}
                  </span>
                </p>
                <p v-if="orderDetailsData.tip_money && orderDetailsData.tip_money > 0">
                  <span class="fircl">{{i18n.tip}}：</span>
                  <span class="lascl">
                    <em>{{i18nCommon.symbol}}</em>
                    {{Number(orderDetailsData.tip_money).toFixed(2)}}
                  </span>
                </p>
                <p>
                  <span class="fircl">{{i18n.balance_paid}}：</span>
                  <span class="lascl">
                    <em>{{i18nCommon.symbol}}</em>
                    {{Number(orderDetailsData.user_money).toFixed(2)}}
                  </span>
                </p>
                <p>
                  <span class="fircl">{{i18n.points_deduction}}：</span>
                  <span class="lascl">
                    <em>{{i18nCommon.symbol}}</em>
                    {{Number(orderDetailsData.integral_money).toFixed(2)}}
                  </span>
                </p>
                <p>
                  <span class="fircl">{{i18n.order_preferential}}：</span>
                  <span class="lascl">
                    <em>{{i18nCommon.symbol}}</em>
                    {{Number(orderDetailsData.order_prom_amount).toFixed(2)}}
                  </span>
                </p>
                <p>
                  <span class="fircl">{{i18n.price_adjustment}}：</span>
                  <span class="lascl">
                    <em>{{i18nCommon.symbol}}</em>
                    {{Number(orderDetailsData.discount).toFixed(2)}}
                  </span>
                </p>
                <!-- 预售商品 start -->
                <!-- 预售商品 end -->
              </div>
            </div>
            <!-- <div class="spff mar0">
              <h2>{{i18n.invoice_information}}</h2>
              <div class="psbaowq">
                <p>
                  <span class="fircl">{{i18n.invoice_type}}：</span>
                  <span class="lascl">{{orderDetailsData.invoice_title ?  i18n.general_invoice: i18n.notopen_invoice}}</span>
                </p>
                <p>
                  <span class="fircl">{{i18n.invoice_title}}：</span>
                  <span class="lascl">{{orderDetailsData.invoice_title}}</span>
                </p>
                <p>
                  <span class="fircl">{{i18n.ratepaying_identifier}}：</span>
                  <span class="lascl">{{orderDetailsData.taxpayer}}</span>
                </p>
              </div>
            </div> -->
          </div>
        </div>
        <div class="beenovercom">
          <div class="shoptist">
            <span>
              {{store.store_name}}
              <a v-if="this.shop_basic.im_choose == 1 && orderGoodsList.length > 0" href="javascript:;" :user_id="user.user_id" :uname="user.nickname" :avatar="user.head_pic" sign="" :storeid="orderDetailsData.store_id" :client_host="location.host" :client_href="location.href" :goods_id="orderGoodsList[0].goods_id" :im_href="location.origin + '/im'" :ws_socket="getWssOrws() + '//' + location.host + '/ws'" :order_id="orderDetailsData.order_id" :order_sn="orderDetailsData.order_sn" :add_time="orderDetailsData.add_time_detail" :full_address="orderDetailsData.address" :consignee="orderDetailsData.consignee + orderDetailsData.mobile" id="workerman-kefu" onclick="jump()">
                <i class="y-comp9"></i>
              </a>
              <a v-if="shop_basic.im_choose == 2" :href="'tencent://message/?uin=' + store.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'" target="_blank">
                <i class="y-comp9"></i>
              </a>
            </span>
          </div>
          <div class="orderbook-list">
            <div class="book-tit">
              <ul>
                <li class="sx1">{{i18n.goods}}</li>
                <li class="sx2">{{i18n.goods_id}}</li>
                <li class="sx3">{{i18n.buy_unit_price}}</li>
                <li class="sx4">{{i18n.present_exp}}</li>
                <li class="sx5">{{i18n.goods_amount}}</li>
                <li class="sx6">{{i18n.operate}}</li>
              </ul>
            </div>
          </div>
          <div class="order-alone-li">
            <table width="100%" border cellspacing cellpadding>
              <tbody v-for="(item) in orderGoodsList" :key="item.rec_id">
                <tr class="conten_or">
                  <td class="sx1">
                    <div class="shop-if-dif">
                      <div class="shop-difimg">
                        <nuxt-link :to="{name:'goodsInfo',query:{id:item.goods_id}}">
                          <img :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.goods_id" />
                        </nuxt-link>
                      </div>
                      <div class="cebigeze">
                        <div class="shop_name">
                          <nuxt-link :to="{name:'goodsInfo',query:{id:item.goods_id}}">
                            <el-tag type="danger" size="small " effect="dark" v-if="orderDetailsData.is_virtual == 1">虚拟</el-tag>
                            <span>{{item.goods_name}}</span>
                          </nuxt-link>
                        </div>
                        <p class="mayxl">{{item.spec_key_name}}</p>
                      </div>
                    </div>
                  </td>
                  <td class="sx2">{{item.bar_code}}</td>
                  <td class="sx3">
                    <span>{{i18nCommon.symbol}}</span>
                    <span>{{Number(item.goods_price).toFixed(2)}}</span>
                  </td>
                  <td class="sx4">
                    <span>{{item.give_integral}}</span>
                  </td>
                  <td class="sx5">
                    <span>{{item.goods_num}}</span>
                  </td>
                  <td class="sx6">
                    <div class="twrbac">
                      <p v-if="item.is_send < 2 && orderDetailsData.order_status == 2 && (time-orderDetailsData.add_time)<7776000">
                        <nuxt-link :to="{name:'return_goods_info',query:{order_id:item.order_id}}">{{i18n.apply_sale}}</nuxt-link>
                      </p>
                      <p>
                        <nuxt-link class="songobuy" :to="{name:'goodsInfo', query: {id: item.goods_id}}">{{i18n.buy_again}}</nuxt-link>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="numzjsehe">
          <p>
            <span class="sp_tutt">{{i18n.goods_total}}：</span>
            <span class="smprice">
              <em>{{i18nCommon.symbol}}</em>
              {{Number(orderDetailsData.goods_price).toFixed(2)}}
            </span>
          </p>
          <p>
            <span class="sp_tutt">{{i18n.return}}&nbsp;&nbsp;&nbsp;&nbsp;{{i18n.present}}：</span>
            <span class="smprice">
              <em>{{i18nCommon.symbol}}</em>0.00
            </span>
          </p>
          <p>
            <span class="sp_tutt">{{i18n.carry}}&nbsp;&nbsp;&nbsp;&nbsp;{{i18n.charge}}：</span>
            <span class="smprice">
              <em>{{i18nCommon.symbol}}</em>
              {{Number(orderDetailsData.shipping_price).toFixed(2)}}
            </span>
          </p>
          <p>
            <span class="sp_tutt">{{i18n.handle_rental}}：</span>
            <span class="smprice red">
              <em>{{i18nCommon.symbol}}</em>
              {{Number(orderDetailsData.order_amount).toFixed(2)}}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="slidebar_alo">
      <ul>
        <li class="re_cuso">
          <a target="_blank" href>{{i18n.forums}}</a>
        </li>
        <li class="re_wechat">
          <a target="_blank" href>{{i18n.follow_wechat}}</a>
          <div class="rtipscont" style="opacity: 0; left: 0px;">
            <span class="arrowr-bg"></span>
            <span class="arrowr"></span>
            <img src="@/static/images/qrcode.png" />
            <p class="tiptext">
              {{i18n.scan}}
              <br />{{i18n.ahead}}
            </p>
          </div>
        </li>
        <li class="re_phone">
          <a target="_blank" href>{{i18n.phone_mall}}</a>
          <div class="rtipscont rstoretips" style="opacity: 0; left: 0px;">
            <span class="arrowr-bg"></span>
            <span class="arrowr"></span>
          </div>
        </li>
        <li class="re_top" style="display: list-item;">
          <a target="_blank" href="javascript:void(0);">{{i18n.gotop}}</a>
        </li>
      </ul>
    </div>
    <!-- 取消订单弹框 -->
		<el-dialog :title="i18n1.order_list.cancel_application" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item>
					<p>{{i18n1.order_list.cancelled_successfully}}</p>
				</el-form-item>
				<el-form-item :label="i18n1.order_list.order_amount" :label-width="formLabelWidth">
					<strong class="ftx-01">{{i18nCommon.symbol}}{{Number(form.goods_price).toFixed(2)}}</strong>
				</el-form-item>
				<el-form-item :label="i18n1.order_list.reason_cancellation" :label-width="formLabelWidth">
					<el-select v-model="form.region" :placeholder="i18n1.order_list.please_reason_cancellation">
						<el-option :label="i18n1.order_list.cause_one" :value="i18n1.order_list.cause_one"></el-option>
						<el-option :label="i18n1.order_list.cause_two" :value="i18n1.order_list.cause_two"></el-option>
						<el-option :label="i18n1.order_list.cause_therr" :value="i18n1.order_list.cause_therr"></el-option>
						<el-option :label="i18n1.order_list.cause_four" :value="i18n1.order_list.cause_four"></el-option>
						<el-option :label="i18n1.order_list.cause_five" :value="i18n1.order_list.cause_five"></el-option>
						<el-option :label="i18n1.order_list.cause_six" :value="i18n1.order_list.cause_six"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" class="paydetail-box">
					<div style="overflow: hidden;">
						<dl class="pdetail clearfix" style="float:left;">
							<dd class="fore1">{{i18n1.order_list.discount_coupon}}</dd>
							<dd class="fore2">
								<strong class="ftx-01" id="payDetail3">{{i18nCommon.symbol}}{{Number(form.coupon_price).toFixed(2)}}</strong>
							</dd>
						</dl>
						<dl class="pdetail clearfix" style="float:left;">
							<dd class="fore1">{{i18n1.order_list.integral}}</dd>
							<dd class="fore2">
								<strong class="ftx-01" id="payDetail18">{{i18nCommon.symbol}}{{Number(form.integral_money).toFixed(2)}}</strong>
							</dd>
						</dl>
						<dl class="pdetail clearfix" style="float:left;">
							<dd class="fore1">{{i18n1.order_list.balance}}</dd>
							<dd class="fore2">
								<strong class="ftx-01" id="payDetail1">{{i18nCommon.symbol}}{{Number(form.user_money).toFixed(2)}}</strong>
							</dd>
						</dl>
					</div>
				</el-form-item>
				<el-form-item :label="i18n1.order_list.warm_prompt" :label-width="formLabelWidth" class="paydetail-box">
					<div class="return-msg">
						<br />· {{i18n1.order_list.warm_one}}
						<br />· {{i18n1.order_list.warm_two}}
						<br />· {{i18n1.order_list.warm_therr}}
					</div>
				</el-form-item>
				<el-form-item :label="i18n1.order_list.contact_way" :label-width="formLabelWidth">
					<input type="text" class="text text1 gray" name="consignee" style="margin-right:10px;" v-model="form.consignee" />
					<input type="text" class="text gray" name="mobile" v-model="form.mobile" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="determineCancel()">{{i18n1.order_list.confirm_cancel}}</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">{{i18n1.order_list.temporarily_notcancel}}</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUser } from "@/utils/auth.js";
import TopBar from "@/components/TopBar/index2.vue";
import TopInfo from "@/components/TopInfo/index.vue";
import {
  getorderDetails,
  preSellDetails,
  getLogisticsInformation,
  confirmReceipt,
  getOrderGoodsList,
  getLogistics,
  getRegionList,
  getStore,
  getShopConfig,
  getVirtualCode,
  cancellationOrder,
  getTidio
} from "@/utils/api.js";
import { loadImJs, getWssOrws,loadTidioJs } from "@/utils/asyncLoadJs";
let loadedImJs = false; //是否加载完im的js
export default {
  data() {
    return {
      form: {
        coupon_price: "", //优惠卷
        integral_money: "", //积分
        user_money: "", //余额
        goods_price: "", //商品总价
        consignee: "", //弹框姓名
        mobile: "", //弹框手机号
        region: "", //弹框取消原因
      },
      time: new Date().getTime() / 1000, //当前时间戳
      orderDetailsData: {},
      preSell: {
        deposit_price: 0,
      },
      virtualCode: {},
      spcode: "",
      logisticsData: {}, //物流信息A
      active: 1, //步骤条
      virtualActive: 1, //虚拟订单步骤条
      time: new Date().getTime(), //当前时间戳
      orderGoodsList: [], //订单商品
      deliveryDocList: [],
      userAddress: [],
      store: {},
      dialogFormVisible: false,
      formLabelWidth: "100px",
      finally_pay_time: "", //订单最终支付时间
      location: window.location,
      user: getUser(),
    };
  },
  computed: {
    ...mapState(["shop_basic"]),
    i18n() {
      return this.$t("order").order_detail;
    },
    i18n1() {
      return this.$t("user");
    },
    i18nCommon() {
      return this.$t("common");
    },
  },
  methods: {
    getWssOrws() {
      return getWssOrws();
    },
    //确认收货
    order_confirm() {
      var params = this.orderDetailsData;
      confirmReceipt(params).then((res) => {
        this.orderDetails();
      });
    },
    // 订单详情数据
    orderDetails() {
      var data = {
        order_id: this.$route.query.order_id,
        order_sn: this.$route.query.order_sn,
      };
      var _this = this;
      getorderDetails(data)
        .then((res) => {
          _this.orderDetailsData = res;
          if (_this.orderDetailsData.order_status_detail == '未使用') {
            _this.orderDetailsData.order_status_detail = res.shipping_status_detail
          }
          this.stepBarJudgment();
        })
        .then(() => {
          if (this.orderDetailsData.prom_type == 4) {
            preSellDetails(this.orderDetailsData.prom_id).then((res) => {
              _this.preSell = res;
            });
          }
          if (this.orderDetailsData.is_virtual == 1) {
            getVirtualCode({ order_id: this.orderDetailsData.order_id }).then(
              (res) => {
                _this.virtualCode = res;
                _this.virtualStep();
              }
            );
          }

          if (_this.orderDetailsData.order_id != null) {
            getOrderGoodsList({
              order_ids: this.orderDetailsData.order_id,
            }).then((res) => {
              this.orderGoodsList = res;
            });
            if (
              _this.orderDetailsData.shipping_status == 1 &&
              _this.orderDetailsData.is_virtual == 0
            ) {
              getLogistics({
                order_id: this.orderDetailsData.order_id,
              }).then((res) => {
                _this.deliveryDocList = res[0];
              });
            }
            if (_this.orderDetailsData.province > 0) {
              getRegionList({
                ids:
                  _this.orderDetailsData.province +
                  "," +
                  _this.orderDetailsData.city +
                  "," +
                  _this.orderDetailsData.district +
                  "," +
                  _this.orderDetailsData.twon,
              }).then((res) => {
                this.userAddress = res;
              });
            }

            getStore({
              store_id: _this.orderDetailsData.store_id,
            }).then((res) => {
              this.store = res;
            });
            getShopConfig({
              inc_type: "shopping",
            }).then((res) => {
              _this.finally_pay_time =
                _this.orderDetailsData.add_time +
                parseInt(res.shopping.finally_pay_time);
            });
            _this.getTidio(_this.orderDetailsData.store_id)
          }
        })
        .then(() => {
          if (_this.deliveryDocList.length > 0) {
            var params = {
              shipping_code: _this.deliveryDocList[0].shipping_code,
              invoice_no: _this.deliveryDocList[0].invoice_no,
              // shipping_code:'ZTO',
              // invoice_no:75362654828256
            };
            getLogisticsInformation(params).then((res) => {
              _this.logisticsData = res;
            });
          }
        });
    },
    //步骤条判断
    stepBarJudgment() {
      var orderDetailsData = this.orderDetailsData;
      if (
        orderDetailsData.pay_status == 1 &&
        orderDetailsData.shipping_status == 0 &&
        orderDetailsData.order_status < 2
      ) {
        this.active = 2;
      }
      if (
        orderDetailsData.shipping_status == 1 &&
        orderDetailsData.order_status == 1
      ) {
        this.active = 3;
      }
      if (orderDetailsData.order_status == 2) {
        this.active = 4;
      }
      if (orderDetailsData.order_status == 4) {
        this.active = 5;
      }
    },
    //虚拟订单步骤条判断
    virtualStep() {
      if (this.orderDetailsData.pay_status == 1) {
        this.virtualActive = 2;
      }
      if (this.virtualCode) {
        this.virtualActive = 3;
      }
      if (this.orderDetailsData.order_status == 4) {
        this.virtualActive = 4;
      }
    },
    //取消订单
    setPrice() {
      this.dialogFormVisible = true;
      this.form = this.orderDetailsData;
    },
    //确定取消订单
    determineCancel() {
      var _this = this;
      var params = {
        order_id: this.form.order_id,
        order_sn: this.form.order_sn,
        mobile: this.form.mobile,
        consignee: this.form.consignee,
      };
      cancellationOrder(params).then((res) => {
        var aren = {};
        if (res.status == 1) {
          aren = {
            showClose: true,
            message: res.msg,
            type: "success",
          };
          var params = {
            p: _this.handleCurrent,
            size: _this.handleSize,
            type: _this.type,
          };
          location.reload();
          //_this.pagingMethod(params);
        } else {
          aren = {
            showClose: true,
            message: res.msg,
            type: "error",
          };
        }
        _this.$message(aren);
        _this.dialogFormVisible = false;
      });
    },
    getTidio(storeId) {
      getTidio({ store_id: storeId }).then((res) => {
        if (res && res.js_url) {
          loadTidioJs(res.js_url).then(() => {});
        }
      });
    },
  },
  created() {
    if (!loadedImJs && this.shop_basic.im_choose == 1) {
      loadImJs(location.origin + "/im").then(() => {
        loadedImJs = true;
      });
    }
    this.orderDetails();
  },
  components: {
    TopBar,
    TopInfo,
  },
};
</script>

<style scoped>
@import "@/static/css/myaccount.css";

>>> .el-step__description.is-finish {
  color: #67c23a;
}

>>> .el-step__icon.is-text {
  border: none;
}

>>> .el-step__icon {
  width: 55px;
  height: 28px;
}
div.paydetail-box .pdetail dd {
  float: left;
}

.ftx-01,
.ftx01 {
  color: #e4393c;
}

.paydetail-box .pdetail dd.fore1 {
  width: 60px;
  margin: 0 0 0 20px;
}
.y-comp2 {
  background-image: url(../../../static/images/y-saea8bece45.png);
  background-position-x: -64px;
}

.y-comp3 {
  background-image: url(../../../static/images/y-saea8bece45.png);
  background-position-x: -64px;
}

.y-comp4 {
  background-image: url(../../../static/images/y-saea8bece45.png);
  background-position-x: -64px;
}

.y-comp5 {
  background-image: url(../../../static/images/y-saea8bece45.png);
  background-position-x: -64px;
}

>>> .is-finish .y-comp2 {
  background-image: url(../../../static/images/y-saea8bece45.png);
  background-position-x: 0px;
}

>>> .is-finish .y-comp3 {
  background-image: url(../../../static/images/y-saea8bece45.png);
  background-position-x: 0px;
}

>>> .is-finish .y-comp4 {
  background-image: url(../../../static/images/y-saea8bece45.png);
  background-position-x: 0px;
}

>>> .is-finish .y-comp5 {
  background-image: url(../../../static/images/y-saea8bece45.png);
  background-position-x: 0px;
}

>>> .el-step__title.is-finish {
  color: #67c23a;
}

>>> .el-step__head.is-finish {
  border-color: #67c23a;
}
</style>
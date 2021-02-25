
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
    <search-box></search-box>
    <div class="search-box p">
      <div class="w1224">
        <div class="search-path fl">
          <a>{{i18n.goodsInfo.all_result}}</a>
          <template v-for="(item) in goodsCategoryList">
            <i class="litt-xyb"></i>
            <nuxt-link :to="{name:'goodsList',query:{cat_id:item.id}}">{{item.name}}</nuxt-link>
          </template>
          <div class="havedox">
            <span>{{goods.goods_name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="details-bigimg p">
      <div class="w1224">
        <div class="detail-img">
          <div class="product-gallery">
            <div class="product-photo" :class="goods.video&&!videoIsShow?'picshow-ac':''">
              <video :src="goods.video" v-show="videoIsShow" class="goods-video" controls="controls">
                {{i18n.goodsInfo.nonsupport}}
              </video>
              <div class="product-video"></div>
              <i class="close-video"></i>
              <i class="video-play" @click="showVideo"></i>
              <vue-photo-zoom-pro :url="zoomUrl" :high-url="zoomHighUrl" :scale="2" :out-zoomer="true">
              </vue-photo-zoom-pro>
              <div class="product-small-img fn-clear">
                <a href="javascript:;" class="next-left next-btn fl disabled">&lt;</a>
                <div class="pic-hide-box fl">
                  <ul class="small-pic">
                    <template v-for="item in goodsImages">
                      <li class="small-pic-li">
                        <a href="javascript:;" @click="witchZoom(item)">
                          <img :src="item.image_url" />
                          <i></i>
                        </a>
                      </li>
                    </template>
                  </ul>
                </div>
                <a href="javascript:;" class="next-right next-btn fl">&gt;</a>
              </div>
              <!-- 商品小图介绍 end ]]-->
            </div>
            <!-- 收藏商品 start [[-->
            <div class="collect">
              <a href="javascript:void(0);">
                <i class="collect-ico collect-ico-null"></i>
                <span class="collect-text" @click="clickCollect()">
                  <template v-if="goodsCollection == ''">
                    {{i18n.goodsInfo.collect_goods}}
                  </template>
                  <template v-else>
                    {{i18n.goodsInfo.ck_collect}}
                  </template>
                </span>
                <em class="J_FavCount">（{{goods.collect_sum}}）</em>
              </a>
            </div>
            <!-- 分享商品 -->
            <div class="share" style="float: left">
              <div class="jiathis_style">
                &nbsp;&nbsp;
                <nuxt-link v-if="user" class="next-right fr" :to="{name: 'expose', query: {goods_id: goods.goods_id}}">{{i18n.goodsInfo.inform}}</nuxt-link>
                <nuxt-link v-else class="next-right fr" :to="{name: 'expose', query: {goods_id: goods.goods_id}}">{{i18n.goodsInfo.inform}}</nuxt-link>
              </div>
            </div>
            <!-- <share :config="config"></share> -->
            <!-- <div class="bshare-custom icon" style="float:left;"><a title="分享到QQ空间" class="bshare-qzone"></a><a title="分享到新浪微博"
							 class="bshare-sinaminiblog"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a
							 title="分享到搜狐微博" class="bshare-sohuminiblog"></a></div> -->
            <div class="share" style="float: left">
              <div class="jiathis_style">
                &nbsp;&nbsp;
                <el-popover placement="top-start" :title="i18n.goodsInfo.share" width="200" trigger="hover">
                  <share class="popover-content" :config="config"></share>
                  <span slot="reference">{{i18n.goodsInfo.share}}</span>
                  <!-- <el-button slot="reference">分享</el-button> -->
                </el-popover>
                <!-- <a href="https://www.facebook.com/sharer.php?u=http://192.168.0.189:8082/#/goods/goodsInfo?id=5" target="_blank" style="margin-right:19px;">
								       分享 <img src="${fbShareJpg}" style="border:none 0;" alt="" /></a> -->
                <!-- <nuxt-link v-if="user" class="next-right fr" :to="{name: 'expose', query: {goods_id: goods.goods_id}}">分享</nuxt-link>
								<nuxt-link v-else class="next-right fr" :to="{name: 'expose', query: {goods_id: goods.goods_id}}">分享</nuxt-link> -->
              </div>
            </div>
          </div>
        </div>
        <div class="detail-ggsl">
          <h1>{{goods.goods_name}}</h1>
          <div style="font-size: 12px;color:#007cdc;">{{goods.goods_remark}}</div>
          <h2 v-if="goodsSku.prom_pre_desc&&goodsSku.prom_is_on == true">{{goodsSku.prom_pre_desc}}</h2>
          <div class="presale-time" v-if="goodsSku.prom_is_on && (goodsSku.prom_type == 1 || goodsSku.prom_type == 2 || goodsSku.prom_type == 3 || (goodsSku.prom_type == 4 && goodsSku.prom_is_on == true)) ">
            <div class="pre-icon fl">
              <span class="ys">
                <i class="detai-ico"></i>
                <span v-if="goodsSku.prom_type == 1">{{i18n.goodsInfo.rush}}</span>
                <span v-else-if="goodsSku.prom_type == 2">{{i18n.goodsInfo.group_sp}}</span>
                <span v-else-if="goodsSku.prom_type == 3">{{i18n.goodsInfo.promotion}}</span>
                <span v-else-if="goodsSku.prom_type == 4">{{i18n.goodsInfo.presell}}</span>
              </span>
            </div>
            <div class="pre-icon fr">
              <!-- <span class="per" v-if="preSell != ''">
								<i class="el-icon-alarm-clock" style="font-size: 24px;margin: 5px 10px;"></i>{{i18n.goodsInfo.residue_time}}：
								<span>
									{{endTime.hour}}{{i18n.goodsInfo.time}}{{endTime.min}}{{i18n.goodsInfo.minute}}{{endTime.sec}}{{i18n.goodsInfo.second}}
								</span>
								<i class="detai-ico"></i>
								<em>{{preSell.deposit_order_num}}</em>人预定
							</span> -->
              <span class="ti" v-if="goodsSku.prom_start_time > 0">
                <i class="detai-ico"></i>{{i18n.goodsInfo.residue_time}}：
                <span>
                  {{endTime.hour}}{{i18n.goodsInfo.time}}{{endTime.min}}{{i18n.goodsInfo.minute}}{{endTime.sec}}{{i18n.goodsInfo.second}}
                </span>
              </span>
              <span class="ti">{{goodsSku.prom_desc}}</span>
            </div>
          </div>
          <div class="shop-price-cou p">
            <div class="shop-price-le">
              <ul>
                <li class="jaj" v-if="goodsSku.prom_is_on">
                  <span v-if="goodsSku.prom_type == 1">{{i18n.goodsInfo.seckill_price}}：</span>
                  <span v-else-if="goodsSku.prom_type == 2">{{i18n.goodsInfo.group_price}}：</span>
                  <span v-else-if="goodsSku.prom_type == 3">{{i18n.goodsInfo.promotion_price}}：</span>
                  <span v-else-if="goodsSku.prom_type == 4 && goodsSku.prom_is_on == true">{{i18n.goodsInfo.presell_price}}：</span>
                </li>
                <li class="jaj" v-else>
                  <span>{{i18n.goodsInfo.tp_price}}：</span>
                </li>
                <li>
                  <span class="bigpri_jj">
                    <em>{{i18nCommon.symbol}}</em>{{goodsSku.shop_price}}
                  </span>
                </li>
              </ul>
              <template v-if="preSell != ''">
                <ul class="pre_sell_div" v-if="goodsSku.prom_is_on == true">
                  <li class="jaj">
                    <span>{{i18n.goodsInfo.subscription}}：</span>
                  </li>
                  <li>
                    <span>
                      <em>{{i18nCommon.symbol}}</em>{{goodsSku.paid_money}}
                    </span>
                  </li>
                </ul>
                <ul class="pre_sell_div" v-if="typeof(goodsSku.paid_money) != undefined && goodsSku.prom_is_on == true">
                  <li class="jaj">
                    <span>{{i18n.goodsInfo.balance}}</span>
                  </li>
                  <li>
                    <span>
                      <em>{{i18nCommon.symbol}} </em>{{(Number(goodsSku.shop_price) - Number(goodsSku.paid_money))}}
                    </span>
                  </li>
                </ul>
              </template>
              <ul>
                <li class="jaj">
                  <span v-if="goodsSku.prom_type == 1 || goodsSku.prom_type == 2 || goodsSku.prom_type == 3 || (goodsSku.prom_type == 4 && goodsSku.prom_is_on == true)">{{i18n.goodsInfo.original_price}}：</span>
                  <span v-else>{{i18n.goodsInfo.bazaar_price}}：</span>
                </li>
                <li class="though-line">
                  <span>
                    <em>{{i18nCommon.symbol}}</em>
                    <span>{{goodsSku.market_price}}</span>
                  </span>
                  <!-- <span class="mobile-buy-cheap">
										手机购买更便宜
										<i>
											<img class="small-qrcode-h" @/static/images/qrcode.png" alt /> -->
                  <!--<img class="big-qrcode-h" src="/template/pc/rainbow/static/images/qrcode.png" alt="" />-->
                  <!-- 		<img class="big-qrcode-h" img-url=""
											 src="" />
										</i>
									</span> -->
                </li>
              </ul>
              <ul v-if="goodsSku.prom_type == 1 || goodsSku.prom_type == 2 || goodsSku.prom_type == 3 || (goodsSku.prom_type == 4 && goodsSku.prom_is_on == true)">
                <li class="jaj">
                  <span v-if="goodsSku.prom_type == 1">{{i18n.goodsInfo.rush}}</span>
                  <span v-else-if="goodsSku.prom_type == 2">{{i18n.goodsInfo.group_sp}}</span>
                  <span v-else-if="goodsSku.prom_type == 3">{{i18n.goodsInfo.promotion}}</span>
                  <span v-else-if="goodsSku.prom_type == 4">{{i18n.goodsInfo.presell}}：</span>
                </li>
                <li>
                  <span style="color: #df3033;background: 0 0;border: 1px solid #df3033;padding: 2px 3px;">{{goodsSku.prom_title}}</span>
                </li>
              </ul>
              <ul v-if="store.store_free_price != 0 && goods.is_virtual == 0">
                <li class="jaj">
                  <span>{{i18n.goodsInfo.store}}</span>
                </li>
                <li>
                  <el-tag type="danger" effect="dark" size="small">{{i18n.goodsInfo.full}}{{i18nCommon.symbol}}{{store.store_free_price}}{{i18n.goodsInfo.free_shipping}}</el-tag>
                </li>
              </ul>
            </div>
            <div class="shop-cou-ri">
              <div class="allcomm">
                <p>{{i18n.goodsInfo.add_up}}</p>
                <p class="f_blue">{{commentStatistics.total_sum}}</p>
              </div>
              <div class="br1"></div>
              <div class="allcomm">
                <p>{{i18n.goodsInfo.add_sales}}</p>
                <p class="f_blue">{{goods.show_sale_sum}}</p>
              </div>
            </div>
          </div>
          <div class="standard p" v-if="goods.is_virtual == 0">
            <!-- 收货地址，物流运费 -start-->
            <ul class="list1">
              <li class="jaj">
                <span>{{i18n.goodsInfo.delivery}}：</span>
              </li>
              <li class="summary-stock though-line">
                <div class="dd shd_address">
                  <el-popover style="float:left;" placement="bottom" v-model="popoverShow" width="300" trigger="click">
                    <div class="popover-content">
                      <el-form>
                        <span v-if="is_code">
                          <el-divider content-position="left">{{i18n.goodsInfo.import_area}}</el-divider>
                          <el-form-item :label="i18n.goodsInfo.region">
                            <el-input id="goodsinfo-input" size="mini" v-model="postCode" :placeholder="i18n.goodsInfo.please_region" style="width: 160px;"></el-input>
                            <el-button type="danger" @click="getAddress" size="mini" style="margin-left: 15px;">{{i18n.goodsInfo.confirm}}</el-button>
                          </el-form-item>
                        </span>

                        <span v-if="is_address">
                          <el-divider content-position="left">{{i18n.goodsInfo.please_address}}</el-divider>
                          <el-form-item :label="i18n.goodsInfo.site">
                            <Regions ref="region" :initVal="oldAddress" @choose="getRegion" :isCache="isCache"></Regions>
                          </el-form-item>
                        </span>
                        <!-- <el-form-item>
												    <el-button type="danger" @click="popoverShow = false" size="mini">提交</el-button>
												  </el-form-item> -->
                      </el-form>
                    </div>
                    <el-input id="region-input" size="mini" slot="reference" v-model="region" :placeholder="i18n.goodsInfo.click_select" readonly></el-input>
                  </el-popover>
                  <!-- <Regions :initVal="oldAddress" @choose="getRegion" isCache="true" style="float:left" ></Regions> -->
                  <span style="margin-left: 9px" v-if="freight === 0">{{i18n.goodsInfo.free_shipping}}</span>
                  <span style="margin-left: 9px;" v-if="freight > 0">{{i18n.goodsInfo.freight}}：{{freight}}{{i18nCommon.symbol}}</span>
                  <span style="vertical-align: middle; position: relative; top: -1px; margin-left: 9px; color: red;" v-if="freightError">{{freightError.msg}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="standard p">
            <ul>
              <li class="jaj">
                <span>{{i18n.goodsInfo.serve}}：</span>
              </li>
              <li class="lawir">
                <span class="service">{{i18n.goodsInfo.cause}}<nuxt-link :to="{name:'store',query:{store_id:store.store_id}}">{{store.store_name}}</nuxt-link>{{i18n.goodsInfo.provide_aftersales}}</span>
              </li>
            </ul>
          </div>
          <div class="standard p" v-if="brand.name">
            <ul>
              <li class="jaj">
                <span>{{i18n.goodsInfo.brand}}：</span>
              </li>
              <li class="lawir">
                <span class="service">{{brand.name}}</span>
              </li>
            </ul>
          </div>
          <!-- 规格 start [[-->
          <div class="spec_goods_price_div standard p" v-for="(item,index) in spec" :key="index">
            <ul>
              <li class="jaj "><span>{{item.name}}：</span></li>
              <li class="lawir colo">
                <template v-for="(itm,ind) in item.spec_item_list">
                  <a :class="{red:item.selectId==itm.id}" v-if="!itm.src" @click="clickSpec(item, itm)" :key="ind">{{itm.item}}</a>
                  <a :class="{red:item.selectId==itm.id}" v-else @click="clickSpec(item, itm)" :key="ind">
                    <img :src="itm.src" style="width: 40px;height: 40px;" />
                    <span class="dis_alintro" style="width:auto;">{{itm.item}}</span>
                  </a>
                </template>
              </li>
            </ul>
          </div>
          <!-- 规格end ]]-->
          <div class="standard p">
            <ul>
              <li class="jaj">
                <span>{{i18n.goodsInfo.quantity}}：</span>
              </li>
              <li class="lawir">
                <div style="float: left;">
                  <el-input-number v-model="buyNum" size="mini" @change="handleBuyNumChange" :min="1" :max="goodsSku.store_count"></el-input-number>
                </div>
                <div class="sav_shop" v-if="goodsSku.store_count > 0">
                  {{i18n.goodsInfo.inventory}}：
                  <span>{{goodsSku.store_count}}</span>
                </div>
                <div class="sav_shop" v-else-if="goodsSku.limit_num > 0">
                  {{i18n.goodsInfo.inventory}}：
                  <span>{{goodsSku.limit_num}}</span>
                </div>
                <div class="sav_shop" v-else>
                  {{i18n.goodsInfo.end_sellout}}
                </div>
              </li>
            </ul>
          </div>

          <!-- 预售 s -->
          <div class="allpre-ne-ter pre_sell_div" v-if="preSell != ''">
            <div class="presell_allpri" style="display:block">
              <ul>
                <div v-for="(item,index) in preSell.ladder_price" :key="index">
                  <li class="elis" v-if="item.amount == preSell.ing_amount || showAll">
                    {{i18n.goodsInfo.full}}<span>{{item.amount}}{{i18n.goodsInfo.piece}}</span><br /><span>{{i18n.goodsInfo.each_piece}}{{i18nCommon.symbol}}{{item.price}}</span>
                  </li>
                </div>
              </ul>
            </div>
            <el-button type="button" class="jieti-anniu price_ladder_more" @click="showAllLadder()">{{unfold}}</el-button>
          </div>
          <!-- 预售 e -->
          <div class="standard p">
            <el-row>
              <el-button type="warning" :disabled="isAbleBuy()" @click="buyNow()">{{i18n.goodsInfo.buy_now}}</el-button>
              <el-button v-if="goodsSku.prom_type !== 4 && goods.is_virtual == 0" type="danger" @click="addCart()" icon="el-icon-shopping-cart-2" style="margin: 10px;" :disabled="isAbleBuy()">{{i18n.goodsInfo.add_shoppingcart}}</el-button>
            </el-row>
          </div>
        </div>

        <div class="detail-ry p" v-if="store != ''">
          <div class="delogo">
            <nuxt-link :to="{name:'store',query:{id:store.store_id}}">
              <img :src="store.store_logo" v-if="store.store_logo" />
              <img src="@/static/images/icon_goods_thumb_empty_300.png" v-else />
              <span v-if="store.is_own_shop == 0">{{store.store_name}}</span>
            </nuxt-link>
            <template v-if="store.store_id == 1 || store.is_own_shop == 1">
              <div class="ownsj cooperation">
                <div style="display: flex;justify-content: center;flex-direction: column;">
                  <a class="byouself">{{i18n.goodsInfo.platform_proprietary}}</a>
                  <a class="byouself" v-if="store.store_id == 1 && store.certified">{{i18n.goodsInfo.genuine_security}}</a>
                  <a class="byouself" v-if="store.store_id == 1 && store.qitian">{{i18n.goodsInfo.return_policy}}</a>
                </div>
              </div>
            </template>
          </div>
          <template v-if="store.is_own_shop == 0">
            <div class="line1 p">
              <span class="f_voc">{{i18n.goodsInfo.store_total}}：</span>
              <a class="nel_tt" href="javascript:void(0);"><i :style="'width: '+ store.store_servicecredit*20 +'%;'"></i></a>
              <span class="lasen"><em>{{store.store_servicecredit}}</em>{{i18n.goodsInfo.minute}}</span>
            </div>
            <div class="comment_pen p">
              <ul>
                <li><span>{{i18n.goodsInfo.score_detail}}</span></li>
                <li><span>{{i18n.goodsInfo.compared_industry}}</span></li>
              </ul>
              <ul>
                <li><span>{{i18n.goodsInfo.commodity}}<em>{{store.store_desccredit}}</em></span></li>
                <li><span>{{Math.ceil(storeClassMatch.describe)}}%
                    <i class="detai-ico" v-if="storeClassMatch.describe <= 0"></i>
                    <i class="detai-ico ruin" v-else></i>
                  </span></li>
              </ul>
              <ul>
                <li><span>{{i18n.goodsInfo.serve}}<em>{{store.store_servicecredit}}</em></span></li>
                <li><span>{{Math.ceil(storeClassMatch.service)}}%
                    <i class="detai-ico" v-if="storeClassMatch.service <= 0"></i>
                    <i class="detai-ico ruin" v-else></i>
                  </span></li>
              </ul>
              <ul>
                <li><span>{{i18n.goodsInfo.aging}}<em>{{store.store_deliverycredit}}</em></span></li>
                <li><span>{{Math.ceil(storeClassMatch.delivery)}}%
                    <i class="detai-ico" v-if="storeClassMatch.delivery <= 0"></i>
                    <i class="detai-ico ruin" v-else></i>
                  </span></li>
              </ul>
            </div>
            <div class="address_com p">
              <ul v-if="store.company_name">
                <li class="compan"><span>{{i18n.goodsInfo.company}}：</span></li>
                <li class="pan_add"><span>{{store.company_name}}</span></li>
              </ul>
              <ul>
                <li class="compan"><span>{{i18n.goodsInfo.location}}：</span></li>
                <li class="pan_add area_add">
                  <span v-if="storeRegionList.length > 0">{{storeRegionList[0].name}}</span>
                  <span v-if="storeRegionList.length > 1">{{storeRegionList[1].name}}</span>
                </li>
              </ul>
            </div>
          </template>
          <div class="tp-quality clearfixs" v-if="guaranteeItems.length > 0">
            <p class="tp-quality-title">{{i18n.goodsInfo.service_assurance}}：</p>
            <p class="tp-quality-cont" v-for="(item,index) in guaranteeItems" :key="index">
              <img :src="item.grt_icon" height="24px" width="24px">{{item.grt_name}}
            </p>
          </div>
          <!--IM客服-->
          <div class="reception p" v-if="shop_basic.im_choose == 1">
            <a v-if="user" href="javascript:;" :user_id="user.user_id" :uname="user.nickname" :avatar="user.head_pic" sign="" :storeid="store.store_id" :goods_id="goods.goods_id" :client_host="location.host" :client_api="location.origin + apiHead + '/mall/goods/sku?id=' + goods.goods_id" :client_href="location.href" :im_href="location.origin + '/im'" :ws_socket="getWssOrws() + '//' + location.host + '/ws'" id="workerman-kefu" onclick="jump()">
              <i class="detai-ico"></i>{{i18n.goodsInfo.online_customer}}
            </a>
            <a v-else href="javascript:;" user_id="" uname="" avatar="" sign="" :storeid="store.store_id" :goods_id="goods.goods_id" :client_host="location.host" :client_api="location.origin + apiHead + '/mall/goods/sku?id=' + goods.goods_id" :client_href="location.href" :im_href="location.origin + '/im'" :ws_socket="getWssOrws() + '//' + location.host + '/ws'" id="workerman-kefu" onclick="jump()">
              <i class="detai-ico"></i>{{i18n.goodsInfo.online_customer}}
            </a>
          </div>
          <!--qq客服-->
          <div class="reception p" v-if="shop_basic.im_choose == 2">
            <a :href="'tencent://message/?uin=' + store.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
              <i class="detai-ico"></i>{{i18n.goodsInfo.online_customer}}
            </a>
          </div>
          <div class="intoshop p">
            <nuxt-link :to="{name:'store',query:{store_id:store.store_id}}">{{i18n.goodsInfo.enter_store}}</nuxt-link>
          </div>
          <div class="guaz_jd"></div>
        </div>
      </div>
    </div>
    <div class="detail-main p">
      <div class="w1224">
        <div class="deta-le-ma">
          <div class="type_more">
            <div class="type-top">
              <h2>{{i18n.goodsInfo.search_goods}}</h2>
            </div>
            <div class="type-bot">
              <div class="gjz_de">
                <span class="gjz_fi">{{i18n.goodsInfo.keyword}}</span>
                <input class="srk_fi" type="text" name="q" id="q" v-model="words" />
              </div>
              <div class="gjz_de">
                <span class="gjz_fi">{{i18n.goodsInfo.price}}</span>
                <span>{{i18nCommon.symbol}}</span>
                <input class="pr_fi" type="text" name="start_price" id="start_price" v-model="start_price" />
                <span>-</span>
                <span>{{i18nCommon.symbol}}</span>
                <input class="pr_fi" type="text" name="end_price" id="end_price" v-model="end_price" />
              </div>
              <div class="gjz_de">
                <span class="gjz_fi"></span>
                <input class="sub_tj" type="submit" :value="i18n.goodsInfo.seek" @click="submit" />
              </div>
            </div>
          </div>
          <div class="type_more ma-to-20">
            <div class="type-top">
              <h2>{{i18n.goodsInfo.relevant_classification}}</h2>
            </div>
            <div class="type-bot">
              <ul class="xg_typ">
                <li v-for="(item,index) in storeGoodsClassList" :key="index">
                  <nuxt-link :to="{name:'store',query:{id:store.store_id}}">{{item.cat_name}}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="type_more ma-to-20">
            <div class="type-top">
              <h2>{{i18n.goodsInfo.brand_recommend}}</h2>
            </div>
            <div class="type-bot">
              <ul class="xg_typ">
                <li v-for="(item,index) in brandList" :key="index">
                  <nuxt-link :to="{name:'goodsList',query:{brand_ids:item.brand_ids}}" target="_blank">
                    {{item.name}}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="type_more ma-to-20">
            <div class="type-top">
              <h2>{{i18n.goodsInfo.search_recommend}}</h2>
            </div>
            <div class="type-bot">
              <ul class="xg_typ">
                <li v-for="(item,index) in shop_basic.hot_keywords.split('|')" :key="index">
                  <nuxt-link :to="{name:'goodsList',query:{words:item}}" target="_blank">{{item}}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="type_more ma-to-20">
            <div class="type-top">
              <h2>{{i18n.goodsInfo.title_instrumental}}</h2>
            </div>
            <div class="tjhot-shoplist type-bot">
              <div class="alone-shop" v-for="(item,index) in guessYoulikeGoodsList" :key="index">
                <nuxt-link :to="{ name:'goodsInfo' , query:{id:item.goods_id}}">
                  <img :src="apiHead + '/mall/goods/thumb_image?width=206&height=206&goods_id=' + item.goods_id" style="display: inline;" />
                </nuxt-link>
                <p class="line-two-hidd">
                  <nuxt-link :to="{ name:'goodsInfo', query:{id:item.goods_id} }">
                    {{item.goods_name}}
                  </nuxt-link>
                </p>
                <p class="price-tag">
                  <span class="li_xfo">{{i18nCommon.symbol}}</span>
                  <span>{{item.shop_price}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="deta-ri-ma">
          <div class="introduceshop">
            <div class="datail-nav-top">
              <ul>
                <li :class="{red:contentTab==1}" @click="clickContentTab(1)">
                  <a href="javascript:void(0);">{{i18n.goodsInfo.products_introduction}}</a>
                </li>
                <li :class="{red:contentTab==2}" @click="clickContentTab(2)">
                  <a href="javascript:void(0);">{{i18n.goodsInfo.specifications_packing}}</a>
                </li>
                <li :class="{red:contentTab==3}" @click="clickContentTab(3)">
                  <a href="javascript:void(0);">
                    {{i18n.goodsInfo.evaluate}}
                    <em>({{commentStatistics.total_sum}})</em>
                  </a>
                </li>
                <li :class="{red:contentTab==4}" @click="clickContentTab(4)">
                  <a href="javascript:void(0);">{{i18n.goodsInfo.postsales_service}}</a>
                </li>
              </ul>
            </div>
            <div class="shop-describe shop-con-describe p" v-if="contentTab == 1">
              <div class="deta-descri">
                <p class="shopname_de">
                  <span>{{i18n.goodsInfo.goods_name}}：</span>
                  <span>{{goods.goods_name}}</span>
                </p>
                <div class="ma-d-uli p">
                  <ul>
                    <li v-if="brand != ''">
                      <span>{{i18n.goodsInfo.brand}}：</span>
                      <span>{{brand.name}}</span>
                    </li>
                    <li v-if="goods.goods_sn">
                      <span>{{i18n.goodsInfo.itemno}}：</span>
                      <span>{{goods.goods_sn}}</span>
                    </li>
                    <li v-for="(item,index) in goodsAttrList" :key="index">
                      <span>{{item.goods_attribute.attr_name}}：</span>
                      <span>{{item.attr_value}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="detail-img-b">
                <video :src="goods.video" v-show="goods.video" controls="controls" style="max-width: 790px;max-height: 500px;">
                  {{i18n.goodsInfo.nonsupport}}
                </video>
              </div>
              <div class="detail-img-b" v-html="goods.goods_content"></div>
            </div>
            <div class="shop-describe shop-con-describe p" v-if="contentTab == 2">
              <div class="deta-descri">
                <h2 class="shopname_de">{{i18n.goodsInfo.property}}</h2>
                <div class="twic_a_alon" v-for="(item,index) in goodsAttrList" :key="index">
                  <p class="gray_t">{{item.goods_attribute.attr_name}}</p>
                  <p>{{item.attr_value}}</p>
                </div>
              </div>
            </div>
            <div class="shop-con-describe p" v-if="contentTab == 3">
              <div class="shop-describe p">
                <div class="deta-descri p">
                  <div class="cte-deta">
                    <ul id="fy-comment-list">
                      <li :class="{red:commentTab==1}">
                        <a href="javascript:void(0);" @click="commentTab=1;handleCurrent=1;_getCommentPage()">{{i18n.goodsInfo.comments}}（{{commentStatistics.total_sum}}）</a>
                      </li>
                      <li :class="{red:commentTab==2}">
                        <a href="javascript:void(0);" @click="commentTab=2;handleCurrent=1;_getCommentPage()">{{i18n.goodsInfo.good_reputation}}（{{commentStatistics.high_sum}}）</a>
                      </li>
                      <li :class="{red:commentTab==3}">
                        <a href="javascript:void(0);" @click="commentTab=3;handleCurrent=1;_getCommentPage()">{{i18n.goodsInfo.medium_review}}（{{commentStatistics.center_sum}}）</a>
                      </li>
                      <li :class="{red:commentTab==4}">
                        <a href="javascript:void(0);" @click="commentTab=4;handleCurrent=1;_getCommentPage()">{{i18n.goodsInfo.negative_comment}}（{{commentStatistics.low_sum}}）</a>
                      </li>
                      <li :class="{red:commentTab==5}">
                        <a href="javascript:void(0);" @click="commentTab=5;handleCurrent=1;_getCommentPage()">{{i18n.goodsInfo.bask_single}}（{{commentStatistics.img_sum}}）</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="line-co-sunall" v-if="commentPage != ''">
                  <div class="people-comment" v-for="(item,index) in commentPage.records" :key="index">
                    <div class="deta-descri p">
                      <div class="person-ph-name">
                        <div class="per-img-n p">
                          <div class="img-aroun">
                            <img :src="item.head_pic" v-if="item.head_pic">
                            <img src="@/static/images/defaultface_user_small.png" v-else>
                          </div>
                          <div class="menb-name">{{item.nickname || i18n.goodsInfo.anonymous_user}}</div>
                        </div>
                      </div>
                      <div class="person-com">
                        <div class="lifr4 p">
                          <div class="dstar start5">
                            <i :class="'start start'+ item.goods_rank"></i>
                          </div>
                          <div class="star-aftr" v-if="item.impression">
                            <a v-for="(imp,index) in item.impression.split(',')" :key="index">{{imp}}</a>
                          </div>
                        </div>
                        <div class="lifr4 comfis p">
                          <span class="faisf" v-html="item.content"></span>
                        </div>
                        <div class="lifr4 requiimg p">
                          <ul class="comment_images">
                            <template v-for="img in item.img_list">
                              <a>
                                <li><img :src="img"></li>
                              </a>
                            </template>
                          </ul>
                        </div>
                        <div class="lifr4 bolist p">
                          <span>{{item.add_time | datefmtAll}}</span>
                          <span v-if="item.spec_key_name">{{i18n.goodsInfo.specification}}:{{item.spec_key_name}}</span>
                          <span>{{i18n.goodsInfo.purchase}}{{item.add_time | dateAfter}}{{i18n.goodsInfo.post_evaluation}}</span>
                        </div>
                      </div>
                      <div class="g_come">
                        <a href="javascript:void(0);" @click="clickCommentDialog(item)"><i class="detai-ico c-cen"></i>{{item.reply_num}}</a>
                        <a href="javascript:void(0);">
                          <i class="detai-ico z-ten"></i><span>{{item.zan_num}}</span>
                        </a>
                      </div>
                    </div>
                    <div class="reply-textarea" style="display: block;" v-if="item.isShowDialog == true">
                      <div class="reply-arrow"><b class="layer1"></b><b class="layer2"></b></div>
                      <div class="inner">
                        <el-input type="textarea" :placeholder="i18n.goodsInfo.reply + item.nickname" v-model="textarea" maxlength="120" show-word-limit>
                        </el-input>
                        <div class="operate-box">
                          <span class="txt-countdown">{{i18n.goodsInfo.word_limit}}<em>120</em>{{i18n.goodsInfo.word}}</span>
                          <a class="reply-submit J-submit-reply J-submit-reply-lz" href="javascript:void(0);" target="_self">{{i18n.goodsInfo.submit}}</a>
                        </div>
                      </div>
                    </div>
                    <!-- 商家回复-s -->
                    <template v-for="sReply in commentReplyList">
                      <div class="comment-replylist" v-if="sReply.parent_id == item.comment_id">
                        <div class="comment-reply-item hide" style="display: block;">
                          <div class="reply-infor clearfix">
                            <div class="main">
                              <span class="user-name" style="color: red;">{{i18n.goodsInfo.business_reply}}
                              </span> ：
                              <span class="words">{{sReply.content}}</span>
                            </div>
                            <div class="side">
                              <span class="date">{{sReply.add_time | datefmtAll}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--用户回复评论-s-->
                      <template v-for="reply in replyList">
                        <div class="comment-replylist" v-if="sReply.parent_id == item.comment_id && reply.comment_id == sReply.comment_id">
                          <div class="comment-reply-item hide" style="display: block;">
                            <div class="reply-infor clearfix">
                              <div class="main">
                                <span class="user-name">
                                  {{item.nickname || i18n.goodsInfo.anonymous_user}} &nbsp;<font style="color: #1a2226">{{i18n.goodsInfo.reply}}</font>&nbsp;
                                </span> ：
                                <span class="words">{{reply.content}}</span>
                              </div>
                              <div class="side">
                                <span class="date">{{reply.reply_time | datefmtAll}}</span>
                              </div>
                            </div>
                            <div class="comment-operate" v-if="user != null && item.user_id == user.user_id">
                              <a class="reply J-reply-trigger" href="javascript:;" target="_self">{{i18n.goodsInfo.reply}}</a>
                            </div>
                          </div>
                        </div>
                      </template>
                      <!--用户回复评论-e-->
                    </template>
                    <!-- 商家回复-d -->

                  </div>
                  <div class="paging">
                    <div class="block">
                      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="shop-con-describe p" v-if="contentTab == 4">
              <div class="shop-describe p">
                <div class="comm_stsh ma-to-20">
                  <div class="deta-descri">
                    <h2>{{i18n.goodsInfo.refund}}</h2>
                  </div>
                </div>
                <div class="deta-descri p">
                  <div class="fetbajc">
                    <p>{{i18n.goodsInfo.explain1}}</p>
                    <p>{{i18n.goodsInfo.explain2}}</p>
                    <p>•{{i18n.goodsInfo.explain3}}</p>
                    <p>•{{i18n.goodsInfo.explain4}}</p>
                    <p>•{{i18n.goodsInfo.explain5}}</p>
                    <p>{{i18n.goodsInfo.explain6}}</p>
                    <p>{{i18n.goodsInfo.explain7}}</p>
                    <p>{{i18n.goodsInfo.explain8}}</p>
                    <p>{{i18n.goodsInfo.explain9}}</p>
                    <p>{{i18n.goodsInfo.explain10}}</p>
                  </div>
                </div>
              </div>
              <div class="consult-h" id="consult-h">
                <div class="consult-menus">
                  <a class="" href="javascript:;" @click="clickConsultTab()" :class="consultTab == null ? 'consult-ac' : ''">{{i18n.goodsInfo.allconsulting}}</a>
                  <a href="javascript:;" @click="clickConsultTab(1)" :class="consultTab == 1 ? 'consult-ac' : ''">{{i18n.goodsInfo.commodity_consult}}</a>
                  <a href="javascript:;" @click="clickConsultTab(2)" :class="consultTab == 2 ? 'consult-ac' : ''">{{i18n.goodsInfo.payment}}</a>
                  <a href="javascript:;" @click="clickConsultTab(3)" :class="consultTab == 3 ? 'consult-ac' : ''">{{i18n.goodsInfo.delivery}}</a>
                  <a href="javascript:;" @click="clickConsultTab(4)" :class="consultTab == 4 ? 'consult-ac' : ''">{{i18n.goodsInfo.after_sale}}</a>
                </div>
                <div class="consult-cont">
                  <div class="consult-item consult-ac">
                    <div class="consult-tips"><span class="c-orange">{{i18n.goodsInfo.warm_prompt}}：</span>
                      {{i18n.goodsInfo.hint_one}}</div>
                    <div id="consult_content">
                      <div class="mes-num-h">{{i18n.goodsInfo.general}}<span class="c-orange consult_count">{{consultTotal}}</span>{{i18n.goodsInfo.strip}}</div>
                      <div class="mes-lists-h" v-for="consult in consultData" :key="consult.id">
                        <div class="mes-item1-h">
                          <div class="visitor-mes p">
                            <span class="visitor-name">{{consult.username}}:</span>{{consult.content}}
                            <p class="send-time">{{consult.add_time_format}}</p>
                          </div>
                          <div class="store-reply p" v-for="children in consult.children_consults" :key="children.id">
                            <span class="visitor-name">{{i18n.goodsInfo.merchant}}<i class="reply-tips">{{i18n.goodsInfo.reply}}</i>{{consult.username}}</span>{{children.content}}
                            <p class="send-time">{{children.add_time_format}}</p>
                          </div>
                        </div>
                      </div>
                      <div class="dataTables_paginate paging_simple_numbers">
                        <el-pagination background @size-change="consultHandleSizeChange" @current-change="consultHandleCurrentChange" :current-page="consultCurrentPage" :page-sizes="[5, 10, 15, 20]" :page-size="consultPageSize" layout="total, sizes, prev, pager, next, jumper" :total="consulTotal"></el-pagination>
                      </div>
                    </div>
                    <div class="publish-title">{{i18n.goodsInfo.published_consulting}}</div>
                    <form method="post" id="consultForm" action="/home/Goods/goodsConsult.html">
                      <input type="hidden" name="goods_id" value="1851">
                      <input type="hidden" name="store_id" value="2">
                      <div class="publish-cont">
                        <p class="check-consult-tpye">
                          {{i18n.goodsInfo.commodity_consult}}：
                          <el-radio-group v-model="consultType">
                            <el-radio :label="1">{{i18n.goodsInfo.commodity_consult}}</el-radio>
                            <el-radio :label="2">{{i18n.goodsInfo.payment}}</el-radio>
                            <el-radio :label="3">{{i18n.goodsInfo.delivery}}</el-radio>
                            <el-radio :label="4">{{i18n.goodsInfo.after_sale}}</el-radio>
                          </el-radio-group>
                        </p>
                        <div class="nickname">
                          {{i18n.goodsInfo.nickname}}:
                          <input v-if="user" type="text" v-model="user.nickname" readonly="">
                          <input v-else type="text" v-model="nickname">
                        </div>
                        <textarea class="publish-des" v-model="consultContent" :placeholder="i18n.goodsInfo.input_description_data"></textarea>
                        <p class="v-code">
                          {{i18n.goodsInfo.auth_code}}:
                          <input type="text" v-model="verification" maxlength="4">
                          <img :src="verification_image" @click="fleshVerify" :title="i18n.goodsInfo.ina" name="codeimage" border="0" />
                          <!-- <img id="verify_code" width="80" height="40" onclick="verify()" src="/index.php?m=Home&amp;c=User&amp;a=verify&amp;type=consult&amp;r=0.05712610047638811"> -->
                        </p>
                        <input class="publish-btn" @click="goodsConsultForm()" type="button" :value="i18n.goodsInfo.submit">
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <add-cart-pop :visible="visible" @updateHide="Hide" ref="addcart"></add-cart-pop>
  </div>
</template>
<script>
import AddCartPop from "@/components/AddCartPop/index.vue";
import TopBar from "@/components/TopBar/index.vue";
import SearchBox from "@/components/SearchBox/index.vue";
import Regions from "@/components/Regions";
import common from "@/utils/common.js";
import { loadImJs, getWssOrws, loadTidioJs } from "@/utils/asyncLoadJs";
let loadedImJs = false; //是否加载完im的js
import {
  getShopConfig,
  getGoodsById,
  getGoodsCategories,
  getGoodsImages,
  getGoodsCollection,
  addGoodsCollection,
  removeGoodsCollection,
  getGoodsSku,
  getSpecPrice,
  getCommentStatistics,
  getStore,
  getBrand,
  getBrands,
  getSpec,
  getGuaranteeItem,
  getStoreClassStatistics,
  getInList,
  getStoreGoodsClassList,
  getGuessYouLike,
  getGoods,
  getGoodsAttr,
  commentPage,
  getCommentReplyList,
  getReplyList,
  getPreSell,
  addCart,
  getGoodsFreight,
  getConsultPage,
  getVerifyImage,
  verifyVerifyImage,
  addGoodsConsult,
  getAddress,
  getCartBill,
  getCartUnlisted,
  getTidio,
} from "@/utils/api.js";
import { getUser, getLocation, setLocation } from "@/utils/auth.js";
import bus from "@/utils/bus";
import { mapState } from "vuex";
export default {
  data() {
    return {
      is_address: false,
      is_code: false,
      region: getLocation().label.join(","),
      isCache: true, //地址是否使用缓存
      postCode: "" || getLocation().label[getLocation().label.length - 1], //邮编
      popoverShow: false,
      itemId: 0, //规格id
      user: getUser(), //用户信息
      goods: {}, //商品基本信息
      goodsSku: {}, //商品sku信息
      store: {}, //店铺
      storeClassMatch: {
        describe: 100,
        delivery: 100,
        service: 100,
      }, //店铺相关分类分数
      storeRegionList: [], //店铺地址列表
      storeGoodsClassList: [], //店铺商品分类列表
      guaranteeItems: [], //店铺服务
      brand: "", //商品品牌信息
      brandList: [], //品牌列表
      spec: [], //规格项
      specGoodsPriceList: [], //规格价格
      goodsCategoryList: [], //商品分类列表
      goodsImages: [], //商品相册
      goodsAttrList: [], //商品属性
      goodsCollection: "", //商品收藏记录
      commentStatistics: {}, //评价统计
      guessYoulikeGoodsList: [], //猜你喜欢
      commentPage: "", //评论分页
      commentReplyList: [], //商家回复列表
      replyList: [], //回复列表
      preSell: "", //预售活动
      freight: "", //运费
      freightError: "", //不配送信息
      endTime: {
        hour: 0,
        min: 0,
        sec: 0,
      }, //活动剩余时间

      buyNum: 1, //欲购买数量
      zoomUrl:
        this.apiHead +
        "/mall/goods/thumb_image?width=400&height=400&goods_id=" +
        this.$route.query.id,
      zoomHighUrl:
        this.apiHead +
        "/mall/goods/thumb_image?width=800&height=800&goods_id=" +
        this.$route.query.id,
      oldAddress: ["送货至:"],
      showAll: false,
      contentTab: 1,
      commentTab: 1,
      currentPage: 1, //初始页面为1
      pageSize: 10, //默认数据条
      complaintData: [], //交易投诉数据
      handleSize: 10, //当页面几条数据
      handleCurrent: 1, //第几页
      total: 0, //总共多少条数据
      words: "", //搜索词
      start_price: "", //搜索价格范围
      end_price: "", //搜索价格范围
      visible: false, //成功加入购物车弹出框
      consultTab: null,
      consultType: 1, //商品咨询类别
      consultData: [], // 商品咨询数据
      consultTotal: 0, //商品咨询条数
      consultContent: "", //咨询内容
      nickname: "", //咨询用户
      consultCurrentPage: 1,
      consultPageSize: 10,
      consulTotal: 0,
      verification_image: "", //验证码图片
      verification: "", //验证码
      videoIsShow: false, //视频是否展示
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: "", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: "/mall/goods/thumb_image?goods_id=" + this.$route.query.id, // 图片, 默认取网页中第一个img标签
        sites: ["facebook", "qq", "weibo", "wechat", "douban"], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>",
      },

      location: window.location,
      textarea: "",
      timer: null,
      unfold: "展开",
    };
  },
  components: {
    TopBar,
    SearchBox,
    Regions,
    AddCartPop,
  },
  computed: {
    ...mapState(["shop_basic",'token']),
    i18n() {
      this.config.wechatQrcodeTitle = this.$t("goods.goodsInfo.wechat_scan");
      this.config.wechatQrcodeHelper = this.$t(
        "goods.goodsInfo.sweep_discovery"
      );
      return this.$t("goods");
    },
    i18nCommon() {
      return this.$t("common");
    },
  },
  created() {
    this.getPayConfig();
    this._getGoods(this.$route.query.id);
    if (this.user != null) {
      //获取猜你喜欢
      this.getGuessYouLikeGoods();
    } else {
      this.getLikeGoods();
    }
    if (this.user) {
      this.config.url = window.location.href + "&user_id=" + this.user.user_id;
    }
    if (this.$route.query.user_id) {
      localStorage.setItem("user_id", this.$route.query.user_id);
    }
    if (!loadedImJs && this.shop_basic.im_choose == 1) {
      loadImJs(location.origin + "/im").then(() => {
        loadedImJs = true;
      });
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    getPayConfig() {
      var that = this;
      var work = [];
      getShopConfig({
        inc_type: "shopping",
      }).then((res) => {
        if (res.shopping && res.shopping.address_and_code) {
          work = res.shopping.address_and_code.split(",");
          for (var i = 0; i < work.length; i++) {
            if (parseInt(work[i]) == 1) {
              that.is_code = true;
            }
            if (parseInt(work[i]) == 0) {
              that.is_address = true;
            }
          }
        }
      });
    },
    showAllLadder() {
      this.showAll = !this.showAll;
      if (this.showAll) {
        this.unfold = "收起<";
      } else {
        this.unfold = "展开>";
      }
    },
    _getGoods(id) {
      getGoodsById(id).then((res) => {
        this.goods = res;
        this.config.title = this.goods.goods_name;
        this.config.description = this.goods.goods_remark;
        this._getGoodsCategoryList();
        this._getStore();
        this._getGuaranteeItems();
        this._getSpecPrice();
        this._getSpec();
        this._getGoodsAttr();
        this._getGoodsImages();
        this._getCommentStatistics();

        this._getGoodsSku();
        this._getStoreGoodsClassList();
        this._getCommentPage();
        if (this.goods.brand_id != 0) {
          this._getBrand();
        }
        if (this.user != null) {
          this._getGoodsImages();
          this._getGoodsCollection();
        }
        if (getLocation().value.length > 0) {
          this._getGoodsFreight();
        }
        this._getConsultPage();
        this.getTidio(this.goods.store_id);
      });
    },
    _getGoodsCategoryList() {
      getGoodsCategories({
        id:
          this.goods.cat_id1 +
          "," +
          this.goods.cat_id2 +
          "," +
          this.goods.cat_id3,
      }).then((res) => {
        this.goodsCategoryList = res;
      });
    },
    _getGoodsImages() {
      getGoodsImages({
        goods_id: this.goods.goods_id,
      }).then((res) => {
        this.goodsImages = res;
        this.goodsImages.unshift({
          goods_id: this.goods.goods_id,
          image_url:
            this.apiHead +
            "/mall/goods/thumb_image?width=400&height=400&goods_id=" +
            this.$route.query.id,
        });
      });
    },
    _getGoodsCollection() {
      getGoodsCollection({
        goods_id: this.goods.goods_id,
      }).then((res) => {
        this.goodsCollection = res;
      });
    },
    _getGoodsSku() {
      getGoodsSku({
        id: this.goods.goods_id,
        item_id: this.itemId,
      }).then((res) => {
        this.goodsSku = res;
        this.goodsSku.shop_price = this.goodsSku.shop_price.toFixed(2);
        this.goodsSku.market_price = this.goodsSku.market_price.toFixed(2);

        if (res.original_img) {
          this.zoomUrl = res.original_img;
          this.zoomHighUrl = res.original_img;
        }
        if (this.goodsSku.prom_desc) {
          this.goodsSku.prom_desc = this.goodsSku.prom_desc.replace(
            /<[^>]+>/g,
            ""
          );
        }
        if (this.goodsSku.prom_type == 4) {
          this._getPreSell(this.goodsSku.prom_id);
        }
        if (this.goodsSku.prom_end_time > 0) {
          this.setEndTime(this.goodsSku.prom_end_time);
        }
      });
    },
    setEndTime(time) {
      let that = this;
      that.timer = setInterval(() => {
        var nowData = new Date().getTime();
        var diffT = time * 1000 - nowData;
        if (diffT < 0) {
          that.endTime.hour = 0;
          that.endTime.min = 0;
          that.endTime.sec = 0;
          this._getGoodsSku(); //到店重新获取商品sku
          return;
        }
        var arr = common.remainTime2(diffT).split(":");
        that.endTime.hour = arr[1];
        that.endTime.min = arr[2];
        that.endTime.sec = arr[3];
      }, 1000);
    },
    _getPreSell(id) {
      getPreSell(id).then((res) => {
        this.preSell = res;
        this.goodsSku.prom_pre_desc = this.preSell.delivery_time_desc;
        this.goodsSku.prom_title = this.preSell.title;
        this.goodsSku.prom_detail = this.preSell.desc;
        if (this.preSell.prom_end_time > 0) {
          this.setEndTime(this.preSell.prom_end_time);
        }
      });
    },
    _getCommentStatistics() {
      getCommentStatistics({
        goods_id: this.goods.goods_id,
      }).then((res) => {
        this.commentStatistics = res;
      });
    },
    _getStore() {
      getStore({
        store_id: this.goods.store_id,
      }).then((res) => {
        this.store = res;
        this.store.store_desccredit = this.store.store_desccredit.toFixed(2);
        this.store.store_servicecredit = this.store.store_servicecredit.toFixed(
          2
        );
        this.store.store_deliverycredit = this.store.store_deliverycredit.toFixed(
          2
        );
        this._getStoreClassStatistics();
        this._getInList();
      });
    },
    _getBrand() {
      getBrand({
        id: this.goods.brand_id,
      }).then((res) => {
        this.brand = res;
      });
    },
    _getBrands() {
      getBrands({
        is_hot: 1,
        cat_id: this.goods.cat_id1,
      }).then((res) => {
        this.brandList = res;
      });
    },
    _getSpecPrice() {
      getSpecPrice({
        goods_id: this.goods.goods_id,
      }).then((res) => {
        this.specGoodsPriceList = res;
      });
    },
    _getSpec() {
      getSpec({
        goods_id: this.goods.goods_id,
      }).then((res) => {
        /*规格默认选中第一个*/
        let that = this;
        that.spec = res;
        let selectId;
        that.spec.forEach(function (item, index) {
          item.spec_item_list.map((b) => {
            item.selectId = item.spec_item_list[0].id;
            selectId = item.spec_item_list[0].id;
          });
        });
        /*默认选中规格*/
        if (that.isSelectSpecAll()) {
          that.itemId = that.getSpecGoodsPrice().item_id;
          that._getGoodsSku();
        }
      });
    },
    _getGuaranteeItems() {
      getGuaranteeItem({
        store_id: this.goods.store_id,
      }).then((res) => {
        this.guaranteeItems = res;
      });
    },
    _getStoreClassStatistics() {
      getStoreClassStatistics({
        sc_id: this.store.store_id,
      }).then((res) => {
        if (res.describe_score == 0) {
          this.storeClassMatch.describe = 0;
        } else {
          this.storeClassMatch.describe =
            ((this.store.store_desccredit - res.describe_score) /
              res.describe_score) *
            100;
        }
        if (res.delivery_score == 0) {
          this.storeClassMatch.delivery = 0;
        } else {
          this.storeClassMatch.delivery =
            ((this.store.store_deliverycredit - res.delivery_score) /
              res.delivery_score) *
            100;
        }
        if (res.service_score == 0) {
          this.storeClassMatch.service = 0;
        } else {
          this.storeClassMatch.service =
            ((this.store.store_servicecredit - res.service_score) /
              res.service_score) *
            100;
        }
      });
    },
    _getInList() {
      getInList({
        ids: this.store.province_id + "," + this.store.city_id,
      }).then((res) => {
        this.storeRegionList = res;
      });
    },
    _getStoreGoodsClassList() {
      getStoreGoodsClassList({
        store_id: this.goods.store_id,
        parent_id: 0,
      }).then((res) => {
        this.storeGoodsClassList = res;
      });
    },
    _getGoodsAttr() {
      getGoodsAttr({
        goods_id: this.goods.goods_id,
      }).then((res) => {
        this.goodsAttrList = res;
      });
    },
    _getCommentPage() {
      commentPage({
        goods_id: this.goods.goods_id,
        type: this.commentTab,
        p: this.handleCurrent,
        size: this.handleSize,
      }).then((res) => {
        this.commentPage = res;
        this.total = res.total;
        res.records.forEach(function (item) {
          item.isShowDialog = false;
        });
        if (res.records.length > 0) {
          this.getCommentReplyList();
        }
      });
    },
    _getGoodsFreight() {
      var location = getLocation();
      if (location != null) {
        this.freight = "";
        this.freightError = "";
        getGoodsFreight({
          goods_id: this.goods.goods_id,
          goods_num: this.buyNum,
          region_id: location.value[location.value.length - 1],
        }).then((res) => {
          if (!res.status) {
            this.freight = res;
          } else {
            this.freightError = res;
          }
        });
      }
    },
    _getConsultPage() {
      getConsultPage({
        goods_id: this.goods.goods_id,
        consult_type: this.consultTab,
        p: this.consultCurrentPage,
        size: this.consultPageSize,
      }).then((res) => {
        this.consultData = res.records;
        this.consultTotal = res.total;
      });
    },
    clickConsultTab(val) {
      this.consultTab = val;
      this._getConsultPage();
    },
    clickCommentDialog(item) {
      if (item.isShowDialog) {
        item.isShowDialog = false;
      } else {
        item.isShowDialog = true;
      }
      this.$forceUpdate();
    },
    getCommentReplyList() {
      var parent_ids_arr = [];
      this.commentPage.records.forEach(function (item) {
        parent_ids_arr.push(item.comment_id);
      });
      if (parent_ids_arr.length > 0) {
        getCommentReplyList({
          parent_id: parent_ids_arr.join(","),
        }).then((res) => {
          this.commentReplyList = res;
          this.getReplyList();
        });
      }
    },
    getReplyList() {
      var comment_ids_arr = [];
      this.commentReplyList.forEach(function (item) {
        comment_ids_arr.push(item.comment_id);
      });
      if (comment_ids_arr.length > 0) {
        getReplyList({
          comment_id: comment_ids_arr.join(","),
        }).then((res) => {
          this.replyList = res;
        });
      }
    },
    getGuessYouLikeGoods() {
      var that = this;
      getGuessYouLike({
        size: 30,
      }).then(function (res) {
        that.guessYoulikeGoodsList = res;
        for (let i = 0; i < that.guessYoulikeGoodsList.length; i++) {
          const element = that.guessYoulikeGoodsList[i];
          element.shop_price = element.shop_price.toFixed(2);
        }
      });
    },
    getLikeGoods() {
      var that = this;
      getGoods({
        size: 30,
      }).then(function (res) {
        that.guessYoulikeGoodsList = res.records;
        for (let i = 0; i < that.guessYoulikeGoodsList.length; i++) {
          const element = that.guessYoulikeGoodsList[i];
          element.shop_price = element.shop_price.toFixed(2);
        }
      });
    },
    clickSpec(item, itm) {
      item.selectId = itm.id;
      this.visible = false;
      this.$forceUpdate();
      if (this.isSelectSpecAll()) {
        this.itemId = this.getSpecGoodsPrice().item_id;
        this._getGoodsSku();
      }
    },
    isSelectSpecAll() {
      for (var i = 0; i < this.spec.length; i++) {
        if (this.spec[i].selectId == 0) {
          return false;
        }
      }
      return true;
    },
    getSpecKey() {
      var spec_arr = [];
      for (var i = 0; i < this.spec.length; i++) {
        if (this.spec[i].selectId != 0) {
          spec_arr.push(this.spec[i].selectId);
        }
      }
      return spec_arr.sort(this.sortNumber).join("_");
    },
    sortNumber(a, b) {
      return a - b;
    },
    getSpecGoodsPrice() {
      var spec_key = this.getSpecKey();
      for (var i = 0; i < this.specGoodsPriceList.length; i++) {
        if (this.specGoodsPriceList[i].key == spec_key) {
          return this.specGoodsPriceList[i];
        }
      }
      return null;
    },
    isAbleBuy() {
      //地址不支持配送就不能购买
      if (typeof this.freightError.status != undefined) {
        return false;
      } else {
        return true;
      }
    },
    handleBuyNumChange() {},
    clickContentTab(val) {
      this.contentTab = val;
      if (val == 4) {
        this.fleshVerify();
      }
    },
    handleSizeChange(val) {
      this.handleSize = val;
      this._getCommentPage();
    },
    handleCurrentChange(val) {
      this.handleCurrent = val;
      this._getCommentPage();
    },
    consultHandleSizeChange(val) {
      this.consultPageSize = val;
      this._getConsultPage();
    },
    consultHandleCurrentChange(val) {
      this.consultCurrentPage = val;
      this._getConsultPage();
    },
    witchZoom(item) {
      this.zoomUrl = item.image_url;
      this.zoomHighUrl = item.image_url;
      this.videoIsShow = false;
    },
    clickCollect() {
      var that = this;
      if (this.goodsCollection == "") {
        addGoodsCollection(this.goods.goods_id).then(function (res) {
          if (res.status == 1) {
            getGoodsById(that.$route.query.id).then((res) => {
              that.goods = res;
            });
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
          that._getGoodsCollection();
        });
      } else {
        removeGoodsCollection(this.goods.goods_id).then(function (res) {
          if (res.status == 1) {
            getGoodsById(that.$route.query.id).then((res) => {
              that.goods = res;
            });
          } else {
            that.$message({
              message: res.msg,
              type: "error",
            });
          }
          that._getGoodsCollection();
        });
      }
    },
    addCart() {
      var that = this;
      // if (!this.isSelectSpecAll()) {
      // 	this.$message({
      // 		message: that.i18n.goodsInfo.choose_specifications,
      // 		type: 'error'
      // 	})
      // 	return
      // }
      /*用户信息不为空的时候（登录状态下）直接加入购物车 未登录状态下加入购物车*/
      let params = {
        goods_id: this.goods.goods_id,
        item_id: this.itemId,
        goods_num: this.buyNum,
      };

      if (that.freightError) {
        that.$message({
          // message: '该地区不支持配送',
          message: that.i18n.goodsInfo.unsupported_distribution,
          type: "error",
        });
      } else {
        if (getUser() != null) {
          addCart(params).then(function (res) {
            if (res.status == 1) {
              that.visible = true;
              that.$refs.addcart.getGoods();
              bus.$emit("getBill");
            } else {
              that.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
          return false;
        }
        /*检测能否加入购物车 （未登录下）*/
        getCartUnlisted(params).then((res) => {
          if (res.status == 1) {
            let storeageData = common.getSessionData("shopCartList");
            if (storeageData == null) {
              let arr = new Array();
              arr.push(params);
              common.setSessionData("shopCartList", arr);
              bus.$emit("getBill");
              // this.$router.push({name: "login"})
              that.visible = true;
              return false;
            }
            let index = null;
            storeageData.forEach((item, i) => {
              if (
                item.goods_id == params.goods_id &&
                item.item_id == params.item_id
              ) {
                index = i;
                return index;
              }
            });
            if (index != null) {
              storeageData[index].goods_num =
                storeageData[index].goods_num + params.goods_num;
            } else {
              storeageData.push(params);
            }
            that.visible = true;
            common.setSessionData("shopCartList", storeageData);
            bus.$emit("getBill");
          }
        });
      }

      /*加入到购物车就跳转到登录页*/
      // this.$router.push({name: "login"})
    },
    buyNow() {
	  if(getUser() == null) {
		  this.$router.push({
			  name:"login"
		  })
		  return false
	  }
      var that = this;
      getCartBill({
        goods_id: that.goods.goods_id,
        item_id: that.itemId,
        goods_num: that.buyNum,
      }).then(function (res) {
        if (res.status != 1 && res.msg) {
          that.$message({
            message: res.msg,
            type: "error",
          });
        } else {
          that.$router.push({
            name: "cart/cart2/id",
            query: {
              goods_id: that.goods.goods_id,
              item_id: that.itemId,
              goods_num: that.buyNum,
            },
          });
        }
      });
    },
    getRegion(data) {
      if (getLocation().value.length > 0) {
        this._getGoodsFreight();
      }
      var address = "";
      data.label.forEach((name) => {
        address += name + ",";
      });
      this.region = address.substr(0, address.length - 1);
      this.postCode = data.label[data.label.length - 1];
      this.popoverShow = false;
    },
    submit() {
      var that = this;
      if (!this.words) {
        this.$message.error(that.i18n.goodsInfo.keyword_nosky);
        return;
      }
      if (!this.start_price) {
        this.$message.error(that.i18n.goodsInfo.minimumprice_nosky);
        return;
      }
      if (!this.end_price) {
        this.$message.error(that.i18n.goodsInfo.high_nosky);
        return;
      }
      let newQuery = {
        words: this.words,
        start_price: this.start_price,
        end_price: this.end_price,
      };
      this.$router.push({
       name: "goods/goodsList/id",
        query: newQuery,
      });
    },
    //隐藏购物车成功框
    Hide(e) {
      this.visible = e;
    },
    //刷新验证码
    fleshVerify() {
      var that = this;
      var random = Math.random();
      getVerifyImage({
        t: random,
      }).then(function (res) {
        that.verification_image = res;
      });
    },
    goodsConsultForm() {
      var that = this;
      verifyVerifyImage({
        verification: this.verification,
      }).then((res) => {
        if (res) {
          var form = {
            goods_id: that.goods.goods_id,
            add_time: new Date().getTime() / 1000,
            consult_type: that.consultType,
            content: that.consultContent,
            store_id: that.goods.store_id,
            is_show: 1,
            user_id: 0,
          };
          if (that.user) {
            form.username = that.user.nickname;
            form.user_id = that.user.user_id;
          } else {
            form.username = that.nickname;
          }
          addGoodsConsult(form).then((res) => {
            if (res.status == 1) {
              that.$message.success(that.i18n.goodsInfo.submit_successfully);
              that._getConsultPage();
            } else {
              that.$message.error(res.msg);
              that.fleshVerify();
            }
          });
        } else {
          that.fleshVerify();
          that.$message.error(that.i18n.goodsInfo.membercode);
        }
      });
    },
    showVideo() {
      this.videoIsShow = true;
      this.zoomUrl = "";
      this.zoomHighUrl = "";
    },
    getAddress() {
      var that = this;
      getAddress({
        name: this.postCode,
      }).then((res) => {
        if (res.status < 1) {
          that.$message.error(res.msg);
        } else {
          var location = {
            label: [],
            value: [],
          };
          var address = "";
          res.forEach((region) => {
            location.label.push(region.name);
            location.value.push(region.id);
            address += region.name + ",";
          });
          that.region = address.substr(0, address.length - 1);
          setLocation(location);
          this.isCache = false;
          this.oldAddress = address.substr(0, address.length - 1);
          // that.popoverShow = false
        }
      });
    },
    getWssOrws() {
      return getWssOrws();
    },
    getTidio(storeId) {
      getTidio({ store_id: storeId }).then((res) => {
        if (res && res.js_url) {
          loadTidioJs(res.js_url).then(() => {});
        }
      });
    },
  },
};
</script>
<style scoped>
>>> .photo-zoom-pro .container .origin-img {
  width: 400px;
  height: 400px;
}

>>> .el-button--danger {
  color: #fff;
  background-color: #e83632;
  border-color: #e83632;
}

>>> .img-out-show {
  z-index: 100;
}

.goods-video {
  width: 400px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
}

.product-gallery {
  position: relative;
}

.pre_sell_div button {
  background: #ffffff;
  font-family: sans-serif;
  font-size: 14px;
  color: #333333;
  border: none;
  outline: none;
}
.pre_sell_div button:hover {
  color: #e23435;
}
.presell_allpri ul {
  display: flex;
  flex-direction: row;
  width: max-content;
}
.presell_allpri ul li {
  border: 1px dashed #e23435;
  padding: 0 10px;
}

.free-freight {
  font-size: 18px;
  color: #e23435;
}

.allpre-ne-ter {
  height: 170px;
  text-align: center;
  position: absolute;
  top: 400px;
  right: 0;
}

.standard {
  position: relative;
}
</style>

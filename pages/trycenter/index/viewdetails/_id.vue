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
		<div class="search-box p">
			<div class="w1224">
				<div class="search-path fl">
					<a>{{i18n.goodsInfo.all_result}}</a>
					<template v-for="(item) in goodsCategoryList">
						<i class="litt-xyb"></i>
						<router-link :to="{name:'goods/goodsList/id',query:{id:item.id}}">{{item.name}}</router-link>
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
						<div class="product-photo">
							<vue-photo-zoom-pro :url="zoomUrl" :high-url="zoomHighUrl" :scale="2" :out-zoomer="true">
							</vue-photo-zoom-pro>
							<div class="product-small-img fn-clear">
								<a href="javascript:;" class="next-left next-btn fl disabled">&lt;</a>
								<div class="pic-hide-box fl">
									<ul class="small-pic">
										<template v-for="item in goodsImages">
											<li class="small-pic-li">
												<a href="javascript:;" @click="witchZoom(item)">
													<!-- 放大镜图片 -->
													<img :src="item.image_url" alt="" />
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
					</div>
				</div>
				<div class="detail-ggsl">
					<h1>{{text_goods.goods_name}}</h1>
					<div class="shop-price-cou p">
						<div class="shop-price-le">
							<ul>
								<li class="jaj">
									<span>商城价:</span>
								</li>
								<li>
									<span class="bigpri_jj">
										<em>{{i18nCommon.symbol}}</em>{{goods.shop_price.toFixed(2)}}
									</span>
								</li>
							</ul>
							<ul>
								<li class="jaj">
									<span>试用价:</span>
								</li>
								<li>
									<span class="bigpri_jj">
										<em>{{i18nCommon.symbol}}</em>{{market_price}}
									</span>
								</li>
							</ul>
						</div>
						<div class="shop-cou-ri">
							<div class="allcomm">
								<p>累计评价</p>
								<p class="f_blue">{{comment_count}}</p>
							</div>
							<div class="br1"></div>
							<div class="allcomm">
								<p>累计销量</p>
								<p class="f_blue">{{sales_sum}}</p>
							</div>
						</div>
					</div>
					<div style="text-align: right;margin-top: -30px;" v-if="begin_show">开始时间：{{text_goods.start_time_show}}</div>
					<div class="standard p">
						<!-- 收货地址，物流运费 -start-->
						<ul class="list1" style="display:flex;flex-direction:row;">
							<li class="jaj">
								<span>配&nbsp;&nbsp;送：</span>
							</li>
							<li class="summary-stock though-line">
								<div class="dd shd_address">
									<el-popover style="float:left;" placement="bottom" v-model="popoverShow" width="300" trigger="click">
										<div class="popover-content">
											<el-form>
												<span v-if="is_code">
											    <el-divider content-position="left">{{i18n.goodsInfo.import_area}}</el-divider>
												<el-form-item :label="i18n.goodsInfo.region">
													<el-input id="viewdetails-input" size="mini" v-model="postCode" :placeholder="i18n.goodsInfo.please_region" style="width: 160px;"></el-input>
													<el-button type="danger" @click="getAddress" size="mini" style="margin-left: 15px;">{{i18n.goodsInfo.confirm}}</el-button>
												</el-form-item>
												</span>
													<span  v-if="is_address">
												<el-divider content-position="left">{{i18n.goodsInfo.please_address}}</el-divider>
												<el-form-item :label="i18n.goodsInfo.site">
													<Regions ref="region" :initVal="oldAddress" @choose="getRegion" :isCache="isCache"></Regions>
												</el-form-item>
												</span>
											</el-form>
										</div>
										<el-input id="region-input" size="mini" slot="reference" v-model="region" :placeholder="i18n.goodsInfo.click_select" readonly></el-input>
									</el-popover>
									<div class="try-mes">
										<div>
											<span class="classfreight" v-if="freight === 0">{{i18n.goodsInfo.free_shipping}}</span>
											<span class="classfreight" v-if="freight > 0">{{i18n.goodsInfo.freight}}：{{freight}}{{i18nCommon.symbol}}</span>
											<span class="freightmoney" v-if="freightError">{{freightError.msg}}</span>
									    </div>
										<router-link :to="{name:'try_detail'}">
											<span class="try-help">试用帮助</span>
										</router-link>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="standard p">
						<ul>
							<li class="jaj">
								<span>服&nbsp;&nbsp;务：</span>
							</li>
							<li class="lawir">
								<span class="service">由***发货并提供售后服务</span>
							</li>
						</ul>
					</div>
					
					<div class="standard p" v-if="begin_show">
						<el-row>
							<el-button style="margin: 100px 100px;background: #0F5499;color: #fff;">即将开始</el-button>
						</el-row>
					</div>
					<div class="standard p" v-else>
						<el-row v-if="state==1">
							<el-button v-if='appcheck==0' @click="addCart()" style="margin: 100px 100px;background: #0F5499;color: #fff;">立即申请</el-button>
							<el-button v-if='appcheck==1' @click="trialname" style="margin: 100px 100px;background: #0F5499;color: #fff;">已申请</el-button>
						</el-row>
						<el-row v-else>
							<el-button style="margin: 100px 100px;background: #0F5499;color: #fff;">活动已经结束</el-button>
							</el-row>
					</div>
				</div>
				<!-- 店铺 -->
				<div class="detail-ry p">
					<div class="delogo">
						<!-- 店铺logo -->
						<router-link to="">
							<img src="" alt="" />
							<span></span>
						</router-link>
						<template>
							<p class="ownsj cooperation">
								<router-link class="co_blue" to="">
									<span>{{text_goods.store_name}}</span>
								</router-link>
							</p>
						</template>
					</div>
					<div class="reception p">
						<a href="">
							<i class="detai-ico"></i>在线客服
						</a>
					</div>
					<div class="intoshop p">
						<router-link :to="{name:'store',query:{store_id:text_goods.store_id}}">进入店铺</router-link>
					</div>
				</div>
				<!-- 店铺 -->
			</div>
		</div>


		<div class="w1224 mt50">
			<div style="width: 800px;">
				<el-steps :active="progress" align-center>
					<el-step title="试用申请" description=""></el-step>
					<el-step title="获得试用资格" description=""></el-step>
					<el-step title="抽取试用资格" description=""></el-step>
					<el-step title="商家发货" description=""></el-step>
					<el-step title="提交试用报告" description=""></el-step>
				</el-steps>
			</div>
		</div>
		<div class="detail-main p" id="top">
			<div class="w1224">
				<div class="deta-le-ma">
					<div class="type_more ma-to-20">
						<div class="type-top">
							<h2>热搜推荐</h2>
						</div>
						<div class="type-bot">
							<ul class="xg_typ">
								<li v-for="(item,index) in keywords" :key="index">
									<router-link :to="{name:'goodsList',query:{words:item}}" target="_blank">{{item}}</router-link>
								</li>
							</ul>
						</div>
					</div>
					<div class="type_more ma-to-20">
						<div class="type-top">
							<h2>推荐热卖</h2>
						</div>
						<div class="tjhot-shoplist type-bot">
							<div class="alone-shop" v-for="(item,index) in guessYoulikeGoodsList" :key="index">
								<router-link :to="{ name:'goodsInfo' , query:{id:item.goods_id}}">
									<img :src="apiHead + '/mall/goods/thumb_image?width=206&height=206&goods_id=' + item.goods_id" style="display: inline;" />
								</router-link>
								<p class="line-two-hidd">
									<router-link :to="{ name:'goods/goodsInfo/id', query:{id:item.goods_id} }">
										{{item.goods_name}}
									</router-link>
								</p>
								<p class="price-tag">
									<span class="li_xfo">{{i18nCommon.symbol}}</span>
									<span>{{item.shop_price.toFixed(2)}}</span>
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
									<a href="javascript:void(0);">商品介绍</a>
								</li>
								<li :class="{red:contentTab==2}" @click="clickContentTab(2)">
									<a href="javascript:void(0);">申请名单</a>
								</li>
								<li :class="{red:contentTab==3}" @click="clickContentTab(3)">
									<a href="javascript:void(0);">试用报告</a>
								</li>
								<li :class="{red:contentTab==4}" @click="clickContentTab(4)">
									<a href="javascript:void(0);">售后服务</a>
								</li>
							</ul>
						</div>
						<div class="shop-describe shop-con-describe p" v-if="contentTab == 1">
							<div class="deta-descri">
								<p class="shopname_de">
									<span>{{i18n.goodsInfo.goods_name}}：</span>
									<span>{{text_goods.goods_name}}</span>
								</p>
								<div class="ma-d-uli p">
									<ul>
										<li v-if="brand != ''">
											<span>{{i18n.goodsInfo.brand}}：</span>
											<span>{{brand.name}}</span>
										</li>
										<li v-if="goods.goods_sn">
											<span>{{i18n.goodsInfo.itemno}}：</span>
											<span>{{text_goods.goods.goods_sn}}</span>
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
								<ul>
									<li style="height: 90px;line-height: 90px;" v-for="(item,index) in apply">
										<div style="float: left;width: 50px;height: 50px;">
											<!-- <img src="@/assets/01.png" alt=""> -->
											<img style="width: 100%;height: 100%;border-radius: 50%;" :src="item.user.head_pic" alt="">
										</div>
										<div style="float: left;margin-left: 20px;">
											{{item.user.nickname}}<span style="margin-left: 20px;" >{{item.user.mobile}}</span></div>
									</li>
								</ul>
							</div>
						</div>
						<div class="shop-con-describe p" v-if="contentTab == 3">
							<ul>
								<li v-for="(item,index) in commentlist" :key="index">
									<div>
										<div style="height：50px;">
											<!-- 用户头像 -->
											<div style="float: left;margin-right: 20px;width: 50px;height: 50px;line-height: 50px;border-radius: 50%;">
												<img src="@/assets/01.png" alt="">
												<!-- <img style="width: 100%;height: 100%;" :src="item.user.head_pic"  οnerrοr="this.src='@/assets/01.png'"  alt=""> -->
											</div>
											<div style="height: 50px;line-height: 50px;">{{item.user.nickname}}</div>
										</div>
										<!-- 试用商品 -->
										<div style="height: 20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
											试用商品:  {{item.goods.goods_name}}
										</div>
										<!-- 评论内容 -->
										<div style="width: 100%;font-size: 14px;overflow: hidden;margin-top: 20px;">
											<span>试用评价：</span>
											{{item.text}}
										</div>
										<!-- 评论图片 -->
										<div style="padding-top: 20px;overflow: hidden;" v-if="item.url">
											<div v-for="i in item.url" style="float: left;margin-right: 20px;width: 240px;height: auto;">
												<img style="width: 100%;height: 100%;" :src="i" alt="">
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="shop-con-describe p" v-if="contentTab == 4">
							<div class="shop-describe p">
								<div class="comm_stsh ma-to-20">
									<div class="deta-descri">
										<h2>售后保障</h2>
									</div>
								</div>
								<div class="deta-descri p">
									<div class="securi-afr">
										<ul>
											<li class="frhe">
												<i class="detai-ico msz1"></i>
											</li>
											<li class="wnuzsuhe">
												<h2>卖家服务</h2>
												<p>全国联保一年</p>
											</li>
										</ul>
										<ul>
											<li class="frhe">
												<i class="detai-ico msz2"></i>
											</li>
											<li class="wnuzsuhe">
												<h2>商城承诺</h2>
												<p>
													商城平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！
													注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。
													只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
												</p>
											</li>
										</ul>
										<ul>
											<li class="frhe">
												<i class="detai-ico msz3"></i>
											</li>
											<li class="wnuzsuhe">
												<h2>正品行货</h2>
												<p>商城向您保证所售商品均为正品行货，商城自营商品开具机打发票或电子发票。</p>
											</li>
										</ul>
										<ul>
											<li class="frhe">
												<i class="detai-ico msz4"></i>
											</li>
											<li class="wnuzsuhe">
												<h2>全国联保</h2>
												<p>
													凭质保证书及商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由联系保修，享受法定三包售后服务），与您亲临商场选购的商品享
													受相同的质量保证。商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！
												</p>
											</li>
										</ul>
										<ul>
											<li class="frhe">
												<i class="detai-ico msz5"></i>
											</li>
											<li class="wnuzsuhe">
												<h2>退货无忧</h2>
												<p>客户购买商城自营商品7日内（含7日，自客户收到商品之日起计算），在保证商品完好的前提下，可无理由退货。（部分商品除外，详情请见各商品细则）</p>
											</li>
										</ul>
									</div>
								</div>
								<div class="comm_stsh ma-to-20">
									<div class="deta-descri">
										<h2>退款说明</h2>
									</div>
								</div>
								<div class="deta-descri p">
									<div class="fetbajc">
							         	<p>{{i18n.goodsInfo.explain1}}</p>
	                                    <p>{{i18n.goodsInfo.explain2}}</p>
										<p>•{{i18n.goodsInfo.explain3}}</p>
										<p>• {{i18n.goodsInfo.explain4}}</p>
										<p>• {{i18n.goodsInfo.explain5}}</p>
										<p>{{i18n.goodsInfo.explain6}}</p>
										<p>{{i18n.goodsInfo.explain7}}</p>
										<p>{{i18n.goodsInfo.explain8}}</p>
										<p>{{i18n.goodsInfo.explain9}}</p>
										<p>{{i18n.goodsInfo.explain10}}</p>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>

		<el-dialog title="获得使用资格" :visible.sync="dialogVisible" width="1000px">
			<hr style="margin-top: -30px;margin-bottom: 20px;background: #e2dfdf;height: 1px;border: none;"/>
			<div>
				<div style="overflow: hidden;margin-bottom: 50px;border-bottom: 1px solid #e2dfdf;box-sizing: border-box;padding-bottom: 15px;">
					<div style="float: left;">
						<h3 style="font-weight: 900;">分享商品</h3>
						<p>您要先分享商品才能获得试用资格，分享的平台和次数越多，申请成功的概率越大</p>
					</div>
					<div style="float: right;">
						<button style=" width: 132px;height: 40px;border: none;background:#0F4599;color: #fff;">
							<el-popover v-if="check==0" placement="right-end" title="分享" width="150" trigger="hover">
								<div class="share_to">
									<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F192.168.0.147%3A8080%2F%23%2Fgoods%2FgoodsInfo%3Fid%3D38"><img
										 src="@/assets/facebook.png" alt="" @click="share"></a>
									<!-- <a target="_blank" href="https://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2F192.168.0.147%3A8080%2F%23%2Fgoods%2FgoodsInfo%3Fid%3D38&title=&source=&desc=&pics="><img
										 src="@/assets/qq.png" alt="" @click="share"></a> -->
									<!-- <a style="border: solid 1px #d81e06;" target="_blank" href="https://service.weibo.com/share/share.php?url=http%3A%2F%2F192.168.0.147%3A8080%2F%23%2Fgoods%2FgoodsInfo%3Fid%3D38&title=&pic=&appkey=#_loginLayer_1605576699529"><img
										 src="@/assets/weibo.png" alt="" @click="share"></a> -->
									<a target="_blank" href="https://wx.qq.com/"><img src="@/assets/WeChat.png"
										 alt="" @click="share"></a>
									<!-- <a style="border: solid 1px #1afa29;" target="_blank" href="https://accounts.douban.com/passport/login?redir=https%3A//www.douban.com/share/service%3Fhref%3Dhttp%253A%252F%252F192.168.0.147%253A8080%252F%2523%252Fgoods%252FgoodsInfo%253Fid%253D38%26name%3D%26text%3D%26image%3D%26starid%3D0%26aid%3D0%26style%3D11"><img
										 src="@/assets/douban.png" alt="" @click="share"></a> -->
								</div>
								<span slot="reference" style="display: inline-block;width: 132px;height: 40px;line-height: 40px;">分享</span>
							</el-popover>
							<span v-else>已分享</span>
						</button>
					</div>
				</div>
				<div style="overflow: hidden;border-bottom: 1px solid #e2dfdf; box-sizing: border-box;padding-bottom: 15px;">
					<div style="width: 50%;float: left;">
						<h3 style="line-height: 40px;font-weight: 900;">选择地址</h3>
					</div>
					<div style="float: right;height: 40px;">
						<button v-if="template_id>0" style=" width: 132px;height: 40px;border: none;background:#0F4599;color: #fff;">需支付{{freight}}元邮费</button>
						<button v-else style=" width: 64px;height: 22px;border: none;background: #E6E6E6;color: #666;">免邮费</button>
					</div>
				</div>
				<div>
					<div class="top_leg p">
						<span class="newadd fr" style="cursor: pointer;" @click="address_edit()">新增收货地址</span>
					</div>
					<div class="consignee-list p" :style="'height:'+listHeight+';'" style="margin-top: -5px;">
						<ul class="addlist">
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
									<span class="addr-default" v-if="item.is_default == 1">默认地址</span>
								</div>
								<div class="opbtns_editdel">
									<a href="javascript:void(0);" class="ftx" v-if="item.is_default == 0" @click="set_address_default(index)">设为默认地址</a>
									<a href="javascript:void(0);" class="ftx" @click="amendLocation(item)">修改</a>
									<a href="javascript:void(0);" class="ftx" @click="deleteAddress(item,index)">删除</a>
								</div>
							</li>
						</ul>
					</div>
					<div class="addr-switch" v-if="addressList.length > 1">
						<span @click="moreAddress()" v-if="siteBool">更多地址</span>
						<span @click="putAddress()" v-else>收起地址</span>
						<b></b>
					</div>
				</div>

				<div style="overflow: hidden;">
					<span slot="footer" class="dialog-footer" style="float: right;">
						<span v-if="template_id>0">
						<span v-if="check==1">
							<el-button v-if="template_id>0" style="background: #0F4599;color: #fff;" @click="affirm">支付邮费</el-button>
							<el-button v-else style="background: #0F4599;color: #fff;" @click="affirm">去申请</el-button>
						</span>
						<span v-else>
							<el-button style="background: #0F4599;color: #fff;">请先分享</el-button>
						</span>
						</span>
						<span v-else>
						<span v-if="check==1">
							<el-button style="background: #0F4599;color: #fff;" @click="affirm">免费申请</el-button>
						</span>
						<span v-else>
							<el-button style="background: #0F4599;color: #fff;">请先分享</el-button>
						</span>
						</span>
						<router-link :to="{ name: 'goods/goodsInfo/id', query:{id:text_goods.goods_id}}">
							<el-button style="background: #0F4599;color: #fff;">不等了直接購買</el-button>
						</router-link>
					</span>
				</div>
			</div>
		</el-dialog>
		<div>
			<po-pout :dialogFormVisible.sync="dialogFormVisible" @closeBindWarnStandard="handleCloseBindWarnStandard"
			 @updatesiteData="updatesiteData" :form="form" :title="title" :shippingAddres="shippingAddress"></po-pout>
		</div>
	</div>
</template>

<script>
	import Regions from "@/components/Regions";
	import poPout from "@/components/Popout/index";
	import {
		getShopConfig,
		getAddress,
		modifyUserAddress,
		customerAddress,
		singleUserAddress,
		removeAddress,
		getIPageTrialGoods,
		getTrialApply,
		getCheckCounts,
		addshare,
		/* getGoodsFreight, */
		addTrialOrder,
		getApplyCheck,
		getGoods,
		getGuessYouLike,
		getTrialGoodsfreight,
		gettrialcomment,
		returnFlowInt,
		getBrand,
		getGoodsImages,
		getGoodsById,
		getGoodsAttr,
		getGoodsCategories
	} from "@/utils/api.js";
	import {
		getUser,
		getLocation,
		setLocation,
	} from "@/utils/auth.js";
	//import bus from '@/utils/bus'
	export default {
		data() {
			return {
				is_address:false,
				is_code:false,
				guessYoulikeGoodsList: [], //猜你喜欢
				keywords: this.$store.state.shop_basic.hot_keywords.split("|"),
				region: getLocation().label.join(","),
				isCache: true, //地址是否使用缓存
				postCode: "" || getLocation().label[getLocation().label.length - 1], //邮编
				popoverShow: false,
				goodsImages: [], //商品相册
				addressList: [], //地址列表
				addressIndex: 0, //收货人信息类名判断
				address: {}, //使用地址
				listHeight: '42px', //收货人高度
				siteBool: true, //更多收起显示
				form: {
					consignee: "", //收货人
					address: "", //详细地址
					zipcode: "", //邮编
					mobile: "", //手机
					is_default: 0, //默认地址
				},
				freight: '', //运费
				freightError: '', //不配送信息
				tempOrder: {
					address_id: '', //地址id
					integral: '', //积分
					pay_pwd: '', //支付密码
					order_use_coupon_ids: '', //使用的优惠券id集合,逗号分隔
				},
				title: "新增",
				shippingAddress: [],
				dialogFormVisible: false,
				zoomUrl: '',
				zoomHighUrl: '',
				oldAddress: ["送货至:"],
				contentTab: 1, //商品介绍
				config: {
					url: window.location.href, // 网址，默认使用 window.location.href
					source: '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
					title: '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
					description: '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
					image: '', // 图片, 默认取网页中第一个img标签
					sites: ['facebook', 'qq', 'weibo', 'wechat', 'douban'], // 启用的站点
					// disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
					wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
					wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
				},
				dialogVisible: false, //申请弹出框
				text_goods: [],
				apply: [],
				check: 0,
				appcheck: 0,
				transaction_id: '',
				market_price: 0,
				shop_price: 0,
				comment_count: 0,
				sales_sum: 0,
				template_id:0,
				state:'',
				progress:1,
				commentlist:[],//试用评价列表
				brand:'',
				goods:{},//商品信息
				goodsAttrList:[],//商品属性
				begin_show:null,
				goodsCategoryList: [], //商品分类列表
			};
		},
		components: {
			Regions,
			poPout
		},
		created() {
			this.getPayConfig();
			this.getTextGoods();
			this.getApplyList();
			this.checks();
			this.getappCheckByid();
			this.getGuessYouLikeGoods();
			this.getLikeGoods();
			this.gettrialcomment();
			this.getflow();
		},
		computed:{
			i18n () { 
				return this.$t('goods')  
			},
			i18nCommon () {  
			    return this.$t('common')  
			} 
		},
		methods: {
			getPayConfig() {
				var that = this;
				var work=[];
				getShopConfig({
					inc_type: 'shopping'
				}).then(res => {
					if (res.shopping && res.shopping.address_and_code) {
						work = res.shopping.address_and_code.split(",");
						for(var i=0; i<work.length; i++) {
							if(parseInt(work[i]) == 1){
								that.is_code=true;
							}
							if(parseInt(work[i]) == 0){
								that.is_address=true;
							}
						}
					}
				})
			},
			getflow(){
				var that = this
				returnFlowInt({
					trial_id: this.$route.query.trial_id,
					user_id: getUser().user_id
				}).then(function(res) {
					//此处获取流程
					that.progress = res
				});
			},
			getGuessYouLikeGoods() {
				var that = this
				getGuessYouLike({
					size: 30
				}).then(function(res) {
					that.guessYoulikeGoodsList = res
				});
			},
			getLikeGoods() {
				var that = this
				getGoods({
					size: 30
				}).then(function(res) {
					that.guessYoulikeGoodsList = res.records
				});
			},
			getappCheckByid() {
				var that = this;
				getApplyCheck({
					trial_id: this.$route.query.trial_id,
					user_id: getUser().user_id
				}).then(function(map) {
					that.appcheck = map;
				})
			},
			affirm() {
				if (this.freight === '') {
					this.$message.info("请选择配送信息");
					return false
				}
				if (!this.addressList[0]) {
					this.$message.info("没有收货地址");
					return false
				} else {
					var that = this;
					var form = {
						trial_apply: {
							trial_id: this.$route.query.trial_id,
							user_id: getUser().user_id
						},
						trial_order: {
							store_id: this.text_goods.store_id,
							user_id: getUser().user_id,
							goods_price: 0,
							total_amount: this.freight,
							order_amount: this.freight,
							transaction_id: this.transaction_id,
							shipping_price: this.freight
						},
						trial_order_goods: {
							goods_id: this.text_goods.goods_id,
							goods_name: this.text_goods.goods_name,
							goods_num: 1,
							goods_price: this.text_goods.goods.market_price,
							pay_price: 0
						},
						trial_order_shipping: {
							consignee_name: this.addressList[0].consignee,
							consignee_mobile: this.addressList[0].mobile,
							consignee_email: this.addressList[0].email,
							consignee_province_id: this.addressList[0].province,
							consignee_city_id: this.addressList[0].city,
							consignee_district_id: this.addressList[0].district,
							consignee_town_id: this.addressList[0].twon,
							consignee_address: this.addressList[0].address,
						}

					}
					addTrialOrder(form).then(function(isnot) {
						if (isnot.status == 1) {
							that.$message.info("成功");
							that.$router.push({
								name: 'cart/paymentOrderTrial/id',
								query: {
									order_sn: isnot.result
								}
							});
						} else {
						/* 	that.$message.info("参与人员已满"); */
							 that.$message.error(isnot.msg); 
						}
					});
				}
			},
			gettrialcomment(){
				gettrialcomment().then(res=>{
					for(var i=0;i<res.records.length;i++){
						if(res.records[i].url){
							res.records[i].url=res.records[i].url.split(",")
						}
						this.commentlist=res.records
					}
				})
			},
			share() {
				var that = this;
				var trial_share = {
					trial_id: this.$route.query.trial_id,
					user_id: getUser().user_id
				}
				addshare(trial_share).then(function(isnot) {
					console.log(isnot)
					if (isnot.status == 1) {
						that.getTextGoods();
						that.checks();
						that.getflow();
						that.$message.info("分享成功");

					} else {
						that.$message.error(isnot.msg);
					}
				});
			},
			/* 		isAbleBuy() {
						//地址不支持配送就不能购买
						if (typeof(this.freightError.status) != undefined) {
							return false
						} else {
							return true
						}
					}, */
			checks() {
				var that = this;
				getCheckCounts({
					trial_id: this.$route.query.trial_id,
					user_id: getUser().user_id
				}).then(function(map) {
					that.check = map;
				})
			},
			getApplyList() {
				var that = this;
				getTrialApply({
					size: 20,
					trial_id: this.$route.query.trial_id
				}).then(function(map) {
					for(var i in map.records){
						if(map.records[i].user.mobile!=''){
							map.records[i].user.mobile= map.records[i].user.mobile.substr(0, 3) + '****' +  map.records[i].user.mobile.substr(7)
						}
					}
					that.apply = map.records;
				})
			},
			getTextGoods() {
				var that = this;
				getIPageTrialGoods({
					trial_id: this.$route.query.trial_id
				}).then(function(map) {
					that.text_goods = map.records[0];
					that.zoomUrl = that.apiHead+ "/mall/goods/thumb_image?width=400&height=400&goods_id=" + map.records[0].goods_id;
					that.zoomHighUrl = that.apiHead+ "/mall/goods/thumb_image?width=800&height=800&goods_id=" + map.records[0].goods_id;
					that.market_price = map.records[0].goods.market_price;
					that.shop_price = map.records[0].goods.shop_price;
					that.comment_count = map.records[0].goods.comment_count;
					that.sales_sum = map.records[0].goods.sales_sum;
					that.template_id=map.records[0].template_id;
					that.state=map.records[0].state;	
					var t = new Date();
      				var time = parseInt(t.getTime() / 1000);
					  if(that.text_goods.start_time>time){
							that.begin_show=true
						}else{
							that.begin_show=false
						}
					getBrand({
						id: that.text_goods.goods.brand_id,
					}).then((res) => {
						that.brand = res
					}),
					getGoodsImages({goods_id:that.text_goods.goods_id}).then(res=>{
						that.goodsImages=res
						that.goodsImages.unshift({
							goods_id: that.text_goods.goods_id,
							image_url: that.apiHead+ "/mall/goods/thumb_image?width=400&height=400&goods_id=" + that.text_goods.goods_id
						})
					})
					getGoodsById(that.text_goods.goods_id).then(res=>{
						that.goods=res
						getGoodsCategories({
							id: that.goods.cat_id1 + "," + that.goods.cat_id2 + "," + that.goods.cat_id3
						}).then((res) => {
							that.goodsCategoryList = res
						})
					})
					getGoodsAttr({goods_id: that.text_goods.goods_id}).then(res=>{
						that.goodsAttrList = res
					})
				})
				this._getGoodsFreight();
			},
			_getGoodsFreight() {
				var location = getLocation()
				if (location != null) {
					this.freight = ''
					this.freightError = ''
					getTrialGoodsfreight({
						trial_id: this.$route.query.trial_id,
						goods_num: 1,
						region_id: location.value[location.value.length - 1]
					}).then((res) => {
						if (!res.status) {
							this.freight = res
						} else {
							this.freightError = res
						}
					})
				}
			},
			tabAddress(item, index) {
				/*选择地址 将原地址删除，在地址列表第一位新增删除的地址，默认选中第一个
				 */
				this.cloneAddress = JSON.parse(JSON.stringify(item))
				this.addressList.splice(index, 1)
				this.addressList.unshift(this.cloneAddress)
				this.addressIndex = 0;
				this.tempOrder.address_id = item.address_id
			},
			//更多地址
			moreAddress() {
				this.listHeight = 'inherit'
				this.siteBool = false
			},
			//收起地址
			putAddress() {
				this.listHeight = '42px'
				this.siteBool = true
			},
			handleCloseBindWarnStandard(data) {
				this.dialogFormVisible = false
			},

			//点击修改地址
			amendLocation(item) {
				var _this = this;
				this.title = "修改";
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
				this.addressList = data
			},
			// 新增地址
			address_edit() {
				this.title = "新增";
				this.shippingAddress = [];
				this.dialogFormVisible = true;
				this.form = {
					consignee: "", //收货人
					address: "", //详细地址
					zipcode: "", //邮编
					mobile: "", //手机
					is_default: 0, //默认地址
					longitude: 0,
					latitude: 0,
				};
			},
			//删除地址
			deleteAddress(item, index) {
				var _this = this;
				this.$confirm("确定删除？", "信息", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
					})
					.then(() => {
						removeAddress(item.address_id).then((res) => {
							var argu = {};
							if (res.status == 1) {
								_this._getAddressList()
								argu = {
									showClose: true,
									message: res.msg,
									type: "success",
								};
							} else {
								argu = {
									showClose: true,
									message: "删除失败,失败原因:" + res.msg,
									type: "error",
								};
							}
							_this.$message(argu);
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
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
							message: "设置失败,失败原因:" + res.msg,
							type: "error",
						};
					}
					_this.addressIndex = 0
					_this.listHeight = '42px'
					_this.siteBool = true
					_this.$message(argu);
					_this._getAddressList();
				});
			},
			_getAddressList() {
				customerAddress().then(res => {
					this.addressList = res;
					if (this.addressList.length > 0) {
						//设置选择中地址
						this.address = this.addressList[0]
						this.tempOrder.address_id = this.address.address_id
					} else {
						//打开创建地址对话框
						this.address_edit()
					}
				});
			},
			clickContentTab(val) {
				this.contentTab = val
			},
			witchZoom(item) {
				this.zoomUrl = item.image_url
				this.zoomHighUrl = item.image_url
				// this.videoIsShow = false
			},
			addCart() {
				customerAddress().then(res => {
					this.addressList = res;
					if (this.addressList.length > 0) {
						//设置选择中地址
						this.address = this.addressList[0]
						this.tempOrder.address_id = this.address.address_id
					} else {
						//打开创建地址对话框
						this.address_edit()
					}
				});
				if (this.freight.status==0) {
					this.$message.info("请选择配送信息");
					return false
				} else if(this.addressList==[]){
					this.dialogFormVisible = true;
				}else{
					this.dialogVisible = true
				}
			},
			getRegion(data) {
				if (getLocation().value.length > 0) {
					this._getGoodsFreight()
				}
				var address = ""
				data.label.forEach(name => {
					address += name + ","
				})
				this.region = address.substr(0, address.length - 1);
				this.postCode = data.label[data.label.length - 1];
				this.popoverShow = false
			},
			getAddress() {
				var that = this;
				getAddress({
					name: this.postCode
				}).then(res => {
					if (res.status < 1) {
						if (res.msg= 'POST_CODE_DOES_NOT_EXIST') {
							res.msg = '邮编号码不存在'
						}
						that.$message.error(res.msg)
					} else {
						var location = {
							label: [],
							value: []
						};
						var address = ""
						res.forEach(region => {
							location.label.push(region.name);
							location.value.push(region.id);
							address += region.name + ","
						})
						that.region = address.substr(0, address.length - 1);
						setLocation(location);
						this.isCache = false;
						this.oldAddress = address.substr(0, address.length - 1);
						that.popoverShow = false
					}
				})
			},
			trialname(){
				// var top= document.getElementById("top")
				this.contentTab = 2
				// window.onscroll = function(){
				// 	var t = document.documentElement.scrollTop || document.body.scrollTop; 
				// 	window.scrollTop=800
					
				// }
			}
		}
	};
</script>
<style scoped>
	>>>.photo-zoom-pro .container .origin-img {
		width: 400px;
		height: 400px;
	}

	>>>.el-button--danger {
		color: #FFF;
		background-color: #e83632;
		border-color: #e83632;
	}

	>>>.img-out-show {
		z-index: 100
	}
	
	.goods-video {
		width: 400px;
		height: 400px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 11
	}

	.product-gallery {

		position: relative;
	}

	.address span {
		margin-right: 30px;
	}

	.share_to {
		overflow: hidden;
	}

	.share_to a {
		display: inline-block;
		height: 30px;
		width: 30px;
		margin-right: 15px;
		border-radius: 50%;
		text-align: center;
	}
	.addlist li{
		margin-top: none;
		margin-bottom: 5px;
	}
	.classfreight{
		margin-left: 9px;
	}
	.freightmoney{
		vertical-align: middle;
		position: relative; 
		top: -1px; 
		margin-left: 9px; 
		color: rgb(102, 102, 102);
	}

	.try-mes{
	    width: 350px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.try-help{
		background: #E23435;
		color: #FFFFFF;
		padding: 10px;
		cursor: pointer;
	}
</style>

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
		<div class="soubao-sidebar">
			<div class="soubao-sidebar-bg"></div>
			<div class="sidertabs tab-lis-1">
				<div class="sider-top-stra sider-midd-1">
					<div class="icon-tabe-chan">
						<nuxt-link :to="{ name: 'user_index'}">
							<i class="share-side share-side1"></i>
							<i class="share-side tab-icon-tip triangleshow"></i>
						</nuxt-link>
						<div class="dl_login">
							<div class="hinihdk">
								<img class="head_pic" src="../../static/images/dl.png" />
								<p class="loginafter nologin">
									<span>{{i18n.StoreTemplate.StoreTemplate1.hello_first}}</span>
									<nuxt-link :to="{ name: 'login'}">{{i18n.StoreTemplate.StoreTemplate1.register}}</nuxt-link>！
								</p>
								<span class="tab-tip">{{i18n.StoreTemplate.StoreTemplate1.news}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="sider-top-stra sider-midd-2">
					<div class="icon-tabe-chan mmm">
						<nuxt-link :to="{ name: 'goods_collect'}" target="_blank">

							<i class="share-side share-side1"></i>
							<!--<i class="share-side tab-icon-tip"></i>-->
							<span class="tab-tip">{{i18n.StoreTemplate.StoreTemplate1.collect}}</span>
						</nuxt-link>
					</div>
					<div class="icon-tabe-chan hostry">
						<nuxt-link :to="{ name: 'visit_log'}" target="_blank">
							<i class="share-side share-side1"></i>
							<!--<i class="share-side tab-icon-tip"></i>-->
							<span class="tab-tip">{{i18n.StoreTemplate.StoreTemplate1.track}}</span>
						</nuxt-link>
					</div>
				</div>
			</div>
			<!-- 侧边栏 -->
			<div class="sidertabs tab-lis-2">
				<div class="icon-tabe-chan advice">
					<a :href="'tencent://message/?uin=' + store.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
						<i class="share-side share-side1"></i>
						<!--<i class="share-side tab-icon-tip"></i>-->
						<span class="tab-tip">{{i18n.StoreTemplate.StoreTemplate1.online_consultant}}</span>
					</a>
				</div>
				<!-- <div class="icon-tabe-chan qrcode">
					<a href target="_blank">
						<i class="share-side share-side1"></i>
						<i class="share-side tab-icon-tip triangleshow"></i>
						<span class="tab-tip qrewm">
							<img img-url=""
							 src="" />
							扫一扫下载APP
						</span>
					</a>
				</div> -->
				<div class="icon-tabe-chan comebacktop">
					<a href target="_blank">
						<i class="share-side share-side1"></i>
						<!--<i class="share-side tab-icon-tip"></i>-->
						<span class="tab-tip">{{i18n.StoreTemplate.StoreTemplate1.return_top}}</span>
					</a>
				</div>
			</div>
			<div class="shop-car-sider"></div>
		</div>
		<top-bar></top-bar>
		<div class="header-wrap">
			<div class="public-head-layout wrapper">
				<h1 class="site-logo">
					<nuxt-link :to="{name:'index'}">
						<img :src="store.store_logo" class="pngFix" />
					</nuxt-link>
				</h1>
				<div class="heade_store_info">
					<div class="slogo">
						<span class="store_name">
							{{store.store_name}}
						</span>
						<br />
					</div>
					<div class="pj_info">
						<div class="shopdsr_item">
							<div class="shopdsr_title">{{i18n.StoreTemplate.StoreTemplate1.describe_agree}}</div>
							<div class="shopdsr_score">{{store.store_desccredit}}</div>
						</div>
						<div class="shopdsr_item">
							<div class="shopdsr_title">{{i18n.StoreTemplate.StoreTemplate1.service_attitude}}</div>
							<div class="shopdsr_score">{{store.store_servicecredit}}</div>
						</div>
						<div class="shopdsr_item">
							<div class="shopdsr_title">{{i18n.StoreTemplate.StoreTemplate1.delivery_speed}}</div>
							<div class="shopdsr_score">{{store.store_deliverycredit}}</div>
						</div>
					</div>
					<div class="sub">
						<div class="store-logo">
							<img :src="store.store_logo" />
						</div>
						<!--店铺基本信息 S-->
						<div class="ncs-info">
							<div class="title">
								<h4>{{store.store_name}}</h4>
							</div>
							<div class="content">
								<dl class="messenger">
									<dt>{{i18n.StoreTemplate.StoreTemplate1.contact_way}}：</dt>
									<dd>
										<span member_id="2">{{store.store_phone}}</span>
									</dd>
								</dl>
								<!--只有实名认证实体店认证后才显示保障体系 by haoid.cn -->
								<!--保证金金额-->
								<!--保障体系 by haoid.cn-->
								<dl class="no-border">
									<dt>{{i18n.StoreTemplate.StoreTemplate1.company_name}}：</dt>
									<dd>{{store.company_name}}</dd>
								</dl>
								<dl>
									<dt>{{i18n.StoreTemplate.StoreTemplate1.location}}：</dt>
									<dd>
										<span v-for="region in regionList" :key="region.id">{{region.name}}</span>
									</dd>
								</dl>
								<div class="goto">
									<nuxt-link :to="{name:'store',query:{store_id:store.store_id}}">{{i18n.StoreTemplate.StoreTemplate1.dnter_store}}</nuxt-link>
									<a href="javascript:void(0)" @click="addFavoriteStores()">
										{{i18n.StoreTemplate.StoreTemplate1.favorite_stores}}
										<em nctype="store_collect"></em>
									</a>
								</div>
								<div class="shop-other" id="shop-other" style="display: block">
									<ul>
										<li class="ncs-info-btn-map">
											<a href="javascript:void(0)" class="pngFix">
												<span>{{i18n.StoreTemplate.StoreTemplate1.store_maps}}</span>
												<b></b>
												<!-- 店铺地图 -->
												<div class="ncs-info-map" id="map_container" style="width:208px;height:208px;"></div>
											</a>
										</li>
										<!-- <li class="ncs-info-btn-qrcode">
											<a href="javascript:void(0)" class="pngFix" style="padding-left: 15px; ">
												<span>店铺二维码</span>
												<b></b>
												<p class="ncs-info-qrcode">
													<img img-url=""
													 style="width:208px;height:208px" src="" />
												</p>
											</a>
										</li> -->
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="heade_service_info" v-if="isImOn()">
					<div class="displayed">
						<i></i>{{i18n.StoreTemplate.StoreTemplate1.online_service}}
						<div class="sub">
							<div class="ncs-message-bar">
								<div class="default">
									<h5>
										<a v-if="user" href="javascript:;"  :user_id="user.user_id" :uname="user.nickname" :avatar="user.head_pic"
											sign="" :storeid="store.store_id"
											:client_host="location.host" :client_href="location.href" 
											:im_href="location.origin + '/im'" :ws_socket="getWssOrws() + '//' + location.host + '/ws'" id="workerman-kefu" onclick="jump()">
											{{store.store_name}}
										</a>
										<a v-else href="javascript:;" user_id="" uname="" avatar="" 
											sign="" :storeid="store.store_id"
										   :client_host="location.host" :client_href="location.href" 
										   :im_href="location.origin + '/im'" :ws_socket="getWssOrws() + '//' + location.host + '/ws'" id="workerman-kefu" onclick="jump()">
											{{store.store_name}}
										</a>
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="search" class="head-search-bar">
					<form class="search-form">
						<input type="hidden" value="search" id="search_act" name="act" />
						<input :placeholder="i18n.StoreTemplate.StoreTemplate1.product_keyword" name="q" id="q" type="text" class="input-text" v-model="searchValue" maxlength="60"
						 x-webkit-speech lang="zh-CN" onwebkitspeechchange="foo()" x-webkit-grammar="builtin:search" />
						<input type="button" id="button" :value="i18n.StoreTemplate.StoreTemplate1.seek" class="input-submit" @click="globalSearch()" />
					</form>
				</div>
			</div>
		</div>
		<div id="store_decoration_content" class="background" style>
			<!-- 导航栏 -->
			<div class="ncsl-nav">
				<!-- 不启用店铺装修 -->
				<!-- <div class="banner">
					<nuxt-link :to="{name:'store'}" class="img">
						<img :src="store.store_banner" alt="邮汇·派" title="邮汇·派" class="pngFix" style="height: 100%;width: 100%" />
					</nuxt-link>
				</div> -->
				<div id="nav" class="ncs-nav">
					<ul>
						<li :class="bool==0 ? 'active' : ''">
							<span @click="all_shop(0)" class="shoptab">
								{{i18n.StoreTemplate.StoreTemplate1.shop_home}}
								<i></i>
							</span>
						</li>
						<li :class="bool==1 ? 'active' : ''">
							<span @click="all_shop(1)" class="shoptab">
								{{i18n.StoreTemplate.StoreTemplate1.shop_dynamic}}
								<i></i>
							</span>
						</li>
						<li :class="cat_id == item.cat_id ? 'active' : ''" v-for="item in storeCommodityData" :key="item.cat_id">
							<span @click="cat_shop(item)" class="shoptab">
								{{item.cat_name}}
								<i></i>
							</span>
						</li>
						<li :class="sn_id == item.sn_id ? 'active' : ''" v-for="item in storeCommodityDatas" :key="item.sn_id">
							<span @click="sn_shop(item)" class="shoptab">
								{{item.sn_title}}
								<i></i>
							</span>
						</li>
					</ul>
				</div>
				<div class="flexslider">
					<!-- 轮播 -->
					<el-carousel indicator-position="outside">
						<el-carousel-item v-for="(item,index) in byPicture" :key="index">
							<img style="width:100%;height:100%;" :src="item" alt />
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>

			<!-- 内容1 店铺首页-->
			<div class="wrapper mt10" v-if="bool==0">
				<div class="ncs-main">
					
					<div class="ncs-main-container">
						<div class="title">
							<span>
								<!-- <em class="more" @click="evenMore({is_recommend:1})">{{i18n.StoreTemplate.StoreTemplate1.more}}</em> -->
								<em class="more" @click="evenMore()">{{i18n.StoreTemplate.StoreTemplate1.more}}</em>
							</span>
							<h4>{{i18n.StoreTemplate.StoreTemplate1.recommend_commodity}}</h4>
						</div>
						<div class="content ncs-goods-list">
							<ul>
								<li v-for="(item,index) in recommendGoods" :key="item.store_id">
									<dl>
										<dt>
											<nuxt-link class="goods-thumb" target="_blank" :title="item.goods_name" :to="{name:'goodsInfo',query:{id:item.goods_id}}">
												<img :src="item.original_img" :alt="item.goods_name" />
											</nuxt-link>
											<!-- </a> -->
											<ul class="goods-thumb-scroll-show">
												<li v-for="(commit,sexIndex) in item.goods_images" :key="commit.img_id" :class="commit.bool ? 'selected' : ''"
												 @mouseover="tabImg(commit,sexIndex,index)">
													<a href="javascript:void(0); rel=0">
														<img :src="commit.image_url" />
													</a>
												</li>
											</ul>
										</dt>
										<dd class="goods-name">
											<nuxt-link target="_blank" :to="{name:'goodsInfo',query:{id:item.goods_id}}">{{item.goods_name}}</nuxt-link>
										</dd>
										<dd class="goods-info">
											<span class="price">
												<i>{{i18nCommon.symbol}}</i>
												{{Number(item.shop_price).toFixed(2)}}
											</span>
											<span class="goods-sold">
												{{i18n.StoreTemplate.StoreTemplate1.sold_out}}：
												<strong>{{item.collect_sum}}</strong> {{i18n.StoreTemplate.StoreTemplate1.piece}}
											</span>
										</dd>
									</dl>
								</li>
							</ul>
						</div>
					</div>
					<div class="ncs-main-container">
						<div class="title">
							<span>
								<em class="more" @click="evenMore({is_new: 1})">{{i18n.StoreTemplate.StoreTemplate1.more}}</em>
							</span>
							<h4>{{i18n.StoreTemplate.StoreTemplate1.new_product}}</h4>
						</div>
						<div class="content ncs-goods-list">
							<ul>
								<li v-for="(item,index) in newGoods" :key="item.goods_id">
									<dl>
										<dt>
											<nuxt-link target="_blank" class="goods-thumb" :to="{name:'goodsInfo',query:{id:item.goods_id}}">
												<img :src="item.original_img" :alt="item.goods_name" />
											</nuxt-link>
											<!-- </a> -->
											<ul class="goods-thumb-scroll-show">
												<li :class="commit.bool ? 'selected' : ''" v-for="(commit,sexIndex) in item.goods_images" :key="commit.img_id"
												 @mouseover="newtabImg(commit,sexIndex,index)">
													<a href="javascript:void(0); rel=0">
														<img :src="commit.image_url" />
													</a>
												</li>
											</ul>
										</dt>
										<dd class="goods-name">
											<nuxt-link target="_blank" :title="item.goods_name" :to="{name:'goodsInfo',query:{id:item.goods_id}}">{{item.goods_name}}</nuxt-link>
											<!-- </a> -->
										</dd>
										<dd class="goods-info">
											<span class="price">
												<i>{{i18nCommon.symbol}}</i>
												{{Number(item.shop_price).toFixed(2)}}
											</span>
											<span class="goods-sold">
												{{i18n.StoreTemplate.StoreTemplate1.sold_out}}：
												<strong>{{item.collect_sum}}</strong> {{i18n.StoreTemplate.StoreTemplate1.piece}}
											</span>
										</dd>
									</dl>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="ncs-sidebar">
					<div class="ncs-sidebar-container ncs-class-bar">
						<div class="title">
							<h4>{{i18n.StoreTemplate.StoreTemplate1.goods_category}}</h4>
						</div>
						<div class="content">
							<p>
								<span @click="goodsCategory(0,'1')">
									<em>{{i18n.StoreTemplate.StoreTemplate1.new_product}}</em>
								</span>
								<span @click="goodsCategory(1,'shop_price')">
									<em>{{i18n.StoreTemplate.StoreTemplate1.price}}</em>
								</span>
								<span @click="goodsCategory(2,'sales_sum')">
									<em>{{i18n.StoreTemplate.StoreTemplate1.sales_volume}}</em>
								</span>
								<span @click="goodsCategory(4,'comment_count')">
									<em>{{i18n.StoreTemplate.StoreTemplate1.moods}}</em>
								</span>
							</p>
							<div class="ncs-search">
								<form id name="searchShop" style="display: flex;">
									<!-- <input type="hidden" name="store_id" value="2" /> -->
									<input type="text" class="text w120" name="keyword" v-model="seekValue" :placeholder="i18n.StoreTemplate.StoreTemplate1.search_good" />
									<!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
									<el-button type="warning" size="mini" @click="seek(i18n.StoreTemplate.StoreTemplate1.all)">{{i18n.StoreTemplate.StoreTemplate1.seek}}</el-button>
									<!-- <span class="ncs-btn"></span> -->
									<!-- <a href="javascript:document.searchShop.submit();" class="ncs-btn">搜索</a> -->
								</form>
							</div>
							<el-tree :data="storeGoodsClass" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false"></el-tree>
						</div>
					</div>

					<div class="ncs-sidebar-container ncs-top-bar">
						<div class="title">
							<h4>{{i18n.StoreTemplate.StoreTemplate1.commodity_list}}</h4>
						</div>
						<div class="content">
							<ul class="ncs-top-tab pngFix">
								<li id="hot_sales_tab" :class="seen ==0 ? 'current' :''">
									<a href="#" @mouseenter="enter(0)" @click="enterSeen(2,'sales_sum')">{{i18n.StoreTemplate.StoreTemplate1.hotcommodity_list}}</a>
								</li>
								<li id="hot_collect_tab" :class="seen ==1 ? 'current' :''">
									<a href="#" @mouseenter="enter(1)" @click="enterSeen(3,'collect_sum')">{{i18n.StoreTemplate.StoreTemplate1.collectcommodity_list}}</a>
								</li>
							</ul>
							<div id="hot_sales_list" class="ncs-top-panel">
								<ol v-if="seen == 0">
									<li v-for="goods in salesGoods" :key="goods.goods_id">
										<dl>
											<dt>
												<nuxt-link :to="{name:'goodsInfo',query:{id:goods.goods_id}}">{{goods.goods_name}}</nuxt-link>
											</dt>
											<dd class="goods-pic">
												<nuxt-link :to="{name:'goodsInfo',query:{id:goods.goods_id}}">
													<span class="thumb size40">
														<i></i>
														<img :src="apiHead + '/mall/goods/thumb_image?width=40&height=40&goods_id=' + goods.goods_id" />
													</span>
												</nuxt-link>
												<!-- </a> -->
												<p>
													<span class="thumb size100" style="width:100px;height:100px;">
														<i></i>
														<img :src="goods.original_img" style="width: 100%;height: 100%;"
														 :title="goods.goods_name" width="100" height="100" />
														<big></big>
														<small></small>
													</span>
												</p>
											</dd>
											<dd class="price pngFix">{{goods.shop_price}}</dd>
											<dd class="selled pngFix">
												{{i18n.StoreTemplate.StoreTemplate1.sale}}：
												<strong>{{goods.sales_sum}}</strong>{{i18n.StoreTemplate.StoreTemplate1.write}}
											</dd>
										</dl>
									</li>
								</ol>
								<ol v-if="seen == 1">
									<li v-for="goods in collectGoods" :key="goods.goods_id">
										<dl>
											<dt>
												<nuxt-link :to="{name:'goodsInfo',query:{id:goods.goods_id}}">{{goods.goods_name}}</nuxt-link>
												<!-- </a> -->
											</dt>
											<dd class="goods-pic">
												<nuxt-link :to="{name:'goodsInfo',query:{id:goods.goods_id}}">
													<span class="thumb size40">
														<i></i>
														<img :src="apiHead + '/mall/goods/thumb_image?width=40&height=40&goods_id=' + goods.goods_id" />
													</span>
												</nuxt-link>
												<!-- </a> -->
												<p>
													<span class="thumb size100" style="width:100px;height:100px;">
														<i></i>
														<img :src="goods.original_img" style="width: 100%;height: 100%;"
														 :title="goods.goods_name" width="100" height="100" />
														<big></big>
														<small></small>
													</span>
												</p>
											</dd>
											<dd class="price pngFix">9.90</dd>
											<dd class="collection pngFix">
												{{i18n.StoreTemplate.StoreTemplate1.collected_count}}：
												<strong>{{goods.collect_sum}}</strong>
											</dd>
										</dl>
									</li>
								</ol>
							</div>
							<p>
								<span @click="viewOtherProducts()">{{i18n.StoreTemplate.StoreTemplate1.look_store}}</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 内容2 店铺动态-->
			<div class="cms-sns" v-else-if="bool==1">
				<div class="cms-sns-left">
					<div class="cms-sns-tabmene">
						<ul>
							<li>
								<span @click="dynamic({},0)" id="all" :class="dynamicType == 0 ? 'selected' : ''">
									{{i18n.StoreTemplate.StoreTemplate1.all_dynamic}}
									<i></i>
								</span>
							</li>
							<li>
								<span @click="dynamic({prom_type: 3},1)" id="prom" :class="dynamicType == 1 ? 'selected' : ''">
									{{i18n.StoreTemplate.StoreTemplate1.promotion}}
									<i></i>
								</span>
							</li>
							<li>
								<span @click="dynamic({is_new: 1},2)" id="is_new" :class="dynamicType == 2 ? 'selected' : ''">
									{{i18n.StoreTemplate.StoreTemplate1.new_product}}
									<i></i>
								</span>
							</li>
							<li>
								<span @click="dynamic({is_hot: 1},3)" id="is_hot" :class="dynamicType == 3 ? 'selected' : ''">
									{{i18n.StoreTemplate.StoreTemplate1.hot_sale}}
									<i></i>
								</span>
							</li>
							<li>
								<span @click="dynamic({is_recommend: 1},4)" id="is_recommend" :class="dynamicType == 4 ? 'selected' : ''">
									{{i18n.StoreTemplate.StoreTemplate1.landlord_recommend}}
									<i></i>
								</span>
							</li>
						</ul>
					</div>

					<div class="cms-sns-content">
						<ul class="cms-sns-content-list">
							<li nc_type="tracerow_4" v-for="item in storeData" :key="item.goods_id">
								<dl>
									<dt>
										<h5 style="width:250px;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.goods_remark}}</h5>
									</dt>
									<dd>
										<div class="fd-media">
											<div class="goodsimg">
												<nuxt-link :to="{ name:'goodsInfo' , query:{id:item.goods_id}}" target="_blank">
													<img :src="item.original_img" alt width="120" height="120" />
												</nuxt-link>
											</div>
											<div class="goodsinfo">
												<dl>
													<dt>
														<nuxt-link :to="{ name:'goodsInfo' , query:{id:item.goods_id}}" target="_blank" style="display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
															{{item.goods_name}}</nuxt-link>
													</dt>
													<dd>{{i18n.StoreTemplate.StoreTemplate1.price}}：{{i18nCommon.symbol}}{{Number(item.market_price).toFixed(2)}}</dd>
													<dd>{{i18n.StoreTemplate.StoreTemplate1.market_price}}：{{i18nCommon.symbol}}{{Number(item.shop_price).toFixed(2)}}</dd>
													<dd nctype="collectbtn_232">
														<span @click="collect_goods(item)">{{i18n.StoreTemplate.StoreTemplate1.collect_treasure}}</span>
													</dd>
												</dl>
											</div>
										</div>
									</dd>
									<dd>
										<span class="goods-time fl">{{item.on_time_desc}}</span>
									</dd>
									<dd>
										<!-- 评论模块start -->
										<div id="tracereply_4" style="display:none;"></div>
										<!-- 评论模块end -->
										<!-- 转发模块start -->
										<div id="forward_4" style="display:none;">
											<div class="forward-widget">
												<ul class="forward-list"></ul>
											</div>
										</div>
										<!-- 转发模块end -->
										<div class="clear"></div>
									</dd>
								</dl>
							</li>
						</ul>
						<!-- 分页 -->
						<div class="paging" style="paddimg:10px 0px;">
							<div class="block">
								<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
								 :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
							</div>
						</div>
					</div>
					<!-- 表情弹出层 -->
					<div id="smilies_div" class="smilies-module"></div>
				</div>
				<div class="cms-sns-right">
					<div class="cms-sns-right-container">
						<div class="cms-store-pic">
							<nuxt-link :to="{name:'store',query:{id:store.store_id}}">
								<img :src="store.store_logo" />
							</nuxt-link>
						</div>
						<dl class="cms-store-info">
							<dt>{{store.store_name}}</dt>
							<dd>
								{{i18n.StoreTemplate.StoreTemplate1.havealready_collected}}：
								<em nctype="store_collect">{{store.store_collect}}</em>
							</dd>
						</dl>
						<div class="cms-store-favorites">
							<!-- <a href="javascript:collect_store('2')">
              </a>-->
							<span @click="addFavoriteStores()">
								<i class="icon-plus"></i>{{i18n.StoreTemplate.StoreTemplate1.favorite_stores}}
							</span>
						</div>
					</div>
					<div class="cms-sns-right-container">
						<div class="title">{{i18n.StoreTemplate.StoreTemplate1.latest_favorites}}</div>
						<div class="cms-favorites-user">
							<ul>
								<li v-for="item in collectUser" :key="item.user_id">
									<a>
										<img :alt="item.store_name" :title="item.store_name" :src="item.head_pic" />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 商品分类1内容 -->
			<div class="wrapper mt10" v-else-if="bool==2">
				<div class="ncs-main-container">
					<div class="title">
						<h4>{{tabName}}</h4>
					</div>
					<div class="ncs-goodslist-bar">
						<ul class="ncs-array">
							<li :class="typeClass == 5 ? 'selected':''">
								<em class="asc" @click="tabGenre(5,'5','')">全部</em>
							</li>
							<li :class="typeClass == 0 ? 'selected':''">
								<em class="asc" @click="tabGenre(0,'0',{is_new:1})">{{i18n.StoreTemplate.StoreTemplate1.new_product}}</em>
							</li>
							<li v-for="(item,index) in currentType" :key="item.typeId" :class="typeClass == index+1 ? 'selected':''">
								<em @click="tabGenre((index+1),'',item)">{{item.typeName}}</em>
								<span>
									<i class="el-icon-caret-top" :class="item.boolClassw ? 'seleactive' :''" @click="tabGenre((index+1),'boolClassw',item)"></i>
									<i class="el-icon-caret-bottom" :class="item.boolClasst ? 'seleactive' :''" @click="tabGenre((index+1),'boolClasst',item)"></i>
								</span>
							</li>
						</ul>
						<div class="ncs-search">
							<form id name="searchShop" style="display: flex;">
								<input type="text" class="text w120" name="keyword" v-model="seekValue" id="keyword" :placeholder="i18n.StoreTemplate.StoreTemplate1.search_good" style="color: rgb(153, 153, 153);" />
								<el-button type="warning" size="mini" @click="seek()">{{i18n.StoreTemplate.StoreTemplate1.seek}}</el-button>
							</form>
						</div>
					</div>
					<div class="content ncs-all-goods-list mb15">
						<ul>
							<li v-for="item in storeData" :key="item.goods_id">
								<dl>
									<dt>
										<nuxt-link class="goods-thumb" target="_blank" :to="{name:'goodsInfo',query:{id:item.goods_id}}">
											<img :src="item.original_img" :alt="item.goods_name" />
										</nuxt-link>
										<!-- </a> -->
										<ul class="goods-thumb-scroll-show">
											<li :class="commit.bool ? 'selected' : ''" @mouseover="tabContentimg(commit,sexIndex,index)" v-for="(commit,sexIndex) in item.goods_images"
											 :key="commit.img_id">
												<a href="javascript:void(0); rel=0">
													<img :src="commit.image_url" />
												</a>
											</li>
										</ul>
									</dt>
									<dd class="goods-name">
										<nuxt-link :title="item.goods_name" target="_blank" :to="{name:'goodsInfo',query:{id:item.goods_id}}">{{item.goods_name}}</nuxt-link>
										<!-- </a> -->
									</dd>
									<dd class="goods-info">
										<span class="price">{{i18nCommon.symbol}} {{Number(item.shop_price).toFixed(2)}}</span>
										<span class="goods-sold">
											{{i18n.StoreTemplate.StoreTemplate1.sale}}：
											<strong>{{item.collect_sum}}</strong> {{i18n.StoreTemplate.StoreTemplate1.piece}}
										</span>
									</dd>
									<dd class="goods-promotion">
										<span>{{item.prom_type_detail}}</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
				<!-- 分页 -->
				<div class="paging">
					<div class="block">
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
						 :page-sizes="[5, 10, 15, 20]" :page-size="handleSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
					</div>
				</div>
				<div class="clear">&nbsp;</div>
			</div>

			<!-- 商品分类2内容-->
			<div class="wrapper" v-else-if="bool==3">
				<div class="ncs-article">
					<div class="ncs-main-container">
						<div class="title">
							<h4>{{tabName}}</h4>
						</div>
						<div class="content">
							<div class="default">
								<div v-html="storeContent.sn_content"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="clear">&nbsp;</div>
		</div>
	</div>
</template>

<script>
	import TopBar from "@/components/TopBar/index3.vue";
	import {loadImJs,getWssOrws} from "@/utils/asyncLoadJs"
	let loadedMineMapJs = false;//是否加载完im的js
	import {
		getStore,
		getStoreGoodsClassTree,
		getGoods,
		getStoreGoodsClassList,
		getstoreCommodityClassifyw,
		getstoreCommodityClassifyt,
		getRegionList,
		getcollectUser,
		getaddFavoriteStores,
		addGoodsCollection,
	} from "@/utils/api.js";
	import {
		getUser
	} from "@/utils/auth.js";
	export default {
		name:"StoreTemplate-1",
		props:{
			id:{
				default:0,
				type:[Number,String]
			}
		},
		data() {
			return {
				user: getUser(), //用户信息
				seekValue: "", //搜索的值
				seen: 0,
				bool: 0,
				b: false,
				store_id: this.id,
				cat_id: 0, //商品分类1id
				sn_id: 0, //商品分类2id
				currentType: [{
						typeName: "价格",
						boolClassw: false,
						boolClasst: false,
						typeId: 1,
						type: "shop_price",
					},
					{
						typeName: "销量",
						boolClassw: false,
						boolClasst: false,
						typeId: 2,
						type: "sales_sum",
					},
					{
						typeName: "收藏",
						boolClassw: false,
						boolClasst: false,
						typeId: 3,
						type: "collect_sum",
					},
					{
						typeName: "人气",
						boolClassw: false,
						boolClasst: false,
						typeId: 4,
						type: "comment_count",
					},
				], //内容1分类
				typeClass: 5, //内容1分类类名切换
				store: {},
				storeGoodsClass: [],
				parent_id: 0,
				recommendGoods: [], //推荐商品
				newGoods: [], //新品
				salesGoods: [], //热销商品
				collectGoods: [], //收藏商品
				defaultProps: {
					children: "children",
					label: "cat_name",
				},
				storeCommodityData: [], //店铺商品分类1
				storeCommodityDatas: [], //店铺商品分类2
				byPicture: [], //轮播图片
				storeData: [], //商品分类数据
				currentPage: 1, //初始页面为1
				pageSize: 10, //默认数据条
				handleSize: 10, //当页面几条数据
				handleCurrent: 1, //第几页
				total: 0, //总共多少条数据
				storeId: {}, //店铺分类传递的id
				tabName: "全部商品", //导航标题
				dynamicType: 0, //店铺类名动态切换
				regionList: [],
				storeGoods: [],
				storeContent: {}, //商品分类2的数据
				collectUser: [], //店铺动态收藏用户
				dynamicStateId: {}, //店铺动态传递下来的参数
				currentStateId: {}, //内容1导航栏传递的参数
				searchValue: "", //全局搜索
				location:window.location,
				im_choose: this.$store.state.shop_basic.im_choose,
			};
		},
		components: {
			TopBar,
		},
		computed: {
			i18n () {
				this.currentType[0].typeName = this.$t('components.StoreTemplate.StoreTemplate2.price') 
				this.currentType[1].typeName = this.$t('components.StoreTemplate.StoreTemplate2.sales_volume') 
				this.currentType[2].typeName = this.$t('components.StoreTemplate.StoreTemplate2.collect') 
				this.currentType[3].typeName = this.$t('components.StoreTemplate.StoreTemplate2.moods') 
				this.tabName = this.$t('components.StoreTemplate.StoreTemplate1.category') 
				return this.$t('components')  
			},
			i18nCommon(){
				return this.$t("common")
			}
		},
		methods: {
			//全局搜索
			globalSearch() {
				// this.searchValue
				this.$router.push({
					name: "goodsList"
				});
			},
			//店铺搜索
			seek(sig) {
				var _this = this
				this.currentPage = 1;
				this.bool = 2;
				var form = {
					store_id: this.store_id,
					goods_name: this.seekValue,
					p: this.currentPage,
					size: this.handleSize
				};
				if (sig == "") {
					form.cat_id = this.storeId.cat_id;
				} else {
					this.tabName = _this.i18n.StoreTemplate.StoreTemplate1.category;
				}
				this.cat_getGoods(form);
			},
			//收藏该宝贝
			collect_goods(row) {
				addGoodsCollection(row.goods_id).then((res) => {
					var arue = {};
					if (res.status == 1) {
						arue = {
							message: res.msg,
							type: "success",
						};
					} else {
						arue = {
							message: res.msg,
							type: "warning",
						};
					}
					this.$message(arue);
				});
			},
			//收藏店铺
			addFavoriteStores() {
				var _this = this
				getaddFavoriteStores(this.store_id).then((res) => {
					var arue = {};
					if (res.status == 1) {
						arue = {
							message: _this.i18n.StoreTemplate.StoreTemplate1.favorite_stores + res.msg,
							type: "success",
						};
					} else {
						arue = {
							message: res.msg,
							type: "warning",
						};
					}
					this.$message(arue);
				});
			},
			//查看其它商品
			viewOtherProducts() {
				this.removeGenrecalss();
				this.typeClass = 0;
				this.currentPage = 1;
				this.currentStateId = {
					is_new: 1
				};
				var form = {
					store_id: this.store_id,
					is_new: 1,
					p: this.currentPage,
					size: this.handleSize,
					order_by: "seller_sort"
				};
				this.bool = 2;
				this.tabName = this.i18n.StoreTemplate.StoreTemplate1.category;
				this.cat_getGoods(form);
			},
			//更多
			evenMore(obj) {
				this.removeGenrecalss();
				this.tabName = this.i18n.StoreTemplate.StoreTemplate1.category;
				this.currentPage = 1;
				this.typeClass = -1;
				this.bool = 2;
				var form = obj;
				form.store_id = this.store_id;
				form.order_by = "seller_sort";
				form.p = this.currentPage;
				form.size = this.handleSize;
				this.cat_getGoods(form);
			},
			//首页商品分类
			goodsCategory(i, sig) {
				this.currentPage = 1;
				var form = {
					store_id: this.store_id
				};
				if (sig == "1") {
					form.is_new = sig;
				} else {
					this.currentType[i - 1].boolClasst = true;
					form.order_by = sig;
				}
				form.p = this.currentPage;
				form.size = this.handleSize;
				this.bool = 2;
				this.tabName = this.i18n.StoreTemplate.StoreTemplate1.category;
				this.typeClass = i;
				this.cat_getGoods(form);
			},
			// 商品分类类名清除
			removeGenrecalss() {
				for (var i = 0; i < this.currentType.length; i++) {
					this.currentType[i].boolClassw = false;
					this.currentType[i].boolClasst = false;
				}
			},
			//内容1分类切换
			tabGenre(index, sig, row) {
				this.typeClass = index;
				this.removeGenrecalss();
				this.currentPage = 1;
				var form = {
					store_id: this.store_id,
				};
				form.store_cat_id = this.cat_id;
				if (row.type != undefined) {
					form.order_by = row.type;
					this.currentStateId = {
						order_by: row.type
					};
				} else {
					form.is_new = row.is_new;
					this.currentStateId = {
						is_new: row.is_new
					};
				}
				console.log(sig);
				if (sig == "") {
					this.currentType[index - 1].boolClasst = true;
				} else if (sig == "boolClassw") {
					this.currentType[index - 1].boolClassw = true;
					form.sort = "asc";
				} else if (sig == "boolClasst") {
					this.currentType[index - 1].boolClasst = true;
					form.sort = "desc";
				}
				form.p = this.currentPage;
				form.size = this.handleSize;
				this.cat_getGoods(form);
			},
			//推荐商品图片切换
			tabImg(row, sexIndex, index) {
				for (var i = 0; i < this.recommendGoods[index].goods_images.length; i++) {
					this.recommendGoods[index].goods_images[i].bool = false;
				}
				this.recommendGoods[index].goods_images[sexIndex].bool = true;
				this.recommendGoods[index].original_img = this.recommendGoods[
					index
				].goods_images[sexIndex].image_url;
			},
			newtabImg(row, sexIndex, index) {
				for (var i = 0; i < this.newGoods[index].goods_images.length; i++) {
					this.newGoods[index].goods_images[i].bool = false;
				}
				this.newGoods[index].goods_images[sexIndex].bool = true;
				this.newGoods[index].original_img = this.newGoods[index].goods_images[
					sexIndex
				].image_url;
			},
			tabContentimg(row, sexIndex, index) {
				for (var i = 0; i < this.storeData[index].goods_images.length; i++) {
					this.storeData[index].goods_images[i].bool = false;
				}
				this.storeData[index].goods_images[sexIndex].bool = true;
				this.storeData[index].original_img = this.storeData[index].goods_images[
					sexIndex
				].image_url;
			},
			// 店铺动态切换
			dynamic(form, i) {
				this.currentPage = 1;
				this.dynamicType = i;
				this.typeClass = 0;
				this.removeGenrecalss();
				this.dynamicStateId = form;
				form.store_id = this.store_id;
				form.p = this.currentPage;
				form.size = this.handleSize;
				this.cat_getGoods(form);
			},
			all_shop(i) {
				this.sn_id = 0;
				this.cat_id = 0;
				this.bool = i;
				this.storeId = {
					store_id: this.store_id,
					order_by: "seller_sort"
				};
				this.cat_getGoods(this.storeId);
			},
			// 商品分类1切换
			cat_shop(item) {
				this.sn_id = 0;
				if (item.cat_id != undefined) {
					this.bool = 2;
					this.cat_id = item.cat_id;
				}
				this.removeGenrecalss();
				this.typeClass = 0;
				this.currentPage = 1;
				this.dynamicType = 0;
				this.storeId.p = this.currentPage;
				this.storeId.size = this.handleSize;
				//this.storeId.is_new = 1;
				this.tabName = item.cat_name;
				this.storeId.store_id = item.store_id;
				this.storeId.store_cat_id = item.cat_id;
				this.cat_getGoods(this.storeId);
			},
			// 商品分类2切换
			sn_shop(item) {
				this.cat_id = 0;
				if (item.sn_id != undefined) {
					this.bool = 3;
					this.sn_id = item.sn_id;
				}
				// this.storeId = data;
				this.tabName = item.sn_title;
				this.sn_getGoods(item);
			},
			// 商品切换1的数据
			cat_getGoods(params) {
				getGoods(params).then((res) => {
					this.storeData = res.records;
					for (var i = 0; i < this.storeData.length; i++) {
						if (this.storeData[i].goods_images != undefined) {
							for (var j = 0; j < this.storeData[i].goods_images.length; j++) {
								this.storeData[i].goods_images[j].bool = false;
							}
							this.storeData[i].goods_images[0].bool = true;
						}
					}
					this.total = res.total;
				});
			},
			// 商品切换2的数据
			sn_getGoods(params) {
				getstoreCommodityClassifyt(params).then((res) => {
					this.storeContent = res;
				});
			},
			// 切换每页多少条数据
			handleSizeChange(val) {
				this.handleSize = val;
				if (this.bool == 1) {
					this.storeId = {
						store_cat_id: this.storeId.cat_id,
						...this.dynamicStateId,
						store_id: this.store_id,
					};
				} else if (this.bool == 2) {
					this.storeId = {
						store_cat_id: this.storeId.cat_id,
						...this.currentStateId,
						store_id: this.store_id,
						//goods_name: this.seekValue,
						store_cat_id: this.cat_id,
					};
				}
				this.storeId.p = this.currentPage;
				this.storeId.size = this.handleSize;
				this.cat_getGoods(this.storeId);


				///
			},
			// 跳转到第几页
			handleCurrentChange(val) {
				this.currentPage = val;
				if (this.bool == 1) {
					this.storeId = {
						cat_id: this.storeId.cat_id,
						...this.dynamicStateId,
						store_id: this.store_id,
					};
				} else if (this.bool == 2) {
					this.storeId = {
						cat_id: this.storeId.cat_id,
						...this.currentStateId,
						store_id: this.store_id,
						cat_id: this.cat_id,
						//goods_name: this.seekValue,
					};
				}
				this.storeId.p = this.currentPage;
				this.storeId.size = this.handleSize;
				this.cat_getGoods(this.storeId);
			},
			//商品排行乐销
			enterSeen(id, type) {
				this.removeGenrecalss();
				this.tabName = this.i18n.StoreTemplate.StoreTemplate1.category;
				this.typeClass = id;
				this.currentPage = 1;
				this.currentType[id - 1].boolClasst = true;
				this.bool = 2;
				var form = {
					order_by: type,
					store_id: this.store_id,
					p: this.currentPage,
					size: this.handleSize,
				};
				this.cat_getGoods(form);
			},
			enter(val) {
				this.seen = val;
			},
			getStore() {
				//获取店铺信息
				getStore({
					store_id: this.store_id,
				}).then((res) => {
					this.store = res;
					console.log(this.store)
					if(this.store.store_slide){
						this.byPicture = this.store.store_slide.split(",");
					}
					
					this.$nextTick(function() {
						this.createMap();
					});
				});
			},
			getStoreGoodsClass() {
				//获取商品分类列表
				getStoreGoodsClassTree({
					store_id: this.store_id,
				}).then((res) => {
					this.storeGoodsClass = res;
				});
			},
			getGoodsList() {
				//获取推荐商品
				getGoods({
					store_id: this.store_id,
					is_recommend_seller: 1,
					size: 12,
				}).then((res) => {
					this.recommendGoods = res.records;
					for (var i = 0; i < this.recommendGoods.length; i++) {
						if (this.recommendGoods[i].goods_images != undefined) {
							for (
								var j = 0; j < this.recommendGoods[i].goods_images.length; j++
							) {
								this.recommendGoods[i].goods_images[j].bool = false;
							}
							this.recommendGoods[i].goods_images[0].bool = true;
						}
					}
				});
				//获取新品商品
				getGoods({
					store_id: this.store_id,
					// is_new_seller: 1,
					store_cat_id: 0,
					is_new: 1,
					size: 4,
				}).then((res) => {
					this.newGoods = res.records;
					for (var i = 0; i < this.newGoods.length; i++) {
						if (this.newGoods[i].goods_images != undefined) {
							for (var j = 0; j < this.newGoods[i].goods_images.length; j++) {
								this.newGoods[i].goods_images[j].bool = false;
							}
							this.newGoods[i].goods_images[0].bool = true;
						}
					}
				});
				//热销商品排行
				getGoods({
					store_id: this.store_id,
					order_by: "sales_sum",
					size: 10,
					asc: false,
				}).then((res) => {
					this.salesGoods = res.records;
				});
				//收藏商品排行
				getGoods({
					store_id: this.store_id,
					order_by: "collect_sum",
					size: 10,
					asc: false,
				}).then((res) => {
					this.collectGoods = res.records;
				});
			},
			//店铺商品分类
			storeGoodsClassList() {
				var params = {
					is_nav_show: 1,
					store_id: this.store_id,
				};
				var data = {
					is_show: 1,
					store_id: this.store_id,
				};
				getStoreGoodsClassList(params)
					.then((res) => {
						this.storeCommodityData = res;
					})
					.then(() => {
						getstoreCommodityClassifyw(data).then((res) => {
							this.storeCommodityDatas = res;
						});
					});
			},
			isImOn(){
				if(typeof(this.im_choose) != "undefined"  && this.im_choose == 1){
					return true
				}else{
					return false
				}
			},
			getWssOrws(){
				return getWssOrws()
			},
			collectUsers() {
				var data = {
					store_id: this.store_id,
					limit: 10,
				};
				getcollectUser(data).then((res) => {
					this.collectUser = res;
				});
			},
			handleNodeClick(data) {
				this.removeGenrecalss();
				this.cat_id = data.cat_id;
				this.typeClass = 5;
				this.currentPage = 1;
				this.dynamicType = 0;
				this.tabName = data.cat_name;
				this.storeId.p = this.currentPage;
				this.storeId.size = this.handleSize;
				this.storeId.store_cat_id = data.cat_id;
				this.bool = 2;
				this.cat_getGoods(this.storeId);
			},
			//地图渲染
			createMap() {
				// 创建Map实例
				var map = new BMap.Map("map_container");
				// 初始化地图,设置中心点坐标和地图级别
				map.centerAndZoom(
					new BMap.Point(this.store.longitude, this.store.latitude),
					11
				);
				//添加地图类型控件
				map.addControl(
					new BMap.MapTypeControl({
						mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
					})
				);
				//设置标注的图标
				var icon = new BMap.Icon(
					"../../static/images/markers_new2_7621a9c.png",
					new BMap.Size(100, 100)
				);
				//设置标注的经纬度
				var marker = new BMap.Marker(
					new BMap.Point(this.store.longitude, this.store.latitude), {
						icon: icon
					}
				);
				//把标注添加到地图上
				map.addOverlay(marker);
				// 设置地图显示的城市 此项是必须设置的
				map.setCurrentCity(this.store.store_name);
				//开启鼠标滚轮缩放
				map.enableScrollWheelZoom(true);
			},
		},
		created() {
			this.getStore();
			this.getStoreGoodsClass();
			this.getGoodsList();
			this.storeGoodsClassList();
			this.collectUsers();
			var params = {
				store_id: this.store_id,
				p:1,
				size:10
			};
			this.cat_getGoods(params);
			this.bool = this.$route.query.bool || 0;
			if (!loadedMineMapJs && this.isImOn()) {
				loadImJs(location.origin + '/im').then(() => {
				  loadedMineMapJs = true;
				})
			}
		},
	};
</script>

<style scoped>
	@import "../../static/css/store_header.css";
	@import "../../static/css/store_base.css";
	@import "../../static/css/shop.css";

	/* 收藏该宝贝 */
	.cms-sns-content .fd-media .goodsinfo dd span {
		cursor: pointer;
		background-color: #fff;
		display: inline-block;
		border: solid 1px #ccc;
		padding: 4px 14px;
		margin-top: 5px;
		box-shadow: 2px 2px 0 rgba(204, 204, 204, 0.5);
	}

	/* 收藏店铺 */
	.cms-sns-right-container .cms-store-favorites span {
		font: normal 14px/20px "microsoft yahei";
		color: #fff;
		background-color: #5bb75b;
		text-align: center;
		vertical-align: middle;
		display: inline-block;
		height: 20px;
		padding: 7px 25px;
		border: solid 1px;
		border-color: #52a452 #52a452 #448944 #52a452;
		cursor: pointer;
		text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
	}

	.ncs-top-bar p span {
		cursor: pointer;
		line-height: 38px;
		color: #333;
		background-color: #fef4b1;
		text-align: center;
		width: 128px;
		height: 38px;
		border: solid 1px #ffd863;
		border-radius: 5px;
		display: inline-block;
		box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
	}

	.ncs-main-container .title span em {
		color: #999;
		cursor: pointer;
	}

	.ncs-class-bar p em {
		cursor: pointer;
		line-height: 16px;
		color: #777;
		padding: 2px;
	}

	.ncs-class-bar p em:hover {
		color: #fff;
		background-color: #666;
	}

	.seleactive {
		color: #f60;
	}

	.ncs-array li.selected em {
		font-weight: 700;
		color: #f60;
	}

	.ncs-array li em {
		cursor: pointer;
	}

	.ncs-array li {
		padding: 0px 20px;
	}

	.ncs-array li a {
		padding: 0px;
	}

	.ncs-array li span {
		position: absolute;
		width: 20px;
		height: 20px;
	}

	.ncs-array li span .el-icon-caret-top {
		top: -2px;
		left: 3px;
		position: absolute;
        cursor: pointer;    
	}

	.ncs-array li span .el-icon-caret-bottom {
		bottom: -2px;
		left: 3px;
		position: absolute;
        cursor: pointer;
	}

	.cms-sns-tabmene ul li span.selected {
		font-weight: 600;
	}

	.cms-sns-tabmene ul li span {
		cursor: pointer;
		color: #666;
		line-height: 20px;
		display: block;
		height: 20px;
		padding: 10px 20px;
		position: relative;
		z-index: 1;
	}

	.shoptab {
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 160px;
		color: #fff;
		float: left;
		height: 20px;
		padding: 9px 15px;
		margin-left: 4px;
		overflow: hidden;
		cursor: pointer;
	}

	.active {
		background-color: #b22d00;
		text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
	}
	>>>.el-carousel__container{
		width: 1200px;
	}
	.flexslider{
		width: 1200px;
	}
	.goods-thumb-scroll-show{
		height: 56px;
		overflow: hidden;
	}

	input[type="text"]{
		height: auto;
	}
</style>

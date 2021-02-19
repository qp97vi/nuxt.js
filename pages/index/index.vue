
<template>
	<div>
		<div class="topic-banner">
			<div class="w1224">
				<adv v-if="bool" ad_id="1"></adv>
				<i @click="isShow"></i>
			</div>
		</div>
		<top-bar></top-bar>
		<search-box :show="'block'" :sidebarShow="true"></search-box>
		<div class="bg">
			<div class="topcar">
				<el-carousel height="450px" :interval="5000">
					<el-carousel-item v-for="(item,index) in topBannerAds" :key="index">
						<div :style="'background:' + item.bgcolor" class="cabg">
							<a target="_blank" :href="item.ad_link">
								<img :src="item.ad_code" @click="edit(item)" />
							</a>
						</div>
					</el-carousel-item>
				</el-carousel>
				<div class="right-sidebar p">
					<div class="usertpshop">
						<div class="head_index">
							<nuxt-link :to="{ name: 'user_index'}" target="_blank">
								<img class="head_pic" src="@/static/images/default.png" alt v-if="!user" />
								<img class="head_pic" :src="user.head_pic" alt v-else />
							</nuxt-link>
						</div>
						<p class="welcome islogin" v-if="user">
							<img src="@/static/images/members.png" alt />&nbsp;Hi，
							<span class="userinfo">{{user.nickname}}</span>
						</p>
						<p class="welcome islogin" v-else>
							<img src="@/static/images/members.png" alt />&nbsp;Hi，
							<!-- <span class="userinfo">{{i18n.index.welcometo}}{{shop_info.store_name || i18n.index.store}}！</span> -->
						</p>
						<div class="login_index" v-if="user">
							<nuxt-link :to="{name:'user_index'}" target="_blank">{{i18n.index.member_center}}</nuxt-link>
							<nuxt-link class="islogin add_newperson" :to="{name:'login'}" target="_blank">{{i18n.index.logout}}</nuxt-link>
							<a class="islogin add_newperson" @click="quit()">{{i18n.index.logout}}</a>
						</div>
						<div class="login_index" v-else>
							<nuxt-link :to="{name:'login'}" target="_blank">{{i18n.index.pleaselog}}</nuxt-link>
							<nuxt-link class="islogin add_newperson" :to="{name:'login'}" target="_blank">{{i18n.index.couple_polite}}</nuxt-link>
						</div>
					</div>
					<div class="bulletin">
						<div class="content box_ad_content">
							<div class="gome_news">
								<h2 class="gome_news_title">{{i18n.index.flash}}</h2>
								<nuxt-link :to="{name:'article-detail'}" target="_blank">
									{{i18n.index.more}}
									<span></span>
								</nuxt-link>
							</div>
							<div class="swiper-container swiper-container30">
								<div style="transition-duration:0ms !important" class="swiper-wrapper swiper-no-swiping">
									<div class="swiper-slide">
										<div class="content-slide">
											<div class="cont4-box">
												<template v-for="(item,index) in articles">
													<nuxt-link target="_blank" :to="{path:'/article/detail',query:{id:item.article_id}}" :key="index">
														<p>{{item.title}}</p>
													</nuxt-link>
												</template>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="content box_prom_content" style="display: none"></div>
						<div class="six_entrance">
							<table border cellspacing="0" cellpadding="0">
								<tbody>
									<tr>
										<td>
											<div class="access">
												<nuxt-link :to="{name:'user-visit_log'}" target="_blank">
													<i class="mybrowse"></i>
													<span>{{i18n.index.browse}}</span>
												</nuxt-link>
											</div>
										</td>
										<td>
											<div class="access">
												<nuxt-link :to="{name:'goods_collect'}" target="_blank">
													<i class="mycollect"></i>
													<span>{{i18n.index.collect}}</span>
												</nuxt-link>
											</div>
										</td>
										<td class="lastcol">
											<div class="access">
												<nuxt-link :to="{name:'order_list'}" target="_blank">
													<i class="myorders"></i>
													<span>{{i18n.index.indent}}</span>
												</nuxt-link>
											</div>
										</td>
									</tr>
									<tr class="lastcow">
										<td>
											<div class="access">
												<nuxt-link :to="{name:'safety_settings'}" target="_blank">
													<i class="account_security"></i>
													<span>{{i18n.index.account_security}}</span>
												</nuxt-link>
											</div>
										</td>
										<td>
											<div class="access">
												<nuxt-link :to="{name:'recharge'}" target="_blank">
													<i class="myshares"></i>
													<span>{{i18n.index.balance}}</span>
												</nuxt-link>
											</div>
										</td>
										<td class="lastcol">
											<div class="access">
												<nuxt-link :to="{name:'newjoin'}" target="_blank">
													<i class="seller_enter"></i>
													<span>{{i18n.index.merchant_enter}}</span>
												</nuxt-link>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="fn-mall p ma-to-20">
				<div class="w1224">
					<div class="wbox gm_guess" v-if="$store.state.shop_config && $store.state.shop_config.index_format_pc == '1'">
						<div class="top">
							<!-- <nuxt-link :to="{name:'visit_log'}">
								<p>精品推荐</p>
								<span>甄选优质好物</span>
							</nuxt-link> -->
						</div>
						<div class="guess_main" style="display: flex; height: 356px;">
							<!-- <div class="cont1-box"> -->
							<adv ad_id="20" style="width: 200px;"></adv>
							<!-- <img :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=1281'" alt=""> -->
							<!-- </div> -->
							<el-carousel indicator-position="none" style="width: 1024px; float: right;">
								<el-carousel-item v-for="(page,pageIndex) in Math.ceil(recommendGoodsListSize / 5)" :key="pageIndex">
									<ul style="width: 1024px;height: 356px;">
										<template v-for="(item,index) in recommendGoodsList">
											<li v-if="Math.floor(index / 5) == pageIndex" :key="index" style="width: 20%;">
												<nuxt-link :to="{ name: 'goods/goodsInfo/id', query:{id:item.goods_id}}" style="height: 100%;">
													<img :src="apiHead + '/mall/goods/thumb_image?width=500&height=500&goods_id=' + item.goods_id" />
													<p class="guess_title">{{item.goods_name}}</p>
													<p class="guess_price">
														<span class="yuan">{{i18nCommon.symbol}}</span>{{item.shop_price.toFixed(2)}}
													</p>
												</nuxt-link>
											</li>
										</template>
									</ul>
								</el-carousel-item>
							</el-carousel>
						</div>
					</div>
					<!--好货上新-->
					<div class="guess_main" style="display: flex; margin-top: 20px; height: 356px;" v-if="$store.state.shop_config && $store.state.shop_config.index_format_pc == '1'">
						<!-- <div class="cont1-box"> -->
						<adv ad_id="100" style="width: 200px;"></adv>
						<!-- <img :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=1281'" alt=""> -->
						<!-- </div> -->
						<el-carousel indicator-position="none" style="width: 1024px; float: right;">
							<el-carousel-item v-for="(page,pageIndex) in Math.ceil(newGoodsList.length / 5)" :key="pageIndex">
								<ul style="width: 1024px;height: 356px;">
									<template v-for="(item,index) in newGoodsList">
										<li v-if="Math.floor(index / 5) == pageIndex" :key="index" style="width: 20%;">
											<nuxt-link :to="{ name: 'goods/goodsInfo/id', query:{id:item.goods_id}}">
												<img :src="apiHead + '/mall/goods/thumb_image?width=500&height=500&goods_id=' + item.goods_id" />
												<p class="guess_title">{{item.goods_name}}</p>
												<p class="guess_price">
													<span class="yuan">{{i18nCommon.symbol}}</span>{{item.shop_price.toFixed(2)}}
												</p>
											</nuxt-link>
										</li>
									</template>
								</ul>
							</el-carousel-item>
						</el-carousel>
					</div>

					<!--&lt;!&ndash;精品推荐&ndash;&gt;-->
					<div class="goods_carousel conditions top_content" v-if="$store.state.shop_config && $store.state.shop_config.index_format_pc == 0">
						<div class="top">
							<nuxt-link :to="{name:'visit_log'}">
								<p>{{i18n.index.recommendation}}</p>
								<span>{{i18n.index.selection_goodthings}}</span>
							</nuxt-link>
						</div>
						<el-carousel indicator-position="outside">
							<el-carousel-item v-for="(page,pageIndex) in Math.ceil(recommendGoodsListSize / 3)" :key="pageIndex">
								<div class="swiper-slide swiper-slide-active" style="width: 352px; margin-right: 10px;">
									<div class="content-slide">
										<div class="cont1-box">
											<adv ad_id="52" v-if="pageIndex == 0" class="adv"></adv>
											<adv ad_id="53" v-if="pageIndex == 2" class="adv"></adv>
											<ul>
												<template v-for="(item,index) in recommendGoodsList">
													<li :key="index" v-if="Math.floor(index / 3) == pageIndex">
														<nuxt-link :to="{ name: 'goods/goodsInfo/id', query:{id:item.goods_id}}">
															<img :src="apiHead + '/mall/goods/thumb_image?width=500&height=500&goods_id=' + item.goods_id" alt="">
															<p class="goodname"> {{item.goods_name}} </p>
															<p><span>{{i18nCommon.symbol}}</span><span class="price">{{item.shop_price | beforePrice}}</span><span>.{{item.shop_price | afterPrice}}</span></p>
														</nuxt-link>
													</li>
												</template>
											</ul>
										</div>
									</div>
								</div>
							</el-carousel-item>
						</el-carousel>
					</div>
					<!--好货上新-->
					<div class="good_goods top_content" v-if="$store.state.shop_config && $store.state.shop_config.index_format_pc == '0'">
						<div class="top">
							<p>{{i18n.index.good_stock}}</p>
							<span>{{i18n.index.discover_qualitylife}}</span>
						</div>
						<template>
							<el-carousel height="450px" indicator-position="none" :interval="3000" arrow="always">
							  <el-carousel-item v-for="(page,index) in Math.ceil(newGoodsList.length / 4)" :key="index">
								<ul>
									<li v-for="(item,index) in newGoodsList.slice((page-1)*4,page*4)" :key="index">
										<nuxt-link :to="{name:'goods/goodsInfo/id', query:{id:item.goods_id}}">
											<img :src="apiHead + '/mall/goods/thumb_image?width=500&height=500&goods_id=' + item.goods_id" alt />
											<p>{{item.goods_name}}</p>
											<p></p>
										</nuxt-link>
									</li>
								</ul>
							  </el-carousel-item>
							</el-carousel>
						  </template>
						
					</div>
					<!--领券中心-->
					<div class="goods_carousel coupon top_content" v-if="$store.state.shop_config && $store.state.shop_config.index_format_pc == '0'">
						<div class="top">
							<nuxt-link :to="{name:'coupon_list'}">
								<p>{{i18n.index.redemption_centre}}</p>
								<img src="@/static/images/right.png" alt />
							</nuxt-link>

							<span>{{i18n.index.buysave_much}}</span>
						</div>
						<el-carousel indicator-position="outside">
							<el-carousel-item v-for="(page,pageIndex) in Math.ceil(couponListSize / 3)" :key="pageIndex">
								<div class="content-slide">
									<div class="cont1-box">
										<ul>
											<template v-for="(item,index) in couponList">
												<li v-if="Math.floor(index / 3) == pageIndex" :key="index">
													<nuxt-link :to="{name:'newjoin'}" target="_blank">
														<img src="@/static/images/coupon_1.png">
														<div>
															<p><span>{{i18nCommon.symbol}}</span>{{item.money.toFixed(2)}} </p>
															<p>{{i18n.index.full}}{{item.condition.toFixed(2)}}{{i18n.index.available}}</p>
															<p>{{item.limit_store}}</p>
														</div>
													</nuxt-link>
												</li>
											</template>
										</ul>
									</div>
								</div>
							</el-carousel-item>
						</el-carousel>
					</div>
					<div class="advertisement p">
						<ul style="margin-top: 20px;">
							<Advs pid="50" size="4"></Advs>
						</ul>
					</div>

					<!-- 商品楼层 -->
					<shopfloors></shopfloors>

					<!--猜你喜欢-->
					<div class="wbox gm_guess">
						<div class="gm_title">
							<h2>{{i18n.index.youlike}}</h2>
							<span>YOU MAY LIKE</span>
						</div>
						<div class="guess_main" style="height:300px ;">
							<el-carousel indicator-position="none">
								<el-carousel-item v-for="(page,pageIndex) in Math.ceil(guessYoulikeGoodsList.length / 6)" :key="pageIndex">
									<ul style="height: 300px;">
										<template v-for="(item,index) in guessYoulikeGoodsList">
											<li v-if="Math.floor(index / 6) == pageIndex" :key="index">
												<nuxt-link :to="{ name: 'goods/goodsInfo/id', query:{id:item.goods_id}}">
													<img :src="apiHead + '/mall/goods/thumb_image?width=500&height=500&goods_id=' + item.goods_id" />
													<p class="guess_title">{{item.goods_name}}</p>
													<p class="guess_price">
														<span class="yuan">{{i18nCommon.symbol}}</span>{{item.shop_price.toFixed(2)}}
													</p>
												</nuxt-link>
											</li>
										</template>
									</ul>
								</el-carousel-item>
							</el-carousel>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import SearchBox from "@/components/SearchBox/index.vue";
	import Shopfloors from "@/components/shopfloors/index.vue";
	import TopBar from "@/components/TopBar/index.vue";
	import Adv from "@/components/Adv/index.vue";
	import Advs from "@/components/Advs/index.vue";
	import $ from "jquery";
	import setSymbol from "@/mixins/setSymbol.js";
	import {
		mapActions,
		mapState
	} from "vuex";
	import {
		getAds,
		exitLogin,
		getArticles,
		getGoodsList,
		getCouponPage,
		getGuessYouLike,
	} from "@/utils/api";
	import { 
		removeToken, 
		removeUser, 
		getUser,
		setLocation,
		getLocation
	} from "@/utils/auth.js";
	export default {
		data() {
			return {
				bool: true, //顶部广告是否显示
				topBannerAds: [],
				user: getUser(),
				articles: [],
				shop_info: this.$store.state.shop_config,
				recommendGoodsList: [],
				recommendGoodsListSize: 0,
				newGoodsList: [],
				couponList: [],
				couponListSize: 0,
				guessYoulikeGoodsList: [],
				array:[]
			};
		},
		mixins:[setSymbol],
		watch:{
			$route:{
				handler(newRouter){
					location.reload()
				}
			}
		},
		created() {
			if (getLocation() == null) {
				//初始化地址
				setLocation({
					label: [],
					value: [],
				})
			}
		},
		async asyncData({params}) {
			
		},

		mounted() {
			this.shopConfig()
			function sidebarRollChange() {
				//首页侧边栏滚动改变楼层
				var $_floorList = $(".tpshop2_0_floor");
				var $_sidebar = $("#sideleft");
				$_sidebar.find("li").click(function() {
					//点击切换楼层
					$("html,body").animate({
							scrollTop: $_floorList.eq($(this).index()).offset().top
						},
						500
					);
				});
				$(window).scroll(function() {
					if ($("div").is(".tpshop2_0_floor")) {
						var scrollTop = $(window).scrollTop();
						/*显示左边侧边栏*/
						if (
							scrollTop <
							$_floorList.eq(0).offset().top - $(window).height() / 2
						) {
							//还没滚到到楼层或向上滚出楼层隐藏侧边栏
							$_sidebar.hide();
							return;
						}
						$_sidebar.show(); //左边侧边栏显示
						/*滚动改变侧边栏的状态*/
						for (var j = 0; j < $_floorList.length; j++) {
							if (
								scrollTop >
								$_floorList.eq(j).offset().top - $(window).height() / 2
							) {
								$_sidebar
									.find("li")
									.eq(j)
									.addClass("sid-red")
									.siblings()
									.removeClass("sid-red");
							}
						}
					}
				});
			}
			sidebarRollChange();
			// this.getTopBannerAds();
			// this.getArticles();
			// this.getGoodsByIsRecommend()
			this.getGoodsByIsNew()
			this.getCoupon()
			if (getUser() != null) {
				//获取猜你喜欢
				this.getGuessYouLikeGoods()
			} else {
				this.getLikeGoods()
			}
		
		},
		components: {
			SearchBox,
			TopBar,
			Adv,
			Advs,
			Shopfloors
		},
		computed:{
			...mapState(['shop_basic']),
			i18n () {  
				return this.$t('login')  
			},
			i18nCommon () {  
			    return this.$t('common')  
			} 
		},
		methods: {
			...mapActions(['shopConfig']),
			edit(item) {
				if (this.$route.query.type == 'admin') {
					item.ad_link =
						` ${this.$route.query.rediceUrl}/${this.$route.query.type}/${this.$route.query.parameter}?id=${item.ad_id}`
				}
			},
			// test() {
			// 	let that = this;
			// 	that.recommendGoodsList = res.records
			// 	that.recommendGoodsListSize = res.records.length
			// },
			quit() {
				var _this = this;
				exitLogin().then((res) => {
					removeToken();
					removeUser();
					_this.$router.push({ name: "login" });
				});
			},
			getTopBannerAds() {
				getAds({
					pid: 10,
					size: 6
				}).then(res => {
					if(this.shop_basic.is_random==0||this.shop_basic.is_random==null){
					this.topBannerAds = res;
					}else{
						var arr=[];
						var rom=[];
						res.forEach(r => {
							arr.push(r.ad_id);
						});
						rom=arr.sort(function(){
						   return Math.random()-0.5;
						 });
						 for(var i=0;i<rom.length;i++){
							 for(var j=0;j<res.length;j++){
								 if(rom[i]==res[j].ad_id){
								this.topBannerAds.push(res[j]);	 
								 }
							 }
						 } 
					}
					
				});
			},
			getArticles() {
				getArticles({
					name: "快讯",
					size: 4
				}).then(res => {
					this.articles = res;
				});
			},
			getGoodsByIsRecommend() {
				var that = this
				getGoodsList({
					is_recommend: 1,
					size: 100
				}).then(function(res) {
					that.recommendGoodsList = res.records
					that.recommendGoodsListSize = res.records.length
				});
			},
			getGoodsByIsNew() {
				var that = this
				getGoodsList({
					is_new: 1,
					size: 100
				}).then(function(res) {
					that.newGoodsList = res.records
				});
			},
			getCoupon() {
				var that = this
				getCouponPage({
					size: 9
				}).then(function(res) {
					that.couponList = res.records
					that.couponListSize = res.records.length
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
				getGoodsList({
					size: 30
				}).then(function(res) {
					that.guessYoulikeGoodsList = res.records
				});
			},
			isShow() {
				this.bool = false;
			},
		}
	};
</script>

<style scoped>
	@import "../../static/css/swiper.min.css";

	.fn-mall a {
		width: 100%;
	}

	.bg {
		background: #f0f3ef;
	}

	.topcar {
		height: 450px;
		width: 100%;
		position: relative;
	}

	.cabg {
		width: 100%;
		height: 450px;
	}

	.cabg img {
		margin: 0 auto;
		height: 450px;
		display: block;
	}

	#j-imgload-recomm {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.guess_main ul {
		display: block;
		overflow: hidden;
	}

	li {
		list-style: none;
	}

	.swiper_1 {
		overflow-x: hidden;
	}

	.coupon:hover .swiper-button-next,
	.coupon:hover .swiper-button-prev {
		display: block;
	}

	.conditions:hover .swiper-button-next,
	.conditions:hover .swiper-button-prev {
		display: block;
	}

	.next100:hover .swiper-button-next,
	.next100:hover .swiper-button-prev {
		display: block;
	}

	.prev100:hover .swiper-button-next,
	.prev100:hover .swiper-button-prev {
		display: block;
	}

	.next100,
	.prev100 {
		font-size: 0;
		width: 30px;
		height: 50px;
		background: #000;
		padding-top: 0;
		opacity: 0.2;
		display: none;
	}

	.prev100 span {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-top: 2px solid #fff;
		border-left: 2px solid #fff;
		transform: rotate(-45deg);
		margin-top: 18px;
		margin-left: 10px;
	}

	.next100 span {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-top: 2px solid #fff;
		border-left: 2px solid #fff;
		margin-top: 18px;
		margin-left: 5px;
		transform: rotate(135deg);
	}

	.prev100 {
		left: 0;
		z-index: 999;
	}

	.next100 {
		left: 322px;
		z-index: 999;
	}

	.next101,
	.prev101 {
		font-size: 0;
		width: 30px;
		height: 50px;
		background: #000;
		padding-top: 0;
		opacity: 0.2;
		display: none;
	}

	.prev101 span {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-top: 2px solid #fff;
		border-left: 2px solid #fff;
		transform: rotate(-45deg);
		margin-top: 18px;
		margin-left: 10px;
	}

	.next101 span {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-top: 2px solid #fff;
		border-left: 2px solid #fff;
		margin-top: 18px;
		margin-left: 5px;
		transform: rotate(135deg);
	}

	.prev101 {
		left: 0;
		z-index: 999;
	}

	.next101 {
		left: 322px;
		z-index: 999;
	}

	.categorys .subitems dl:nth-child(1) dd {
		border-top: none;
	}

	.tpshop2_0_floor .uantit.default {
		border-bottom: 1px solid #96cb85;
	}

	.lc_bot ul .lemain.default {
		background: #96cb85;
	}

	.p.default {
		border-bottom: 1px solid #e23435;
	}

	.tpshop2_0_floor .f-tab li.z-select a {
		border-color: #e23435;
		color: #e23435;
	}

	.tpshop2_0_floor .uantit.orange {
		border-bottom: 1px solid orange;
	}

	.lc_bot ul .lemain.orange {
		background: orange;
	}

	.p.orange {
		border-bottom: 1px solid orange;
	}

	.tpshop2_0_floor .f-tab.orange li.z-select a {
		border-color: orange;
		color: orange;
	}

	.tpshop2_0_floor .uantit.green {
		border-bottom: 1px solid green;
	}

	.lc_bot ul .lemain.green {
		background: green;
	}

	.p.green {
		border-bottom: 1px solid green;
	}

	.tpshop2_0_floor .f-tab.green li.z-select a {
		border-color: green;
		color: green;
	}

	.tpshop2_0_floor .uantit.purple {
		border-bottom: 1px solid purple;
	}

	.lc_bot ul .lemain.purple {
		background: purple;
	}

	.p.purple {
		border-bottom: 1px solid purple;
	}

	.tpshop2_0_floor .f-tab.purple li.z-select a {
		border-color: purple;
		color: purple;
	}

	.tpshop2_0_floor .uantit.blue {
		border-bottom: 1px solid blue;
	}

	.lc_bot ul .lemain.blue {
		background: blue;
	}

	.p.blue {
		border-bottom: 1px solid blue;
	}

	.tpshop2_0_floor .f-tab.blue li.z-select a {
		border-color: blue;
		color: blue;
	}

	.tpshop2_0_floor .uantit.pink {
		border-bottom: 1px solid pink;
	}

	.lc_bot ul .lemain.pink {
		background: pink;
	}

	.p.pink {
		border-bottom: 1px solid pink;
	}

	.tpshop2_0_floor .f-tab.pink li.z-select a {
		border-color: pink;
		color: pink;
	}

	.tpshop2_0_floor .uantit.red {
		border-bottom: 1px solid red;
	}

	.lc_bot ul .lemain.red {
		background: red;
	}

	.p.red {
		border-bottom: 1px solid red;
	}

	.tpshop2_0_floor .f-tab.red li.z-select a {
		border-color: red;
		color: red;
	}

	#swiper-container101 {
		position: relative;
	}

	#swiper-container101 .swiper-button-next:after,
	#swiper-container100 .swiper-button-next:after,
	#swiper-container101 .swiper-button-prev:after,
	#swiper-container100 .swiper-button-prev:after {
		content: "";
	}

	.swiper-button-next span,
	.swiper-button-prev span {
		position: relative;
		top: -5px;
	}

	/* .topcar>>>.el-carousel__arrow {
		position: absolute;
		left: 50%;
	}

	.topcar>>>.el-carousel__arrow--left {
		transform: translate(-405px);
	}

	.topcar>>>.el-carousel__arrow--right {
		transform: translate(365px);
	} */

	#swiper-container100 {
		width: 100%;
	}

	.coupon .cont1-box li div p:nth-child(1) {
		line-height: 50px;
	}

	.cont1-box .adv {
		height: 150px;
		overflow: hidden;
	}

	.goodname {
		overflow: hidden;
	}

	>>>.goods_carousel .el-carousel__container {
		height: 460px;
	}

	.guess_main ul li {
		float: left;
	}

	.usertpshop .login_index .add_newperson:hover{
		background-color: #f42424;
		color: #fff;
		text-decoration: none;
		cursor: pointer;
	}
</style>

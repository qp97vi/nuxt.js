
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
		<div id="tphsop">
			<div class="nav-middan-z tphsop2_0 p">
				<div class="header w1224">
					<div class="ecsc-logo">
						<a href="/" class="logo">
							<img v-if="$store.state.shop_config" :src="apiHead + $store.state.shop_config.store_logo" style="max-width: 240px;max-height: 80px;width:100%;height:100%;" />
						</a>
					</div>

					<div class="ecsc-search">
						<el-input :placeholder="i18n.SearchBox.keyword" v-model="words" class="input-with-select" @keyup.enter.native="search">
							<el-select v-model="searchType" slot="prepend" :placeholder="i18n.SearchBox.please_select">
								<el-option :label="i18n.SearchBox.commodity" :value="1"></el-option>
								<el-option :label="i18n.SearchBox.store" :value="2"></el-option>
								<el-option :label="i18n.SearchBox.Cargo_code" :value="3"></el-option>
								<el-option :label="i18n.SearchBox.brand" :value="4"></el-option>
							</el-select>
							<el-button slot="append" icon="el-icon-search" @click="search()">{{i18n.SearchBox.seek}}</el-button>
						</el-input>
						<div class="keyword">
							<ul>
								<li v-for="(item,index) in keywords" :key="index">
									<nuxt-link :style="item==words?'color: #e83632 !important;':''" :to="{name: 'goods/goodsList/id', query: {words: item, searchType: 1}}" target="_blank">{{item}}</nuxt-link>
								</li>
							</ul>
						</div>
					</div>
					<div class="shopingcar-index fr">
						<div class="u-g-cart fr fixed">
							<nuxt-link :to="{name:'cart'}">
								<p class="c-num">
									<i class="car2_0"></i>
									<span>{{i18n.SearchBox.mycart}}</span>
									<span class="count cart_quantity">{{cartBill.goods_num}}</span>
								</p>
							</nuxt-link>
							<div class="u-fn-cart u-mn-cart">
								<!--有商品时-s-->
								<div class="mn-c-m oh" v-if="cartBill.store_cart_list.length > 0">
									<div v-for="(store_cart,store_cart_index) in cartBill.store_cart_list" :key="store_cart_index">
										<div class="mn-c-box J-sdb-cb js_cart_top" v-for="(item,index) in store_cart.cart_list" :key="index">
											<dl class="c-store mb15">
												<dt class="c-store-tt fixed" v-if="user!=null">
													<a href="#" class="n fl">{{item.add_time | datefmtAll}}</a>
												</dt>
												
												<dd class="c-list">
													<div class="c-prod"> 
														<div class="c-item fixed js_cart_pro_list">
															<a href="javascript:void(0);" class="del js_delete"  @click="delCart(item.id)"></a>

															<p class="i fl mr5">
																<nuxt-link :to="{name:'goods/goodsInfo/id',query:{id:item.goods_id}}">
																	<img :src="apiHead + '/mall/goods/thumb_image?width=50&height=50&goods_id=' + item.goods_id" height="50"
																	 width="50" alt :title="item.goods_name" />
																</nuxt-link>
															</p>

															<p class="n fl">
																<nuxt-link :to="{name:'goods/goodsInfo/id',query:{id:item.goods_id}}">
																	{{item.goods_name}} {{item.spec_key_name}}
																</nuxt-link>
															</p>

															<p class="fl js_mini_num">* {{item.goods_num}} {{i18n.SearchBox.piece}}</p>
															<p class="p fr mt5">
																<em>{{i18nCommon.symbol}}</em>
																<span>{{item.member_goods_price}}</span>
															</p>
														</div>
													</div>
												</dd>
											</dl>
										</div>
									</div>
									<div class="mn-c-total">
										<div class="c-t fixed">
											<p class="t-n fl">
												<span>{{cartBill.goods_num}}</span>{{i18n.SearchBox.piece}}
											</p>
											<p class="t-p fr">
												<em>{{i18nCommon.symbol}}</em>
												<span>{{cartBill.goods_price}}</span>
											</p>
										</div>
										<div class="c-btn">
											<nuxt-link :to="{name:'cart'}">{{i18n.SearchBox.settle_accounts}} &gt;&gt;</nuxt-link>
										</div>
									</div>
								</div>
								<!--有商品时-e-->
								<div class="empty-c" v-else>
									<span class="ma">
										<i class="c-i oh"></i>{{i18n.SearchBox.noitems}}~
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="nav tpshop2_0_nav p">
				<div class="w1224 p">
					<div class="categorys home_categorys">
						<div class="dt">
							<img src="../../static/images/nav_new.png" alt />
							<a>{{i18n.SearchBox.all_categories}}</a>
						</div> 
						<!--全部商品分类-s-->
						<div :style="{display:show}" class="dd">
							<div class="cata-nav">
								<div class="item fore1" v-for="(node,node_index) in goodsCategoryTree" :key="node_index">
									<div class="item-left">
										<div class="cata-nav-name">
											<nuxt-link :to="{name: 'goods/goodsList/id',query:{cat_id:node.id}}" target="_blank">{{node.name}}</nuxt-link>
											<nuxt-link :to="{name: 'goods/goodsList/id',query:{cat_id:node.id}}" target="_blank" v-for="(child,child_index) in node.children"
											 :key="child_index">
												<em></em>
												{{child.name}}
											</nuxt-link>
										</div>
									</div>
									<div class="cata-nav-layer">
										<div class="cata-nav-left">
											<div class="item-channels">
												<div class="channels"></div>
											</div>
											<div class="subitems">
												<dl v-for="(child,child_index) in node.children" :key="child_index">
													<dt>
														<nuxt-link :to="{name: 'goods/goodsList/id',query:{cat_id:child.id}}" target="_blank">
															{{child.name}}
															<i>&gt;</i>
														</nuxt-link>
													</dt>
													<dd>
														<nuxt-link :to="{name: 'goods/goodsList/id',query:{cat_id:grandson.id}}" target="_blank" v-for="(grandson,grandson_index) in child.children"
														 :key="grandson_index">{{grandson.name}}</nuxt-link>
													</dd>
												</dl>
												<div class="item-brands">
													<ul></ul>
												</div>
												<div class="item-promotions"></div>
											</div>
										</div>
										<div class="cata-nav-rigth">
											<div class="item-brands">
												<ul>
													<li v-for="(brand,brand_index) in node.brands" :key="brand_index">
														<nuxt-link :to="{name: 'goods/goodsList/id',query:{brand_ids:brand.id}}" target="_blank" :title="brand.name">
															<img :src="brand.logo" width="91" height="40" />
														</nuxt-link>
													</li>
												</ul>
											</div>
											<div class="item-promotions"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--全部商品分类-e-->
					</div>
					<div class="navitems">
						<ul>
							<!-- 首页 -->
							<li>
								<nuxt-link active-class="selected" :to="{ name: 'index'}">{{i18n.SearchBox.home_page}}</nuxt-link>
							</li>
							<!-- 限时抢购 -->
							<!-- <li>
								<nuxt-link active-class="selected" :to="{ name: 'activity/flash_sale_list/id'}">{{i18n.SearchBox.flash_sale}}</nuxt-link>
							</li> -->
							<!-- 团购 --> 
							<li>
								<nuxt-link active-class="selected" :to="{ name: 'activity/group_list/id'}">{{i18n.SearchBox.group_purchase}}</nuxt-link>
							</li>
							<!-- 促销活动 -->
							<li>
								<nuxt-link active-class="selected" :to="{ name: 'activity/promoteList/id'}">{{i18n.SearchBox.sales_promotion}}</nuxt-link>
							</li>
							<!-- 预售 -->
							<li>
								<nuxt-link active-class="selected" :to="{ name: 'activity/pre_sell_list/id'}">{{i18n.SearchBox.presell}}</nuxt-link>
							</li>
							<!-- 店铺街 -->
							<!-- <li>
								<nuxt-link active-class="selected" :to="{ name: 'index/street'}">{{i18n.SearchBox.depot_island}}</nuxt-link>
							</li> -->
							<!-- 积分商城 -->
							<!-- <li>
								<nuxt-link active-class="selected" :to="{ name: 'goods/integralMall'}">{{i18n.SearchBox.integral}}</nuxt-link>
							</li> -->
							<!-- 试用中心 -->
							<li>
								<nuxt-link active-class="selected" :to="{ name: 'trycenter/index/all_try'}">试用中心</nuxt-link>
							</li>
							<li>
								<nuxt-link active-class="selected" :to="{ name: 'publish/index/publish_list'}">动态列表</nuxt-link>
							</li>
						
							
						</ul>
					</div>
				</div>
			</div>



		</div>
		<!-- 侧边栏 -->
		<div class="soubao-sidebar" v-if="sidebarShow">
			<div class="soubao-sidebar-bg"></div>
			<div class="sidertabs tab-lis-1">
				<div class="sider-top-stra sider-midd-1">
					<div class="icon-tabe-chan">
						<nuxt-link :to="{ name: 'login'}">
							<i class="share-side share-side1"></i>
							<i class="share-side tab-icon-tip triangleshow"></i>
						</nuxt-link>
						<div class="dl_login">
							<div class="hinihdk">
								<img class="head_pic" src="@/static/images/dl.png" v-if="!user" />
								<img class="head_pic" @click="toUserIndex()" :src="user.head_pic" v-else />
								<p class="loginafter nologin" v-if="!user">
									<span>{{i18n.SearchBox.hello_first}}</span>
									<nuxt-link :to="{ name: 'login'}">{{i18n.SearchBox.register}}</nuxt-link>！
								</p>
								<p class="loginafter islogin" v-else>
									<span class="id_jq userinfo" @click="toUserIndex()">{{user.nickname}}</span>
									<span>{{i18n.SearchBox.click}}</span>
									<a @click="quit()">{{i18n.SearchBox.quit}}</a>！
								</p>
							</div>
						</div>
					</div>
					<div class="icon-tabe-chan shop-car">
						<a href="javascript:void(0);" onclick>
							<div class="tab-cart-tip-warp-box">
								<div class="tab-cart-tip-warp">
									<i class="share-side share-side1"></i>
									<i class="share-side tab-icon-tip"></i>
									<span class="tab-cart-tip">{{i18n.SearchBox.shopping_cart}}</span>
									<span class="tab-cart-num J_cart_total_num">{{cartBill.goods_num}}</span>
								</div>
							</div>
						</a>
					</div>
					<div class="icon-tabe-chan massage">
						<nuxt-link :to="{ name: 'user/index/message_notice'}">
							<i class="share-side share-side1"></i>
							<span class="tab-tip">{{i18n.SearchBox.news}}</span>
						</nuxt-link>
					</div>
				</div>
				<div class="sider-top-stra sider-midd-2">
					<div class="icon-tabe-chan mmm">
						<nuxt-link :to="{ name: 'user/index/goods_collect/id'}">
							<i class="share-side share-side1"></i>
							<span class="tab-tip">{{i18n.SearchBox.collect}}</span>
						</nuxt-link>
						<!-- </a> -->
					</div>
					<div class="icon-tabe-chan hostry">
						<nuxt-link :to="{ name: 'user/index/visit_log'}">
							<i class="share-side share-side1"></i>
							<span class="tab-tip">{{i18n.SearchBox.track}}</span>
						</nuxt-link>
					</div>
					<!--      <div class="icon-tabe-chan sign">
							<a href="" target="_blank">
								<i class="share-side share-side1"></i>
								&lt;!&ndash;<i class="share-side tab-icon-tip"></i>&ndash;&gt;
								<span class="tab-tip">签到</span>
							</a>
          </div>-->
				</div>
			</div>
			<div class="sidertabs tab-lis-2">
				<div class="icon-tabe-chan advice">
					<!-- <a :href="'tencent://message/?uin=' + $store.state.shop_config.qq + '&amp;Site=TPshop商城&amp;Menu=yes'">
						<i class="share-side share-side1"></i>
						<span class="tab-tip">{{i18n.SearchBox.online_consultant}}</span>
					</a> -->
				</div>
				<!-- <div class="icon-tabe-chan request">
				<a href="" target="_blank">
					<i class="share-side share-side1"></i>
					&lt;!&ndash;<i class="share-side tab-icon-tip"></i>&ndash;&gt;
					<span class="tab-tip">意见反馈</span>
				</a>
        </div>-->
				<!-- <div class="icon-tabe-chan qrcode">
          <a href target="_blank">
            <i class="share-side share-side1"></i>
            <i class="share-side tab-icon-tip triangleshow"></i>
            <span class="tab-tip qrewm">
              <img
                img-url=""
                src=""
              />
              扫一扫下载APP
            </span>
          </a>
        </div> -->
				<div @click="toTop()" class="icon-tabe-chan comebacktop">
					<a>
						<i class="share-side share-side1"></i>
						<!--<i class="share-side tab-icon-tip"></i>-->
						<span class="tab-tip">{{i18n.SearchBox.return_top}}</span>
					</a>
				</div>
			</div>
			<div class="shop-car-sider" style="display: none; left: -280px;">
				<!--购物车有商品-s-->
				<div class="hasshopcar u-fn-cart u-mn-cart" style="overflow: auto;" v-if="cartBill.store_cart_list.length > 0">
					<div class="mn-c-box J-sdb-cb js_cart_top" style="height: 240px;" v-for="(store_cart,store_cart_index) in cartBill.store_cart_list"
					 :key="store_cart_index">
						<dl class="c-store mb15" v-for="(cart,cartIndex) in store_cart.cart_list" :key="cartIndex">
							<dt class="c-store-tt fixed" v-if="user!=null">
								<a href="#" class="n fl">{{cart.add_time | datefmtAll}}</a>
							</dt>
							<!--商城自营-->
							<dd class="c-list">
								<div class="c-prod">
									<div class="c-item fixed js_cart_pro_list">
										<a href="javascript:void(0);" class="del js_delete" @click="delCart(cart.id)"></a>

										<p class="i fl mr5">
											<nuxt-link :to="{name:'goods/goodsInfo/id',query:{id:cart.goods_id}}">
												<img :src="apiHead + '/mall/goods/thumb_image?width=50&height=50&goods_id=' + cart.goods_id" height="50"
												 width="50" alt :title="cart.goods_name" />
											</nuxt-link>
										</p>

										<p class="n fl">
											<nuxt-link :to="{name:'goods/goodsInfo/id',query:{id:cart.goods_id}}">
												{{cart.goods_name}} {{cart.spec_key_name}}</nuxt-link>
										</p>
										<p class="fl js_mini_num">* {{cart.goods_num}} 件</p>
										<p class="p fr mt5">
											<em>{{i18nCommon.symbol}}</em>
											<span>{{cart.member_goods_price}}</span>
										</p>
									</div>
								</div>
							</dd>
						</dl>
					</div>
					<div class="buyall-price-wrap">
						<div class="buyall-price">
							<p>
								{{i18n.SearchBox.selected}}
								<span>{{cartBill.goods_num}}</span>{{i18n.SearchBox.atotal}}：{{i18nCommon.symbol}}
								<span>{{cartBill.goods_price}}</span>
							</p>
							<nuxt-link :to="{name:'cart'}">{{i18n.SearchBox.go_shopping_cart}}</nuxt-link>
						</div>
					</div>
				</div>
				<!--购物车有商品-e-->
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"; 
	import bus from "@/utils/bus";
	import common from "@/utils/common.js"
	import {
		getCartBill,
		getGoodsCategoryTree,
		logout,
		getCartListBill,
		deleteCart
	} from "@/utils/api.js";
	import {
		removeToken,
		removeUser,
		getUser
	} from "@/utils/auth.js";
	export default {
		data() {
			return {
				timer: null,
				shop_info: this.$store.state.shop_config,
				words: this.$route.query.words || "",
				keywords: "",
				searchType: "",
				cartBill: {
					//购物车列表
					order: {},
					store_cart_list: [], //
					goods_num: 0,
					goods_price: 0,
				},
				goodsCategoryTree: [],
				user: getUser(),
				shopList: "",
			};
		},
		computed: {
			i18n() {
				return this.$t('components')
			},
			i18nCommon() {
				return this.$t('common')
			}
		},
		asyncData({ params, route, error }) {
			return {
				searchType: route.query.searchType || 1
			}

		},
		watch: {},
		mounted() {
			var that = this;
			
			if(that.$store.state.shop_basic) {
				that.keywords = that.$store.state.shop_basic.hot_keywords.split("|");
			}
			if(that.$store.state.shop_list) {
				that.shopList = that.$store.state.shop_list
			}
			bus.$on("getBill", that.getBill);
			setTimeout(function() {
				that.initDom();
			}, 100);

			this.getGoodsCategoryTree();
			if (this.user == null) {
				//没有登录状态
				this.getBill();
			} else {
				//登录状态下
				this.getBill();
			}
		},
		props: ["show", "sidebarShow"],
		methods: {
			search() {
				var that = this;
				if (this.searchType == 1) {
					that.$router.push({
						name: "goods/goodsList/id",
						query: {
							words: that.words,
							searchType: that.searchType
						}
					});
				} else if (this.searchType == 3) {
					that.$router.push({
						name: "goods/goodsList/id",
						query: {
							words: that.words,
							searchType: that.searchType
						}
					});
				} else if (this.searchType == 4) {
					that.$router.push({
						name: "goods/goodsList/id",
						query: {
							words: that.words,
							searchType: that.searchType
						}
					});
				} else {
					that.$router.push({
						name: "street",
						query: {
							words: that.words,
							searchType: that.searchType
						}
					});
				}
			},
			toUserIndex() {
				var that = this;
				that.$router.push({
					name: "user/index/user_index",
				});
			},
			quit() {
				var that = this;
				logout().then(function() {
					removeToken();
					removeUser();
					that.$router.push({
						name: "login",
					});
				});
			},
			getBill() {
				var that = this;
				if(this.user == null) {
					/*未登录状态下*/ 
					let storeageData =common.getSessionData('shopCartList')||[]
					console.log(storeageData)
					if(storeageData.length==0){
						return false;
					}
					getCartListBill(storeageData).then(res=>{
						that.cartBill = res;
						that.cartBill.goods_num = 0;
						that.cartBill.goods_price = 0;
						for (var storeIndex = 0; storeIndex < that.cartBill.store_cart_list.length; storeIndex++) {
							for (
								var cartIndex = 0; cartIndex <
								that.cartBill.store_cart_list[storeIndex].cart_list.length; cartIndex++
							) {
								that.cartBill.goods_num =
									that.cartBill.goods_num +
									that.cartBill.store_cart_list[storeIndex].cart_list[cartIndex]
									.goods_num;
								that.cartBill.goods_price =
									that.cartBill.goods_price +
									that.cartBill.store_cart_list[storeIndex].cart_list[cartIndex]
									.total_fee;
							}
						}
						that.cartBill.goods_price = that.cartBill.goods_price.toFixed(2)
					}) 
				}else {
					getCartBill({}).then(function(res) {
						that.cartBill = res;
						that.cartBill.goods_num = 0;
						that.cartBill.goods_price = 0;
						for (var storeIndex = 0; storeIndex < that.cartBill.store_cart_list.length; storeIndex++) {
							for (
								var cartIndex = 0; cartIndex <
								that.cartBill.store_cart_list[storeIndex].cart_list.length; cartIndex++
							) {
								that.cartBill.goods_num =
									that.cartBill.goods_num +
									that.cartBill.store_cart_list[storeIndex].cart_list[cartIndex]
									.goods_num;
								that.cartBill.goods_price =
									that.cartBill.goods_price +
									that.cartBill.store_cart_list[storeIndex].cart_list[cartIndex]
									.total_fee;
							}
						}
						that.cartBill.goods_price = that.cartBill.goods_price.toFixed(2)
					});
				}
				
			},
			delCart(id) {
				if(this.user == null) {
					this.$router.push({
						name: "cart",
						
					});
					return false
				}
				deleteCart(id).then(res=>{
					if(res.status == 1) {
						//没有登录状态
						this.getBill();
					}
				})
			},
			getGoodsCategoryTree() {
				var that = this;
				getGoodsCategoryTree({
					is_show: 1,
				}).then(function(res) {
					that.goodsCategoryTree = res;
				});
			},
			toTop() {
				var speed = 300; //滑动的速度
				$("body,html").animate({
						scrollTop: 0,
					},
					speed
				);
				return false;
			},
			initDom() {
				var select = $("#select-h");
				$(".search-select-h").mouseenter(function() {
					select.show();
				});
				$(".search-select-h").mouseleave(function() {
					select.hide();
				});
				select.find("li").click(function() {
					select.hide();
					$("#sourch_form").attr("action", $(this).attr("rel"));
					$(".search-select-h").find("em").text($(this).text());
				});
				$(".search-select-h").find("em").text("商品");

				$(".shop-car").click(function() {
					//购物车
					if ($(".shop-car-sider").hasClass("sh-hi")) {
						$(".shop-car-sider").animate({
								left: "35px",
								opacity: "hide",
							},
							"normal",
							function() {
								$(".shop-car-sider").removeClass("sh-hi");
								$(".shop-car .tab-cart-tip-warp-box").css("background-color", "");
								$(".shop-car .tab-icon-tip").removeClass("jsshow");
							}
						);
					} else {
						$(".shop-car-sider").animate({
								left: "-280px",
								opacity: "show",
							},
							"normal",
							function() {
								$(".shop-car-sider").addClass("sh-hi");
								$(".shop-car .tab-cart-tip-warp-box").css(
									"background-color",
									"#e23435"
								);
								$(".shop-car .tab-icon-tip").addClass("jsshow");
							}
						);
					}
				});
			},
		},
		components: {},
	};
</script>

<style scoped>
	.header {
		overflow: visible;
	}

	.u-mn-cart .mn-c-m {
		overflow-y: auto;
	}

	.ecsc-search {
		margin: 10px 0 0 150px;
		width: 600px;
	}

	>>>.el-input__inner {
		height: 40px;
		line-height: 40px;
	}

	>>>.ecsc-search .el-select .el-input {
		width: 76px;
	}

	>>>.ecsc-search .el-input-group__prepend {
		color: #333333;
		background-color: #fff;
		border-radius: 0px;
	}

	>>>.ecsc-search .el-input-group__append {
		color: #fff;
		background-color: #e23435;
		border-radius: 0px;
		border: 0px;
	}

	>>>.ecsc-search .el-input-group {
		border: 2px solid #e23435;
	}

	>>>.ecsc-search .el-input__inner {
		border-left: 2px solid #e23435;
	}

	>>>.ecsc-search .el-input__inner:last-child:focus {
		border-color: #e65758;
	}
</style>

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
		<!-- 顶部广告-s -->
		<div class="topic-banner" style="background-color:#000000;">
			<div class="w1224">
				<adv ad_id="1"></adv>
				<i></i>
			</div>
		</div>
		<!-- 顶部广告-e -->
		<div class="tpshop-tm-hander p" style="border-bottom: 0;">
			<top-bar></top-bar> 
			<div class="nav-middan-z p tphsop2_0">
				<div class="header w1224">
					<div class="ecsc-logo fon_gwcshcar">
						<a href="/" class="logo">
							<img  v-if="$store.state.shop_config"  :src="apiHead+$store.state.shop_config.store_logo" style="max-width: 240px;max-height: 80px;" />
						</a>
					</div>
					<div class="ecsc-search mycarlist_search">
						<el-input :placeholder="i18n.index.keyword" v-model="words" class="input-with-select">
							<el-button slot="append" icon="el-icon-search">{{i18n.index.search}}</el-button>
						</el-input>
						<div class="keyword">
							<ul v-if="$store.state.shop_basic">
								<li v-for="(item,index) in shop_basic.hot_keywords.split('|')" :key="index">
									<router-link :to="{name:'cart'}" target="_blank">{{item}}</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="tips_logininfo">
				<div class="w1224"></div>
			</div>
		</div>
		<div class="shopcar_empty" v-if="cartBill.store_cart_list.length == 0">
			<div class="w1224">
				<div class="cart-empty">
					<div class="message">
						<ul>
							<li class="txt islogin">{{i18n.index.sp_sky}}</li>
							<li class="mt10">
								&nbsp;&nbsp;&nbsp;&nbsp;
								<a href="/" class="btn-1 login-btn islogin">{{i18n.index.go_shopping}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="main_shopcarlist">
				<div class="w1224">
					<div class="li3_address p ">
						<ul>
							<li class="current">
								{{i18n.index.all_goods_count}}
								<em>（{{cartGoodsNum}}）</em>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="shoplist_deta p">
				<div class="w1224">
					<div class="cart-thead p">
						<div class="column cart-checkbox">
							<el-checkbox v-model="cartSelectAll" @change="checkAllCart()">{{i18n.index.all_ck}}</el-checkbox>
						</div>
						<div class="column t-goods">{{i18n.index.goods}}</div>
						<div class="column t-props"></div>
						<div class="column t-price">{{i18n.index.unit_price}}</div>
						<div class="column t-quantity">{{i18n.index.count}}</div>
						<div class="column" :style="lang=='zh'?'width:138px':'width:100px'">{{i18n.index.subtotal}}</div>
						<div class="column t-action">{{i18n.index.operation}}</div>
					</div>
				</div>
			</div>
			<div class="shoplist_detail_a" v-for="(store,storeIndex) in cartBill.store_cart_list" :key="storeIndex">
				<div class="w1224">
					<div class="tit_carttop p">
						<div class="column cart-checkbox wptez">
							<el-checkbox v-model="store.selected" @change="checkStoreCart(store)"></el-checkbox>
							<router-link :to="{name:'store/index/id',query:{store_id:store.store_id}}">{{store.store_name}}</router-link>
							<i class="shp-ear"></i>
						</div>
						<div class="boximg_coupon">
							<el-popover placement="bottom" width="200" trigger="hover">
								<span>{{i18n.index.not_get_coupon}}</span>
								<!-- <div class="al_co3">
									<div class="co_pri">
										<span>{{i18nCommon.symbol}}5.00</span>
									</div>
									<div class="co_des">
										<span class="sc_coup">商券,满{{i18nCommon.symbol}}10.00减{{i18nCommon.symbol}}5.00</span>
										<span class="sc_date">2019/8/2-2020/8/2</span>
									</div>
									<div class="co_get">
										<a href="javascript:;" data-coupon-id="73" onclick="getCoupon(this);" class="coupon_btn">领取</a>
									</div>
								</div> -->
								<i slot="reference" class="img_coupon"></i>
							</el-popover>
						</div>

						<div class="ljadd" v-if="getOrderByStoreId(store.store_id) != null">
							<span class="f total_price">{{i18nCommon.symbol}}{{getOrderByStoreId(store.store_id).total_amount}}</span>
							<span class="l cut_price" v-if="getOrderByStoreId(store.store_id).cut_fee > 0">-{{getOrderByStoreId(store.store_id).cut_fee}}</span>
						</div>
					</div>
                    <div class="edge_tw_box">
						<div class="edge_tw" v-for="(cart,cartIndex) in store.cart_list" :key="cartIndex">
							<div>
								<div class="brim_top" v-if="cart.prom_type == 3">
									<span class="act_mjhg">{{i18n.index.promotion}}</span>
									<a class="condi">{{cart.prom_title}}></a>
								</div>
								<div class="item-single p">
									<div class="breadth_phase">
										<div class="column">
											<el-checkbox v-model="cart.selected" :true-label="1" :false-label="0" @change="checkCart(cart)"></el-checkbox>
											<img class="msp_picture" :src="apiHead + '/mall/goods/thumb_image?width=82&height=82&goods_id=' + cart.goods_id" />
										</div>
										<div class="column t-goods">
											<p class="msp_spname">
												<router-link :to="{ name:'goods/goodsInfo/id', query:{id:cart.goods_id} }" target="_blank">{{cart.goods_name}}</router-link>
											</p>
											<div class="msp_return">
												<template v-if="store.qitian == 1">
													<i class="return7"></i><span class="f_blue">{{i18n.cart2.support_hebdomad_gratuitous}}</span>
												</template>
												<!-- <template v-else>
													<i class="return7 return7-dark"></i><span class="f_dark">{{i18n.cart2.no_hebdomad_gratuitous}}</span>
												</template> -->
											</div>
										</div>
									</div>
									<div class="column t-props he87 stang">
										<p>{{cart.spec_key_name}}</p>
										<!--团购-->
										<img v-if="cart.prom_type == 2" width="80" height="60" src="@/static/images/groupby2.jpg" style="vertical-align:middle">
										<img v-if="cart.prom_type == 1" width="80" height="60" src="@/static/images/qianggou2.jpg" style="vertical-align:middle">
										<!--抢购-->
									</div>
									<div class="column t-price">
										<span>{{i18nCommon.symbol}}{{cart.goods_price}}</span>
									</div>
									<div class="column t-quantity quantity-form">
										<el-input-number v-model="cart.goods_num" @change="changeNum(cart)" :min="1" :max="9999" size="mini"></el-input-number>
									</div>
									<div class="column sumpri" :style="lang=='zh'?'width:138px':'width:100px'">
										<span>{{i18nCommon.symbol}}{{cart.total_fee}}</span>
									</div>
									<div class="column t-action">
										<el-row>
											<el-popover v-model="cart.deleteVisible" width="160">
												<i class="el-icon-warning" style="color: rgb(255, 153, 0);"></i>
												<p style="display: inline-block;">{{i18n.index.del_goods}}？</p>
												<div class="btns">
													<el-button type="text" size="mini" @click="clickDeleteItem(cart)">{{i18n.del}}</el-button>
													<el-button type="text" size="mini" @click="cart.deleteVisible=false">{{i18n.cancel}}</el-button>
													<!-- <el-button type="danger" size="mini" @click="clickAddGoodsCollection(cart)">{{i18n.index.add_collect}}</el-button> -->
												</div>
												<el-button slot="reference" size="mini" type="danger" plain>{{i18n.del}}</el-button>
											</el-popover>
											<el-button size="mini" type="primary" plain @click="clickAddGoodsCollection(cart)">{{i18n.index.add_collect}}</el-button>
										</el-row>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="shoplist_deta floatflex">
				<div class="w1224">
					<div class="edge_tw_foot">
						<div class="item-single p">
							<div class="breadth_phase vermidd">
								<div class="column">
									<el-checkbox v-model="cartSelectAll" @change="checkAllCart()">{{i18n.index.all_ck}}</el-checkbox>
									<a class="mal18 deleteGoods deleteAll" @click="deleteChooseCart()">{{i18n.index.del_ck_goods}}</a>
									<a class="mal18 moveCollect collectAll" @click="collectChooseCart()">{{i18n.index.add_collect}}</a>
								</div>
							</div>
							<div class="row_foot_last">
								<div class="column t-quantity">
									<span class="chosewell chosew-add">
										{{i18n.index.end_ck}}
										<em>{{cartBill.order.goods_num}}</em>{{i18n.index.c_goods}}
									</span>
								</div>
								<div class="column widallr">
									<div class="butpayin">
										<router-link class="paytotal" :to="{ name:'cart/cart2/id'}">
											{{i18n.index.go_close}}
										</router-link>
									</div>
									<div class="totalprice">
										<span class="car_sumprice">
											{{i18n.index.total_prices}}：
											<em>{{i18nCommon.symbol}}{{cartBill.order.order_amount}}</em>
											<i class="bulb"></i>
										</span>
										<div class="price-tipsbox">
											<div class="ui-tips-main">{{i18n.index.no_freight_and_clothing}}</div>
											<span class="price-tipsbox-arrow"></span>
										</div>
										<span class="car_conta" v-if="cartBill.order.cut_fee > 0">
											{{i18n.index.have_to_save}}：
											<em>-{{i18nCommon.symbol}}{{cartBill.order.cut_fee}}</em>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--  -->
		<div class="shoplist_guess">
			<div class="w1224">
				<div class="main_shopcarlist">
					<div class="li3_address folahov p">
						<ul>
							<li>
								<a href="javascript:void(0);" :class="{red:contentTab==1}" @click="clickContentTab(1)">	{{i18n.index.you_like}}</a>
							</li>
							<li>
								<a href="javascript:void(0);" :class="{red:contentTab==2}" @click="clickContentTab(2)">{{i18n.index.i_collect}}</a>
							</li>
						</ul>
					</div>
					<!-- 轮播 -->
					<div class="totalswitch">
						<div class="switchable-panel" v-if="contentTab==1">
							<div class="s-panel-main">
								<el-carousel indicator-position="outside">
									<el-carousel-item v-for="(page,pageIndex) in Math.ceil(guessYoulikeGoodsList.length / 4)" :key="pageIndex">
										<div class="goods-panel jsaddsucc p">
											<ul>
												<template v-for="(item,index) in guessYoulikeGoodsList">
													<li v-if="Math.floor(index / 4) == pageIndex" :key="index">
														<div class="itemgoodbox">
															<div class="p-img">
																<router-link :to="{ name:'goods/goodsInfo/id' , query:{id:item.goods_id}}">
																	<img :src="apiHead + '/mall/goods/thumb_image?width=160&height=160&goods_id=' + item.goods_id" />
																</router-link>
															</div>
															<div class="p-name">
																<router-link :to="{ name:'goods/goodsInfo/id' , query:{id:item.goods_id}}">
																	{{item.goods_name}}
																</router-link>
															</div>
															<div class="p-price">
																<strong>
																	<em>{{i18nCommon.symbol}}</em>
																	<i>{{item.shop_price}}</i>
																</strong>
															</div>
															<div class="p-btn-adc">
																<router-link :to="{ name:'goods/goodsInfo/id' , query:{id:item.goods_id}}">
																	<div class="btn-append"><b></b>{{i18n.index.join_catr}}</div>
																</router-link>
															</div>
														</div>
													</li>
												</template>
											</ul>
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="switchable-panel" v-if="contentTab==2">
							<div class="s-panel-main" v-if="collectionGoodsList.length == 0">
								<p class="wefoc">{{i18n.index.no_results}}</p>
							</div>
							<div class="s-panel-main" v-else>
								<el-carousel indicator-position="outside">
									<el-carousel-item v-for="(page,pageIndex) in Math.ceil(collectionGoodsList.length / 4)" :key="pageIndex">
										<div class="goods-panel jsaddsucc p">
											<ul>
												<template v-for="(item,index) in collectionGoodsList">
													<li v-if="Math.floor(index / 4) == pageIndex" :key="index">
														<div class="itemgoodbox">
															<div class="p-img">
																<router-link :to="{ name:'goods/goodsInfo/id' , query:{id:item.goods_id}}">
																	<img :src="apiHead + '/mall/goods/thumb_image?width=160&height=160&goods_id=' + item.goods_id" />
																</router-link>
															</div>
															<div class="p-name">
																<router-link :to="{ name:'goods/goodsInfo/id' , query:{id:item.goods_id}}">
																	{{item.goods_name}}
																</router-link>
															</div>
															<div class="p-price">
																<strong>
																	<em>{{i18nCommon.symbol}}</em>
																	<i>{{item.shop_price}}</i>
																</strong>
															</div>
															<div class="p-btn-adc">
																<router-link :to="{ name:'goods/goodsInfo/id' , query:{id:item.goods_id}}">
																	<div class="btn-append"><b></b>{{i18n.index.join_catr}}</div>
																</router-link>
															</div>
														</div>
													</li>
												</template>
											</ul>
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TopBar from "@/components/TopBar/index.vue";
	import Adv from "@/components/Adv/index.vue";
	import {
		mapState
	} from "vuex";
	import {
		getCartBill,
		updateCart,
		getGuessYouLike,
		collectionRecords,
		deleteCart,
		addGoodsCollection,
		addGoodsCollectionList
	} from "@/utils/api";

	export default {
		data() {
			return {
				words: '',
				cartBill: {
					order: {},
					store_cart_list: []
				},
				cartSelectAll: true,
				cartGoodsNum: 0,
				guessYoulikeGoodsList: [],
				collectionGoodsList: [],
				contentTab: 1
			};
		},
		computed: {
			...mapState(['shop_config', 'shop_basic']),
			i18n () {
			  return this.$t('cart')  
			},
			i18nCommon () {
				return this.$t('common')  
			}, 
			lang () {
			  return this.$t('lang')  
			}
		},
		created() {
			this._getCartBill()
			this.getGuessYouLikeGoods()
			this.getCollectionRecords()
		},
		components: {
			TopBar,
			Adv
		},
		methods: {
			_getCartBill() {
				getCartBill().then((res) => {
					this.cartBill = res
					this.cartGoodsNum = 0
					this.initCartList()
				})
			},
			initCartList(){
				this.cartSelectAll = true
				if (this.cartBill.store_cart_list.length > 0) {
					for (var storeIndex = 0; storeIndex < this.cartBill.store_cart_list.length; storeIndex++) {
						this.cartBill.store_cart_list[storeIndex].selected = true
						for (var cartIndex = 0; cartIndex < this.cartBill.store_cart_list[storeIndex].cart_list.length; cartIndex++) {
							this.cartGoodsNum++
							if (this.cartBill.store_cart_list[storeIndex].cart_list[cartIndex].selected != 1) {
								this.cartBill.store_cart_list[storeIndex].selected = false
								this.cartBill.store_cart_list[storeIndex].deleteVisible = false
								this.cartSelectAll = false
							}
						}
					}
				}
			},
			//单选
			checkCart(cart) {
				var that = this
				updateCart([{
					id: cart.id,
					selected: cart.selected
				}]).then((res) => {
					that._getCartBill()
				})
			},
			//单选店铺
			checkStoreCart(store){
				var that = this
				var cartList = []
				store.cart_list.forEach(function(cart) {
					if(store.selected == true){
						cart.selected = 1
						cartList.push({
							id: cart.id,
							selected: cart.selected
						})
					}else{
						cart.selected = 0
						cartList.push({
							id: cart.id,
							selected: cart.selected
						})
					}
				});
				updateCart(cartList).then((res) => {
					that._getCartBill()
				})
			},
			//全选
			checkAllCart() {
				var cartList = []
				var that = this
				for (var storeIndex = 0; storeIndex < this.cartBill.store_cart_list.length; storeIndex++) {
					for (var cartIndex = 0; cartIndex < this.cartBill.store_cart_list[storeIndex].cart_list.length; cartIndex++) {
						if (this.cartBill.store_cart_list[storeIndex].cart_list[cartIndex].selected != 1) {
							if (this.cartSelectAll) {
								cartList.push({
									id: this.cartBill.store_cart_list[storeIndex].cart_list[cartIndex].id,
									selected: 1
								})
							}
						} else {
							if (!this.cartSelectAll) {
								cartList.push({
									id: this.cartBill.store_cart_list[storeIndex].cart_list[cartIndex].id,
									selected: 0
								})
							}
						}
					}
				}
				updateCart(cartList).then((res) => {
					that._getCartBill()
				})
			},
			deleteChooseCart(){
				var that = this
				var cartIds = []
				this.cartBill.store_cart_list.forEach(function(storeCart) {
					storeCart.cart_list.forEach(function(cart) {
						if(cart.selected == 1){
							cartIds.push(cart.id)
						}
					})
				});
				if(cartIds.length <= 0){
					this.$message({
						message: that.i18n.index.there_nodelete,
						type: "warning"
					});
					return
				}
				var that = this
				deleteCart(cartIds.join(",")).then(function(res) {
					that._getCartBill()
				});
			},
			collectChooseCart(){
				var that = this
				var cartIds = []
				this.cartBill.store_cart_list.forEach(function(storeCart) {
					storeCart.cart_list.forEach(function(cart) {
						if(cart.selected == 1){
							cartIds.push(cart.goods_id)
						}
					})
				});
				if(cartIds.length <= 0){
					this.$message({
						message: that.i18n.index.there_nodelete,
						type: "warning"
					});
					return
				}
				addGoodsCollectionList(cartIds.join(",")).then(function(res) {
					that.$message({
						message: that.i18n.index.added_favorites,
						type: "success"
					});
				    that.getCollectionRecords()
				});
			},
			//移至收藏
			clickAddGoodsCollection(cart) {
				var that = this
				addGoodsCollection(cart.goods_id).then(function(res) {
					cart.deleteVisible = false
					that.$message({
						message: that.i18n.index.added_favorites,
						type: "success"
					});
					that.getCollectionRecords()
				});
			},
			
			//更改购物车数量
			changeNum(cart) {
				var that = this
				updateCart([{
					id: cart.id,
					goods_num: cart.goods_num
				}]).then((res) => {
					that._getCartBill()
				})
			},
			//删除单条购物车
			clickDeleteItem(cart) {
				var that = this
				deleteCart(cart.id).then(function(res) {
					that._getCartBill()
				});
			},
			getGuessYouLikeGoods() {
				var that = this
				getGuessYouLike({
					size: 12
				}).then(function(res) {
					that.guessYoulikeGoodsList = res
				});
			},
			getCollectionRecords() {
				var that = this
				collectionRecords({
					size: 12
				}).then(function(res) {
					that.collectionGoodsList = res.records
				});
			},
			clickContentTab(val) {
				this.contentTab = val
			},
			getOrderByStoreId(storeId){
				var that = this
				for (var storeIndex = 0; storeIndex < that.cartBill.order.order_list.length; storeIndex++) {
					if(that.cartBill.order.order_list[storeIndex].store_id == storeId){
						return that.cartBill.order.order_list[storeIndex];
					}
				}
				return null
			},
		}
	};
</script>

<style scoped>
    .btns{
		text-align: right; 
		margin: 0;
	}

    .btns button:nth-child(2){
		color: #000000;
	}
    
    .wptez a{
		margin: 0 10px;
	}

	.edge_tw_box{
		max-height: 400px;
		overflow: auto;
	}

	.tphsop2_0 .header .ecsc-search .keyword {
		left: 0px;
	}

	.ecsc-search {
		margin: 10px 0 0 150px;
		width: 500px;
	}

	>>>.el-row .el-button {
		margin-top: 4px;
	}

	>>>.ecsc-search .el-select .el-input {
		width: 76px;
	}

	>>>.ecsc-search .input-with-select .el-input__inner {
		border: 1px solid #e23435;
		border-radius: 0px;
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
		border: 0px
	}

	>>>.ecsc-search .el-input-group {
		border: 2px solid #e23435;
	}

	>>>.ecsc-search .el-input__inner:focus {
		border-color: #e65758;
	}
</style>

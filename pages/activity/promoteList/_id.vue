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
					<a>{{i18n.promoteList.all_result}}</a>
					<i class="litt-xyb"></i>
					<span>{{i18n.promoteList.promotion}}</span>
				</div>
			</div>
		</div>
		<div class="shop-list-tour p">
			<div class="w1224">
				<div class="stsho pre-sts">
					<div class="shop-list-splb pre-set-suma p">
						<ul>
							<li v-for="(item,index) in goodlist" :key="index">
								<router-link target="_blank" class="seckill_mod_goods_link" :to="{name:'goodsInfo',query:{id:item.goods_id}}">
									<div class="s_xsall">
										<div class="xs_img">
											<a target="_blank">
												<img class="lazy-list" :src="apiHead + '/mall/goods/thumb_image?goods_id='+ item.goods_id+'&width=400&height=400'"
												 style="display: inline;">
											</a>
										</div>
										<div class="shop_name2">
											<a target="_blank">{{item.goods_name}}</a>
										</div>
										<div class="price-tag">
											<span class="now"><em class="li_xfo">{{i18nCommon.symbol}}</em><em>{{item.market_price}}</em></span>
											<span class="pre-per">{{item.prom_goods.type_desc}}</span>
											<div class="sjs-olde p">
												<!--<p class="old ma0"><em>{{i18nCommon.symbol}}</em><em>200.00</em></p>-->
												<p class="djs-cctime"><span id="surplus_text3017">{{item.word}}</span><br></p>
											</div>
										</div>
									</div>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
		 :page-sizes="[5, 10, 15, 20]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
	</div>
</template>

<script>
	import SearchBox from "@/components/SearchBox/index.vue";
	import TopBar from "@/components/TopBar/index.vue";
	import {
		getPromGoods
	} from "@/utils/api.js";
	import common from "@/utils/common.js";
	export default {
		data() {
			return {
				total: 0, //数据总条数
				goodlist: null,
				params: {
					page: 1, //当前页
					size: 10 //每页数据条数
				},
				timer: null
			};
		},
		components: {
			SearchBox,
			TopBar
		},
		created() {
			this._getPromGoods(this.params);
			this.setTime()
		},
		computed: {
			i18n() {
				return this.$t('activity')
			},
			i18nCommon () {
				return this.$t('common')  
			}
		},
		methods: {
			_getPromGoods(params) {
				getPromGoods(params).then(res => {
					if (res) {
						this.goodlist = res.records;
						console.log(this.goodlist)
						this.total = res.total;
						this.params.page = res.current;
					}
				});
			},
			handleSizeChange(e) {
				this.params.size = e;
				this._getPromGoods(this.params);
			},
			handleCurrentChange(e) {
				this.params.page = e;
				this._getPromGoods(this.params);
			},
			setTime() {
				var that = this;
				this.timer = setInterval(function() {
					var time = new Date()
					var now_time = Math.round(time.getTime() / 1000)
					if (!that.goodlist) {
						return
					}
					that.goodlist.forEach(function(item) {
						if (now_time < item.prom_goods.start_time) {
							item.word = `${that.i18n.promoteList.residue}${common.remainTime((item.prom_goods.start_time-now_time)*1000)} ${that.i18n.promoteList.begin}`
						} else if (now_time > item.prom_goods.start_time && now_time < item.prom_goods.end_time) {
							item.word = `${that.i18n.promoteList.residue}${common.remainTime((item.prom_goods.end_time-now_time)*1000)} ${that.i18n.promoteList.finish}`
						} else {
							item.word = that.i18n.promoteList.finished
						}
					});
					that.$forceUpdate()
				}, 1000);
			}
		},
		destroyed() {
			clearInterval(this.timer)
		}
	};
</script>

<style scoped>
</style>

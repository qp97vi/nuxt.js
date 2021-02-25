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
		<search-box :sidebarShow='false'></search-box>
		<div class="yhqmaincoupan">
			<img class="maitos" src="@/static/images/getyhq_01.jpg" />
			<span v-if="resultData.status == 1">
				<div class="rebyikoe">
					<h1 style="font-size: .64rem !important;">{{i18n.get_coupon.congratulation_you_snag}}{{coupon.money}}{{i18n.get_coupon.discount_coupon}}!</h1>
					<p>{{i18n.get_coupon.coupon_gets}}</p>
					<p class="ma-to-50"><em id="wait">{{count}}</em>
						<span>{{i18n.get_coupon.automatically_skip}}</span>
					</p>
				</div>
			</span>
			<span v-else>
				<div class="rebyikoe" style="display: block;">
					<img src="@/static/images/redpack.png" style="display: inline-block;vertical-align: middle;" />
					<p style="display: inline-block;vertical-align: middle;font-size: 16px;color: #ef465a;">
						{{resultData.msg}}
					</p>
					<p class="ma-to-50"><em id="wait">{{count}}</em>
						<span>{{i18n.get_coupon.automatically_skip}}</span>
					</p>
				</div>
			</span>
			<div class="maibos">
				<div class="maleri100">
					<div class="buttomretuandclos">
						<nuxt-link :to="{name:'coupon_list'}">{{i18n.get_coupon.return_activity}}</nuxt-link>
						<a href="javascript:window.close()">{{i18n.get_coupon.out_page}}</a>
					</div>
					<div class="questionsany">
						<p class="title-qsm">{{i18n.get_coupon.explain}}</p>
						<!--						<p class="title-qsm">常见问题</p>
								<p><a href="">1、优惠券有哪些类型？</a></p>
								<p><a href="">2、什么品类优惠券？</a></p>
								<p><a href="">3、如何查看优惠券？</a></p>
								<p><a href="">4、如何使用优惠券？</a></p>
								<p><a href="">5、优惠券的使用规则？</a></p>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getCoupon,
		exchangeCoupon
	} from "@/utils/api.js";
	import TopBar from "@/components/TopBar/index.vue";
	import SearchBox from "@/components/SearchBox/index.vue";
	export default {
		data() {
			return {
				coupon_id: this.$route.query.id,
				coupon: {},
				resultData: {},
				count: 5, //几秒后页面跳转
			};
		},
		created() {
			this.exchangeCoupon();
		},
		methods: {
			exchangeCoupon() {
				var _this = this;
				exchangeCoupon({
					cid: this.coupon_id
				}).then(res => {
					_this.resultData = res;
					_this.getCoupon();
				}).then(() => {
					if (!_this.timer) {
						_this.show = false
						_this.timer = setInterval(() => {
							if (_this.count > 0) {
								_this.count--
							} else {
								_this.show = true
								clearInterval(_this.timer)
								_this.timer = null
								// 跳转到优惠券领取页面
								_this.$router.push({ name: "coupon_list" });
							}
						}, 1000)
					}
				})
			},
			getCoupon() {
				getCoupon(this.coupon_id).then(res => {
					this.coupon = res;
				})
			}
		},
		computed: {
			i18n () {  
			  return this.$t('activity')  
			} 
		},
		components: {
			SearchBox,
			TopBar
		}
	}
</script>

<style scoped="scoped">
	a {
		text-decoration: none;
	}

	.yhqmaincoupan {
		width: 1224px;
		margin: 0 auto;
		background: #fff3e3;
	}

	.yhqmaincoupan .maitos {
		width: 1224px;
		height: 286px;
	}

	.maleri100 {
		margin: 0 auto;
		margin: 0 100px;
	}

	.buttomretuandclos {
		text-align: center;
		padding: 30px 0 33px 0;
		border-bottom: 1px solid #f0e2cf;
	}

	.buttomretuandclos a {
		display: inline-block;
		width: 120px;
		height: 44px;
		line-height: 44px;
		text-align: center;
		color: white;
		background: #ef465a;
		border-radius: 10px;
		text-decoration: none;
		margin: 0 25px;
		transition: all .2s ease-in 0s;
		-webkit-transition: all .2s ease-in 0s;
		-moz-transition: all .2s ease-in 0s;
		-o-transition: all .2s ease-in 0s;
	}

	.buttomretuandclos a:hover {
		background: rgba(239, 70, 90, .8);
	}

	.questionsany {
		padding: 40px 0;
		position: relative;
	}

	.questionsany p {
		font-size: 12px;
		padding: 6px 0px;
	}

	.questionsany p a {
		color: #015ea8;
	}

	.title-qsm {
		font-weight: 600;
	}

	.rebyikoe {
		text-align: center;
		margin-top: -62px;
	}

	.rebyikoe h1 {
		color: #e7182e;
		font-size: 28px;
	}

	.rebyikoe p {
		color: #906c38;
		font-size: 14px;
	}

	.ma-to-50 {
		margin-top: 50px;
	}
</style>

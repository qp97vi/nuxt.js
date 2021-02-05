
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
		<div class="footer p">
			<div class="mod_service_inner">
				<div class="w1224">
					<ul>
						<li>
							<div class="mod_service_unit">
								<h5 class="mod_service_duo">{{i18n.foot.more}}</h5>
								<p>{{i18n.foot.many}}</p>
							</div>
						</li>
						<li>
							<div class="mod_service_unit">
								<h5 class="mod_service_kuai">{{i18n.foot.quick}}</h5>
								<p>{{i18n.foot.fast}}</p>
							</div>
						</li>
						<li>
							<div class="mod_service_unit">
								<h5 class="mod_service_hao">{{i18n.foot.well}}</h5>
								<p>{{i18n.foot.goods}}</p>
							</div>
						</li>
						<li>
							<div class="mod_service_unit">
								<h5 class="mod_service_sheng">{{i18n.foot.province}}</h5>
								<p>{{i18n.foot.save}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="w1224">
				<div class="footer-ewmcode">
					<div class="foot-list-fl">
						<div class="foot-list-wrap p">
							<ul v-for="(cat,catIndex) in directory" :key="catIndex">
								<li class="foot-th">{{cat.cat_name}}</li>
								<li v-for="(item,index) in cat.articles" :key="index">
									<router-link :to="{path:'/article/detail',query:{id:item.article_id}}">{{item.title}}</router-link>
								</li>
							</ul>
						</div>
						<div class="friendship-links p">
							<span>{{i18n.foot.blogroll}} :</span>
							<div class="links-wrap-h p">
								<a :href="flink.link_url" v-for="flink in friendLinks" :key="flink.link_id" :target="flink.target == 1 ? '_blank' : '_self'">{{flink.link_name}}</a>
							</div>
						</div>
					</div>
					<div class="right-contact-us">
						<h3 class="title">{{i18n.foot.customer_hotline}}（9:00-22:00）</h3>
						<span class="phone">{{$store.state.shop_config.phone}}</span>
						<h3 class="title">Email</h3>
						<span class="phone">{{$store.state.shop_config.email}}</span>
						<!-- 多语言暂时注释 -->
						<!-- <p class="tips">{{i18n.foot.official_wechat}}</p>
						<div class="qr-code-list clearfix">
							<a class="qr-code qr-code-tpshop" href="javascript:;">
								<img src="../../static/images/qrcode.png" alt />
							</a>
						</div> -->
					</div>
				</div>
				<div class="mod_copyright p">
					<div class="grid-top">
						<router-link :to="{name:'detail',query:{id: 11}}" target="_blank">{{i18n.foot.information_bulletin}}</router-link>
						<span>|</span>
						<router-link :to="{name:'detail',query:{id: 1}}" target="_blank">{{i18n.foot.business_process}}</router-link>
						<span>|</span>
					</div>
					<p v-if="$store.state.shop_config.store_entry_type == 0">
						Copyright © 2016-2025 {{i18n.foot.search_leopard}}:
						<a href="http://www.beian.miit.gov.cn">{{i18n.foot.case_number}}</a>
					</p>
					<p class="mod_copyright_auth" v-if="$store.state.shop_config.store_entry_type == 0">
						<a class="mod_copyright_auth_ico mod_copyright_auth_ico_1" href target="_blank">{{i18n.foot.language_one}}</a>
						<a class="mod_copyright_auth_ico mod_copyright_auth_ico_2" href target="_blank">{{i18n.foot.language_two}}</a>
						<a class="mod_copyright_auth_ico mod_copyright_auth_ico_3" href target="_blank">{{i18n.foot.language_therr}}</a>
						<a class="mod_copyright_auth_ico mod_copyright_auth_ico_4" href target="_blank">{{i18n.foot.language_four}}</a>
						<a class="mod_copyright_auth_ico mod_copyright_auth_ico_5" href target="_blank">{{i18n.foot.language_five}}</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getArticleList,
		getFriendLinkList
	} from "@/utils/api.js";
	export default {
		data() {
			return {
				directory: [],
				friendLinks: []
			};
		},
		mounted() {
			this.getArticleList()
			this.getFriendLinkList()
		},
		computed: {
			i18n () {  
			  return this.$t('components')  
			} 
		},
		created() {
		},
		components: {},
		methods: {
			getArticleList() {
				var that = this;
				getArticleList({
					is_show:1,
					size: 5
				}).then(function(res) {
					that.directory = res
				});
			},
			getFriendLinkList() {
				var that = this;
				getFriendLinkList().then(res => {
					that.friendLinks = res;
				})
			}
		}
	};
</script>

<style scoped>
</style>


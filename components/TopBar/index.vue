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
		<div class="top-hander p">
			<div class="w1224 pr">
				<div class="fr">
					<div class="ls-dlzc fl islogin" v-if="user">
						<nuxt-link :to="{name:'user/index/user_index'}">{{nickname}}</nuxt-link>
						<!-- <a class="red userinfo">{{user.nickname}}</a> -->
						<a @click="quit()">{{i18n.topBar.index.quit}}</a>
					</div>
					<div class="ls-dlzc fl islogin" v-else>
						<nuxt-link class="link" active-class="active" :to="{name:'login'}">
							<a class="userinfo">{{i18n.topBar.index.login}}</a>
						</nuxt-link>
						<nuxt-link to="/reg" class="red">{{i18n.topBar.index.reg}}</nuxt-link>
						<!-- <a class="red">注册</a> -->
					</div>
					<div class="fl spc" style="margin-top:10px"></div>
					<el-popover style="float:left;" placement="bottom" v-model="popoverShow" width="300" trigger="click">
						<div class="popover-content">
							<el-form>
								<span v-if="is_code">
								<el-divider   content-position="left">{{i18n.topBar.index.import_area}}</el-divider>
								<el-form-item  :label="i18n.topBar.index.region">
									<el-input id="index-input" size="mini" v-model="postCode" :placeholder="i18n.topBar.index.please_fill_area"
									 style="width: 160px;"></el-input>
									<el-button type="danger" @click="getAddress" size="mini" style="margin-left: 15px;">{{i18n.topBar.index.confirm}}</el-button>
								</el-form-item>
								</span>
								<span  v-if="is_address">
								<el-divider   content-position="left">{{i18n.topBar.index.please_address}}</el-divider>
								<el-form-item  :label="i18n.topBar.index.site">
									<!-- <Regions ref="region" :initVal="oldAddress" @choose="getRegion" :isCache="isCache"></Regions> -->
								</el-form-item></span>
								<!-- <el-form-item>
		  			    <el-button type="danger" @click="popoverShow = false" size="mini">提交</el-button>
		  			  </el-form-item> -->
							</el-form>
						</div>
						<el-input id="region-input" size="mini" slot="reference" v-model="region" :placeholder="i18n.topBar.index.select_address"
						 readonly></el-input>
					</el-popover>
					<!-- <Regions :initVal="oldAddress" @choose="getRegion" isCache="true" style="float:left" v-if="$route.name != 'goodsInfo'"></Regions> -->
					<div style="float: right;width: 80px;text-align: center;">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link">
								<span v-if="$i18n.locale == 'zh_CN'">简体</span>

								<span v-else-if="$i18n.locale == 'en_US'">English</span>
								<span v-else-if="$i18n.locale == 'cf_CN'">繁体</span><i class="el-icon-arrow-down el-icon--right"></i></span>

							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="zh_CN">中文</el-dropdown-item>

								<el-dropdown-item command="en_US">English</el-dropdown-item>
								<el-dropdown-item command="cf_CN">繁体</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>

				<div class="top-ri-header fl">
					<ul>
						<li>
							<nuxt-link target="_blank" :to="{name:'user/index/order_list/id'}">{{i18n.topBar.index.order}}</nuxt-link>
						</li>
						<li class="spacer"></li>
						<li>
							<nuxt-link target="_blank" :to="{name:'user/index/account'}">{{i18n.topBar.index.account}}</nuxt-link>
						</li>
						<li class="spacer"></li>
						<li>
							<nuxt-link target="_blank" :to="{name:'user/index/coupon'}">{{i18n.topBar.index.coupon}}</nuxt-link>
						</li>
						<li class="spacer"></li>
						<li>
							<nuxt-link target="_blank" :to="{name:'user/index/goods_collect/id'}">{{i18n.topBar.index.goods_collect}}</nuxt-link>
						</li>
						<li class="spacer"></li>
						<li class="hover-ba-navdh">
							<div class="nav-dh">
								<span>{{i18n.topBar.index.service}}</span>
								<i class="jt-x"></i>
								<div class="conta-hv-nav">
									<ul>
										<li>
											<a :href="$store.state.sellerUrl" :title="i18n.topBar.index.business" target="_blank">{{i18n.topBar.index.business}}</a>
										</li>
										<li>
											<nuxt-link :to="{ name: 'newjoin/index/newjoin_index'}">{{i18n.topBar.index.help}}</nuxt-link>
										</li>
									</ul>
								</div>
							</div>
						</li>
						<li class="spacer"></li>
						<!-- <li>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
          <span v-if="$i18n.locale == 'zh_CN'">中文</span>
          <span v-else-if="$i18n.locale == 'en_US'">English</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh_CN">中文</el-dropdown-item>
            <el-dropdown-item command="en_US">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li> -->
						<li class="navoxth">
							<div class="nav-dh">
								<i class="fl ico"></i>
								<span class="moblie_right">手机商城</span>
								<i class="jt-x"></i>
							</div>
							<div class="sub-panel m-lst" style="margin-right: 660px;">
								<p>扫一扫，下载商城客户端</p>
								<dl>
									<dt class="fl mr10">
										<a target="_blank " v-if="value==1" href=" ">
											<img height="80" width="80" img-url="" id=" qcode_img " :src="andiord_code" />
										</a>
										<a target="_blank " v-if="value==2" href=" ">
											<img height="80" width="80" img-url="" id=" qcode_img " :src="iphone_code" />
										</a>
									</dt>
									<dd class="fl mb10">
										<a href="javascript:void(0)" img-url="../../images/919and.png " @click="set_img(1) " id="qcode_img_and ">
											<i class="andr"></i> Andiord
										</a>
									</dd>
									<dd class="fl">
										<a href="javascript:void(0)" img-url="../../images/919ios.png " @click="set_img(2) ">
											<i class="iph"></i> iPhone
										</a>
									</dd>
								</dl>
							</div>
						</li>
						<li class="spacer"></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		removeToken,
		removeUser,
		getUser,
		setLocation,
		getLocation
	} from "@/utils/auth.js";
	import {
		getShopConfig,
		logout,
		getAddress
	} from "@/utils/api";
	import Regions from "@/components/Regions";
	export default {
		data() {
			return {
				nickname: '',
				postCode: "", //邮编
				region: "",
				popoverShow: false,
				user: getUser(),
				oldAddress: ["送货至:"],
				lang: '',
				isCache: true,
				andiord_code: '', //安卓二维码
				iphone_code: '', //iOS二维码
				value: 1,
				is_address:false,
				is_code:false,
				
			};
		},
		components: {
			Regions
		},
		created() {
			let that = this
			 that.getPayConfig();
			if(process.client) {
				this.postCode = "" || getLocation().label[getLocation().label.length - 1]
				 this.region = getLocation().label.join(",") 
				 that.$emit("site",getLocation());
			}
			if (that.user != null) {
				if (that.user.nickname != '') {
					that.nickname = that.user.nickname
				} else if (that.user.email != '') {
					that.nickname = that.user.email
				} else if (that.user.mobile != '') {
					that.nickname = that.user.mobile
				}
			}
			// that.andiord_code = that.$store.state.shop_basic.andiord_code
			// that.iphone_code = that.$store.state.shop_basic.iphone_code
			// this.$emit("site",data)
		},
		computed: {
			i18n() {
				return this.$t('components')
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
					console.log(that.is_code);
					console.log(that.is_address);
				})
			},

			set_img(e) {
				this.value = e
			},
			quit() {
				var that = this;
				logout().then(function(res) {
					removeToken();
					removeUser();
					that.$router.push({
						name: "login"
					});
				});
			},
			getRegion(data) {
				this.$emit("site", data)
				var address = ""
				data.label.forEach(name => {
					address += name + ","
				})
				this.region = address.substr(0, address.length - 1);
				this.postCode = data.label[data.label.length - 1];
				this.popoverShow = false
			},
			handleCommand(command) {
				this.$i18n.locale = command
				localStorage.setItem("language", command)
			},
			getAddress() {
				var that = this;
				getAddress({
					name: this.postCode
				}).then(res => {
					if (res.status < 0) {
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
						this.$emit("site", location);
						that.region = address.substr(0, address.length - 1);
						setLocation(location);
						that.isCache = false;
						that.oldAddress = address.substr(0, address.length - 1);
						that.popoverShow = false
					}
				})
			}
		}
	};
</script>

<style scoped>
</style>

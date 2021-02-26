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
    <div class="top-hander home-index-top p">
      <div class="w1224 pr">
        <div class="fl">
          <div class="fl ler" v-if="bool">
            <div class="fl ler">
              <nuxt-link :to="{name:'user/index/user_index'}">{{userInfo.nickname}}</nuxt-link>
            </div>
            <div class="fl ler">
              <nuxt-link :to="{name:'message_notice'}">
                {{i18n.topBar.index2.news}}（
                <span class="red">{{newsNub}}</span>）
              </nuxt-link>
            </div>
            <div class="fl ler">
              <span @click="quit()" style="cursor: pointer;">{{i18n.topBar.index2.quit}}</span>
            </div>
          </div>
          <div class="fl ler" v-else>
            <nuxt-link class="link" active-class="active" to="/login">
              <a class="userinfo">{{i18n.topBar.index2.login}}</a>
            </nuxt-link>
            <nuxt-link to="/reg" class="red">{{i18n.topBar.index2.reg}}</nuxt-link>
          </div>
          <div class="fl spc"></div>
          <div class="sendaddress pr fl">
            <!-- 收货地址，物流运费 -start-->
            <ul class="list1">
              <li class="jaj" style="display: flex;">
                <span>{{i18n.topBar.index2.distribution}}：</span>
                <!-- <reg-ions :initVal="oldAddress" isCache="true"></reg-ions> -->
				<el-popover
					style="float:left;"
				    placement="bottom"
					v-model="popoverShow"
				    width="300"
				    trigger="click">
					<div class="popover-content">
						<el-form>
							<span v-if="is_code">
							 <el-divider content-position="left">{{i18n.topBar.index.please_address}}</el-divider>
							<el-form-item :label="i18n.topBar.index.site">
								<Regions ref="region" :initVal="oldAddress" @choose="getRegion" :isCache="isCache" ></Regions>
							</el-form-item>
							</span>
							<span  v-if="is_address">
							 <el-divider content-position="left">{{i18n.topBar.index.import_area}}</el-divider>
							<el-form-item :label="i18n.topBar.index.region">
								<el-input id="index2-input" size="mini" v-model="postCode" :placeholder="i18n.topBar.index.please_fill_area" style="width: 160px;"></el-input>
								<el-button type="danger" @click="getAddress" size="mini" style="margin-left: 15px;">{{i18n.topBar.index.confirm}}</el-button>
							</el-form-item>
							</span>
							<!-- <el-form-item>
							    <el-button type="danger" @click="popoverShow = false" size="mini">提交</el-button>
							  </el-form-item> -->
						</el-form>
					</div>
					<el-input id="region-input" size="mini" slot="reference" v-model="region" :placeholder="i18n.topBar.index.select_address" readonly></el-input>
				  </el-popover>
              </li>
            </ul>
          </div>
        </div>
        <div class="top-ri-header fr">
          <ul>
            <li>
              <nuxt-link :to="{ name: 'user/index/order_list/id'}">{{i18n.topBar.index2.myorder}}</nuxt-link>
            </li>
            <li class="spacer"></li>
            <li>
              <nuxt-link :to="{ name: 'user/index/visit_log'}">{{i18n.topBar.index2.browse}}</nuxt-link>
            </li>
            <li class="spacer"></li>
            <li>
              <nuxt-link :to="{ name: 'user/index/goods_collect/id'}">{{i18n.topBar.index2.goods_collect}}</nuxt-link>
            </li>
            <li class="spacer"></li>
            <li class="hover-ba-navdh">
              <div class="nav-dh">
                <span>{{i18n.topBar.index2.service}}</span>
                <i class="jt-x"></i>
                <div class="conta-hv-nav">
                  <ul>
                    <li>
                      <a href="http://jseller.tpsns.com" target="_blank">{{i18n.topBar.index2.business}}</a>
                    </li>
                    <li>
                      <nuxt-link :to="{ name: 'newjoin/index/newjoin_index'}">{{i18n.topBar.index2.help}}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="spacer"></li>
            <li class="hover-ba-navdh">
              <div class="nav-dh">
                <span>{{i18n.topBar.index2.site_navigation}}</span>
                <i class="jt-x"></i>
                <div class="conta-hv-nav">
                  <ul>
                    <li>
						<nuxt-link :to="{ name: 'activity/group_list/id'}">{{i18n.topBar.index2.group_purchase}}</nuxt-link>
                    </li>
                    <li>
						<nuxt-link :to="{ name: 'activity/flash_sale_list/id'}">{{i18n.topBar.index2.rush_purchase}}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { exitLogin, getNews, getBaseInfo, getAddress,getShopConfig } from "@/utils/api.js";
import Regions from "@/components/Regions";
import { removeToken, removeUser, getToken,getUser, setLocation, getLocation } from "@/utils/auth.js";
export default {
  data() {
    return {
	  is_address:false,
	  is_code:false,
      newsNub: 0, //消息数量
      userInfo:getUser(), // 个人信息
      oldAddress: ["送货至:"],
      bool:getToken(),
	  popoverShow: false,
	  postCode: "", //邮编
	  region: "",
	  isCache: true
    };
  },
  created() {
	  if(process.client) {
			this.postCode = "" || getLocation().label[getLocation().label.length - 1]
			this.region = getLocation().label.join(",") 
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
    quit() {
      var _this = this;
      exitLogin().then((res) => {
        removeToken();
        removeUser();
        _this.$router.push({ name: "login" });
      });
    },
    news() {
      getNews().then((res) => {
        this.newsNub = res;
      });
    },
	getRegion(data) {
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
				that.region = address.substr(0, address.length - 1);
				setLocation(location);
				that.isCache = false;
				that.oldAddress=address.substr(0, address.length - 1);
				that.popoverShow = false
			}
		})
	}
  },
  computed: {
  	i18n () {  
      this.oldAddress= [this.$t('components.topBar.index2.delivery')]
  	  return this.$t('components')  
  	} 
  },
  created() {
	 this.getPayConfig();
    this.news();
  },
  components: {
    Regions,
  },
};
</script>

<style scoped>

</style>

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
    <el-dialog :title="i18n.AddCartPop.warm_prompt" :visible.sync="visible" width="500px" :before-close="handleClose">
      <div class="head">
        <i class="icon"></i>
        <div class="headTop">
          <span>{{i18n.AddCartPop.successfully_added}}</span>
        </div>
        <div class="btnBox">
          <div class="btn-shopp ui-button fl" @click="handleClose">{{i18n.AddCartPop.continue_shopping}}</div>
          <router-link :to="{ name: 'cart'}" class="btn-goCart ui-button fl">{{i18n.AddCartPop.shopping_cart}}</router-link>
          <!-- <div ></div> -->
        </div>
      </div>
      <div id="watch">
        <span>{{i18n.AddCartPop.topselling_item}}：</span>
        <ul class="fn-clear buy-list">
          <template>
            <li v-for="(item,index) in hotGoods" :key="index" v-if="index<4">
              <router-link
                :to="{name:'goodsInfo',query:{id:item.goods_id}}"
                class="watch-img"
                target="_parent"
              >
                <img :src="item.original_img" />
              </router-link>
              <h4>
                <router-link :to="{name:'goodsInfo',query:{id:item.goods_id}}">{{item.goods_name}}</router-link>
              </h4>
              <p>
                <q class="fn-rmb">{{i18nCommon.symbol}}</q>
                <strong class="fn-rmb-num">{{item.shop_price.toFixed(2)}}</strong>
              </p>
            </li>
          </template>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getGoods } from "@/utils/api.js";
export default {
  props: {
    visible: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      hideFalg: "",
      hotGoods: "",
    };
  },
  computed: {
    isHide: {
      get() {
        return this.hideFalg;
      },
      set(val) {
        this.hideFalg = val;
      },
    },
    i18n () {  
  	  return this.$t('components')  
  	},
    i18nCommon(){
      return this.$t("common")
    } 
  },
  methods: {
    handleClose() {
      this.hide = false;
      this.$emit("updateHide", this.hide);
    },
    getGoods() {
      let params = {
        is_hot: 1,
      };
      getGoods(params).then((res) => {
        this.hotGoods = res.records;
      });
    },
  },
};
</script>
<style scoped>
.head {
  position: relative;
  padding-left: 63px;
  padding-top: 8px;
}
.head .icon {
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  top: 0;
  left: 13px;
  background: url("../../static/images/detail/sprite.png") no-repeat;
  background-position: -151px 0px;
}
.head .btn-shopp {
}
.ui-button {
  display: block;
  height: 28px;
  text-align: center;
  line-height: 28px;
  color: #fff !important;
  background: url("../../static/images/detail/sprite.png") no-repeat;
}
.ui-button:hover {
  color: #fff !important;
  text-decoration: none;
}
.btn-shopp {
  color: #3c3c3c !important;
  width: 80px;
  background-position: -283px -285px;
}
.btn-shopp:hover {
  color: #f22e00 !important;
}
.btn-goCart {
  margin-left: 12px;
  width: 122px;
  background-position: 0px -326px;
}
.fl {
  float: left;
}
.btnBox {
  height: 28px;
  margin-top: 10px;
}
#watch q {
  font-family: Microsoft YaHei;
}
#watch strong {
  font-family: Tahoma;
}
#watch span {
  font-size: 12px;
  color: #6c6c6c;
  height: 43px;
  line-height: 38px;
  padding-left: 3px;
}
#watch ul {
  margin: 0px -8px;
  overflow: hidden;
}
#watch li {
  width: 100px;
  float: left;
  margin: 0 8px;
}
#watch li .watch-img {
  width: 100px;
  height: 100px;
  display: block;
  overflow: hidden;
  border: 1px solid #ddd;
}
#watch li .watch-img:hover {
  border-color: #f22e00;
}
#watch li .watch-img img {
  width: 100px;
  height: 100px;
}
#watch li h4 {
  color: #6c6c6c;
  height: 40px;
  line-height: 18px;
  overflow: hidden;
}
#watch li h4 a {
  color: #6c6c6c;
  font-size: 10px;
}
#watch li h4 a:hover {
  text-decoration: none;
  color: #f22e00;
}
#watch li p {
  color: #f22e00;
  font-size: 12px;
}
</style>
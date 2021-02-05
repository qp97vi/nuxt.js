<template>
  <div class="fr mytrial">
    <div class="nav">
      <ul>
        <li @click="switchstate(1)" :class="value=='1'?'action':''">全部申请</li>
        <li @click="switchstate(2)" :class="value=='2'?'action':''">申请中</li>
        <li @click="switchstate(3)" :class="value=='3'?'action':''">申请成功</li>
        <li @click="switchstate(4)" :class="value=='4'?'action':''">申请失败</li>
      </ul>
    </div>
    <div class="column_title">
      <ul>
        <li style="width: 497px">试用商品详情</li>
        <li style="width: 297px">状态</li>
        <li style="width: 198px">操作</li>
      </ul>
    </div>
    <div style="text-align: center;" v-if="value==1&&bool1==true">
      <ul class="try_list">
        <li v-for="(item,index) in order" :key="index">
          <div class="try_goods">
            <div class="try_time">申请时间：{{item.gmt_create}}</div>
            <div class="fl try_goods_info">
              <div class="fl try_img">
                <img
                  :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.trial_order_goods.goods_id"
                  alt
                />
              </div>
              <div class="fr try_info">
                <p>{{item.trial_order_goods.goods_name}}</p>
                <p>市场价：{{i18nCommon.symbol}}{{item.trial_order_goods.goods_price}}</p>
              </div>
            </div>
            <div class="fl try_status">
              <span v-if="item.is_paid==0">未支付</span>
              <span v-else-if="item.is_shipping==0&&item.is_paid==1&&item.is_refund==0">等待抽取</span>
              <span v-else-if="item.is_shipping==1&&item.is_paid==1&&item.is_refund==0">抽取完成待发货</span>
              <span v-else-if="item.is_shipping==2&&item.is_receive==0">已发货</span>
              <span v-else-if="item.is_shipping==2&&item.is_receive==1">已收货</span>
              <span v-else>申请失败</span>
              <p>
                商城价：
                <span>$0</span>
              </p>
            </div>
            <div style="text-align: center;" class="fl try_check">
              <p v-if="item.is_paid==0">
                <router-link :to="{name:'paymentOrderTrial',query:{order_sn:item.order_sn}}">去支付</router-link>
              </p>
              <span v-if="item.is_shipping==2&&item.is_receive==0">
                <el-button
                  size="small"
                  @click="toEdit(item.order_sn)"
                  icon="el-icon-edit-outline"
                >确认收货</el-button>
                <router-link :to="{name:'logistics_tracking',query:{order_sn:item.order_sn}}">查看物流</router-link>
              </span>
              <span v-if="item.is_shipping==2&&item.is_receive==1">
                <router-link :to="{name:'trailcomment',query:{order_sn:item.order_sn}}">
                  <el-button
                    v-if="item.is_shipping==2&&item.is_receive==1&&item.is_comment==0"
                    size="small"
                    icon="el-icon-edit-outline"
                  >评价</el-button>
                </router-link>
                <el-button
                  v-if="item.is_shipping==2&&item.is_receive==1&&item.is_comment==1"
                  size="small"
                  icon="el-icon-edit-outline"
                >已评价</el-button>
              </span>
              <p>
                <router-link :to="{name:'viewdetails',query:{trial_id:item.trial_id}}">查看详情</router-link>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
	<div v-if="value==1&&bool1==false" class="norecode">
        暂无记录！
	</div>
    <div style="text-align: center;" v-if="value==2&&bool2==true">
      <ul class="try_list">
        <li v-for="(item,index) in orders" :key="index">
          <div class="try_time">申请时间：{{item.gmt_create}}</div>
          <div class="try_goods">
            <div class="fl try_goods_info">
              <div class="fl try_img">
                <img
                  :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.trial_order_goods.goods_id"
                  alt
                />
              </div>
              <div v-if="item.trial_order_goods" class="fr try_info">
                <p>{{item.trial_order_goods.goods_name}}</p>
                <p>市场价：{{i18nCommon.symbol}}{{item.trial_order_goods.goods_price}}</p>
              </div>
            </div>
            <div class="fl try_status">
              <span v-if="item.is_paid==0">未支付</span>
              <span v-else-if="item.is_shipping==0&&item.is_paid==1&&item.is_refund==0">等待抽取</span>
              <span v-else-if="item.is_shipping==1&&item.is_paid==1&&item.is_refund==0">抽取完成待发货</span>
              <span v-else-if="item.is_shipping==2&&item.is_receive==0">已发货</span>
              <span v-else-if="item.is_shipping==2&&item.is_receive==1">已收货</span>
              <span v-else>申请失败</span>
              <p>
                商城价：
                <span>$0</span>
              </p>
            </div>
            <div class="fl try_check">
              <p v-if="item.is_paid==0">
                <router-link :to="{name:'paymentOrderTrial',query:{order_sn:item.order_sn}}">去支付</router-link>
              </p>
              <p>
                <router-link :to="{name:'viewdetails',query:{trial_id:item.trial_id}}">查看详情</router-link>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
	<div v-if="value==2&&bool2==false" class="norecode">
        暂无记录！
	</div>
    <div style="text-align: center;" v-if="value==3&&bool3==true">
      <ul class="try_list">
        <li v-for="(item,index) in ordershipping" :key="index">
          <div class="try_time">申请时间：{{item.gmt_create}}</div>
          <div class="try_goods">
            <div class="fl try_goods_info">
              <div class="fl try_img">
                <img
                  :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.trial_order_goods.goods_id"
                  alt
                />
              </div>
              <div v-if="item.trial_order_goods" class="fr try_info">
                <p>{{item.trial_order_goods.goods_name}}</p>
                <p>市场价：{{i18nCommon.symbol}}{{item.trial_order_goods.goods_price}}</p>
              </div>
            </div>
            <div class="fl try_status">
              <span v-if="item.is_shipping==0">未发货</span>
              <span v-else-if="item.is_shipping==1">抽取完成待发货</span>
              <span v-else-if="item.is_shipping==2&&item.is_receive==0">已发货</span>
              <span v-else-if="item.is_shipping==2&&item.is_receive==1">已收货</span>

              <span v-else>未发货</span>

              <p>
                商城价：
                <span>$0</span>
              </p>
            </div>
            <div class="fl try_check">
              <span v-if="item.is_shipping==2&&item.is_receive==0">
                <el-button
                  size="small"
                  @click="toEdit(item.order_sn)"
                  icon="el-icon-edit-outline"
                >确认收货</el-button>
                <router-link :to="{name:'logistics_tracking',query:{order_sn:item.order_sn}}">查看物流</router-link>
              </span>
              <span v-if="item.is_shipping==2&&item.is_receive==1">
                <router-link :to="{name:'trailcomment',query:{order_sn:item.order_sn}}">
                  <el-button
                    v-if="item.is_shipping==2&&item.is_receive==1&&item.is_comment==0"
                    size="small"
                    icon="el-icon-edit-outline"
                  >评价</el-button>
                </router-link>
                <el-button
                  v-if="item.is_shipping==2&&item.is_receive==1&&item.is_comment==1"
                  size="small"
                  icon="el-icon-edit-outline"
                >已评价</el-button>
              </span>
              <p>
                <router-link :to="{name:'viewdetails',query:{trial_id:item.trial_id}}">查看详情</router-link>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
	<div v-if="value==3&&bool3==false" class="norecode">
        暂无记录！
	</div>
    <div style="text-align: center;" v-if="value==4&&bool4==true">
      <ul class="try_list">
        <li v-for="(item,index) in orderdel" :key="index">
          <div class="try_time">申请时间：{{item.gmt_create}}</div>
          <div class="try_goods">
            <div class="fl try_goods_info">
              <div class="fl try_img">
                <img
                  :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.trial_order_goods.goods_id"
                  alt
                />
              </div>
              <div v-if="item.trial_order_goods" class="fr try_info">
                <p>{{item.trial_order_goods.goods_name}}</p>
                <p>市场价：{{i18nCommon.symbol}}{{item.trial_order_goods.goods_price}}</p>
              </div>
            </div>
            <div class="fl try_status">
              <p>申请失败</p>
              <p>
                商城价：
                <span>$0</span>
              </p>
            </div>
            <div class="fl try_check">
              <p>
                <router-link :to="{name:'viewdetails',query:{trial_id:item.trial_id}}">查看详情</router-link>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
	<div v-if="value==4&&bool4==false" class="norecode">
        暂无记录！
	</div>
	<!-- 分页 -->
	<div class="paging" style="padding-top: 10px;">
		<div class="block">
		<el-pagination
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
		></el-pagination>
		</div>
	</div>
  </div>
</template>
<script scoped>
import { getTrialOrder, putDelivery, userCommentPaging } from "@/utils/api.js";
import { getUser } from "@/utils/auth.js";
export default {
  data() {
    return {
      bool1: false,
      bool2: false,
      bool3: false,
      bool4: false,
      value: 1,
      order: [],
      orders: [],
      ordershipping: [],
	  orderdel: [],
	  currentPage: 1,
      pageSize: 10,
      total: 0,
      is_comment: null || this.$route.query.is_comment //是否评论 0未评论，1已评论
    };
  },
  computed: {
    i18nCommon() {
      return this.$t("common");
    }
  },
  created() {
	this.pagingMethod();
  },
  methods: {
	pagingMethod() {
    //   var params = {
    //   };
        if (this.is_comment != null) {
			params.is_comment = this.is_comment;
		}  
		this.getOrderByuserId();
		this.getOrderisByuserId();
		this.getOrderByuserbySpid();
		this.getOrderByuserbydel();
    },
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.pagingMethod();
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pagingMethod();
    },
    //收货
    toEdit(scope) {
      var that = this;
      putDelivery({
        order_sn: scope
      }).then(function(isnot) {
        if (isnot.status == 1) {
          that.getOrderByuserId();
          that.getOrderByuserbySpid();
          that.$message.info("收货成功");
        } else {
          that.$message.error(isnot.msg);
        }
      });
    },
    switchstate(e) {
      this.value = e;
    },
    getOrderByuserId() {
      var that = this;
      getTrialOrder({
        user_id: getUser().user_id,
	    p: this.currentPage,
		size: this.pageSize
      }).then(function(map) {
		that.order = map.records;
		if (that.order.length != 0) {
			that.bool1 = true
            that.total = map.total
		} 
      });
	},
    getOrderisByuserId() {
      var that = this;
      getTrialOrder({
        user_id: getUser().user_id,
        is_refund: 0,
        is_shipping: 0,
	    p: this.currentPage,
		size: this.pageSize
      }).then(function(map) {
		that.orders = map.records;
		if (that.orders.length != 0) {
            that.bool2 = true
            that.total = map.total
		} 
      });
    },
    getOrderByuserbySpid() {
      var that = this;
      getTrialOrder({
        user_id: getUser().user_id,
        is_shipping: "1",
	    p: this.currentPage,
		size: this.pageSize
      }).then(function(map) {
		that.ordershipping = map.records;
		if (that.ordershipping.length != 0) {
            that.bool3 = true
            that.total = map.total
		} 
      });
    },
    getOrderByuserbydel() {
      var that = this;
      getTrialOrder({
        user_id: getUser().user_id,
        is_refund: 1,
	    p: this.currentPage,
		size: this.pageSize
      }).then(function(map) {
		that.orderdel = map.records;
        console.log(that.orderdel.length);
	    if (that.orderdel.length != 0) {
            that.bool4 = true
            that.total = map.total
		} 
      });
    }
  }
};
</script>
<style scoped>
.norecode{
   text-align: center;
   padding: 20px 0;
}

.mytrial {
  width: 1032px;
  padding: 20px;
  box-sizing: border-box;
  cursor: default;
  background: #ffffff;
}

.nav ul {
  overflow: hidden;
}

.nav ul li {
  float: left;
  height: 40px;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  padding: 0 30px;
  cursor: pointer;
}

.column_title {
  margin-top: 20px;
  width: 100%;
  height: 38px;
  line-height: 38px;
  background: #f5f5f5;
}

.column_title ul li {
  float: left;
  text-align: center;
  font-size: 14px;
  color: #666666;
}

.action {
  border-bottom: 2px solid #ec5151;
  color: #FF3B3B;
}

.try_list li {
  height: 150px;
  margin-top: 10px;
  border: solid 1px #ccc;
}

.try_time {
  color: #999999;
  font-size: 12px;
  background: #f5f5f5;
  padding: 6px 15px;
  border-bottom: 1px solid #ccc;
}

.try_goods {
  height: 120px;
  font-size: 12px;
  color: #999999;
}

.try_goods_info {
  height: 100%;
  width: 50%;
}

.try_img {
  height: 100px;
  width: 100px;
  margin: 10px;
}

.try_info {
  height: 100px;
  width: 300px;
  margin: 10px;
}

.try_info p {
  margin-top: 10px;
}

.try_info p:nth-child(1) {
  height: 72px;
  overflow: hidden;
  line-height: 18px;
  color: #666666;
  margin-top: 0;
}

.try_info p:nth-child(3) span {
  font-size: 14px;
  font-weight: 900;
}

.try_status {
  height: 100%;
  width: 30%;
  text-align: center;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  padding-top: 15px;
}

.try_status p:nth-child(1) {
  color: #333333;
}

.try_status p:nth-child(2) {
  margin-top: 10px;
}

.try_check {
  height: 100%;
  width: 20%;
  padding-top: 5px;
  box-sizing: border-box;
}

.try_check p {
  text-align: center;
  margin-top: 10px;
  color: #0f5499;
}
</style>

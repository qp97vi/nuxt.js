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
    <div class="mod_container">
      <div class="seckill_container_bg"></div>
      <div class="skhd">
        <div class="skhd_wrap">
          <div class="grid_c1">
            <h3 class="skhd_tit"></h3>
          </div>
        </div>
      </div>
      <div class="timeline">
        <div class="grid_c1">
          <ul class="timeline_list">
            <li
              @click="changeTimeAc(index)"
              v-for="(item,index) in killtime"
              :class="[index==timeac?'timeline_item timeline_item_selected':'timeline_item']"
              :key="index"
            >
              <a class="timeline_item_link" href="javascript:void(0)">
                <div class="timeline_item_link_skew">
                  <i class="timeline_item_link_skew_time">{{item.font}}</i>
                  <i class="timeline_item_link_skew_processtips" v-if="index==0">{{i18n.flash_sale_lsit.seckill_in}}</i>
                  <i class="timeline_item_link_skew_processtips" v-else>{{i18n.flash_sale_lsit.fast_seckill}}</i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="xuenhei" style="height: 0px;"></div>
      <div id="flash_sale_list">
        <div class="banner msbanpr">
          <div class="grid_c1">
            <img
              src="@/static/images/582c0dcdN62e57ffc.jpg"
            />
          </div>
        </div>
        <div class="timecount">
          <div class="grid_c1">
            <div class="timecount_container">
              <div class="timecount_container_skew">
                <span id="J-seckilling" class="seckilling">{{i18n.flash_sale_lsit.snap_up_in}}</span>
                <span id="J-timeContainer" class="time_container">
                  <b id="J-text">{{i18n.flash_sale_lsit.before_get}}</b>
                  <b id="J-endDef">{{i18n.flash_sale_lsit.to_out}}</b>
                  <b id="flash_sale_time">
                    <i class="hour">{{hour}}</i>{{i18n.flash_sale_lsit.hour}}
                    <i class="minutes">{{min}}</i>{{i18n.flash_sale_lsit.minute}}
                    <i class="seconds">{{sec}}</i>{{i18n.flash_sale_lsit.second}}
                  </b>
                </span>
              </div>
            </div>
            
          </div>
        </div>
        <div class="spsk">
          <div class="grid_c1">
            <ul class="seckill_mod_goodslist clearfix">
              <li v-for="(item,index) in goodlist" :key="index" class="seckill_mod_goods">
                <router-link target="_blank" class="seckill_mod_goods_link" :to="{name:'goodsInfo',query:{id:item.goods_id}}">
                  <img
                    class="seckill_mod_goods_link_img"
                    :src="apiHead + '/mall/goods/thumb_image?goods_id='+ item.goods_id+'&width=400&height=400'"
                  />
                  <h4 class="seckill_mod_goods_title">{{item.goods_name}}</h4>
                  <!--<span class="seckill_mod_goods_tag">-->
                  <!--<i class="seckill_mod_goods_tag_i" style="color: #e23435">推荐</i>-->
                  <!--</span>-->
                  <span class="seckill_mod_goods_info">
                    <span class="seckill_mod_goods_info_txt">
                      <span class="seckill_mod_goods_price">
                        <i class="seckill_mod_goods_price_now">
                          <em>{{i18nCommon.symbol}}</em>
                          {{item.price}}
                          <i
                            class="seckill_mod_goods_price_now_small"
                          ></i>
                        </i>
                        <span class="seckill_mod_goods_price_pre">
                          {{i18nCommon.symbol}}
                          <del>{{item.shop_price}}</del>
                        </span>
                      </span>
                      <!-- <span class="seckill_mod_goods_progress">
                        <i class="seckill_mod_goods_progress_txt">{{i18n.flash_sale_lsit.sold_out}}{{item.percent}}%</i>
                        <i class="seckill_mod_goods_progress_inner">
                          <b class="seckill_mod_goods_progress_completed" style="width:0%"></b>
                        </i>
                      </span> -->
                    </span>
                    <span class="seckill_mod_goods_info_btn">
                      <i></i>
                    </span>
                    <i
                      class="seckill_mod_goods_info_i"
                      v-if="timeac == 0 && item.percent != 100"
                    >{{i18n.flash_sale_lsit.go_rob_buy}}</i>
                    <i class="seckill_mod_goods_info_i" v-else>{{i18n.flash_sale_lsit.go_buy}}</i>
                    <i class="seckill_mod_goods_info_i" v-if="item.percent == 100">{{i18n.flash_sale_lsit.sold_out_empty}}</i>
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="params.page"
              :page-sizes="[4, 8, 12, 16]"
              :page-size="params.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox/index.vue";
import TopBar from "@/components/TopBar/index.vue";
import $ from "jquery";
import { getSeckill } from "@/utils/api.js";
import common from "@/utils/common.js";
export default {
  components: {
    SearchBox,
    TopBar
  },
  data() {
    return {
      total:0,  //数据总条数
      goodlist: "",
      killtime: "",
      start_time: "", //第一组开始时间
      end_time: "", //第一组结束时间
      timeac: "0", //默认选择0
      params: {
        page:1, //当前页
        recommend: "",
        status: 1, //状态必须是1
        start_time: "", //偶数级时间例如 12,16
        end_time: "",
        size: 10,  //每页数据条数
      },
      hour: 0,
      min: 0,
      sec: 0,
      timer: null
    };
  },
  created() {
    this.getime();
    this.setTime();
    this._getSeckill(this.params);
  },
  mounted() {
    var h1 = $(".skhd")
      .eq(0)
      .height();
    //var ss = $(document).scrollTop(); //上一次滚轮的高度
    $(window).scroll(function() {
      var s = $(document).scrollTop(); ////本次滚轮的高度
      if (s < h1) {
        $(".timeline").removeClass("yya");
        $(".xuenhei").height("0");
      }
      if (s > h1) {
        $(".timeline").addClass("yya");
        $(".xuenhei").height("80px");
      }
    });
  },
  computed: {
  	i18n () {  
  	  return this.$t('activity')  
  	},
    i18nCommon(){
      return this.$t("common")
    } 
  },
  methods: {
    setTime() {
      //设计倒计时时间
      let that = this;
      that.timer = setInterval(() => {
        var nowData = new Date().getTime();
        var diffT = that.params.end_time * 1000 - nowData;
        if (diffT < 0) {
          that.hour = 0;
          that.min = 0;
          that.sec = 0;
          return;
        }
        var arr = common.remainTime2(diffT).split(":");
        that.hour = arr[1];
        that.min = arr[2];
        that.sec = arr[3];
      }, 1000);
    },

    /*切换*/

    changeTimeAc(index) {
      this.params.start_time = this.killtime[index].start_time;
      this.params.end_time = this.params.start_time + 7200;
      this.timeac = index;
      this.params.page = 1
      this._getSeckill(this.params);
    },
    /*秒杀数据*/
    _getSeckill(params) {
      getSeckill(params).then(res => {
        if (res) {
          this.goodlist = res.records;
          this.total = res.total;
          this.params.page = res.current
        }
      });
    },
    /*获取当前时间戳*/
    getime() {
      var t = new Date();
      var time = parseInt(t.getTime() / 1000); //当前时间

      var now = common.format(time); //转换后的时间   2020-01-13 18:00:00
      var num = now.indexOf(":");
      var sub = now.substring(0, num);

      var sublsat = sub.substring(sub.length - 2); //后两位数
      if (parseInt(sublsat % 2) != 0) {
        //获取准点场次
        sublsat = sublsat - 1;
      }
      if (sublsat == "24") {
        //24为0时
        sublsat = 0;
      }
      this.session = sublsat;
      var parameter =
        sub.replace(sub.substring(sub.length - 2), sublsat) + ":00:00";
      var date = new Date(parameter).getTime();
      this.params.start_time = parseInt(date / 1000);
      this.params.end_time = this.params.start_time + 7200;
      var timer = [];
      /*循环5次获取5个时间段*/

      for (var i = 0; i < 5; i++) {
        var ts = {};
        ts.start_time = this.params.start_time + 7200 * i;
        timer.push(ts);
      }
      timer.forEach(i => {
        let now = common.format(i.start_time); //转换后的时间   2020-01-13 18:00:00
        let num = now.indexOf(":");
        let sub = now.substring(0, num);

        let sublsat = sub.substring(sub.length - 2) + ":00:00";
        if (sublsat == "24:00:00") {
          sublsat = "00:00:00";
        }
        i.font = sublsat;
      });

      this.killtime = timer;
    },
    handleSizeChange(e){
      this.params.size = e
      this._getSeckill(this.params);
    },
    handleCurrentChange(e){
      this.params.page = e
      this._getSeckill(this.params);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
@import "@/static/css/flash_sale_list.css";
</style>
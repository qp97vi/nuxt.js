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
  <div class="ri-menu fr">
    <div class="menumain p">
      <div class="goodpiece">
        <h1>{{i18n.visit_log.mytracks}}</h1>
        <!--<a href=""><span class="co_blue">帮助</span></a>-->
      </div>
      <div class="foot-print p">
        <ul>
          <li :class="cat_id=='' ? 'red' :''">
            <span @click="tabCommodity('')">{{i18n.visit_log.whole}}（{{totals}}）</span>
          </li>
          <li
            v-for="(item) in goodsCategoryData"
            :key="item.cat_id3"
            :class="cat_id==item.cat_id3 ? 'red' :''"
          >
            <span @click="tabCommodity(item.cat_id3)">{{item.cat_name}}（{{item.cat_visit_count}}）</span>
          </li>
        </ul>
        <!-- 临时隐藏 -->
        <span class="moanmo_b" style="display:none">
          <a href>
            {{i18n.visit_log.more}}
            <i class="mm_b"></i>
          </a>
        </span>
      </div>
      <div class="perinc_pri p">
        <div class="near_threet">{{i18n.visit_log.browsing_history}}</div>
        <!-- 临时隐藏 -->
        <div class="dxchoi" style="display:none">
          <input type="checkbox" name id="cx" value />
          <label for="cx">{{i18n.visit_log.display_promotion}}</label>
          <input type="checkbox" name id="jj" value />
          <label for="jj">{{i18n.visit_log.according_price}}</label>
          <a href="">{{i18n.visit_log.empty}}</a>
        </div>
      </div>
      <div class="feetprin p ma-to-20">
        <div class="shop-list-splb m-prod-list">
          <!--   -->
          <div style="display: flex;flex-wrap: wrap;" v-for="(item,index) in footprintData" :key="item.date">
            <div v-for="item2 in item.visit_list" :key="item2.visit_id">
              <div class="u-title">
                <i class></i>
                <span class="z-date">{{weekDay[week[index]]}}</span>
                <span class="z-time">{{item.date}}</span>
                <span class="z-del">
                  <!-- 临时隐藏 -->
                  <a
                    class="J-delHistory"
                    style="display:none"
                    href="javascript:;"
                    type="2"
                    text="2016-12-13"
                  >{{i18n.visit_log.delete}}</a>
                </span>
              </div>
              <!--  v-for="(item) in footprintData" :key="item.visit_list[0].goods_id" -->
              <ul>
                <li>
                  <div class="s_xsall">
                    <div class="xs_img">
                      <router-link :to="{ name: 'goodsInfo', query:{id: item2.goods_id}}">
                        <img
                          :src="apiHead + '/mall/goods/thumb_image?width=227&height=227&goods_id=' + item2.goods_id"
                        />
                      </router-link>
                    </div>
                    <div class="shop_name2">
              <router-link :to="{ name: 'goodsInfo', query:{id: item2.goods_id}}">{{item2.goods_name}}</router-link>
                    </div>
                    <div class="price-tag">
                      <span class="now">
                        <em class="li_xfo">{{i18nCommon.symbol}}</em>
                        <em>{{item2.shop_price.toFixed(2)}}</em>
                      </span>
                    </div>
                  </div>
                  <div class="dele" @click="del_visit(item2.goods_id,index)"></div>
                </li>
              </ul>
            </div>

          
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="paging">
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
      <div class="page p">
        <div class="fr">
          <div class="dataTables_paginate paging_simple_numbers">
            <ul class="pagination"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  accessGoods,
  deleteAccessRecords,
  goodsCategory
} from "@/utils/api.js";
export default {
  data() {
    return {
      footprintData: [], //所有足迹数据
      currentPage: 1, //初始页面为1
      pageSize: 10, //默认数据条
      handleSize: 10, //当页面几条数据
      handleCurrent: 1, //第几页
      total: 0, //总共多少条数据
      totals:0,  //全部
      goodsCategoryData: [], //商品分类数据
      cat_id: "",
      weekDay:["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    };
  },
  computed:{
    week(){
      var data = new Date()
      var year = data.getFullYear()+'/'
      var arr = []
      for(var i=0;i<this.footprintData.length;i++){
        var month = this.footprintData[i].date.replace('月','/')
        arr.push(new Date(year+month.substr(0,month.length-1)).getDay())
      }
      return arr
    },
		i18n () { 
      this.weekDay=[this.$t('user.visit_log.sunday'),this.$t('user.visit_log.monday'),this.$t('user.visit_log.tuesday'),this.$t('user.visit_log.wednesday'),this.$t('user.visit_log.thursday'),this.$t('user.visit_log.friday'),this.$t('user.visit_log.saturday')]
		  return this.$t('user')
    },
    i18nCommon () {
        return this.$t('common')  
    }
	},
  methods: {
    //商品切换
    tabCommodity(id) {
      this.cat_id = id;
      this.handleCurrent=1
      this.acquisitionFootprint();
      // this.goodsCategorys()
    },
    //删除商品访问记录
    del_visit(id) {
      var that = this;
      var params = {
        goods_id: id
      };
      deleteAccessRecords(params).then(res => {
        var argu = {};
        if (res.status == 1) {
          // that.footprintData.splice(index, 1);
          that.goodsCategorys()
          that.acquisitionFootprint()
          argu = {
            showClose: true,
            message: res.msg,
            type: "success"
          };
        } else {
          argu = {
            showClose: true,
            message: that.i18n.fail_delete + res.msg,
            type: "error"
          };
        }
        that.$message(argu);
      });
    },
    // 切换每页多少条数据
    handleSizeChange(val) {
      this.handleSize = val;
      // var params = {
      //   cat_id: this.cat_id,
      //   p: this.handleCurrent,
      //   size: this.handleSize
      // };
      this.acquisitionFootprint();
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.handleCurrent = val;
      // var params = {
      //   cat_id: this.cat_id,
      //   p: this.handleCurrent,
      //   size: this.handleSize
      // };
      this.acquisitionFootprint();
    },
    //商品分类
    goodsCategorys() {
      goodsCategory().then(res => {
        this.goodsCategoryData = res;
        this.totals = 0
        res.map(item => {
          this.totals += item.cat_visit_count;
        });
      });
    },
    //所有数据
    acquisitionFootprint() {
      var params = {
        cat_id: this.cat_id,
        p: this.handleCurrent,
        size: this.handleSize
      };
      accessGoods(params).then(res => {
        this.footprintData = res.records;
        this.total = res.total
      });
    }
  },
  created() {
    this.acquisitionFootprint();
    this.goodsCategorys();
  },
  components: {}
};
</script>

<style scoped>
.paging {
  text-align: center;
}
.pageContent .fl,
.fr span {
  cursor: pointer;
}
.pageContent .fl,
.fr span:hover {
  color: #e23435;
}
</style>

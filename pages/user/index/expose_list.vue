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
  <div class="ri-menu tradejf fr">
    <div class="menumain p">
      <div class="coup-tit p">
        <h1>{{i18n.expose_list.myreport_data}}</h1>
      </div>
    </div>
    <div class="applyaum p ma-to-20">
      <div class="orderlist-servecenter">
        <div class="orderbook-list">
          <div class="book-tit">
            <ul>
              <li class="sx1">{{i18n.expose_list.details_report_form}}</li>
              <li class="sx2">{{i18n.expose_list.person_accused}}</li>
              <li class="sx3">{{i18n.expose_list.report_type}}</li>
              <li class="sx4">{{i18n.expose_list.state}}</li>
            </ul>
          </div>
        </div>
        <div class="order-alone-li" v-if="pagingData.length!=0">
          <table width="100%" border cellspacing cellpadding>
            <tbody v-for="item in pagingData" :key="item.expose_id">
              <tr class="time_or">
                <td colspan="6">
                  <div class="fl_ttmm">
                    <span class="time-num time">{{item.expose_time_show}}</span>
                    <span class="time-num">
                      {{i18n.expose_list.report_number}}：
                      <em class="num">{{item.expose_id}}</em>
                    </span>
                    <span class="time-num">
                      <em class="num">{{item.expose_type_name}}</em>
                    </span>
                    <!--<div class="dele"></div>-->
                  </div>
                </td>
              </tr>
              <tr class="conten_or">
                <td class="sx1">
                  <div class="duoal">
                    <img
                      :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.expose_goods_id"
                    />
                    <div class="shop_name">
                      <a href="#">{{item.expose_goods_name}}</a>
                    </div>
                    <div class="iu">{{i18n.expose_list.goods_id}}{{item.expose_goods_id}}</div>
                  </div>
                </td>
                <td class="sx2">
                  <span class="xuname">{{item.expose_store_name}}</span>
                  <i class="las-pp"></i>
                </td>
                <td class="sx3">
                  <span>{{item.expose_type_name}}</span>
                </td>
                <td class="sx4">
                  <span>{{item.expose_state_detail}}</span>
                  <nuxt-link :to="{name:'expose_info',query:{expose_id:item.expose_id}}">{{i18n.expose_list.details_report_form}}</nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="ncyekjl" v-else>{{i18n.norecord}}!</div>
        <div class="operating fixed" id="bottom">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getExposePage } from "@/utils/api";
export default {
  data() {
    return {
      bool: true,
      pagingData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  components: {},
  created() {
    this.pagingMethod();
  },
  computed: {
  	i18n () {  
  	  return this.$t('user')  
  	} 
  },
  methods: {
    pagingMethod() {
      var params = {
        p: this.currentPage,
        size: this.pageSize
      };
      getExposePage(params).then(res => {
        if (res.records.lengin > 0) {
          this.bool = false;
        }
        this.pagingData = res.records;
        this.total = res.total;
      });
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
    }
  }
};
</script>

<style scoped>
</style>

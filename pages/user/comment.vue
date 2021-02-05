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
        <h1>{{i18n.comment.my_evaluation}}</h1>
        <!--<a href=""><span class="co_blue">帮助</span></a>-->
      </div>
      <div class="orderbook-list">
        <div class="time-sala p">
          <ul>
            <li :class="is_comment==null ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(null)">
                {{i18n.all}}
                <span v-show="is_comment==null">({{total}})</span>
              </a>
            </li>
            <li :class="is_comment==0 ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(0)">
                {{i18n.comment.pending_order}}
                <span v-show="is_comment==0">({{total}})</span>
              </a>
            </li>
            <li :class="is_comment==1 ? 'red' : 'mal-l'">
              <a href="#" @click="obliGation(1)">
                {{i18n.comment.have_comments}}
                <span v-show="is_comment==1">({{total}})</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="he"></div>
        <div class="orderbook-list">
          <div class="book-tit">
            <ul>
              <li class="sx1">{{i18n.goods_msg}}</li>
              <li class="sx2">{{i18n.price}}</li>
              <li class="sx3">{{i18n.count}}</li>
              <li class="sx4">{{i18n.commodityprice}}</li>
              <li class="sx5">{{i18n.condition}}</li>
              <li class="sx6">{{i18n.operation}}</li>
            </ul>
          </div>
        </div>
        <div class="order-alone-li" v-if="bool">
          <table
            width="100%"
            border
            cellspacing
            cellpadding
            v-for="(item) in pagingData"
            :key="item.rec_id"
          >
            <tbody>
              <tr class="time_or">
                <td colspan="6">
                  <div class="fl_ttmm">
                    <span class="time-num">
                      {{i18n.integral.order_time}}：
                      <em class="num">{{item.order.add_time_detail}}</em>
                    </span>
                    <span class="time-num">
                      {{i18n.integral.order_id}}：
                      <em class="num">{{item.order.order_sn}}</em>
                    </span>
                    <span class="time-num">
                      {{i18n.vendor}}：
                      <a
                        :href="'tencent://message/?uin=' + item.store_qq + '&amp;Site=TPshop商城&amp;Menu=yes'"
                      >
                        <em class="num">
                          {{item.store_name}}
                          <i class="ear"></i>
                        </em>
                      </a>
                    </span>
                    <span class="red" v-if="item.comment_is_del==1">{{i18n.commentdeleted}}</span>
                    <div
                      class="dele"
                      @click="delComment(item)"
                      v-if="item.is_comment == 1 && item.comment_is_del!=1"
                    ></div>
                  </div>
                  <div class="fr_ttmm"></div>
                </td>
              </tr>
              <tr class="conten_or">
                <td class="sx1">
                  <div class="shop-if-dif">
                    <div class="shop-difimg">
                      <img
                        :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + item.goods_id"
                      />
                    </div>
                    <div class="shop_name">
                      <router-link :to="{ name: 'goodsInfo',query:{id:item.goods_id}}">
                        <span>{{item.goods_name}}</span>
                      </router-link>
                    </div>
                  </div>
                </td>
                <td class="sx2">
                  <span>{{i18nCommon.symbol}}</span>
                  <span>{{item.goods_price}}</span>
                </td>
                <td class="sx3">{{item.goods_num}}</td>
                <td class="sx4">
                  <div class="pric_rhz">
                    <p class="d_pri">
                      <span>{{i18nCommon.symbol}}</span>
                      <span>{{(item.goods_price * item.goods_num).toFixed(2)}}</span>
                    </p>
                  </div>
                </td>
                <td class="sx5">
                  <div class="detail_or">
                    <p class="d_yzo">{{item.is_comment_desc}}</p>
                  </div>
                </td>
                <td class="sx6">
                  <div class="rbac">
                    <p class="inspect">
                      <router-link
                        v-if="item.comment_is_del==0"
                        :to="{name:'goodsInfo',query:{id:item.goods_id}}"
                      >{{i18n.inquire}}</router-link>
                      <span v-else-if="item.comment_is_del==1"></span>
                      <router-link
                        v-else
                        :to="{ name: 'comment_list',query:{order_id:item.order_id}}"
                      >{{i18n.evaluate}}</router-link>
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
      </div>
    </div>
    <div class="operating fixed" id="bottom">
      <div class="fn_page clearfix">
        <div class="dataTables_paginate paging_simple_numbers">
          <ul class="pagination"></ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userCommentPaging, deleteComments } from "@/utils/api.js";
export default {
  data() {
    return {
      bool: true,
      pagingData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      is_comment: null || this.$route.query.is_comment //是否评论 0未评论，1已评论
    };
  },
  components: {},
  methods: {
    //删除评论
    delComment(item) {
      var _this = this;
      var data = {
        rec_id: item.rec_id
      };
      this.$confirm(_this.i18n.comment.delete_review, _this.i18n.message, {
        confirmButtonText: _this.i18n.confirm,
        cancelButtonText: _this.i18n.cancel,
        type: "warning"
      })
        .then(() => {
          deleteComments(data).then(res => {
            var argu = {};
            if (res.status == 1) {
              _this.pagingMethod();
              argu = {
                showClose: true,
                message: res.msg,
                type: "success"
              };
            } else {
              argu = {
                showClose: true,
                message: _this.i18n.comment.cancel_failed + res.msg,
                type: "error"
              };
            }
            _this.$message(argu);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: _this.i18n.undeleted
          });
        });
    },
    obliGation(isComment) {
      this.is_comment = isComment;
      this.pagingMethod();
    },
    // 分页数据
    pagingMethod() {
      var params = {
        p: this.currentPage,
        size: this.pageSize
      };
      if (this.is_comment != null) {
        params.is_comment = this.is_comment;
      }
      userCommentPaging(params).then(res => {
        if (res.records.lengin > 0) {
          this.bool = false;
        } else {
          this.bool = true;
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
  },
  computed: {
    i18n() {
      return this.$t("user");
    },
    i18nCommon() {
      return this.$t("common");
    }
  },
  created() {
    this.pagingMethod();
  }
};
</script>

<style scoped>
</style>

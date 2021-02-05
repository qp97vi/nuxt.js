<!-- 消息 -->
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
    <div class="mesg_container">
      <div class="mesg_tab">
        <ul id="mesg_tab">
          <li :class="type == 2 ? 'mesgtab_cur' : ''">
            <a href="#" @click="getPage(2)">{{i18n.message_notice.logistics}}({{logisticsCount}})</a>
          </li>
          <li :class="type == 0 ? 'mesgtab_cur' : ''">
            <a href="#" @click="getPage(0)">{{i18n.message_notice.inform}}({{noticeCount}})</a>
          </li>
          <li :class="type == 1 ? 'mesgtab_cur' : ''">
            <a href="#" @click="getPage(1)">{{i18n.message_notice.activity}}({{activityCount}})</a>
          </li>
          <li :class="type == 3 ? 'mesgtab_cur' : ''">
            <a href="#" @click="getPage(3)">{{i18n.message_notice.private_letter}}({{privateCount}})</a>
          </li>
        </ul>
      </div>
	  <div class="mesg_none" v-if="messageData.length == 0">
	  	<img src="../../static/images/mesgnone.png">
	  	<span>{{i18n.message_notice.norecord}}~</span>
	  </div>
      <!--消息内容-->
      <div class="mesg_infoma" id="mesg_infoma" v-else>
        <div class="mesg_infoitems" style="display:block;">
          <div class="mesg_tit">
			<span @change="checkAll">
			  <input type="checkbox" v-model="selectAll" />
			  {{i18n.message_notice.check_all}}
			</span>
            <a href="#" @click="deleteByids">
              <img src="../../static/images/delet.png" />{{i18n.message_notice.delete}}
            </a>
          </div>
          <div class="mesg_con">
            <ul class="logist_lists" v-if="type == 2">
              <li :txt="i18n.message_notice.logistics+'2'" v-for="logist in messageData" :key="logist.message_id">
                <div class="mesgdeta_check">
				  <input
				    class="checkall_annt"
				    type="checkbox"
				    name="selected[]"
				    v-model="logist.bool"
				    @change="multipleChoice"
				  />
                </div>
                <div class="mesgdeta_ri">
                  <div class="mesgdeta_fir">
                    <span>{{logist.message_title}}</span>
					<i v-if="logist.is_see == 0"></i>
                    <a href="#" @click="deleteByid(logist.rec_id)">
                      <img src="../../static/images/delet.png" />
                    </a>
                    <em>{{logist.send_time_show}}</em>
                  </div>
                  <div class="mesgdeta_sec">
                    <span>
                      <img
                        :src="logist.img_uri"
                      />
                    </span>
                    <em>
                      <p>{{logist.message_content}}</p>
                      <i>{{i18n.message_notice.waybill_number}}: {{logist.order_sn}}</i>
                    </em>
                  </div>
                  <div class="mesgdeta_thi">
                    <a
                      href="#"
					  @click="detail(logist,2)"
                    >{{i18n.message_notice.view_details}}</a>
                  </div>
                </div>
              </li>
            </ul>
			<ul class="logist_lists" v-if="type == 0">
			  <li :txt="i18n.message_notice.inform+' 0'" v-for="notice in messageData" :key="notice.message_id">
			  	<div class="mesgdeta_check">
					<input
					  class="checkall_annt"
					  type="checkbox"
					  name="selected[]"
					  v-model="notice.bool"
					  @change="multipleChoice"
					/>
				</div>
			  	<div class="mesgdeta_ri">
			  		<div class="mesgdeta_fir see10983">
			  			<span>{{notice.message_title}}</span>
						<i v-if="notice.is_see == 0"></i>
						<a href="#" @click="deleteByid(notice.rec_id)">
						<img src="../../static/images/delet.png"></a><em>{{notice.send_time_show}}</em></div>
						<div class="mesgdeta_sec">
							<p>{{notice.message_content}}</p>
						</div>
			  		<div class="mesgdeta_thi notice_mesgde_thi"><a href="#"  @click="detail(notice,0)">{{i18n.message_notice.view_details}}</a></div>
			  	</div>
			  </li>
			</ul>
			<ul class="logist_lists" v-if="type == 1">
			  <li :txt="i18n.message_notice.activity+' 1'" v-for="activity in messageData" :key="activity.message_id">
			  	<div class="mesgdeta_check">
			  		<input
			  		  class="checkall_annt"
			  		  type="checkbox"
			  		  name="selected[]"
			  		  v-model="activity.bool"
			  		  @change="multipleChoice"
			  		/>
			  	</div>
			  	<div class="mesgdeta_ri">
			  		<div class="mesgdeta_fir see10987">
			  			<span>{{activity.message_title}}</span>
						<i v-if="activity.is_see == 0"></i>
			  			<a href="#" @click="deleteByid(activity.rec_id)">
			  				<img src="../../static/images/delet.png">
			  			</a><em>{{activity.send_time_show}}</em>
			  		</div>
			  		<div class="act_mesgde_sec">
			  			<a href="javascript:void(0);" class="act_img">
			  				<img :src="activity.img_uri">
			  				<span v-if="activity.is_finish == 1">{{i18n.message_notice.activity_over}}</span>
			  			</a>
			  		</div>
			  		<div class="mesgdeta_thi">
			  			<a href="#" @click="detail(activity,1)">{{i18n.message_notice.view_details}}</a>
			  		</div>
			  	</div>
			  </li>
			</ul>
			<ul class="logist_lists" v-if="type == 3">
			  <li :txt="i18n.message_notice.private_letter+' MessagePrivate'+ i18n.message_notice.temporary_empty" v-for="privateMessage in messageData" :key="privateMessage.message_id">
			      <div class="mesgdeta_check direct_mesg_check">
					  <input
					    class="checkall_annt"
					    type="checkbox"
					    name="selected[]"
					    v-model="privateMessage.bool"
					    @change="multipleChoice"
					  />
				  </div>
			      <div class="directmesg_ri">
			          <div class="directmesg_img see10987"><img src="../../static/images/perslogo.png"><i>3</i></div>
			          <div class="directmesg_con">
			              <div class="mesgdeta_fir"><span>{{i18n.message_notice.service}}</span><a href="#"><img src="../../static/images/delet.png"></a><em>{{privateMessage.send_time_show}}</em></div>
			              <p>{{i18n.message_notice.what}}</p>
			          </div>
			      </div>
			  </li>
			</ul>
			
          </div>
        </div>
      </div>
	  <el-dialog
	    :title="i18n.message_notice.inform"
	    :visible.sync="dialogVisible"
	    width="50%">
	    <span slot="footer" class="dialog-footer">
		   <div class="mesg_deta_con">
		     <div class="mesgdeta_tit">
		       <h3>{{messageNotice.message_title}}</h3>
		       <p>
		         <i>{{i18n.message_notice.time}}：{{messageNotice.send_time_show}}</i>
		         <em>{{i18n.message_notice.come_from}}：{{messageNotice.store_name}}</em>
		       </p>
		     </div>
		     <div class="mesgdeta_mid">{{messageNotice.message_content}}</div>
		   </div>
	      <el-button @click="dialogVisible = false">{{i18n.message_notice.cancel}}</el-button>
	      <el-button type="primary" @click="dialogVisible = false">{{i18n.message_notice.confirm}}</el-button>
	    </span>
	  </el-dialog>
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
</template>

<script>
import {
  userMessageTab,
  messageLogisticsPage,
  messageActivityPage,
  messagePrivatePage,
  messageNoticePage,
  getStore,
  putMessageSee,
  deleteMessage
} from "@/utils/api.js";
export default {
  data() {
    return {
		type: 2,
		noticeCount: 0, //通知消息
		logisticsCount: 0, //物流消息
		activityCount: 0, //活动消息
		privateCount: 0,//私信
		currentPage: 1, //初始页面为1
		pageSize: 5, //默认数据条
		total: 0, //总共多少条数据
		messageNotice: {},
		messageData: [], 
		selectAll: false, //全选
		dialogVisible: false,
		recIds: []
	};
  },
  computed:{
    i18n () {  
  	  return this.$t('user')  
  	}
  },
  methods: {
	  // 切换每页多少条数据
	  handleSizeChange(val) {
		  this.pageSize = val;
		  if (this.type == 0) {
			  this.messageNoticePage();
		  }
		  if (this.type == 1) {
		  	  this.messageActivityPage();
		  }
		  if (this.type == 2) {
		  	  this.messageLogisticsPage();
		  }
		  if (this.type == 3) {
		  	  this.messagePrivatePage();
		  }
	  },
	  // 跳转到第几页
	  handleCurrentChange(val) {
		  this.currentPage = val;
		  if (this.type == 0) {
		  	  this.messageNoticePage();
		  }
		  if (this.type == 1) {
		  	  this.messageActivityPage();
		  }
		  if (this.type == 2) {
		  	  this.messageLogisticsPage();
		  }
		  if (this.type == 3) {
		  	  this.messagePrivatePage();
		  }
	  },
	  userMessageTab() {
		  //通知消息
		  userMessageTab(0).then(res => {
			  this.noticeCount = res.count;
		  });
		  //活动消息
		  userMessageTab(1).then(res => {
		  	  this.activityCount = res.count;
		  });
		  //物流消息
		  userMessageTab(2).then(res => {
		  	  this.logisticsCount = res.count;
		  });
		  //私信
		  userMessageTab(3).then(res => {
		  	  this.privateCount = res.count;
		  });
	  },
	  getPage(val) {
		if (val != undefined) {
		    this.type = val;  
		}
		if (this.type == 0) {
			this.currentPage = 1;
			this.messageNoticePage();
		}
		if (this.type == 1) {
			this.currentPage = 1;
			this.messageActivityPage();
		}
		if (this.type == 2) {
			this.currentPage = 1;
			this.messageLogisticsPage();
		}
		if (this.type == 3) {
			this.currentPage = 1;
			this.messagePrivatePage();
		}
	  },
	  //反选
	  multipleChoice() {
		  this.recIds = [];
		  for (let i=0; i < this.messageData.length; i++) {
			  if (!this.messageData[i].bool) {
			  	this.selectAll = false;
			  	break;
			  }
			  this.selectAll = true;
		  }
		  this.messageData.forEach(item => {
			  if(item.bool) {
				  this.recIds.push(item.rec_id)
			  }
		  })
	  },
	  //全选
	  checkAll() {
		this.recIds = [];
		this.messageData.forEach(item => {
			item.bool = this.selectAll;
			if (this.selectAll) {
				this.recIds.push(item.rec_id)
			}
		})
	  },
	  deleteByids() {
		  var _this = this
		  if (this.recIds.length > 0) {
			  deleteMessage(this.recIds.toString()).then(res => {
				  if (res.status == 1) {
					  this.$message.success(_this.i18n.message_notice.successfully_delete);
					  this.getPage();
				  } else {
					  this.$message.error(res.msg);
				  }
			  })
		  } else {
			  this.$message.error(_this.i18n.message_notice.please_check)
		  }
	  },
	  deleteByid(id) {
		  var _this = this
		  deleteMessage(id).then(res => {
			  if (res.status == 1) {
				  this.$message.success(_this.i18n.message_notice.successfully_delete);
				  this.getPage();
			  } else {
				  this.$message.error(res.msg);
			  }
		  })
	  },
	  messageLogisticsPage() {
		  this.messageData = [];
		  messageLogisticsPage({
			  p: this.currentPage,
			  size: this.pageSize
		  }).then(res => {
			  res.records.forEach(item => {
				  item.bool = false;
			  })
			  this.messageData = res.records;
			  this.commonMessageTemplate(this.messageData);
			  this.total = res.total;
		  })
	  },
	  messageActivityPage() {
		      this.messageData = [];
	  		  messageActivityPage({
	  			  p: this.currentPage,
	  			  size: this.pageSize
	  		  }).then(res => {
				  res.records.forEach(item => {
				  	item.bool = false;
				  })
	  			  this.messageData = res.records;
				  this.commonMessageTemplate(this.messageData);
	  			  this.total = res.total;
	  		  })
	  },
	  messagePrivatePage() {
			  this.messageData = [];
	  		  messagePrivatePage({
	  			  p: this.currentPage,
	  			  size: this.pageSize
	  		  }).then(res => {
				  res.records.forEach(item => {
				  	item.bool = false;
				  })
	  			  this.messageData = res.records;
				  this.commonMessageTemplate(this.messageData);
	  			  this.total = res.total;
	  		  })
	  },
	  messageNoticePage() {
			  this.messageData = [];
	  		  messageNoticePage({
	  			  p: this.currentPage,
	  			  size: this.pageSize
	  		  }).then(res => {
				  res.records.forEach(item => {
				  	item.bool = false;
				  })
				  this.messageData = res.records;
				  this.commonMessageTemplate(this.messageData);
	  			  this.total = res.total;
	  		  })
	  },
	  commonMessageTemplate(list) {
        for (let i = 0; i < list.length; i++) {
			if (list[i].message_content.indexOf('$') != -1) {
				list[i].message_content = '亲爱的会员你好，平台悄悄的向你发了个消息'
			}
		}
	  },
	  putMessageSee(id) {
		  putMessageSee({
			  rec_id: id
		  }).then(res => {
			  if(res.status == 1) {
				  this.getPage();
			  }
		  })
	  },
	  detail(item,type) {
		  var _this = this
		  this.putMessageSee(item.rec_id);
		  if (type == 2) {
			  if (item.type < 4 || item.type > 4) {
			  	  this.$router.push({
			  	    name:'order_detail',
			  		query: {
			  		  order_id: item.order_id
			  		}
			  	  })
			  }
			  if (item.type == 4) {
			  	  this.$router.push({
			  	    name:'comment',
			  	  	query: {
			  	  	  is_comment: 0
			  	  	}
			  	  })
			  }
		  }
		  if (type == 0) {
			if (item.type > 1 && item.type < 5) {
				this.$router.push({
					name: 'coupon'
				})
			}
			if (item.type == 6) {
				this.$router.push({
					name: 'recharge',
					
				})
			}
			if (item.type == 0 || item.type == 1) {
				getStore({
					store_id: item.store_id
				}).then(res => {
					item.store_name = res.store_name;
					this.messageNotice = item;
				})
				this.dialogVisible = true;
			}
		  }
		if (type == 1) {
			var currentTime = Date.parse(new Date())/1000; //当前时间
			if (item.is_finish == 1) {
				this.$message.error(_this.i18n.message_notice.activity_over)
			}
			if (item.start_tiem > currentTime) {
				var timeStr = new Date(parseInt(item.start_tiem) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
				this.$message.error("none,"+_this.i18n.message_notice.start_time + timeStr)
			}
			if(item.prom_type==1){
				if (item.goods_id==0){  //表示列表（多个商品）
					this.$router.push({
						name: "flash_sale_list"
					})
				} else {  //表示单个商品
					this.$router.push({
						name: 'goodsInfo',
						query: {
							id: item.goods_id
						}
					})
				}
			}
			if (item.prom_type == 2) {
				if (item.goods_id==0){  //表示列表（多个商品）
					this.$router.push({
						name: "group_list"
					})
				} else {  //表示单个商品
					this.$router.push({
						name: 'goodsInfo',
						query: {
							id: item.goods_id
						}
					})
				}
			}
			if (item.prom_type == 3) {
				if (item.goods_id==0){  //表示列表（多个商品）
					this.$router.push({
						name: "promoteList"
					})
				} else {  //表示单个商品
					this.$router.push({
						name: 'goodsInfo',
						query: {
							id: item.goods_id
						}
					})
				}
			}
			if (item.prom_type == 4) {
				if (item.goods_id==0){  //表示列表（多个商品）
					this.$router.push({
						name: "pre_sell_list"
					})
				} else {  //表示单个商品
					this.$router.push({
						name: 'goodsInfo',
						query: {
							id: item.goods_id
						}
					})
				}
			}
			if (item.prom_type == 5) {
				this.$router.push({
					name: 'goodsInfo',
					query: {
						id: item.goods_id
					}
				})
			}
			if (item.prom_type == 6) {
				this.$router.push({
					name: 'goodsInfo',
					query: {
						id: item.goods_id
					}
				})
			}
			if (item.prom_type == 7) {
				this.$message.error(_this.i18n.message_notice.nomatching_purchase)
			}
			if (item.prom_type == 8) {
				this.$router.push({
					name: 'goodsInfo',
					query: {
						id: item.goods_id
					}
				})
			}
		}
	  }
  },
  created() {
	  this.userMessageTab();
	  this.getPage();
  },
};
</script>

<style scoped>
@import "../../static/css/message_notice.css";
>>>.el-dialog__body{
	padding: 0;
}
</style>
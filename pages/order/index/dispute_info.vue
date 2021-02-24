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
  <div class="home-index-middle">
    <div class="w1224">
      <div class="g-crumbs">
         <router-link :to="{ name: 'user_index'}">{{i18n.mymall}}</router-link>
        <i class="litt-xyb"></i>
		<router-link :to="{name:'dispute'}">{{i18n.trade_dispute}}</router-link>
        <i class="litt-xyb"></i>
        <span>{{i18n.dispute_application}}</span>
      </div>
      <div class="apply-list-flowpath p">
        <div class="flowpath">
          <div class="line-flowpath">
			<el-steps :active="active" finish-status="success">
			  <el-step :title="i18n.submit_dispute"></el-step>
			  <el-step :title="i18n.seller_dispose"></el-step>
			  <el-step :title="i18n.customer_confirmation"></el-step>
			  <el-step :title="i18n.accomplish"></el-step>
			</el-steps>
            <!-- <span class="green now">
              <i class="las-flo"></i>
              <em>提交纠纷单</em>
            </span>
            <span class="green now">
              <i class="las-flo2"></i>
              <em>卖家处理</em>
            </span>
            <span class>
              <i class="las-flo3"></i>
              <em>客户确认</em>
            </span>
            <span class>
              <i class="las-flo4"></i>
              <em>完成</em>
            </span> -->
          </div>
          <div class="warning">
            <i class="las-warning"></i>
            <span>{{i18n.important_reminder}}</span>
          </div>
        </div>
        <input type="hidden" id="input_complain_id" value="8" />
		<div class="repairsheet" v-if="complain.complain_state == 1">
			<p class="titnum">
				<span>{{i18n.maintain_dispute}}（{{complain.complain_id}}）</span>
				<span class="ye">{{i18n.handled_seller}}</span>
			</p>
			<div class="waitsalesmanage">
				<div class="clock-wainfont p">
					<div class="clockle">
						<i class="las-clock"></i>
					</div>
					<div class="wainfontri">
						<div class="waintop">
							<span class="lin1">{{i18n.waiting_seller}}</span>
							<span class="lin2">{{i18n.take_easy}}<em>{{i18n.hours}}</em>{{i18n.reply_within}}~</span>
						</div>
						<div class="waindown">
							<a class="updatared" href="javascript:window.location.reload();">{{i18n.update_details}}</a>
							<a href="javascript:;" @click="complainHandle(4)">{{i18n.resolved}}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="repairsheet" v-if="complain.complain_state > 1">
          <p class="titnum">
            <span>{{i18n.maintain_dispute}}{{complain.complain_id}}）</span>
            <span class="ye">{{complain.complain_state_detail}}</span>
          </p>
          <div class="waitsalesmanage">
            <div class="contacts_report p">
              <div class="contact_left">
                <div class="tit_top">
                  <i>{{i18n.warm_prompt}}</i>
                  <span>{{i18n.manner_confirm}}</span>
                </div>
				<div class="maincontact">
					<div class="date_time_alone"><span>{{complain.complain_time_show}}</span></div>
					<div class="opposite_left p">
						<div class="sales_head p">
							<div class="sales_head_logo">
								<img class="" :src="storeData.store_avatar">
							</div>
							<div class="explay_sales_head">
								<i></i>
								<span class="sales_manage">{{i18n.seller_dispose}}</span>
								<span class="store_name">{{complain.store_name}}&nbsp;&nbsp;{{complain.appeal_time_show}}</span>
							</div>
						</div>
						<div class="myself_head">
							{{complain.appeal_msg}} </div>
					</div>
					<div id="talkdiv" style="background-color: #FFF;border: 1px dashed #EEE;max-height: 220px;word-break: normal;word-wrap: break-word;padding: 8px;overflow-y: scroll;">
						<div :class="complainTalk.talk_member_type == 'accuser' ? 'opposite_left myself_right p' : 'opposite_left  p'" v-for="complainTalk in complainTalkList" :key="complainTalk.talk_id">
							<div class="sales_head p">
								<div class="sales_head_logo">
									<img class="" v-if="complainTalk.talk_member_type =='admin'" @/static/images/pers.png">
									<img class="" v-if="complainTalk.talk_member_type =='accused'" :src="storeData.store_avatar">
									<img class="" v-if="complainTalk.talk_member_type =='accuser'" :src="userInfo.head_pic">
								</div>
								<div class="explay_sales_head">
									<i></i>
									<span class="sales_manage" v-if="complainTalk.talk_member_type =='admin'">{{i18n.administrator}}</span>
									<span class="sales_manage" v-if="complainTalk.talk_member_type =='accused'">{{i18n.seller}}</span>
									<span class="sales_manage" v-if="complainTalk.talk_member_type =='accuser'">{{i18n.me}}</span>
									<span class="store_name">{{complainTalk.talk_member_name}}&nbsp;&nbsp;{{complainTalk.talk_time_show}}</span>
								</div>
							</div>
							<div class="myself_head">{{complainTalk.talk_content}}</div>
						</div>
					</div>
				</div>
                </div>
				<div class="report_right">
				  <div class="textarea_c_le">
				    <textarea
				      onkeyup="checkfilltextarea('textarea','500')"
				      v-model="talk_content"
				      id="complain_talk"
				      rows
				      cols
				    ></textarea>
				    <p>
				      {{i18n.alsotype}}
				      <span id="zero">500</span>{{i18n.word}}
				    </p>
				  </div>
				  <div class="hilldown" v-if="complain.complain_state == 2">
				    <div class="replysales">
				      <a class="repl1" href="#" @click="getComplainTalkList">{{i18n.refresh_dialogue}}</a>
				      <a class="repl1" href="javascript:publish_complain_talk();" @click="addComplainTalk">{{i18n.release_dialogue}}</a>
				      <a
				        class="repl2"
				        href="javascript:;"
						@click="complainHandle(3)"
				        data-state="3"
				      >{{i18n.mallin}}</a>
				      <a
				        class="repl3"
				        href="javascript:;"
				        @click="complainHandle(4)"
				        data-state="4"
				      >{{i18n.resolved}}</a>
				    </div>
				    <!-- <p class="endtime_re">距离您确认截止的时间还有：<span>6天01小时00分01秒</span></p> -->
				  </div>
				  <div class="hilldown" v-if="complain.complain_state == 3">
				    <div class="replysales">
				      <a class="repl1" href="#" @click="getComplainTalkList">{{i18n.refresh_dialogue}}</a>
				      <a
				        class="repl3"
				        href="javascript:;"
				        @click="complainHandle(4)"
				        data-state="4"
				      >{{i18n.resolved}}</a>
				    </div>
				    <!-- <p class="endtime_re">距离您确认截止的时间还有：<span>6天01小时00分01秒</span></p> -->
				  </div>
				</div>
              </div>
            </div>
          </div>
        </div>
        <div class="repairsheet">
          <div class="createbill p">
            <div class="sh sheet1">
              <p>
                <span>{{i18n.dispute_number}}：</span>
                <span>{{complain.complain_id}}</span>
              </p>
              <p>
                <span>{{i18n.dispute_type}}：</span>
                <span>{{complain.complain_subject_name}}</span>
              </p>
              <p>
                <span>{{i18n.contact_way}}：</span>
                <span>{{complain.user_contact}}</span>
              </p>
            </div>
            <div class="sh sheet2">
              <p class="ci">
                <span>{{i18n.problem_description}}：</span>
                <span>{{complain.complain_content}}</span>
              </p>
              <ul class="suimg"></ul>
			  <img v-if="complain.complain_state == 1" class="sbys" @/static/images/sbys.png" :alt="i18n.user_submits" />
			  <img v-else-if="complain.complain_state == 4" class="sbys" @/static/images/sbys3.png" :alt="i18n.resolved" />
              <img v-else class="sbys" @/static/images/sbys2.png" :alt="i18n.problem_solving" />
            </div>
            <div class="sh sheet1">
              <p>
                <span>{{i18n.seller}}：</span>
                <span>
				  <router-link :to="{name:'store'}">{{complain.store_name}}
                    <i class="las-ear"></i></router-link>
                </span>
              </p>
              <!-- <p><span>服务单号：</span><span>39909002515</span></p>-->
              <p>
                <span>{{i18n.corresponds_order}}：</span>
                <span>
				  <router-link :to="{name:'order_detail',query:{order_id:complain.order_id}}">{{complain.order_sn}}</router-link>
                </span>
              </p>
            </div>
          </div>
          <div class="createline">
            <div class="timeline_ch">
			  <div :class="complain.complain_state == 4 ? 'near bigrar' : 'near'" v-if="complain.complain_state >= 4">
			    <p>{{complain.final_handle_time_show}} {{i18n.arbitration_result}}:&nbsp;&nbsp;<b>{{complain.final_handle_msg}}</b></p>
			  </div>
              <div :class="complain.complain_state == 3 ? 'near bigrar' : 'near'" v-if="complain.complain_state >= 3">
                <p>{{complain.user_handle_time_show}} {{i18n.filing_award}}</p>
              </div>
              <div :class="complain.complain_state == 2 ? 'near bigrar' : 'near'" v-if="complain.complain_state >= 2">
                <p>{{complain.appeal_time_show}} {{i18n.merchant_processing}}</p>
              </div>
              <div :class="complain.complain_state == 1 ? 'near bigrar' : 'near'" v-if="complain.complain_state >= 1">
                <p>{{complain.complain_time_show}} {{i18n.create_dispute_list}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {
	getComplain,
	getComplainTalkList,
	updateComplain,
	addComplainTalk,
	getStore,
	getBaseInfo
} from "@/utils/api.js";
export default {
	data() {
		return {
			complain: {},
			complain_id: this.$route.query.complain_id,
			active: 0,
			complainTalkList: [],
			complainTalk:{},
			talk_content: '', //发布内容
			storeData:{},  //店铺信息
			userInfo:{}
		};
	},
	 computed: {
		i18n() {
			return this.$t('order.dispute_info') 
		}
	},
	methods: {
		getComplain() {
			getComplain({
				complain_id: this.complain_id
			}).then(res => {
				this.complain = res;
				this.active = res.complain_state;
			}).then(()=>{
				this.storeData = res
			})
		},
		getComplainTalkList() {
			getComplainTalkList({
				complain_id: this.complain_id
			}).then(res => {
				this.complainTalkList = res;
			})
		},
		complainHandle(state) {
			var _this = this
			this.complain.complain_state = state;
			updateComplain(this.complain).then(res => {
				if(res.status == 1) {
					this.$message.success(_this.i18n.submi_successfully)
				} else {
					this.$message.error(res.msg)
				}
			})
		},
		addComplainTalk() {
			var _this = this
			this.complainTalk.complain_id = this.complain.complain_id;
			this.complainTalk.talk_member_id = this.complain.user_id;
			this.complainTalk.talk_member_name = this.complain.user_name;
			this.complainTalk.talk_member_type = "accuser";
			this.complainTalk.talk_content = this.talk_content;
			this.complainTalk.talk_state = 1;
			this.complainTalk.talk_time = new Date().getTime() / 1000;
			addComplainTalk(this.complainTalk).then(res => {
				if (res.status == 1) {
					this.$message.success(_this.i18n.release_success);
					this.getComplainTalkList()
				} else {
					this.$message.error(res.msg)
				}
			})
		},
		getuserInfo(){
			getBaseInfo().then(res=>{
				this.userInfo = res
			})
		}
	},
	created() {
		this.getuserInfo()
		this.getComplain();
		this.getComplainTalkList()
	}
};
</script>

<style scoped>
</style>
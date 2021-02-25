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
        <h1>{{i18n.info.personal_details}}</h1>
        <!--<a href=""><span class="co_blue">帮助</span></a>-->
      </div>
      <div class="personerinfro">
        <form action method="post">
          <ul class="hend_jz">
            <li class="infor_wi_le">
              <a href="javascript:void(0);">{{i18n.info.head_portrait}}：</a>
            </li>
            <li class="infor_img">
              <el-upload
                class="avatar-uploader"
                :action="apiHead+'/mall/upload?type=head_pic'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img :src="head_pic" class="avatar" />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </el-upload>
              <input type="hidden" name="head_pic" id="head_pic" value />
            </li>
          </ul>
          <ul class="name_jz">
            <li class="infor_wi_le">
              <a href="javascript:void(0);">{{i18n.info.nickname}}：</a>
            </li>
            <li>
              <el-input v-model="userInfo.nickname" :placeholder="i18n.info.enter_nickname"></el-input>
            </li>
          </ul>
          <!--<ul class="name_jz">-->
          <!--<li class="infor_wi_le"><a href="javascript:void(0);">真实姓名：</a></li>-->
          <!--<li><a href="javascript:void(0);"><input class="name_zjxs" type="text" name="" id="" value="" /></a></li>-->
          <!--</ul>-->
          <ul class="sex_jz">
            <li class="infor_wi_le">
              <a href="javascript:void(0);">{{i18n.info.gender}}：</a>
            </li>
            <li>
              <el-radio-group v-model="userInfo.sex">
                <el-radio :label="0">{{i18n.info.secrecy}}</el-radio>
                <el-radio :label="1">{{i18n.info.male}}</el-radio>
                <el-radio :label="2">{{i18n.info.girl}}</el-radio>
              </el-radio-group>
            </li>
          </ul>
          <ul class="name_jz">
            <li class="infor_wi_le">
              <a href="javascript:void(0);">{{i18n.info.birthday}}：</a>
            </li>
            <li>
              <div class="block">
                <el-date-picker
                  v-model="birthday"
                  clear-icon="el-input_icon"
                  type="date"
                  dateType="time"
                  value-format="timestamp"
                  :placeholder="i18n.info.mybirthday"
                ></el-date-picker>
              </div>
            </li>
          </ul>
          <ul class="hobby_jz">
            <li class="infor_wi_le"></li>
            <li class="infor_wi_ri">
              <div class="pcews">
                <span>
                  <i class="ph_c"></i>{{i18n.info.phone}}
                </span>
                <span :class="userInfo.mobile == '' ? 'change_e' : 'change_p'">
                  <router-link :to="{ name: 'set_mobile',query:{mobile:userInfo.mobile,type: 0}}" style="cursor:pointer;">
                    <span v-if="userInfo.mobile == ''">{{i18n.info.not_bound}}</span>
                    <span v-else>{{i18n.info.change_binding}}</span>
                  </router-link>
                </span>
                <span>
                  <i class="em_c"></i>{{i18n.info.mailbox}}
                </span>
                <span :class="userInfo.email == '' ? 'change_e' : 'change_p'">
                  <router-link :to="{ name: 'email_validate'}" style="cursor:pointer;">
                    <span v-if="userInfo.email == ''">{{i18n.info.not_bound}}</span>
                    <span v-else>{{i18n.info.change_binding}}</span>
                  </router-link>
                </span>
              </div>
              <div class="careful">
                <span class="fir_sen">{{i18n.info.annotation}}</span>
                <span class="co_blue">
                  <router-link :to="{name:'safety_settings'}">{{i18n.info.security_settings}}</router-link>
                </span>
              </div>
              <div class="save_s">
                <el-button size="mini" type="danger" @click="confirmSave">{{i18n.info.confirm_save}}</el-button>
              </div>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { setUser,getUser } from "@/utils/auth.js";
import { getBaseInfo, revampPersonalDetails } from "@/utils/api.js";
export default {
  data() {
    return {
      userInfo:{}, //用户信息
      head_pic: "" ,//头像
	  birthday: 0 //生日
    };
  },
  head() {
	  return {
		   title: "个人信息",
		   meta: [
				{ hid: 'description', name: 'description', content: 'Home page description' }
			],
	  }
  },
  computed:{
    i18n () {  
  	  return this.$t('user')  
  	}
  },
  methods: {
    //确认保存
    confirmSave() {
      var _this = this;
      var head_pic = "";
      var data = {
        nickname: _this.userInfo.nickname,
        birthday: _this.birthday / 1000,
        sex: _this.userInfo.sex,
        head_pic: this.head_pic
      };

      revampPersonalDetails(data).then(res => {
        if (res.status == 1) {
          this.$message({
            message: res.msg,
            type: "success"
          });
		  getBaseInfo().then(res=>{
		    setUser(res)
		  })
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
       this.head_pic = res.result;
    },
    beforeAvatarUpload(file) {
      var _this = this
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(_this.i18n.info.picture_size);
      }
      return isLt2M;
    },
    baseInfo(){
      getBaseInfo().then(res=>{
        this.userInfo = res;
        this.head_pic = res.head_pic;
		this.birthday = res.birthday * 1000;
      })
    }
  },
  created() {
    this.baseInfo()
  },
  components: {}
};
</script>

<style scoped>
>>> .el-date-table td.today span {
  color: #ff3b3b !important;
}
</style>

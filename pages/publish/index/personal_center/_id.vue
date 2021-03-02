<template>
    <div>
        <div class="center_top">
            <div class="personal_data">
                <div class="userheader">
                  <img :src="UserList.trend.author_head_img" alt="">
                </div>
                <span>{{trend.author_name}}</span>
            </div>
            <div class="personal_data">关注&nbsp;&nbsp;&nbsp;&nbsp;{{UserList.follow_total}}</div>
            <div class="personal_data">粉丝&nbsp;&nbsp;&nbsp;&nbsp;{{UserList.fans}}</div>
            <div class="personal_data">获赞与收藏&nbsp;&nbsp;&nbsp;&nbsp;{{UserList.praise_total}}</div>
        </div>
        <div class="personal_nav">
            <div class="fl" :class="value==1?'action1':''" @click="chang_value(1)">动态</div>
            <div class="fr" :class="value==2?'action1':''" @click="chang_value(2)">收藏</div>
        </div>
        <div v-if="value==2">
            <div class="dynamic">
                <ul>
                    <li v-for="(item,index) in tableListImage" :key="index">
                        <div class="dynamic_img"  @click="details(item.trend_id)">
                           <img :src="item.image" alt="">
                        </div>
                        <div class="dynamic_text">
                          {{item.title}}
                        </div>
                        <div class="dynamic_user">
                            <div><img :src="item.author_head_img" alt=""></div>
                            <div>{{item.author_name}}</div>
                            <div style="float: right;">
                                 <img v-if="true" src="@/static/images/favour1.png" alt="">
                                 <img v-else src="@/static/images/favour2.png" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="value==1">
            <div class="dynamic">
                <ul>
                    <li v-for="(item,index) in tableList " :key="index" >
                        <div class="dynamic_img"   @click="details(item.trend.trend_id)">
                            <img :src="item.trend.image" alt="">
                        </div>
                        <div class="dynamic_text">
                            {{item.trend.title}}
                        </div>
                        <div class="dynamic_user">
                           <div><img :src="item.user.head_pic" alt=""></div>
                            <div>{{item.trend.author_name}}</div>
                            <div style="float: right;">
                                <img v-if="true" src="@/static/images/favour1.png" alt="">
                                <img v-else src="@/static/images/favour2.png" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div></div>
    </div>
</template>
<script>
		import { getUserComment,getTrendDetails,getTrendPraise  } from "@/utils/api.js";
    export default{
        data(){
            return{
				user:{},
				trend:{},
				tableList:{},
				listTrend:{},
				UserList:{},
				trendPraise:{},
                value:1,
				tableListImage:[],
            }
        },
		created(){
		  this.getUComment(this.$route.query.id);
		  this.getPraise(this.$route.query.id);
		  this.getComment(this.$route.query.trend_id);
		  console.log(this.$route);
		},
        methods:{
			//截取第一张图片
			getIntercept(data){
				console.log(data);
				var trendArr=[];
				for(var i=0;i<data.length;i++){
					if(data[i].image.split(',').length>0){
						data[i].image=data[i].image.split(',')[0]
					}
				}
				this.tableListImage=data;	
				console.log(this.tableListImage);
			},
			//获取点赞收藏动态
			getPraise(param){
				var that=this;
				var query={
					user_id:param
				}
				getTrendPraise(query).then(function(res){
					console.log(res,query);
				  that.trendPraise=res.records;
				  that.getIntercept(that.trendPraise);
				  console.log(that.trendPraise,111);
				})
			},
			details(param) {
				console.log(param);
				this.$router.push({
					name: 'publish/index/publish_details/id',
					query:{id:param}
				})
			},
			getComment(param){
				var that=this;
				var query={
					trend_id:param
				}
				getTrendDetails(query).then(function(res){
					console.log(res,param);
					that.UserList=res;
					console.log(that.UserList);
					that.trend=that.UserList.trend;
				
				})	
			},
			getUComment(param){
				console.log(param)
				 var that=this;
				 var query={
					 user_id:param
				 }
				getUserComment(query).then(function(res){
					console.log(res);
					that.tableList=res.records;
					that.user=that.tableList.user
					console.log(that.tableList)
				})
			},
            chang_value(e){
                this.value=e
            },
        }
    }
</script>
<style scoped>
    @import "@/static/css/publish.css";
    .action1{
        border-bottom: solid 2px #0F5499;
        color: #0F5499;
    }
    .center_top{
        width: 1120px;
        height: 160px;
        box-sizing: border-box; 
        padding: 40px; 
        margin: 40px auto;
        background: #EDF6FF;
    }
    .center_top  .personal_data{
        overflow: hidden;
        float: left;
        line-height: 80px;
        margin-right: 100px;
    }
    .userheader{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        float: left;
        margin-right: 30px;
        overflow: hidden;
    }
    .personal_nav{
        overflow: hidden;
        width: 200px;
        height: 40px;
        line-height: 38px;
        margin: 30px auto;
    }
	img {
		width: 100%;
		height: 100%;
	}
</style>
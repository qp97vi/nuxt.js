<template>
    <div class="structure">
        <!-- 左半部分 -->
        <div class="fl w600">
            <div>
                <div>
                    <div class="fl w500 h500 big_img">
                        <img :src="imageurl" alt="">
                    </div>
                    <div class="fr w100 h500 leftmainimg">
                        <div class="small_img w50 h50" :class="[smallindex==index?'small_img_border':'']" v-for="(item,index) in imageList" :key="index" @click="Image(item,index)">
                            <img :src="item" alt="">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="issue_title mt20">{{tendList.title}}</div>
                    <div class="issue_text mt20">{{tendList.content}}</div>
                    <div class="issue_type"> @{{tableList.type}}</div>
                </div>
                <div class="icon_message">
                    <div>
                        <img v-if="true" src="@/static/images/give_like1.png" alt="">
                        <img v-else src="@/static/images/give_like2.png" alt="">
                        {{tendList.praise_num}}</div>
                    <div><i class="el-icon-chat-dot-round"></i>评论</div>
                </div>
                <div class="release_time">发布与<span>{{tendList.gmt_create}}</span></div>
                <div class="share_dynamic mt30" >
                    <div class="share_left fl">
                        <img :src="users.head_pic" alt=""><span>{{tendList.author_name}}</span> 
                    </div>
                    <div class="decollator">|</div>
                    <div class="share_right fr">
                        <div class="share_title fl">一起来分享给朋友们看看吧：</div>
                        <img class="share_way" src="@/static/images/weixin1.png" alt="">
                        <img class="share_way" src="@/static/images/qq1.png" alt="">
                        <img class="share_way" src="@/static/images/facebook1.png" alt="">
                    </div>
                </div>
                <!-- 笔记评论 -->
                <div class="note">
                    笔记评论
                </div>
                <div class="note_comment">
                    <div v-for="(item,index) in commentList" :key="index">
                        <div class="mt20 note_list ml10">
                            <div class="h40 w40 list_img">
                                <img :src="users.head_pic" alt="">
                            </div>
                            <div class="list_right">
                                <div style="overflow: hidden;">
                                    <div class="fl w200 note_user">
                                        <p>{{item.user_name}}</p>
                                        <p>{{item.gmt_create}}</p>
                                    </div>
                                    <div class="reply">
                                        <span>
                                            <img v-if="true" src="@/static/images/like1.png" alt="">
                                            <img v-else src="@/static/images/like2.png" alt="">
                                            {{item.praise_count}}</span>
                                        <span>回复</span>
                                    </div>
                                </div>
                                <div class="note_text">{{item.content}}</div>
                                <div style="height:40px;" v-for="it in item.children">
                                    <span v-if="it.children[0]">{{it.children[0].user_name}}:{{it.children[0].content}}</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="more_comments">查看更多评论</div>
        </div>
        <!-- 右半部分 -->
        <div class="right_portion">
            <div>
                <div class="author">
                    <div class="dynamic_author">动态作者</div>
                    <div class="author_img">
                        <div @click="publish_detailsh(tableList.user.user_id,tendList.trend_id)">
                            <img :src="users.head_pic" alt="">
                        </div>
                        <span class="ml20">{{tendList.author_name}}</span>
                    </div>
                    <div class="score">
                        <div>
                            <p>笔记</p>
                            <p>{{tableList.count}}</p>
                        </div>
                        <div>
                            <p>粉丝</p>
                            <p>{{tableList.fans}}</p>
                        </div>
                        <div>
                            <p>获赞和收藏</p>
                            <p>{{tableList.praise_total}}</p>
                        </div>
                    </div>
                </div>
                <div class="mt20" style="background: #fff;">
                    <div class="dynamic_author ml20">
                        相关笔记
                    </div>
                    <div>
                        <div class="relevantnote">
                            <div class="mt20 h100" v-for="(item1,index) in dependentList" :key="index">
                                <div class="fl w100 h100"  @click="details(item1.trend_id)">
                                    <img :src="item1.image" alt="">
                                </div>
                                <div class="fr h100 relevantnotetext">
                                    <div class="author_text">{{item1.title}}</div>
                                    <div class="authoricon">
                                        <img src="@/static/images/give_like1.png" alt="">
                                        {{item1.praise_num}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="more_comments">查看更多评论</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import { getTrendDetails } from "@/utils/api.js";
    export default{
        data(){
            return{
				commentList:{},
				tableList:{},
				imageList:[],
				imageurl:'',
				dependentList:{},
                tendList:'',
				users:'',
                smallindex:0,//选择的小图
            }
        },
		created(){
		  this.getComment(this.$route.query.id)
		  console.log(this.$route)
		},
        methods:{
			Image(param,index){
                this.smallindex=index
				this.imageurl=param;
			},
			details(param) {
				console.log(param);
				this.$router.push({
					name: 'publish/index/publish_details/id',
					query:{id:param}
				})
			},
            publish_detailsh(userId,trendId){
                this.$router.push({
                    name:'publish/index/personal_center/id',
					query:{id:userId,trend_id:trendId}
                })
            },
			getComment(param){
				var that=this;
				var query={
					trend_id:param
				}
				getTrendDetails(query).then(function(res){
					console.log(res,param);
					that.tableList=res;
					that.tendList=res.trend;
					that.users=res.user;
					that.commentList=res.trend_comment_vo_list;
                    console.log(that.commentList)
					that.dependentList=res.dependent_trend;
					that.imageList=res.trend.image.split(',');
					that.imageurl=that.imageList[0];
					
				})
			}
        }
    }
</script>
<style scoped>
    .big_img{
        border-radius: 5px;
        overflow: hidden;
    }
    .small_img{
        border-radius: 5px;
        overflow: hidden;
    }
    .small_img_border{
        border: solid 1px #0F5499;
    }
    .structure{
        overflow: hidden;
        padding-top: 30px;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .issue_title{
        font-size:24px ;
        color:#333 ;
        line-height: 36px;
    }
    .issue_text{
		overflow:hidden;
        line-height: 22px;
        color: #333;
        font-size: 14px;
    }
    .issue_type{
        height: 22px;
        font-size: 14px;
        color: #0F5499;
        line-height: 22px;
        margin-top: 14px;
    }
    .leftmainimg{
        box-sizing: border-box;
        padding: 0 25px;
        background: #fff;
        overflow: hidden;
    }
    .leftmainimg div{
        margin-top: 11px;
    }
    .icon_message{
        overflow: hidden;
        margin-top: 25px;
        height: 22px;
    }
    .icon_message i{
        font-size: 24px;
    }
    .icon_message div{
        float: left;
        margin-right: 20px;
        width: 100px;
        height: 22px;
    }
    .icon_message div img{
        width: 24px;
        height: 24px;
    }
    .release_time{
        color: #333;
        font-size: 16px;
        line-height: 22px;
        margin-top: 25px;
    }
    .share_dynamic{
        height: 60px;
        border-radius: 30px;
        border: solid 1px #E6E6E6;
        overflow: hidden;
        line-height: 60px;
        background: #fff;
    }
    .share_left{
        width: 234px;
        height: 100%;
    }
    .share_left img{
        float: left;
        margin: 10px;
        width:40px ;
        height:40px ;
        border-radius: 50%;
    }
    .share_left span{
        color: #333;
        font-size: 14px;

    }
    .share_right{
        overflow: hidden;
        line-height: 60px;
    }
    .share_title{
        color: #333;
        font-size: 14px;
    }
    .share_way{
        float: left;
        margin-top: 18px;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        margin-right: 10px;
        padding: 3px;
        box-sizing: border-box;
        border: 1px solid #333;
    }
    .decollator{
        float: left;
        font-size: 30px;
        color: #E6E6E6;
        line-height: 60px;
    }
    .note{
        font-size:16px ;
        color: #333;
        margin-top: 30px;
        text-indent: 10px;
        line-height: 25px;
        font-weight: bold;
        border-left: 4px solid #0F5499;
    }
    .note_list{
        overflow: hidden;
        border-bottom: solid 1px rgb(196, 194, 194);
    }
    .note_comment{
        overflow: hidden;
    }
    .right_portion{
        float: right;
        width: 600px;
    }
    .list_img{
        border-radius: 50%;
        background: #333; 
        float: left;
    }
    .list_right{
        float: right;
        width: 500px;
        margin-right: 30px;
    }
    .note_user p:nth-child(1){
        font-weight: bold;
        line-height: 22px;
        font-size: 14px;
        color: #333;
    }
    .note_text{
        height: 40px;
        overflow: hidden;
        line-height: 40px;
        font-size: 14px;
        color: #333;
    }
    .reply{
        float: right;
    }
    .reply span{
        margin-right: 10px;
        line-height: 24px;
    }
	.reply span img{
		margin-top: -4px;
		width: 20px;
		height: 20px;
	}
    .dynamic_author{
        height: 63px;
        font-size: 16px;
        font-weight: bold;
        line-height: 63px;
        border-bottom: solid 1px #E6E6E6;
    }
    .author_img{
        height: 110px;
        box-sizing: border-box;
        padding: 30px 0;
        border-bottom: solid 1px #E6E6E6;
    }
    .author_img div{
        width: 50px;
        height: 50px;
        background: burlywood;
        float: left;
        overflow: hidden;
        border-radius: 50%;
    }
    .author_img span{
        line-height: 50px;
    }
    .relevantnote{
        padding: 0 20px;
        overflow-y:auto;
        height: 600px;
    }
    .relevantnotetext{
        width: 440px;
    }
    .score div{
        float: left;
        width: 100px;
        font-size: 14px;
        line-height: 24px;
        margin-right: 20px;
        margin-top: 20px;
    }
    .score div p:nth-child(1){
        color: #999;
    }
    .score div p:nth-child(2){
        color: #333;
    }
    .author{
        height: 268px;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 16px; 
        color: #333;
        background: #fff;
    }
	.authoricon{
		margin-top: 50px;
        border-radius: 5px;
        overflow: hidden;
	}
	.authoricon img{
		width: 20px;
		height: 20px;
	}
    .more_comments{
        width: 550px;
        height: 54px;
        line-height: 54px;
        text-align: center;
        color: #0F5499;
        font-weight: bold;
    }
    .author_text{
        font-size: 14px;
        font-weight: bold;
        line-height: 24px;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        word-break:break-word;
    }
</style>
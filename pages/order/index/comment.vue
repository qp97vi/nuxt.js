
<template>
    <div>
        <top-bar></top-bar>
        <top-info></top-info>
        <div class="comment-box">
            <div class="comment-content">
                <div style="margin-top: 50px;">
                    <div class="comment-order">评论订单</div>
                    <div class="order-num">
                        <span style="margin-right: 20px;">订单号：{{order.order_sn}}</span>
                        <span>{{order.gmt_create}}</span>
                    </div>
                </div>
                <div style="height: 474px;">
                    <div class="goods-box">
                        <dl>
                            <dt style="text-align: center;">
                                <img style="width: 100px;height: 100px;" :src="apiHead + '/mall/goods/thumb_image?width=100&height=100&goods_id=' + order_goods.goods_id"/>
                            </dt>
                            <dd>
                                <p style="text-align: center;">{{order_goods.goods_name}}</p>
                                <p style="text-align: center;font-weight: 900;margin-top: 20px;">￥{{order_goods.goods_price}}</p>
                            </dd>
                        </dl>
                    </div>
                    <div class="evaluate-box">
                        <div style="margin-left: 50px;overflow: hidden;">
                            <div class="seller-impression">卖家印象</div>
                            <div class="tag-define" data-_id="tag_5189">
                                <span
                                class="define-label"
                                v-show="sellerBool"
                                @click="clickSeller"
                                >
                                <i class="i-pen"></i>
                                <em>自定义标签</em>
                                </span>
                                <input
                                type="text"
                                v-model="vendorValue"
                                class="define-input"
                                :class="!sellerBool ? 'active' :''"
                                v-show="!sellerBool"
                                />
                            </div>
                        </div>
                        <div>
                            <div class="drying-comment">评价晒单</div>
                            <textarea
                                v-model="text"
                                placeholder="请输入评价的内容"
                                @input="descInput"
                                maxlength="500"
                            ></textarea>
                            <span style="position: relative;left: -60px;top: -10px;">{{remnant}}/500</span>
                        </div>
                        <div>

                            <el-upload
                                style="height: 50px;margin-left: 160px;"
                                :action="apiHead + '/mall/upload?type=comment/'"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :on-remove="removeimg"
                                :limit="5"
                            >
                                <i class="el-icon-camera-solid" style="font-size: 50px;border: solid 1px;"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div style="text-align: center;margin-bottom: 20px;">
                    <el-button type="primary" @click="submit">提交评论</el-button>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
    import TopBar from "@/components/TopBar/index2.vue";
    import TopInfo from "@/components/TopInfo/index.vue";
    import {
        getTrialOrderGoods,
        getTrialOrder,
        posttrialcomment,
    } from "@/utils/api.js";
    export default{
        data(){
            return{
                sellerBool: true, //是否为Input框
                vendorValue:"",//自定义标签
                text:"",//评论内容
                remnant:500,//
                order_sn:this.$route.query.order_sn,//订单号
                order_goods:{},//订单商品
                order:{},//订单详情
                img:[],//上传图片地址
            }
        },
        created(){
            getTrialOrderGoods({order_sn:this.order_sn}).then(res=>{
                this.order_goods=res
            })
            getTrialOrder({order_sn:this.order_sn}).then(res=>{
                this.order=res.records[0]
            })
        },
        components: {
            TopBar,
            TopInfo
        },
        methods:{
            //input框显示
            clickSeller() {
                this.sellerBool = false;
            },
            descInput(){
                var textVal=this.text.length;
                this.remnant=500-textVal
            },
            handleAvatarSuccess(res, file) {
                if (res.status == 1) {
                    this.img.push(res.result)
                } 
            },
            beforeAvatarUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error(_this.i18n.picture_size);
            }
            return isLt5M;
            },
            removeimg(e){
                for(let i=0;i<this.img.length;i++){
                    if(this.img[i]==e.response.result){
                        this.img.splice(i,1)
                    } 
                } 
            },
            submit(){
				var that=this;
                if(this.text==""){
                    return this.$message.info("请填写评论内容");
                }
                let trial_comment={
                    effect:this.vendorValue,
                    goods_id:this.order_goods.goods_id,
                    order_sn:this.order.order_sn,
                    store_id:this.order.store_id,
                    text:this.text,
                    url:this.img.join(","),
                    user_id:this.order.user_id
                }
                posttrialcomment(trial_comment).then(function(isnot) {
						if (isnot.status == 1) {
							that.$message.info("评价成功");
							that.$router.push({
								name: 'my_trial'
							});
						} else {
							that.$message.error(isnot.msg);
						}
					});
                
            }
        }
    }
   
</script>
<style scoped>
    .tag-define {
        border:1px solid #dedede;
        width:200px;
        height:36px;
        line-height:38px;
        position:relative;
        margin-top:20px;
        float: left;
    }
    .tag-define i {
        width:18px;
        height:18px;
        position:absolute;
        right:10px;
        top:10px;
        display:none;
        cursor:pointer;
        font-size: 12px;
    }
    .define-label {
        padding-left:10px;
        width: 100px;
        color:#666;
        font-size: 12px;
        display:inline-block;
    }
    .define-label em,.remain-cash em {
        font-size:20px;
        color:#333;
        vertical-align:middle;
        font-size: 12px;
    }
    .define-input {
        line-height:36px;
        border:1px solid #dedede;
        font-size: 12px;
        width:200px;
        height: 36px;
    }
    .active {
        display: block !important;
    }
    .comment-box{
        width: 1224px;
        margin: 0 auto;
        padding: 0 50px;
    }
    .comment-content{
        width: 100%;
        margin: 0 auto;
        background-color: #f5f5f5;
        overflow: hidden;
    }
    .comment-order{
        text-align: center;
        font-size: 16px;
        font-weight: 900;
    }
    .order-num{
        text-align: center;
        color: #999;
    }
    .goods-box{
        width: 222px;
        height: 205px;
        padding: 50px;
        float: left;
        margin-right: 150px;
    }
    .evaluate-box{
        float: left;
        width: 667px;
        height: 474px;
    }
    .seller-impression{
        float: left; 
        width:100px;
        height:38px;
        line-height: 38px;
        margin-top: 20px;
    }
    .drying-comment{
        float: left;
        height:38px;
        line-height: 38px;
        margin-top: 50px;
        margin-left: 50px;
    }
    textarea{
        width: 440px;
        height:160px; 
        margin-left: 50px;
        margin-top: 50px;
        line-height: 18px;
        padding-left: 10px;
    }
</style>
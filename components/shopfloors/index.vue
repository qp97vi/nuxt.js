<template>
    <div>
        <div class="nav" id="floorNavList">
            <ul class="nav-list">
                <p v-if="this.floors.length>0">{{i18n.shopfloors.floor_guide}}</p>
                <li class="nav-list-item" v-for="(item,index) in floors" :key="item.floor_id" @click="setFloorNavMountClick(index)">
                    <div></div>{{item.title_name}}
                </li>
            </ul>
        </div>
        <div class="shopfloors" v-for="(item,index) in floors" :key="item.floor_id">
            <div class="title mt30">
                <span>{{item.title_name}}</span>
                <button class="btn1" @click="ToggleKey2(index)">{{i18n.shopfloors.goods_recommendedation}}</button>
                <button v-show="!item.location_url_is_show" class="btn2" @click="ToggleKey(index)">{{i18n.shopfloors.selection_recommended}}</button>
            </div>
            <div class="shopshow">
                <div style="width:224px;height:100%;">
                    <!-- 活动图片 -->
                    <div style="width:100%;height:317px;">
                        <el-carousel trigger="click" height="317px">
                            <el-carousel-item v-for="n in item.floor_urls.filter(item=>item.location==false)" :key="n.floor_url_id">
                                <a :href="n.href"><img :src="n.img" alt=""></a>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!-- 推荐分类 -->
                    <div class="classify" :style="{background:item.color}">
                        <ul>
                            <li v-for="item in item.goods_category_list" :key="item.id">
                                <router-link
                                    :to="{name:'goods/goodsList/id',query:{cat_id:item.id}}"
                                    target="_blank"
                                >{{item.name}}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 精选推荐 -->
                <div style="height:100%;width:998px;" ref="isshow" v-show="!item.location_url_is_show" >
                    <div class="omnibus">
                        <ul>
                            <li v-for="n in item.floor_urls.filter(item=>item.location==true)" :key="n.floor_url_id">
                                <a :href="n.href"><img :src="n.img" alt=""></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 商品推荐 -->
                <div class="goodsshop">
                    <img v-show="!item.floor_blocks[0]" src="@/static/images/123.jpg" alt="">
                    <ul>
                        <li  v-for="item in item.floor_blocks" :key="item.goods_id">
                            <dl v-for="item in item.goods_list" :key="item.goods_id">
                                <router-link :to="{ name: 'goods/goodsInfo/id', query:{id:item.goods_id}}">
                                    <dt>
                                        <a href=""><img :src="item.original_img" alt=""></a>
                                    </dt>
                                    <dd><p>{{item.goods_name}}</p><span>{{i18nCommon.symbol}}{{item.shop_price}}</span></dd>
                                </router-link>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 商品品牌 -->
            <div v-if="item.brands.length>0" class="brands">
                <ul>
                    <li v-for="item in item.brands" :key="item.id">
                        <router-link :to="{name:'goods/goodsList/id',query:{brand_ids:item.id}}"
                        target="_blank"
                        :title="item.name">
                            <img :src="item.logo" alt="">
                        </router-link>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
var TIMER = null
import {getfloors} from "@/utils/api";
export default {
    data(){
        return{
            floors:[],
        }
    },
    created(){
        getfloors().then(res=>{
            this.floors=res
        })
    },
    computed: {
        i18n () {  
          return this.$t('components')  
        },
        i18nCommon () {
            return this.$t('common')  
        } 
    },
    methods:{
        ToggleKey(index){
            var btn1=document.getElementsByClassName("btn1")
            var btn2=document.getElementsByClassName("btn2")
            btn2[index].style.background="#fff"
            btn1[index].style.background=""
            this.$refs.isshow[index].style.display="block"
        },
        ToggleKey2(index){
            var btn1=document.getElementsByClassName("btn1")
            var btn2=document.getElementsByClassName("btn2")
            btn1[index].style.background="#fff"
            btn2[index].style.background=""
            this.$refs.isshow[index].style.display="none"
        },

        setFloorNavMountClick(index) {
          var _this = this
          let floor_item = document.getElementsByClassName('shopfloors'),
            floor_offsetTop = floor_item[index].offsetTop,
            window_scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            timer = {
              step: 20,
              times: 2,
              FLOOR_OFFSETTOP: floor_offsetTop-150
            }
          if (window_scrollTop > floor_offsetTop) {
            _this.setFloorScrollArrowUp(timer)
          } else if (window_scrollTop == floor_offsetTop) {
            return false
          } else {
            _this.setFloorScrollArrowDown(timer)
          }
        },
        setFloorScrollArrowUp(timer) {
          var _this = this
          clearInterval(TIMER)
          TIMER = setInterval(() => {
            const window_scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (window_scrollTop <= timer.FLOOR_OFFSETTOP) {
              document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP
              document.body.scrollTop = timer.FLOOR_OFFSETTOP
              clearInterval(TIMER)
            } else {
              document.documentElement.scrollTop = window_scrollTop - timer.step
              document.body.scrollTop = window_scrollTop - timer.step
            }
          }, timer.times)
        },
        setFloorScrollArrowDown(timer) {
          var _this = this
          clearInterval(TIMER)
          TIMER = setInterval(() => {
            const window_scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (window_scrollTop >= timer.FLOOR_OFFSETTOP) {
              document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP
              document.body.scrollTop = timer.FLOOR_OFFSETTOP
              clearInterval(TIMER)
            } else {
              document.documentElement.scrollTop = window_scrollTop + timer.step
              document.body.scrollTop = window_scrollTop - timer.step
            }
          }, timer.times)
        },
        floorSrcollAddEventListener() {
            var _this = this
            let nav_item = document.getElementById('floorNavList').getElementsByClassName('nav-list-item'),
            floor_item = document.getElementsByClassName('shopfloors')
            var nav=document.getElementById('floorNavList')
            window.onscroll = function() {
                const window_scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                for (let i = 0; i < floor_item.length ; i++) {
                    const floor_offsetTop = floor_item[i].offsetTop
                    if (window_scrollTop >= floor_offsetTop-150) {
                        for (let n = 0; n < nav_item.length; n++) {
                        nav_item[n].className = 'nav-list-item ' + (i === n ? 'active' : '')
                        }
                    }
                }
                // window_scrollTop>1200
                if(window_scrollTop>700){
                    nav.style.display="block"
                }else{
                    nav.style.display="none"
                }
            }
        },
        initPage() {
          var _this = this
          _this.floorSrcollAddEventListener()
        }
    },
    mounted() {
        this.initPage()
    }
}
</script>
<style scoped>
    .nav{
        border: 1px solid rgb(233, 231, 231);
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 10000;
        display: none;
        right: auto;
        margin-left: -678px;
        margin-top: -202.5px;
    }
    .nav ul p{
        text-align: center;
        font-size: 12px;
        line-height: 32px;
        background: rgb(211, 210, 210);
    }
    .nav ul li{
        text-align: center;
        width: 64px;
        height: 32px;
        font-size: 12px;
        background: #fff;
        line-height: 32px;
        border-top: 1px solid rgb(233, 231, 231);
    }
    .nav ul li:hover{
        color: red;
        background: #fff;
    }
    .nav ul li:hover div{
        border-color: red transparent transparent;
    }
    .nav ul li div{
        position: absolute;
        border-width: 10px 10px 0 0;
        border-style: solid;
        border-color: #fff transparent transparent;
        border-left:0 ;
    }
    .active{
        color: red;
    }
    .nav-list .active div{
        border-color: red transparent transparent;
    }
    /* .shopfloors{
        height:625px;
    } */
    .title{
        background: #f0f3ef;
        height: 50px;
    }
	.title button{
		float: right;
        border:solid 1px #fff;
        border-bottom: none;
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		background:#f0f3ef;
        margin-top: 10px;
        font-size: 15px;
        font-weight: 900;
	}
    .title button:hover{
        background: #fff;
    }
	.title span{
		height: 50px;
		margin-left: 20px;
		font-size: 20px;
        line-height: 50px;
	}
	.shopshow{
		height: 487px;
        overflow: hidden;
	}
	.shopshow>div{
		float: left;
	}
	.brands{
        height: 88px;
	}
    .brands ul{
        height: 80px;
        margin-top: 8px;
        background: #fff;
    }
	.brands ul li{
		float: left;
		margin-left: 10px;
        margin-top: 20px;
		width: 100px;
		height: 40px;
		border-left: dashed 1px rgb(136, 135, 135);
		overflow: hidden;
        padding-left: 5px;
	}
    .brands ul li:nth-child(1){
        border-left: none;
    }
    .brands ul li img{
        height: 100%;
    }
	.goodsshop{
		width: 1000px;
		height: 487px;
        overflow: hidden;
	}
    .goodsshop ul{
        height: 100%;
        background: #fff;
    }
	.goodsshop ul li{
		display: inline;
	}
    .goodsshop ul li dl{
        overflow: hidden;
        box-sizing:border-box;
        float: left;
        width: 20%;
		height: 243px;
        border-right: solid 1px #f5f0f0;
        border-bottom: solid 1px #f5f0f0;
    }
    .goodsshop ul li dl dt{
        height:193px ;
        width: 198px;
        display: table-cell;
		vertical-align: middle;
		text-align: center;
    }
    .goodsshop ul li dl dt img{
        width: 170px;
        height: 170px;
        display: inline-block;
    }
    .goodsshop ul li dl dd{
        height: 50px;
    }
    .goodsshop ul li dl dd p{
        padding: 0 5px;
        height: 31px;
        line-height: 15px;
        font-size: 15px;
        /* font-weight: bold; */
        overflow: hidden;
    }
    .goodsshop ul li dl dd span{
        font-size: 15px;
        line-height: 20px;
        color: red;
        margin-left: 5px;
    }
	.classify{
		height: 170px;
		overflow: hidden;
	}
	.classify ul{
		height: 150px;
		margin-top: 20px;
	}
	.classify ul li{
        cursor:pointer;
		margin-left: 20px;
		float: left;
		height: 30px;
		line-height: 30px;
    }
    .classify ul li a{
        color: #fff;
    }
    .classify ul li:hover{
        text-decoration:underline;
    }
    .omnibus{
        width: 998px;
        height:100%;
        float: left;
    }
    .omnibus ul{
        height: 100%;
        
    }
    .omnibus ul li{
        width: 199px;
        height: 317px;
        float: left;
        overflow: hidden;
    }
    .omnibus ul li:nth-child(1){
        width: 399px;
    }
    .omnibus ul li:nth-child(5){
        width: 399px;
        height: 170px;
    }
    .omnibus ul li:nth-child(n+5){
        height: 170px;
    }
    img{
        width: 100%;
        height: 100%;
        display:block;
    }
    >>>.el-carousel__indicators {
         display: none;
    }
    .while{
        background: #fff;
    }
</style>
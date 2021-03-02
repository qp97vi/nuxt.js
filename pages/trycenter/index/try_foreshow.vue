<template>
	<div class="w1224">
		<div class="hottry">更多预告
			<span></span>
		</div>
		<div class="tryshop">
			<ul>
				<li v-for="(item,index) in text_goods" :key="index"  @click="try_details(item.trial_id)">
					<div class="tryshopimg">
						<img :src="apiHead + '/mall/goods/thumb_image?width=500&height=500&goods_id=' + item.goods_id"/>
					</div>
					<div class="tryshopinfo">
					   <p>{{item.goods_name}}</p>
						<p>
							<span class="fl">限量{{item.trialt_num}}份</span>
						     <span class="fr">{{item.apply_count}}人已申请</span>
						</p>
					  <p>${{item.goods.market_price}}</p>
					</div>
						<div class="tryshopbtn">{{item.show_untime}}</div>
				</li>
			</ul>
		</div>
		<div>
            <el-pagination
            background
            :page-size="pagesize"
            :current-page="page"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
            </el-pagination>
        </div>
	</div>
</template>
<script>
	import {
		getIPageTrialGoods
	} from "@/utils/api";
	import common from "@/utils/common"
	export default {
		data() {
			return {
				current: this.$route.params.currentPage || 1,
				logSizi: 10,
				text_goods: [],
				total: 0,
				pagesize:10,
				page:1,//当前页
			}
		},
		created() {
			this.getTextGoods();
		},
		methods: {
			handleCurrentChange(currentPage){
                this.page=currentPage
            },
			getTextGoods() {
				var that = this;
				getIPageTrialGoods({
					state: 0,
					p: that.current,
					size: that.logSizi,

				}).then(function(map) {
					that.timer = setInterval(() => {
						let timestamp = new Date().getTime()
						for (var i in map.records) {
							let differenceTime = map.records[i].start_time*1000-timestamp
							if (differenceTime < 0) {
								location.reload()
								that.d = 0;
								that.h = 0;
								that.m = 0;
								that.s = 0;
								return;
							}
							var arr = common.remainTime2(differenceTime).split(":");
							var d = arr[0];
							var h = arr[1];
							var m = arr[2];
							var s = arr[3];
							map.records[i].show_untime=d+'天'+h+'小时'+m+'分钟'+s+'秒'
						}
						that.text_goods = map.records
					}, 1000);

					that.total = map.total;
				})
			},
			try_details(trial_id){
               this.$router.push({
                   name:'trycenter/index/viewdetails/id',
                   query:{trial_id:trial_id}
               })
           }
		},
		destroyed(){
			clearInterval(this.timer)
		}
	}
</script>
<style scoped>
	.el-carousel__button{
        background: royalblue;
    }
    a:hover{
        color: #0F5499;
    }
	.hottry {
		margin-top: 40px;
		font-size: 24px;
		height: 36px;
		line-height: 36px;
		font-weight: 900;
	}

	.hottry span {
		font-size: 11px;
		font-weight: normal;
		margin-left: 12px;
	}

	.tryshop {
		margin-top: 20px;
	}

	.tryshop ul {
		/* display: flex;
		flex-wrap: wrap;
		justify-content: space-between; */
		overflow: hidden;
	}

	.tryshop ul li {
		float: left;
        width: 224px;
        margin-bottom: 30px;
        margin-right: 20px;
	}

	.tryshopimg {
		cursor:pointer;
		height: 204px;
		height: 204px;
		margin: 0 auto;
	}

	.tryshopimg img {
		width: 100%;
		height: 100%;
	}

	.tryshopinfo {
		width: 204px;
		margin: 0 auto;
	}

	.tryshopinfo p:nth-child(1) {
		font-size: 14px;
		color: #333333;
		line-height: 22px;
		height: 44px;
		overflow: hidden;
		margin-top: 10px;
	}

	.tryshopinfo p:nth-child(2) {
		font-size: 11px;
		color: #666666;
		overflow: hidden;
		margin-top: 10px;
		line-height: 18px;
	}

	.tryshopinfo p:nth-child(3) {
		height: 28px;
		font-size: 18px;
		color: #BD4426;
		text-decoration: line-through;
		margin-top: 10px;
	}

	.tryshopbtn {
		margin: 0 auto;
		width: 204px;
		height: 38px;
		background: #0F5499;
		text-align: center;
		line-height: 38px;
		color: #fff;
		margin-top: 10px;
	}
	.el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #0F5499;
        color: #FFF;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color:#0F5499;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #0F5499;
        color: #FFF;
    }
</style>

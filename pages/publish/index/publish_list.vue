<template>
	<div>
		<div class="dynamic">
			<ul>
				<li v-for="(item,index) in trendList" :key="index">
					<div class="dynamic_img" @click="details(item.trend_id)">
						<img :src="item.trend.image" alt="">
					</div>
					<div class="dynamic_text">
						{{item.trend.title}}
					</div>
					<div class="dynamic_user">
						<div><img :src="item.user.head_pic" alt=""></div>
						<div> {{item.user.nickname}}</div>
						<div style="float: right;">
							<img :src="!item.status?icon1:icon2" @click="addpraise(item.trend_id,index)" />
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div></div>
	</div>
</template>
<script>
	import {
		getUser
	} from "@/utils/auth.js";
	// import config from "@/api/config.js";
	import {
		getApprovedTrend,
		addTrendPraise,
	} from "@/utils/api.js";
	export default {
		data() {
			return {
				// hostUrl: config.host,
				user: getUser(),
				trendPraise: {},
				trendList: [],
				icon1: require('@/static/images/favour1.png'),
				icon2: require('@/static/images/favour2.png')
			}
		},
		created() {
			this.getTrend();
			//this.getStatus();
		},
		methods: {
			details(param) {
				this.$router.push({
					name: 'publish/index/publish_details/id',
					query: {
						id: param
					}
				})
			},

			// addpraise(param,index) {
			// 	var that = this;
			// 	var query = {
			// 		user_id: that.user.user_id,
			// 		trend_id: param
			// 	}
			// 	this.trendList[index].status = !this.trendList[index].status;
			// 	addTrendPraise(query).then(function(res) {
			// 		if (res.status == 1) {
			// 			that.$message.info("操作成功");
			// 		} else {
			// 			that.$message.info("操作失败");
			// 		}
			// 	})
			// },
			getTrend() {
				var that = this;
				let id;
				if (that.user != null) {
					id = that.user.user_id;
				}
				var query = {
					user_id: id,
					type: 1
				}
				getApprovedTrend(query).then(function(res) {
					console.log(res.records);
					that.trendList = res.records;
					// for (var i = 0; i < that.trendList.length; i++) {
					// 	if (that.trendList[i].trend.image != null && that.trendList[i].trend.image != "") {
					// 		that.trendList[i].trend.image = that.hostUrl + that.trendList[i].trend.image;
					// 	}
					// }
				})
			}
		}
	}
</script>
<style scoped>
	@import "@/static/css/publish.css";

	img {
		width: 100%;
		height: 100%;
	}
</style>


<template>
	<div class="fr main">
		<h2>物流跟踪</h2>
		<div class="goods">
			<div class="fl goodsimg">
				<img :src="apiHead + '/mall/goods/thumb_image?width=500&height=500&goods_id=' + trial_goods.goods_id" alt="">
			</div>
			<div class="fl ml20 goodsinfo">
				<h3 class="mt20">{{trial_goods.goods_name}}</h3>
				<!-- <p class="mt20">五香味  500g</p> -->
			</div>
		</div>
		<div class="dhl">
			<div class="fl dhl_img"><img src="" alt=""></div>
			<div class="fl ml20 dhl_number">
				<h4 class="mt5">{{logistics_order.shipping_name}}</h4>
				<p class="mt5">快递单号 {{logistics_order.shipping_sn}}</p>
			</div>
		</div>
		<div>
			<el-steps direction="vertical" :active="1" space=50px finish-status="success">
				<!-- {active:isActive,line:isLine} -->
				<el-step v-for="(item,index) in logistics_info" :key="index" :description="item.cont"></el-step>
			</el-steps>
		</div>
		<div class="signgor" v-if="order.is_shipping==2&&order.is_receive==0" @click="delivery">收货</div>
		<div class="signgor" v-if="order.is_shipping==2&&order.is_receive==1">已收货</div>
		<div id="map"></div>
	</div>
</template>
<script>
	import {
		getTrialOrderDeliver,
		putDelivery,
		getTrialOrder,
		getLogisticsInformation,
		getTrialOrderGoods,
	} from "@/utils/api.js";
	import {
		Loader
	} from "@googlemaps/js-api-loader"
	export default {
		data() {
			return {
				order_sn: this.$route.query.order_sn, //订单号
				logistics_order: {}, //订单物流
				logistics_info: [], //物流信息
				trial_goods: {}, //试用商品
				order: {}, //订单信息,
				longitude:0,
				latitude:0,
				latLngData:'',
			}
		},
		created() {
			getTrialOrderGoods({
				order_sn: this.order_sn
			}).then(res => {
				this.trial_goods = res
			})

			getTrialOrder({
				order_sn: this.order_sn
			}).then(res => {
				this.order = res.records[0]
			})

			getTrialOrderDeliver({
				order_sn: this.order_sn
			}).then(res => {
				this.logistics_order = res
				getLogisticsInformation({
					shipping_code: this.logistics_order.shipping_code,
					invoice_no: this.logistics_order.shipping_sn
				}).then(res => {
					res.data.map(item => {
						item.cont = item.ftime + "," + item.context
					})
					this.logistics_info = res.data
				})
			})
		},
		mounted() {
			this.test();
		},
		methods: {
			test() {
			 var that=this;
				if(navigator.geolocation) {
				    navigator.geolocation.getCurrentPosition(
				        function (position) {
							that.longitude=position.coords.longitude;
							that.latitude =position.coords.latitude;
				            that.latLngData =that.latitude+','+ that.longitude;
							const loader = new Loader({
								apiKey: "AIzaSyBvk_37xH3DBrHiu8pZMDDy_HFNOEHflYM",
								// version: "weekly",
							});
							const uluru = {lat: Number(that.latitude) ,
										lng:  Number(that.longitude)};
							loader.load().then(() => {
							 const	map = new google.maps.Map(document.getElementById("map"), {
									center: uluru,
									zoom: 8,
								});
							   var latLng=that.latLngData;
							    const marker = new google.maps.Marker({
							       position: uluru,  //指标
							       map: map,
							     });
							 	$.ajax({
									type: "post",
									url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng +
										"&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBvk_37xH3DBrHiu8pZMDDy_HFNOEHflYM",
									async: true,
									success: function(data) {
										var site = latLng + '<br />' + data.results[0].formatted_address;
										var infowindow = new google.maps.InfoWindow({
											content: site
										});
										infowindow.open(map, marker); //弹出信息提示窗口
									}
								}); 
							});	
				        },
				        function (e) {
				           throw(e.message);
				        }
				    ) 
				}
			 

			},
			delivery() {
				putDelivery({
					order_sn: this.order_sn
				}).then(res => {
					if (res.status == 1) {
						this.$message.info("收货成功");
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			
		}
	}
</script>
<style scoped>
	.main {
		padding: 20px;
		width: 1000px;
	}

	.main h2 {
		height: 22px;
		line-height: 22px;
		font-size: 18px;
		font-weight: 900;
	}

	.goods {
		overflow: hidden;
		height: 176px;
		margin-top: 30px;
	}

	.goodsimg {
		width: 176px;
		height: 100%;
	}

	.goodsimg img {
		width: 100%;
		height: 100%;
	}

	.goodsinfo {
		width: 800px;
		height: 100%;
	}

	.goodsinfo h3 {
		height: 16px;
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		line-height: 22px;
	}

	.dhl {
		overflow: hidden;
		margin-top: 30px;
		height: 54px;
	}

	.dhl_img {
		width: 54px;
		height: 54px;
	}

	.dhl_number {
		width: 800px;
		height: 100%;
	}

	.signgor {
		width: 180px;
		height: 40px;
		margin: 0 auto;
		background: #0F4599;
		text-align: center;
		line-height: 40px;
		color: #fff;
		font-size: 14px;
	}

	#map {
		height: 500px;
	}
</style>

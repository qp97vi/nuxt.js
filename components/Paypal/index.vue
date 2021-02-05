<template>
	<div>
		
		<div id="paypal-button-container"></div>
	</div>
</template>
<script>
import {getPayPalClientId,getPaypalDetail} from "@/utils/api.js";
export default {
	props:{
		amount: {
			default:0,
			type:[Number,String]
		},
		orderSn: {
			default:0,
			type: [Number,String]
		}
	},
	data() {
		return {
			
		}
	},
	created() {
		this.paypalClientId()
	},
	methods: {
		/*获取ClientId*/ 
		paypalClientId() {
			getPayPalClientId().then(res=>{
				let that = this;
				var PAYPAL_SCRIPT = `https://www.paypal.com/sdk/js?client-id=${res}`;
				var script = document.createElement('script');
				script.setAttribute('src', PAYPAL_SCRIPT);
				document.head.appendChild(script);
				script.onload = script.onreadystatechange = function() {
					console.log("信息")
					paypal.Buttons ({
						
						createOrder: function(data, actions) {
                    // This function sets up the details of the transaction, including the amount and line item details.
							return actions.order.create({
								intent: "CAPTURE", // 
								application_context: {
									user_action: "CONTINUE",
									brand_name: "nicefood",
									locale: "en-US",
									landing_page: "BILLING",
									// shipping_preference: "SET_PROVIDED_ADDRESS"
								},
								purchase_units: [{
									reference_id: that.orderSn,
									// soft_descriptor: "HighFashions",
									invoice_id: that.orderSn, // 订单号
									// custom_id: "CUST-HighFashions",
									amount: {
										value: that.amount
									}
								}],
							});
							console.log(data)
							console.log(actions)
						},
						onApprove: function(data, actions) {
							// 获取交易详情
							return actions.order.capture().then(function(detail) {
								console.log(data)
								// 请求应用服务器，并传递 orderID 
								console.log(detail)
								let params ={
									token: data.orderID,
									// token: getQueryVariable('token'),
									payer_id: data.payerID
								}
								getPaypalDetail(params).then(res=>{
									console.log(res)
									if(res.status == 1) {
										that.jump()
									}
								})
							});
						},
					}).render('#paypal-button-container');
				}
			})
		},
		jump() {
			let flag = true;
			this.$emit('jump',flag)
		}
	},
}
</script>
<style lang="css">
</style>
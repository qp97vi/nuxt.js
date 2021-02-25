<template>
	<div>
		<template v-if="type">
			<store-template :type="type" :storeId="storeId"></store-template>
		</template>
		
	</div>
</template>
<script>
	import {
		getStorePcIndexTemplate,
		getStore
	} from "@/utils/api";
	import StoreTemplate from "@/components/StoreTemplate";
	import {asyncLoadJs} from "@/utils/asyncLoadJs"
	let loadeTtidioJs = false;//是否加载完im的js
	export default {
		data() {
			return {
				type: 0, //店铺主题参数，默认0 
				storeId: this.$route.query.store_id
			}
		},
		components: {
			StoreTemplate
		},
		created(){
			this._getStorePcIndexTemplate();
		},
		methods: {
			_getStorePcIndexTemplate(){
				let that = this
				if(this.$route.query.store_id){
					getStorePcIndexTemplate(that.storeId).then(template => {
						if (template) {
							this.type = template.id
						}else{
							this.type = 1
						}
					})
				}
				if(this.$route.query.store_domain) {
					getStore({
						store_domain: this.$route.query.store_domain
					}).then(res => {
						that.storeId = res.store_id
						return res.store_id
					}).then(storeId=>{
						getStorePcIndexTemplate(storeId).then(template => {
							if (template) {
								this.type = template.id
							}else{
								this.type = 1
							}
						})
					})
				}
			},
		}
	}
</script>
<style lang="scss" scoped>

</style>

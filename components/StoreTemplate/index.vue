<template>
	<div>
		<component :is="name" :id="storeId"></component>
	</div>
</template>
<script>
	import StoreTemplate1 from "./StoreTemplate-1";
	import StoreTemplate2 from "./StoreTemplate-2";
	export default {
		props: {
			type: {
				default: 0,
				type: [Number,String],
			},
			storeId:{
				default:0,
				type:[Number,String]
			}
		},
		data() {
			return {
				componentArr: [{
						type: 1,
						name: "StoreTemplate-1",
					},
					{
						type: 2,
						name: "StoreTemplate-2",
					}
				],
				name: "",

			}
		},
		components: {
			StoreTemplate1,
			StoreTemplate2
		},
		mounted() {
			this.componentArr.map((item, index) => {
				if (item.type == this.type) {
					this.name = item.name
				}
			})
		}
	}
</script>
<style lang="scss">

</style>

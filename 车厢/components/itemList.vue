<template>
	<uni-card title="产品列表">
		<div class="cardList">
			<uni-card v-for="item in items" :title="`产品号:${item.pid}`"
			style="
			width:24%;	
			<!-- #ifdef APP-PLUS -->
			width: 40%;
			flex:none;
			<!-- #endif -->
			">
			</uni-card>
		</div>
	</uni-card>
</template>

<script>
import request from '@/utils/request.js'
import {
	mapState
} from 'vuex'
	export default {
		name:"itemList",
		data() {
			return {
				itemList:[]
			};
		},
		beforeMount() {
			// this.getItemList()
		},
		computed:{
			...mapState('itemList',["items"])
		},
		methods:{
			// async getItemList(){
			// 	const {data}=await request({url:"subway-members"})
			// 	this.itemList=data.data
			// }
		}
	}
</script>

<style>
.cardList{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	text-align: center;
}
</style>
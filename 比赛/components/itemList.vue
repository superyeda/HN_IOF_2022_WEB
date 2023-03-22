<template>
	<uni-card title="会员卡信息">
		<div class="cardList">
			<uni-card v-for="item in items" :title="`卡号:${item.attributes.card}`"
			style="
			width:24%;	
			<!-- #ifdef APP-PLUS -->
			width: 40%;
			flex:none;
			<!-- #endif -->
			">
				<div>余额：{{item.attributes.money}}</div>
				<div>状态：{{item.attributes.state?"已入站":"未入站"}}</div>
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
		created(){
			this.$store.dispatch('itemList/getItemList')
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
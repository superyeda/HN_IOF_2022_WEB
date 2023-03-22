<template>
	<view>
		<My-routeChange></My-routeChange>
		<!-- <My-itemList></My-itemList> -->
		<uni-card title="饮水机列表" thumbnail="../../static/images/peoples.png">
			<view class="cardList">
				<uni-card v-for="item in list" :title="`饮水机ID:${item.id}`">
					<div>位置信息：{{item.attributes.GPS}}</div>
					<div>状态：{{item.attributes.state==1?'复位':item.attributes.state==3?'暂停':"正常"}}</div>
					<button @click="toDetail(item.id)">查看详细信息</button>
				</uni-card>
			</view>
		</uni-card>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		buzzer,
		led,
		fan,
		lock
	} from '../../utils/mqttControl.js'
	export default {
		data() {
			return {}
		},
		created() {
			// this.$store.dispatch('list/dbList')
		},
		computed: {
			...mapState('list', ['list']),
		},
		methods: {
			toDetail(id){
				uni.navigateTo({
					url:`../Detail/Detail?id=${id}`
				})
			}
		},

	}
</script>

<style>
	.cardList {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>

<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="车库列表" thumbnail="../../static/images/peoples.png">
			<view class="cardList">
				<uni-card title="设备ID:1">
					<button @click="toDetail(1)">查看详细信息</button>
				</uni-card>
				<uni-card title="设备ID:2">
					<button @click="toDetail(2)">查看详细信息</button>
				</uni-card>
			</view>
		</uni-card>
		<view>
			<view>
			</view>
		</view>
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

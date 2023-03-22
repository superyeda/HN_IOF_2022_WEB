<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="车辆列表" thumbnail="../../static/images/peoples.png">
			<view class="cardList">
				<uni-card v-for="item in list" :title="`设备ID:${item.id}`" thumbnail="../../static/images/people.png">
					<button @click="toDetail(item.id)">查看详细信息</button>
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
			buzzerOpen() {
				buzzer(1)
			},
			buzzerOff() {
				buzzer()
			},
			lightOpen(){
				led(1,1)
			},
			lightOff(){
				led()
			},
			lockOff() {
				lock()
			},
			lockNo() {
				lock(0)
			},


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

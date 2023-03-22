<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="车辆列表" thumbnail="../../static/images/peoples.png">
			<view class="cardList">
				<My-bikesInfo v-for="bike in list" :carId="bike.id" :carInfo="bike.attributes" 
				<!-- #ifdef APP-PLUS -->
				style="width: 100%;"
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<!-- #endif -->
				></My-bikesInfo>

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

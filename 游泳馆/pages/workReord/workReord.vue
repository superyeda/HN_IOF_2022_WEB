<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="车辆列表" thumbnail="../../static/images/peoples.png">
			<view class="cardList">
				<My-bikesInfo v-for="swm in swmList" :swm='swm' 
					<!-- #ifdef APP-PLUS -->
					style="width: 100%;"
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<!-- #endif -->
					>
				</My-bikesInfo>

			</view>
		</uni-card>
		<view>
			<button type="primary" @click="addMoney">充钱入口</button>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" :duration="2000" :before-close="true" @confirm="addSuccess"
				@close="close">
					泳池:<input type="number" placeholder="请输入泳池ID" v-model="id"><br>
					金额:<input type="number" placeholder="请输入充值金额" v-model="money">
			</uni-popup-dialog>
		</uni-popup>
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
	import {
		doPublish
	} from '@/utils/mqtt'
	import myAlert from '@/utils/myAlert'
	export default {
		data() {
			return {
				money: '',
				id:''
			}
		},
		computed: {
			...mapState('list', ['swmList']),
		},
		methods: {
			addMoney() {
				this.$refs.popup.open("center")
			},
			close() {
				this.$refs.popup.close()
			},
			addSuccess() {
				// TODO:获取mqtt卡号添加人员到数据库
				doPublish('testtopic/mode',JSON.stringify({id:parseInt(this.id),money:parseInt(this.money)}))
				this.$refs.popup.close()
				this.money = ''
			}
		}
	}
</script>

<style>
	.cardList {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>

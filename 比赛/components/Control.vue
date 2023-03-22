<!-- 控制模块 -->
<template>
	<uni-card title="控制台" thumbnail="../../static/images/control.png">
		<view class="controlBox">
				<view class="cu-form-group">
					<view class="title">设备状态</view>
					<view class="btn" style="display: flex;">
						<button @click="changeLock(2)">正常</button>
						<!-- <button @click="changeFan(1)">反</button> -->
						<button @click="changeLock(3)">暂停</button>
						<!-- <button @click="changeSpd(3)">3档</button> -->
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">报警</view>
					<view class="btn" style="display: flex;">
						<button @click="sendAsflg(1)">高水位模式</button>
						<button @click="sendAsflg(2)">低水位模式</button>
						<button @click="sendAsflg(3)">ERROR！</button>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">蜂鸣器</view>
					<view class="btn" style="display: flex;">
						<button @click="sendBz(0)">关</button>
						<button @click="sendBz(1)">叫1</button>
						<button @click="sendBz(2)">叫2</button>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">温度阈值</view>
					<uni-number-box v-model="temp" :max="99999" style="width: 150px;"></uni-number-box>
				</view>
				<button type="primary" @click="sendMqtt">修改阈值</button>
		</view>	
		
	</uni-card>
</template>
<script>
import {
		doSubscribe,
		unSub,
		doPublish
	} from '../utils/mqtt.js'
import { number } from 'echarts'
	import {
		mapState
	} from 'vuex'
import light from '../store/modules/light'
import {
	buzzer,
	fan,
	motor,
	led,
	mode
} from '../utils/mqttControl.js'
	export default {
		props:{
			id:{
				type:Number
			}
		},
		data() {
			return {
				fan: ['正转', '反转', '停转'],
				fan1Index: -1,
				fan2Index: -1,
				Myauto: {},
				Mymanu: {},
				Mymode: 0,
				humi:10,
				temp:20
			}
		},
		created() {
			this.Mymode = this.mode
			this.Myauto = {
				temp: this.temp,
				humi: this.humi,
				air: this.air
			}
			this.Mymanu = {
				f1: this.fan1,
				f2: this.fan2
			}
			// this.humi=beginData[this.id-1].humi
			// this.temp=beginData[this.id-1].temp
		},
		computed: {
				...mapState('mode', ['beginData'])
				},
		methods: {
			sendMqtt() {
					const sendInfo={
						id:this.id,
						p_flg:1,
						t_p:this.temp
					}
					this.$store.commit("mode/CHANGESTATE",sendInfo)
					doPublish('testtopic/mode', JSON.stringify(sendInfo))
			},
			changeLock(value){
				doPublish("testtopic/mode",JSON.stringify({id:this.id,work_s:value}))
				this.$store.dispatch('list/dbList')
			},
			sendAsflg(value){
				doPublish("testtopic/mode",JSON.stringify({id:this.id,as_flg:value}))
			},
			sendBz(value){
				buzzer(this.id,value)
			}
		},
		watch: {
			beginData: {
				deep: true,
				immediate:true,
				handler(a, b) {
					if(a)
					setTimeout(()=>{
						this.temp=a[this.id-1].temp
						this.humi=a[this.id-1].humi	
					},2000)
					
				}
			}
		}
	}
</script>
<style>
	.windState {
		display: flex;
		text-align: center;
	}

	/* #ifdef H5 */
	.manu {
		display: flex;
		justify-content: space-around;
	}

	/* #endif */
	.manu view {
		display: flex;
	}

	.mode {
		display: flex;
		justify-content: space-evenly;
	}

	.mode view {
		display: flex;
	}
</style>

<!-- 控制模块 -->
<template>
	<uni-card title="控制台" thumbnail="../../static/images/control.png">
		<view class="controlBox">
			
				<!-- <view class="cu-form-group margin-top solid-bottom">
					<view class="title">鸣笛</view>
					<view class="btn">
						<button @click="openBuzzer">开</button>
					</view>
				</view> -->
				<view class="cu-form-group margin-top solid-bottom">
					<view class="title">自动模式</view>
					<view class="btn" style="display: flex;">
						<button @click="changeMode(1)">开</button>
						<button @click="changeMode(0)">关</button>
					</view>
				</view>
			<!-- 	<view class="cu-form-group">
					<view class="title">刷卡</view>
					<view class="btn" style="display: flex;">
						<button @click="changeCard(1)">入站</button>
						<button @click="changeCard(0)">出站</button>
					</view>
				</view> -->
				<view class="cu-form-group">
					<view class="title">灯功率</view>
					<view class="btn" style="display: flex;">
						<uni-number-box v-model="lgh" :max="100" style="width: 150px;"></uni-number-box>
						<button @click="changeLED">修改</button>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">空调概率</view>
					<view class="btn" style="display: flex;">
						<uni-number-box v-model="fan1" :max="100" style="width: 150px;"></uni-number-box>
						<button @click="changeFan1">修改</button>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">风机功率</view>
					
					<view class="btn" style="display: flex;">
						<uni-number-box v-model="fan2" :max="100" style="width: 150px;"></uni-number-box>
						<button @click="changeFan1">修改</button>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">报警</view>
					<view class="btn" style="display: flex;">
					<button @click="myAlert">开</button>
					<button @click="buzzerOff">关</button>
					</view>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">LED</view>
					<button @click="changeLED(1)">开</button>
					<button @click="changeLED(0)">关</button>
				</view> -->
				<view class="cu-form-group">
					<view class="title">光照阈值</view>
					<uni-number-box v-model="light" :max="99999" style="width: 150px;"></uni-number-box>
				</view>
				<view class="cu-form-group">
					<view class="title">温度阈值下限</view>
					<uni-number-box v-model="temp1" :max="99999" style="width: 150px;"></uni-number-box>
				</view>
				<view class="cu-form-group">
					<view class="title">温度阈值上限</view>
					<uni-number-box v-model="temp2" :max="99999" style="width: 150px;"></uni-number-box>
				</view>
				<view class="cu-form-group">
					<view class="title">湿度阈值</view>
					<uni-number-box v-model="humi" :max="99999" style="width: 150px;"></uni-number-box>
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
				light:10,
				temp1:20,
				temp2:50,
				fan1:50,
				fan2:50,
				lgh:50,
				humi:50
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
				if(!this.Mymode)
				uni.showToast({
					title:"请先开启自动模式再修改阈值"
				})
				else{
					const sendInfo={
						id:this.id,
						p_flg:1,
						light:this.light,
						t_p1:this.temp2,
						t_p2:this.temp1,
						h_p:this.humi
					}
					this.$store.commit("mode/CHANGESTATE",sendInfo)
					doPublish('testtopic/mode', JSON.stringify(sendInfo))
				}
				// let sendInfo = null
				// if (this.Mymode === 1)
				// 	sendInfo = {
				// 		id:this.id,
				// 		p_flg:1,
				// 		mod: this.Mymode,
				// 		...this.Myauto
				// 	}
				// else
				// 	sendInfo = {
				// 		id:this.id,
				// 		p_flg:1,
				// 		mod: this.Mymode,
				// 		...this.Mymanu
				// 	}
				// doPublish('testtopic/mode', JSON.stringify(sendInfo))
				// this.$store.commit('mode/CHANGESTATE', {
				// 	id:this.id,
				// 	mode: this.Mymode,
				// 	...this.Myauto,
				// 	...this.Mymanu
				// })
			},
			fan1Change(e) {
				this.fan1Index = e.detail.value
				this.Mymanu.f1 = this.fan1Index + 1
			},
			fan2Change(e) {
				this.fan2Index = e.detail.value
				this.Mymanu.f2 = this.fan2Index + 1
			},
			changeModel(e) {
				motor(this.id)
			},
			changeLED(){
				// console.log(e.detail.value);
				// this.Mymanu.d1=e.detail.value?1:0
				doPublish("testtopic/mode",JSON.stringify({id:this.id,led_lv:this.lgh}))
			},
			changeMotor(e){
				this.Mymanu.mot=e.detail.value?1:0
			},
			changeSpd(e){
				fan(this.id,e)
			},
			changeFan1(){
				fan(this.id,this.fan1,this.fan2)
			},
			changeMode(value){
				this.Mymode=value
				mode(this.id,value)
			},
			openBuzzer(){
				buzzer(this.id)
			},
			buzzerOff(){
				doPublish("testtopic/mode",JSON.stringify({id:this.id,alert:0}))
			},
			myAlert(){
				doPublish("testtopic/mode",JSON.stringify({id:this.id,alert:1}))
			},
			changeCard(value){
				doPublish("testtopic/mode",JSON.stringify({id:parseInt(this.id),card:value}))
			}
		},
		watch: {
			beginData: {
				deep: true,
				immediate:true,
				handler(a, b) {
					if(a)
					setTimeout(()=>{
						this.temp1=a[this.id-1].temp1
						this.temp2=a[this.id-1].temp2
						this.light=a[this.id-1].light
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

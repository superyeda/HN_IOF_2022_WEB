<!-- 控制模块 -->
<template>
	<uni-card title="控制台" thumbnail="../../static/images/control.png">
		<view class="controlBox">
				<view class="cu-form-group margin-top solid-bottom">
					<view class="title">鸣笛</view>
					<view class="btn">
						<button @click="openBuzzer">开</button>
					</view>
				</view>
				
				<view class="cu-form-group">
					<view class="title">加速</view>
					<view class="btn" style="display: flex;">
						<button @click="changeSpd(0)">0档</button>
						<button @click="changeSpd(1)">1档</button>
						<button @click="changeSpd(2)">2档</button>
						<button @click="changeSpd(3)">3档</button>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">电机</view>
					<button @click="changeModel()">开</button>
				</view>
				<view class="cu-form-group">
					<view class="title">LED</view>
					<button @click="changeLED(1)">开</button>
					<button @click="changeLED(0)">关</button>
				</view>
				<view class="cu-form-group">
					<view class="title">光照阈值</view>
					<uni-number-box v-model="Myauto.light" :max="99999" style="width: 150px;"></uni-number-box>
				</view>
				<view class="cu-form-group">
					<view class="title">温度阈值</view>
					<uni-number-box v-model="Myauto.temp" :max="99999" style="width: 150px;"></uni-number-box>
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
	led
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
		},
		computed: {
				...mapState('mode', ['beginData'])
				},
		methods: {
			sendMqtt() {
				let sendInfo = null
				if (this.Mymode === 1)
					sendInfo = {
						id:this.id,
						p_flg:1,
						mod: this.Mymode,
						...this.Myauto
					}
				else
					sendInfo = {
						id:this.id,
						p_flg:1,
						mod: this.Mymode,
						...this.Mymanu
					}
				doPublish('testtopic/mode', JSON.stringify(sendInfo))
				this.$store.commit('mode/CHANGESTATE', {
					id:this.id,
					mode: this.Mymode,
					...this.Myauto,
					...this.Mymanu
				})
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
			changeLED(value){
				// console.log(e.detail.value);
				// this.Mymanu.d1=e.detail.value?1:0
				led(this.id,value,value)
			},
			changeMotor(e){
				this.Mymanu.mot=e.detail.value?1:0
			},
			changeSpd(e){
				fan(this.id,e)
			},
			openBuzzer(){
				buzzer(this.id)
			}
		},
		watch: {
			beginData: {
				deep: true,
				immediate:true,
				handler(a, b) {
					setTimeout(()=>{
						console.log(this.id);
						const bgD = a[this.id - 1]
						this.Mymode = parseInt(bgD.mode)
						this.Myauto = {
							temp: parseInt(bgD.temp),
							humi: parseInt(bgD.humi),
							air: parseInt(bgD.air),
							light:parseInt(bgD.light)
						}
						this.fan1Index=parseInt(bgD.fan1),
						this.fan2Index=parseInt(bgD.fan2),
						this.Mymanu = {
							f1: parseInt(bgD.fan1),
							f2: parseInt(bgD.fan2),
							mot:parseInt(bgD.motor),
							l1: parseInt(bgD.led1)
						}	
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

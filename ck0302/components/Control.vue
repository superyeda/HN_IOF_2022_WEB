<!-- 控制模块 -->
<template>
	<uni-card title="控制台" thumbnail="../../static/images/control.png">
		<view class="controlBox">
			<view class="cu-form-group margin-top">
				<view class="title">自动模式</view>
				<switch @change="changeModel" :class="Mymode?'checked':''" :checked="Mymode?true:false"></switch>
			</view>
			<view class="autoModel" v-if="!Mymode">
				<view class="cu-form-group margin-top">
					<view class="title">风扇1</view>
					<picker @change="fan1Change" :value="fan1Index" :range="fan">
						<view class="picker">
							{{fan1Index>-1?fan[fan1Index]:'请选择模式'}}
						</view>
					</picker>
				</view>

				<view class="cu-form-group margin-top solid-bottom">
					<view class="title">风扇2</view>
					<picker @change="fan2Change" :value="fan2Index" :range="fan">
						<view class="picker">
							{{fan2Index>-1?fan[fan2Index]:'请选择模式'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group margin-top solid-bottom">
					<view class="title">LED</view>
					<switch @change="changeLED" :class="Mymanu.led1?'checked':''" :checked="Mymanu.led1?true:false"></switch>
				</view>
				<view class="cu-form-group margin-top solid-bottom">
					<view class="title">电机</view>
					<switch @change="changeMotor" :class="Mymanu.motor===2?'checked':''" :checked="Mymanu.motor===2?true:false"></switch>
				</view>
			</view>
			<view class="manuModel" v-else>
				<view class="cu-form-group margin-top">
					<view class="title">温度阈值</view>
					<uni-number-box v-model="Myauto.temp"></uni-number-box>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">湿度阈值</view>
					<uni-number-box v-model="Myauto.humi"></uni-number-box>
				</view>
			</view>
		</view>	
		<button type="primary" @click="sendMqtt">修改</button>
	</uni-card>
</template>
<script>
	import {
		doPublish
	} from '@/utils/mqtt'
import { number } from 'echarts'
	import {
		mapState
	} from 'vuex'
import light from '../store/modules/light'
	export default {
		props:{
			id:{
				type:Number
			}
		},
		data() {
			return {
				fan: ['不转','正转'],
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
				// 发送信号到硬件
				// console.log(this.Mymode);
				if (this.Mymode === 1)
					sendInfo = {
						id:this.id,
						mode: this.Mymode,
						...this.Myauto
					}
				else
					sendInfo = {
						id:this.id,
						mode: this.Mymode,
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
				this.Mymanu.f1 = this.fan1Index
			},
			fan2Change(e) {
				this.fan2Index = e.detail.value
				this.Mymanu.f2 = this.fan2Index
			},
			changeModel(e) {
				this.Mymode = e.detail.value?1:0
			},
			changeLED(e){
				console.log(e.detail.value);
				this.Mymanu.led1=e.detail.value?1:0
			},
			changeMotor(e){
				this.Mymanu.motor=e.detail.value?2:3
				console.log(this.Mymanu.motor);
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
							// air: parseInt(bgD.air),
							// light:parseInt(bgD.light)
						}
						console.log("收到阈值了",this.Myauto);
						this.fan1Index=parseInt(bgD.fan1),
						this.fan2Index=parseInt(bgD.fan2),
						this.Mymanu = {
							f1: parseInt(bgD.fan1),
							f2: parseInt(bgD.fan2),
							motor:parseInt(bgD.motor),
							led1: parseInt(bgD.led1)
						}	
					},3000)
					
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

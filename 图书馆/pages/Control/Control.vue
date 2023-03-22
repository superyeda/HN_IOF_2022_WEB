<template>
	<uni-card title="控制台" thumbnail="/static/images/control.png">
		<view class="controlBox">

			<view class="cu-form-group margin-top">
				<view class="title">自动模式</view>
				<switch @change="changeModel" :class="Mymode?'checked':''" :checked="Mymode?true:false"></switch>
			</view>

			<view class="autoModel" v-if="!Mymode">
				<view class="cu-form-group margin-top">
					<view class="title">风扇</view>
					<picker @change="fan1Change" :value="fan1Index" :range="fan">
						<view class="picker">
							{{fan1Index>-1?fan[fan1Index]:'请选择模式'}}
						</view>
					</picker>
				</view>
				<!-- <view class="cu-form-group margin-top solid-bottom">
						<view class="title">风扇2</view>
						<picker @change="fan2Change" :value="fan2Index" :range="fan">
							<view class="picker">
								{{fan2Index>-1?fan[fan2Index]:'请选择模式'}}
							</view>
						</picker>
					</view> -->
				<view class="cu-form-group margin-top solid-bottom">
					<view class="title">LED</view>
					<switch @change="changeLED" :class="Mymanu.led1?'checked':''" :checked="Mymanu.led1?true:false">
					</switch>
				</view>
				<view class="cu-form-group margin-top solid-bottom">
					<view class="title">电机</view>
					<switch @change="changeMotor" :class="Mymanu.motor?'checked':''" :checked="Mymanu.motor?true:false">
					</switch>
				</view>
			</view>

			<view class="manuModel" v-else>
				<view class="cu-form-group margin-top">
					<view class="title">温度阈值</view>
					<uni-number-box v-model="Myauto.temp" :max="99999"></uni-number-box>
				</view>
				<!-- <view class="cu-form-group margin-top">
						<view class="title">湿度阈值</view>
						<uni-number-box v-model="Myauto.humi"></uni-number-box>
					</view> -->
				<view class="cu-form-group margin-top">
					<view class="title">光照阈值</view>
					<uni-number-box v-model="Myauto.light" :max="99999"></uni-number-box>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">烟雾阈值</view>
					<uni-number-box v-model="Myauto.air" :max="99999"></uni-number-box>
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
	import {
		number
	} from 'echarts'
	import {
		mapState
	} from 'vuex'
	import {
		led,
		fan,
		motor
	} from '../../utils/mqttControl.js'
	export default {
		data() {
			return {
				fan: ['正转', '反转', '停转'],
				fan1Index: 2,
				fan2Index: -1,
				Myauto: {},
				Mymanu: {},
				Mymode: 0
			}
		},
		props: {
			id: {

			}
		},
		computed: {
			...mapState('mode', ['beginData'])
		},
		created() {
			doPublish("testtopic/mode", JSON.stringify({begin:1,id:parseInt(this.id)}))
		},
		methods: {
			sendMqtt() {
				let sendInfo = null
				// 发送信号到硬件
				if (this.Mymode)
					sendInfo = {
						id: parseInt(this.id),
						mode: this.Mymode ? 1 : 0,
						...this.Myauto
					}
				else
					sendInfo = {
						id: parseInt(this.id),
						mode: this.Mymode ? 1 : 0,
						...this.Mymanu
					}
				doPublish('testtopic/mode', JSON.stringify(sendInfo))
				this.$store.commit('mode/CHANGESTATE', {
					id: this.id,
					data: {
						...sendInfo
					}
				})
			},
			fan1Change(e) {
				this.fan1Index = e.detail.value
				this.Mymanu.fan1 = this.fan1Index + 1
			},
			fan2Change(e) {
				this.fan2Index = e.detail.value
				this.Mymanu.fan2 = this.fan2Index + 1
			},
			changeModel(e) {
				this.Mymode = e.detail.value
			},
			changeLED(e) {
				this.Mymanu.led1 = e.detail.value ? 1 : 0

			},
			changeMotor(e) {
				this.Mymanu.motor = e.detail.value ? 1 : 0
			}
		},
		watch: {
			beginData: {
				deep: true,
				immediate:true,
				handler(a, b) {
					setTimeout(()=>{
						const bgD = a[this.id - 1]
						this.Mymode = parseInt(bgD.mode)
						this.Myauto = {
							temp: parseInt(bgD.temp),
							humi: parseInt(bgD.humi),
							air: parseInt(bgD.air),
							light:parseInt(bgD.light)
						
						}
						this.Mymanu = {
							fan1: parseInt(bgD.fan1),
							// fan2: this.fan2,
							motor:parseInt( bgD.motor),
							led1: parseInt(bgD.led1)
						}	
					},1000)
					
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

	.btn {
		display: flex;
	}
</style>

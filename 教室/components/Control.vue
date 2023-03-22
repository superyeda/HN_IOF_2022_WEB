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
		<view class="windState">
			<uni-card title="风扇1">
				<image src="../static/images/fan.png" mode="widthFix" style="width: 50%;"></image> <br>
				<view style="font-size: 30px;font-weight: 700;">
					状态:{{Mymanu.fan1===1?"正转":Mymanu.fan1===3?"停转":"反转"}}
				</view>
			</uni-card>
			<uni-card title="风扇2">
				<image src="../static/images/fan.png" mode="widthFix" style="width: 50%;"></image> <br>
				<view style="font-size: 30px;font-weight: 700;">
					状态:{{Mymanu.fan2===1?"正转":Mymanu.fan2===3?"停转":"反转"}}
				</view>
			</uni-card>
		</view>

		<button type="primary" @click="sendMqtt">修改</button>
	</uni-card>
</template>
<script>
	import {
		doPublish
	} from '@/utils/mqtt'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				fan: ['正转', '反转', '停转'],
				fan1Index: -1,
				fan2Index: -1,
				Myauto: {},
				Mymanu: {},
				Mymode: 0
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
				fan1: this.fan1,
				fan2: this.fan2
			}
		},
		computed: {
					...mapState('mode', ['beginData'])
				},
		methods: {
			sendMqtt() {
				let sendInfo = null
				// 发送信号到硬件
				if (this.Mymode === 1)
					sendInfo = {
						mode: this.Mymode,
						...this.Myauto
					}
				else
					sendInfo = {
						mode: this.Mymode,
						...this.Mymanu
					}
				doPublish('testtopic/mode', JSON.stringify(sendInfo))
				this.$store.commit('mode/CHANGESTATE', {
					mode: this.Mymode,
					...this.Myauto,
					...this.Mymanu
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
</style>

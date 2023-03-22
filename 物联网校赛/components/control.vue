<!-- 控制模块 -->
<template>
	<uni-card title="控制台" thumbnail="../../static/images/control.png">
		<uni-card title="阈值控制">
			<view>
				<view style="display: flex;">
					光照阈值 : <uni-number-box v-model="light"></uni-number-box>
				</view><br>
				<button type="primary" @click="sendLight">修改光照阈值</button>
			</view>

		</uni-card>
		<uni-data-checkbox v-model="Mymode" mode="button" :localdata="range" /><br>
		<template v-if="Mymode===1">
			<view class="windState">
				<uni-card title="风扇">
					<image src="../static/images/fan.png" mode="widthFix" style="width: 50%;"></image> <br>
					<view style="font-size: 30px;font-weight: 700;">
						状态:{{Myauto.fan1===1?"正转":Myauto.fan1===3?"停转":"反转"}}
					</view>
				</uni-card>
				<uni-card title="LED">
					<image src="../static/images/sun.png" mode="widthFix" style="width: 50%;"></image> <br>
					<view style="font-size: 30px;font-weight: 700;">
						状态:{{Myauto.led1===0?"关":"开"}}
					</view>
				</uni-card>
			</view>

			<view class="manu">
				<view class="winda">
					风扇:
					<uni-data-checkbox v-model="Myauto.fan1" :localdata="windState" />
				</view>
				<view class="windb">
					LED :
					<uni-data-checkbox v-model="Myauto.led1" :localdata="lightState" />
				</view>

			</view>
		</template>

		<template v-else>

			<view class="windState">
				<uni-card title="LED">
					<image src="../static/images/sun.png" mode="widthFix" style="width: 50%;"></image> <br>
					<view style="font-size: 30px;font-weight: 700;">
						状态:{{Mymanu.led2===0?"关":"开"}}
					</view>
				</uni-card>
			</view>

			<view class="manu">
				<view class="windb">
					LED :
					<uni-data-checkbox v-model="Mymanu.led2" :localdata="lightState" />
				</view>

			</view>
		</template>

		<view class="mode" v-else>

		</view><br>

		<button type="primary" @click="sendMqtt">修改车间状态</button>
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
				Mymode: 1,
				range: [{
					"value": 1,
					"text": "车间一"
				}, {
					"value": 2,
					"text": "车间二"
				}],
				windState: [{
					"value": 1,
					"text": "正转"
				}, {
					"value": 3,
					"text": "停止"
				}, {
					"value": 2,
					"text": "反转"
				}],
				lightState: [{
					"value": 0,
					"text": "关"
				}, {
					"value": 1,
					"text": "开"
				}],
				Myauto: {},
				Mymanu: {},
				light: 50
			}
		},
		created() {
			this.Mymode = this.mode,
				this.Myauto = {
					...this.auto
				}
			this.Mymanu = {
				...this.manu
			}

		},
		computed: {
			...mapState('mode', ['mode', 'auto', 'manu'])
		},
		methods: {
			sendMqtt() {
				// 发送信号到硬件
				let sendInfo = {}
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
					auto: this.Myauto,
					manu: this.Mymanu
				})
			},
			sendLight() {
				let light = {
					"light": this.light
				}
				doPublish("testtopic/mode", JSON.stringify(light))
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

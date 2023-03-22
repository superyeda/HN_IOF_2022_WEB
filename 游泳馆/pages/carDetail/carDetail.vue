<template>
	<view class="equipState">
		<My-routeChange></My-routeChange>
		<uni-card title="设备状态" thumbnail="../../static/images/deviceControl.png">
			<view class="cardList">
				<uni-card v-for="equip in equipList" :title="equip.name" style="width:22%;">
					<image :src="equip.icon" mode="widthFix" style="width:70%;"></image><br>
					{{equip.state}}
				</uni-card>
			</view>
		</uni-card>
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
			</view>
			<button type="primary" @click="sendMqtt">修改</button>
		</uni-card>
		<My-Chart :myOption="{
			title:'温度A折线图',
			logo:'../../static/images/tempCount.png',
			myType:'line',
			dataX:temp1List.createT,
			dataY:temp1List.data,
			danW:'℃'
		}"></My-Chart>
		<My-Chart :myOption="{
			title:'温度B折线图',
			logo:'../../static/images/tempCount.png',
			myType:'line',
			dataX:temp2List.createT,
			dataY:temp2List.data,
			danW:'℃'
		}"></My-Chart>
		<My-Chart :myOption="{
			title:'人数折线图',
			logo:'../../static/images/people.png',
			myType:'line',
			dataX:peopleObj.record.createT,
			dataY:peopleObj.record.data,
			danW:'%'
		}"></My-Chart>

	</view>

</template>

<script>
	import wind from '@/static/images/fan.png'
	import temp from '@/static/images/tempCount.png'
	import humi from '@/static/images/humid.png'
	import park from '@/static/images/park.png'
	import smoke from "@/static/images/smoke.png"
	import people from "@/static/images/people.png"
	import {
		mapState
	} from 'vuex'
	import {
		doPublish
	} from '@/utils/mqtt'
	import myAlert from '@/utils/myAlert.js'
	export default {
		data() {
			return {
				equipList: [{
						name: 'A点温度',
						icon: temp,
						state: ""
					},
					{
						name: 'B点温度',
						icon: temp,
						state: ""
					},
					{
						name: '风扇1状态',
						icon: wind,
						state: ""
					}, {
						name: '风扇2状态',
						icon: wind,
						state: ""
					}, {
						name: '室内人数',
						icon: people,
						state: 0
					}
				],
				id: '',
				people: 0,
				Myauto: {},
				Mymanu: {},
				Mymode: 0,
				fan: ['正转', '反转', '停转'],
				fan1Index: -1,
				fan2Index: -1,

			}
		},
		onLoad(e) {
			this.equipList[4].state = e.people
			this.id = e.id
			uni.setStorageSync('curId', e.id)
		},
		computed: {
			...mapState('temp', ['temp1', 'temp2', 'temp1List', 'temp2List']),
			...mapState('fan', ['fan1', 'fan2']),
			...mapState('list', ["swmList"]),
			// ...mapState('humi', ['humi1', 'humi1List']),
			// ...mapState('air', ['air'])
			lineX() {
				let cate = this.temp1List.createT
				return cate
			},
			columnX() {
				return []
			},
			peopleObj() {
				if (this.id == 1)
					return this.swmList[0]
				else
					return this.swmList[1]
			}
		},
		methods: {
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
			sendMqtt() {
				if (this.fan1Index === -1 || this.fan2Index === -1) {
					myAlert('请填风扇状态')
					return
				}
				let sendInfo = null
				// 发送信号到硬件
				if (this.Mymode === 1)
					sendInfo = {
						id:parseInt(this.id) ,
						mode: this.Mymode ? 1 : 2,
						...this.Myauto
					}
				else
					sendInfo = {
						id:parseInt(this.id),
						mode: this.Mymode ? 1 : 2,
						...this.Mymanu
					}
				doPublish('testtopic/mode', JSON.stringify(sendInfo))
				this.$store.commit('mode/CHANGESTATE', {
					mode: this.Mymode,
					...this.Myauto,
					...this.Mymanu
				})
			},
		},
		watch: {

			temp1: {
				deep: true,
				immediate: true,
				handler(a, b) {
					if (a === null)
						this.equipList[0].state = b
					else
						this.equipList[0].state = a
				}
			},
			temp2: {
				deep: true,
				immediate: true,
				handler(a, b) {
					if (a === null)
						this.equipList[1].state = b
					else
						this.equipList[1].state = a
				}
			},

			fan1: {
				immediate: true,
				handler(a, b) {
					if (a === null)
						this.equipList[2].state = b
					else
						this.equipList[2].state = a
				}
			},
			fan2: {
				immediate: true,
				handler(a, b) {
					if (a === null)
						this.equipList[3].state = b
					else
						this.equipList[3].state = a
				}
			},
			swmList: {
				deep: true,
				handler(a, b) {
					if (b) {
						this.equipList[4].state = b[this.id - 1].people
						this.peopleObj = b[this.id - 1]
					} else {
						this.equipList[4].state = a[this.id - 1].people
						this.peopleObj = a[this.id - 1]
					}
				}
			}
		}
	}
</script>

<style>
	.cardList {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
	}
</style>

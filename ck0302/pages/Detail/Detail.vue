<template>
	<view class="equipState" @click>
		<uni-card title="车库信息" thumbnail="../../static/images/deviceControl.png">
			剩余车位：{{50-nowList.length}}
			<My-Car v-for="item in nowList" :id="item.attributes.card" :fee="item.attributes.balance" :time="item.attributes.entertime"></My-Car>
		</uni-card>
		<uni-card title="设备状态" thumbnail="../../static/images/deviceControl.png">
			<view class="cardList">
				<uni-card v-for="equip in equipList" :title="equip.name" v-if="equip.show"
					style="width:22%;flex: none;">
					<image :src="equip.icon" mode="widthFix" style="width:60%;"></image><br>
					{{equip.state}}
				</uni-card>
			</view>
		</uni-card>
		<My-Control :id="id"></My-Control>
		<My-Chart :myOption="{
			title:'温度折线图',
			logo:'../../static/images/tempCount.png',
			danW:'℃',
			data:Series1
		}"></My-Chart>

		<My-Chart :myOption="{
			title:'湿度折线图',
			logo:'../../static/images/humid.png',
			danW:'%',
			data:Series2
		}"></My-Chart>

	</view>


</template>

<script>
	import wind from '@/static/images/fan.png'
	import temp from '@/static/images/tempCount.png'
	import humi from '@/static/images/humid.png'
	import park from '@/static/images/park.png'
	import smoke from '@/static/images/smoke.png'
	import sun from '@/static/images/sun.png'
	import eq from "@/static/images/power.png"
	import dianl from "@/static/images/dianliu.png"
	import diany from "@/static/images/volt.png"
	import {
		mapState
	} from 'vuex'
import { doPublish } from '../../utils/mqtt'
	export default {

		data() {
			return {
				equipList: [{
						name: '光照强度',
						icon: sun,
						state: "000",
						show: false
					},
					{
						name: '温度1',
						icon: temp,
						state: "000",
						show: true
					},
					{
						name: '温度2',
						icon: temp,
						state: "000",
						show: true
					},
					{
						name: '湿度1',
						icon: humi,
						state: "000",
						show: true
					},
					{
						name: '湿度2',
						icon: humi,
						state: "000",
						show: true
					}, {
						name: '风扇A转速',
						icon: wind,
						state: "000",
						show: false
					},
					{
						name: '风扇B转速',
						icon: wind,
						state: "000",
						show: false
					},
					{
						name: '空气1',
						icon: smoke,
						state: "000",
						show: false
					},
					{
						name: '空气2',
						icon: smoke,
						state: "000",
						show: false
					},
					{
						name: '电量',
						icon: eq,
						state: "000",
						show: false
					},
					{
						name: '电压',
						icon: diany,
						state: "000",
						show: false
					},
					{
						name: '电流',
						icon: dianl,
						state: "000",
						show: false
					}
				],

			}
		},
		onLoad(e) {
			doPublish("testtopic/mode",JSON.stringify({id:parseInt(e.id),p_flag:1}))
			this.id = Number(e.id)
			this.$store.dispatch("temp/beginData")
			this.$store.dispatch("humi/beginData")
		},
		computed: {
			...mapState('temp', ['tempList']),
			...mapState('humi', ['humiList']),
			...mapState('fan', ['fan1', 'fan2']),
			...mapState('light', ['light']),
			...mapState('air', ['air1', 'air2']),
			...mapState('battery', ["carList"]),
			...mapState("list",['list']),
			Series1() {
				let series = [{
						name: "室内温度",
						type: 'line',
						data: this.tempList[this.id-1].data.temp1Arr,
					}
				]
				return series
			},
			Series2() {
				let series = [{
					name: "湿度",
					type: 'line',
					data: this.humiList[this.id-1].data.humi1Arr,
				}]
				return series
			},
			nowList(){
				try{
					return this.list.filter(item=>item.attributes.type==this.id)
				}catch{
					return []
				}
			}
		},
		watch: {
			tempList: {
				deep: true,
				immediate: true,
				handler(a, b) {
					setTimeout(() => {
						this.equipList[1].state = a[this.id - 1].data.temp1,
							this.equipList[2].state = a[this.id - 1].data.temp2
					}, 500)
				}
			},
			humiList: {
				deep: true,
				immediate: true,
				handler(a, b) {
					setTimeout(() => {
						this.equipList[3].state = a[this.id - 1].data.humi1,
							this.equipList[4].state = a[this.id - 1].data.humi2
					}, 500)
				}
			},
			carList: {
				deep: true,
				immediate: true,
				handler(a, b) {
					setTimeout(() => {
						this.equipList[9].state = Number(a[this.id-1].data.eq).toFixed(2) + '%'
						this.equipList[10].state = Number(a[this.id-1].data.vlot1).toFixed(2) + 'V',
						this.equipList[11].state = Number(a[this.id-1].data.ampere * 1000).toFixed(2) + 'mA'
					}, 500)
				}
			},
			light(a, b) {
				this.equipList[0].state = a
			},
			fan1(a, b) {
				this.equipList[5].state = a
			},
			fan2(a, b) {
				this.equipList[6].state = a
			},
			air1(a, b) {
				this.equipList[7].state = a
			},
			air2(a, b) {
				this.equipList[8].state = a
			},


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

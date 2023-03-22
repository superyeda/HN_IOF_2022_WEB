<template>
	<view class="equipState">
		<My-routeChange></My-routeChange>
		<uni-card title="设备状态" thumbnail="../../static/images/deviceControl.png">
			<view class="cardList">
				<uni-card v-for="equip in equipList" :title="equip.name" style="width:22%;flex: none;">
					<image :src="equip.icon" mode="widthFix" style="width:70%;"></image><br>
					{{equip.state}}
				</uni-card>
			</view>
		</uni-card>

		<My-Chart :myOption="{
			title:'温度折线图',
			logo:'../../static/images/tempCount.png',
			myType:'line',
			dataX:[],
			dataY:[]
		}"></My-Chart>
		
		<My-Chart :myOption="{
			title:'温度柱形图',
			logo:'../../static/images/tempCount.png',
			myType:'bar',
			dataX:[],
			dataY:[]
		}"></My-Chart>
	</view>


</template>

<script>
	import wind from '@/static/images/fan.png'
	import temp from '@/static/images/tempCount.png'
	import humi from '@/static/images/humid.png'
	import park from '@/static/images/park.png'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				equipList: [{
						name: '光照强度',
						icon: park,
						state: "000"
					},
					{
						name: '风扇A转速',
						icon: wind,
						state: "000"
					},
					{
						name: '风扇B转速',
						icon: wind,
						state: "000"
					},
					{
						name: '室内温度',
						icon: temp,
						state: "000"
					},
					{
						name: '室外温度',
						icon: temp,
						state: "000"
					},
					{
						name: '烟雾',
						icon: humi,
						state: "000"
					}
				],

			}
		},

		computed: {
			...mapState('temp', ['temp1', 'temp2', 'temp1List', 'temp2List', 'biggerTemp1', 'biggerTemp2', 'lessTemp1',
				'lessTemp2'
			]),
			...mapState('fan', ['fan1', 'fan2']),
			...mapState('light', ['light']),
			...mapState('air', ['air']),
			lineSeries() {
				let series = [{
						name: "室内温度",
						data: this.temp1List.data,
					},
					{
						name: "室外温度",
						data: this.temp2List.data
					}
				]
				return series
			},
			lineX() {
				let cate = this.temp1List.createT
				return cate
			},
			columnSeries() {
				let series = [{
						name: "室内大于25",
						data: [this.biggerTemp1]
					},
					{
						name: "室内小于25",
						data: [this.lessTemp1]
					},
					{
						name: "室外大于25",
						data: [this.biggerTemp2]
					},
					{
						name: "室外小于25",
						data: [this.lessTemp2]
					}
				]
				return series
			},
			columnX() {
				return []
			}
		},
		watch: {

			light(a, b) {
				this.equipList[0].state = a
			},
			temp1(a, b) {
				this.equipList[3].state = a
			},
			temp2(a, b) {
				this.equipList[4].state = a
			},
			fan1(a, b) {
				this.equipList[1].state = a
			},
			fan2(a, b) {
				this.equipList[2].state = a
			},
			air(a, b) {
				this.equipList[5].state = a
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

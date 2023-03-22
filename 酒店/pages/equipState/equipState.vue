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
		<uni-card title=" 图表信息" thumbnail="../../static/images/chart.png">
			<view class="chartList">
				<uni-card title="温度折线统计图" thumbnail="../../static/images/tempCount.png">
					<view class="chartBox">
						<!-- #ifdef H5 -->
						<qiun-data-charts :echartsH5="true" type="line" :opts="opts1" :chartData="chartData" />
						<!-- #endif -->
						<!-- #ifdef APP -->
						<qiun-data-charts :echartsApp="true" type="line" :opts="opts1" :chartData="chartData" />
						<!-- #endif -->
					</view>
				</uni-card>
				<br>
				<uni-card title="温度柱状统计图" thumbnail="../../static/images/tempCount.png">
					<view class="chartBox">
						<!-- #ifdef H5 -->
						<qiun-data-charts :echartsH5="true" type="column" :opts="opts1" :chartData="chartData2" />
						<!-- #endif -->
						<!-- #ifdef APP -->
						<qiun-data-charts :echartsApp="true" type="column" :opts="opts1" :chartData="chartData2" />
						<!-- #endif -->
					</view>
				</uni-card>
				<br>
			</view>

		</uni-card>
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
						name: '灯',
						icon: park,
						state: '开'
					},
					{
						name: '风扇A转速',
						icon: wind,
						state: '0'
					},
					{
						name: '风扇B转速',
						icon: wind,
						state: '0'
					},
					{
						name: '室内温度',
						icon: temp,
						state: ''
					},
					{
						name: '室外温度',
						icon: temp,
						state: ''
					},
					{
						name: '烟雾',
						icon: humi,
						state: ''
					}
				],
				chartData: {},
				chartData2: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts1: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "curve",
							width: 2
						}
					}
				},
			}
		},
		onReady() {
			this.getServerData();
			this.getServerData2()
		},
		computed: {
			// ...mapState("temp",['temp1'])
			...mapState('temp',['temp1List', 'temp2List', 'temp1','temp2','biggerTemp1', 'biggerTemp2','lessTemp1','lessTemp2'])
		},
		methods: {
			getServerData2() {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					// categories: ["室内大于25","室内小于25","室外大于25","室外小于25"],
					series: [{
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
				}
				this.chartData2 = JSON.parse(JSON.stringify(res));
			},
			getServerData() {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					categories: this.temp1List.createT,
					series: [{
							name: "室内温度",
							data: this.temp1List.data
						},
						{
							name: "室外温度",
							data: this.temp2List.data
						}
					]
				}
				this.chartData = JSON.parse(JSON.stringify(res));
			},
		},

		watch: {
			temp1List: {
				deep: true,
				handler(a, b) {
					this.getServerData()
				}
			},
			realData: {
				deep: true,
				handler(a, b) {
					this.equipList[1].state=a.fan1
					this.equipList[2].state=a.fan2
					this.equipList[3].state = a.temp1
					this.equipList[4].state = a.temp2
					this.equipList[5].state=a.air
					
				}
			},
			biggerTemp1(a,b){
				this.getServerData2()
			}
		}
	}
</script>

<style>
	@import url('/static/fonts/iconfont.css');

	.cardList {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
	}

	.chartBox {
		width: 100%;
		height: 300px;
	}
</style>

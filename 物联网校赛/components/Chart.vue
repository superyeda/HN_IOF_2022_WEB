<!-- 条形图模块 -->
<template>
	<uni-card title="温度折线统计图" thumbnail="../../static/images/tempCount.png">
		<view class="chartBox">
			<!-- #ifdef H5 -->
			<qiun-data-charts :echartsH5="true" :type="myType" :opts="opts1" :chartData="chartData" />
			<!-- #endif -->
			<!-- #ifdef APP -->
			<qiun-data-charts :echartsApp="true" :type="myType" :opts="opts1" :chartData="chartData" />
			<!-- #endif -->
		</view>
	</uni-card>
</template>

<script>
	export default {
		props: {
			data:{
				type:Object
			},
			myType:{
				type:String
			},
			series:{
				type:Array
			},
			categories:{
				type:Array
			}
		},
		data() {
			return {
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
				chartData: {},
			}
		},

		methods: {
			getServerData() {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					categories: this.categories,
					series:this.series
				}
				this.chartData = JSON.parse(JSON.stringify(res));
			},
		},
		mounted() {
			// console.log(this.categories,'--------',this.series);
			this.getServerData()
			
		},
	


		watch: {
			data: {
				deep: true,
				handler(a, b) {
					console.log(123);
					this.getServerData()
				}
			}
		}

	}
</script>

<style>
	.chartBox {
		width: 100%;
		height: 300px;
	}
</style>

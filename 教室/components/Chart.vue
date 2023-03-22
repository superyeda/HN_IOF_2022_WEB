<!-- 条形图模块 -->
<template>
	<uni-card :title="myOption.title" :thumbnail="myOption.logo">
		<l-echart ref="chart" class='chartBox' @finished="init"></l-echart>
	</uni-card>
</template>

<script>
	import * as echarts from 'echarts'
	export default {
		props: {
			myOption: {
				type: Object
			}
		},
		data() {
			return {
				myChart: null,
				option: {
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					legend: {},
					// toolbox: {
					// 	show: true,
					// 	feature: {
					// 		dataZoom: {
					// 			yAxisIndex: 'none'
					// 		},
					// 		dataView: {
					// 			readOnly: false
					// 		},
					// 		magicType: {
					// 			type: ['line', 'bar']
					// 		},
					// 		restore: {},
					// 		saveAsImage: {}
					// 	}
					// },
					// dataZoom:
					//     {
					//       type: 'slider',
					//       start: 80,
					// 	  end:100
					//     },
					xAxis: {
						type: 'category',
						boundaryGap: false,
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							formatter: '',
						}
					},
					series: []
				}
			}
		},
		created() {
			this.option.yAxis.axisLabel.formatter = '{value}' + this.myOption.danW
			this.option.series = this.myOption.data
		},
		methods: {
			init() {
				this.$refs.chart.init(echarts, chart => {
					chart.setOption(this.option);
				});
			}
		},
		mounted() {
			this.$refs.chart.init(echarts, chart => {
				this.myChart = chart
				this.myChart.setOption(this.option)
			});
		},



		watch: {
			myOption: {
				deep: true,
				handler(a, b) {
					if (this.myChart !== null){
						this.option.series = this.myOption.data
						this.myChart.setOption(this.option)
					}
						
				}

			}
		}

	}
</script>

<style>
</style>

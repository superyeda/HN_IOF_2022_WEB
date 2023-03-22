<!-- 条形图模块 -->
<template>
	<uni-card :title="myOption.title" :thumbnail="myOption.logo">
		<l-echart ref="chart" @finished="init"></l-echart>
	</uni-card>
</template>
	
<script>
	import * as echarts from 'echarts'
	export default {
		props: {
			myOption:{
				type:Object
			}
		},
		data() {
			return {}
		},
		computed: {
			option() {
				let option = {
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
					toolbox: {
						show: true,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {
								readOnly: false
							},
							magicType: {
								type: ['line', 'bar']
							},
							restore: {},
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							formatter: '{value} °C'
						}
					},
					series: [{
							name: '最高温度',
							type: this.myOption.myType,
							data: [10, 11, 13, 11, 12, 12, 9],
							markPoint: {
								data: [{
										type: 'max',
										name: 'Max'
									},
									{
										type: 'min',
										name: 'Min'
									}
								]
							},
							markLine: {
								data: [{
									type: 'average',
									name: 'Avg'
								}]
							}
						}
					]
				}
				return option
			}
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
				chart.setOption(this.option);
			});
		},



		watch: {

		}

	}
</script>

<style>
	.chartBox {
		width: 100%;
		height: 300px;
	}
</style>

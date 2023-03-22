<template>
	<view style="height: 400rpx">
		<l-echart ref="chart"></l-echart>
	</view>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		props:{
			nowData:{
				type:Number
			},

		},
		data() {
			return {
				option:{
				    backgroundColor: "#ffffff",
				    series: [{
				      name: this.title,
				      type: 'gauge',
				      detail: {
				        formatter: '{value}',
				      },
				      axisLine: {
				        show: true,
				      },
				      data: [{
				        value:0,
				      }]
				
				    }]
				  },
				  myChart:null
			}
		},
		async mounted() {
			this.option.series[0].data[0].value=this.nowData
			this.init()
		},
		methods:{
			init(){
				this.$refs.chart.init(echarts, chart=> {
					chart.setOption(this.option)
				});
			}
		},
		watch:{
			nowData(a,b){
				this.option.series[0].data[0].value=this.nowData
				this.$refs.chart.setOption(this.option)
			}
		}
	}
</script>
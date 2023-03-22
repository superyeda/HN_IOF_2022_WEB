<template>
	<view>
		<uni-card :title="'车辆ID:'+id">
			费用:{{fee}}<br>
			进入时间:{{MyTime}}
		</uni-card>
	</view>
</template>

<script>
import {toTime} from '../utils/myTime.js'
	export default {
		props:{
			id:{
				type:String
			},
			fee:{
				type:String
			},
			time:{
				type:String
			}
		},
		data() {
			return {
				MyTime:''
			}
		},
		methods: {
			
		},
		mounted() {
			this.MyTime=toTime(this.time)	
			// setInterval(()=>{this.MyTime=toTime(this.time-100000)},1000)
		}
	}
</script>

<style>

</style>

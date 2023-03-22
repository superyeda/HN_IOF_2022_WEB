<template>
	<view style="
	width: 32%;
	<!-- #ifndef H5 -->
		width: 100%;
	<!-- #endif -->
	">
		<uni-card :title="`姓名:${cardInfo.name}`" thumbnail="../../static/images/people.png" class='workCard' :class="workStamp>20000?'warn':''">
				<p>卡号 : {{cardInfo.card_num}}</p>
				<p>状态 : {{cardInfo.work_state}}</p>
				<p>开始时间:{{startT}}</p>
				<p>工作时长 :{{workT}}</p>
				<!-- <button @click="detailInfo">详细信息</button> -->
		</uni-card>
	</view>
</template>

<script>
	import {toTime,toStamp,toRelTime} from "@/utils/myTime.js"
	import {buzzer} from "@/utils/mqttControl.js"
import { log } from "mqtt/dist/mqtt";
	export default {
		name:"detailCard",
		props:{
			cardInfo:{
				type:Object
			}
		},
		data() {
			return {
				startT:'',
				workT:'',
				workStamp:'',
				p:null
			};
		},	
		created() {
			console.log(this.cardInfo.start_time,toStamp(new Date()));
			let startT=parseInt(this.cardInfo.start_time/1-(1000*60*14-4000))
			this.startT=`${new Date().getFullYear()}/${toTime(startT)}`
			let flag=0
			this.p=setInterval(()=>{
				if(this.workStamp>20000 && flag===0){
					buzzer(1)
					flag++
				}
				
				let workT=toStamp(new Date())-startT
				this.workStamp=workT
				this.workT=toRelTime(workT)
			},1000)
		},
		methods:{
			detailInfo(){
				uni.navigateTo({
					url:`/pages/carDetail/carDetail?id=${this.carId}`,
				})
			}
		},
		destroyed() {
		}
	}
</script>

<style>
	.warn{
		background-color: red;
	}
	.workCard p{
		font-size: 20px;
	}
</style>
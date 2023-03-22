<template>
	<view style="width: 30%;">
		<uni-card :title="`ID:${carId}`" thumbnail="../../static/images/bike.png">
				使用状态 : {{carInfo.state?"开锁":"闲置中"}}<br>
				车辆电量 : {{(carInfo.power*100).toFixed(2)}}% <br>
				GPS信息 : {{carInfo.GPS}}
			
			<button @click="detailInfo">详细信息</button>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name:"detailCard",
		props:{
			carId:{
				type:Number
			},
			carInfo:{
				type:Object
			}
		},
		data() {
			return {
				
			};
		},	
		methods:{
			detailInfo(){
				uni.navigateTo({
					url:`/pages/carDetail/carDetail?id=${this.carId}`,
					
				})
			}
		}
	}
</script>

<style>

</style>
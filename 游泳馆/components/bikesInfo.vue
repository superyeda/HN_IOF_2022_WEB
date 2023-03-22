<template>
	<view style="width: 30%;">
		<uni-card :title="`游泳馆:${swm.id}`"  thumbnail="../../static/images/people.png">
				人数信息 : {{swm.people}}<br>
				位置信息 : {{swm.address}}
			<button @click="detailInfo">详细信息</button>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name:"detailCard",
		props:{
			swm:{
				type:Object
			},
		},
		data() {
			return {
				
			};
		},	
		methods:{
			detailInfo(){
				uni.navigateTo({
					url:`/pages/carDetail/carDetail?id=${this.swm.id}&people=${this.swm.people}`,
					
				})
			}
		}
	}
</script>

<style>

</style>
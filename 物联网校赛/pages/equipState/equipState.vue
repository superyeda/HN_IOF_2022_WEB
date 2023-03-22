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
		<!-- 折线图 -->
		<My-Chart :echartsH5="true" :data="temp1List" myType="line" :series="lineSeries" :categories="lineX"></My-Chart>
		
		<br>
	</view>

	</uni-card>
	</view>
</template>

<script>
	import wind from '@/static/images/fan.png'
	import temp from '@/static/images/tempCount.png'
	import humi from '@/static/images/humid.png'
	import light from '@/static/images/sun.png'
	import smoke from '@/static/images/smoke.png'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				equipList: [{
						name: '光照强度',
						icon: light,
						state: "000"
					},
					{
						name: '温度',
						icon: temp,
						state: "000"
					},
					{
						name: '湿度',
						icon: humi,
						state: "000"
					},
					{
						name: '风扇',
						icon: wind,
						state: "000"
					},
					{
						name: '车间一LED',
						icon: smoke,
						state: "000"
					},
					{
						name: '车间二LED',
						icon: smoke,
						state: "000"
					}
				],
				
				}
		},
		
		computed: {
			...mapState('temp',['temp1','temp1List']),
			...mapState('fan',['fan1']),
			...mapState('light',['light','led1','led2']),
			...mapState('humi',['humi1']),
			lineSeries(){
				let series=[{
						name: "室内温度",
						data:this.temp1List.data,
					}
				]
				return series
			},
			lineX(){
				let cate=this.temp1List.createT
				return cate
			}
		},
		watch: {

			light(a,b){
				console.log("光照",a);
				this.equipList[0].state=a
			},
			temp1(a, b) {
				this.equipList[1].state =a
			},
			humi1(a, b) {
				this.equipList[2].state = a
			},
			fan1(a,b){
				this.equipList[3].state=a
			},
			led1(a,b){
				this.equipList[4].state=a
			},
			led2(a,b){
				this.equipList[5].state=a
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
</style>

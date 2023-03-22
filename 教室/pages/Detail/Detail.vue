<template>
	<view class="equipState">
		<uni-card :title="`教室ID:${id}`" thumbnail="../../static/images/peoples.png">
			<view class="cardList">
				<uni-card v-for="equip in equipList" :title="equip.name" v-if="equip.show" style="width:22%;flex: none;">
					<image :src="equip.icon" mode="widthFix" style="width:60%;"></image><br>
					{{equip.state}}
				</uni-card>
			</view>
		</uni-card>
		<view>
			<!-- 控制模块 -->
			<My-Control :id="id"></My-Control>
		</view>
		<My-Chart :myOption="{
			title:'温度折线图',
			logo:'../../static/images/tempCount.png',
			danW:'℃',
			data:Series1
		}"></My-Chart>
		
		<My-Chart :myOption="{
			title:'温度柱形图',
			logo:'../../static/images/humid.png',
			danW:'%',
			data:Series2
		}"></My-Chart>
		<view class="illP">
			<My-illegalList :id="id"></My-illegalList>
		</view>
	</view>
	

</template>

<script>
import wind from '@/static/images/fan.png'
import temp from '@/static/images/tempCount.png'
import humi from '@/static/images/humid.png'
import park from '@/static/images/park.png'
import smoke from '@/static/images/smoke.png'
import sun from '@/static/images/sun.png'
import {
	mapState
} from 'vuex'
	export default {
		data() {
			return {
				equipList: [{
						name: '光照强度',
						icon: sun,
						state: "000",
						show:true
					},
					{
						name: '室内温度',
						icon: temp,
						state: "000",
						show:true
					},
					{
						name: '室外温度',
						icon: temp,
						state: "000",
						show:false
					},
					{
						name: '湿度1',
						icon: humi,
						state: "000",
						show:true
					},
					{
						name: '湿度2',
						icon: humi,
						state: "000",
						show:false
					},{
						name: '风扇A转速',
						icon: wind,
						state: "000",
						show:false
					},
					{
						name: '风扇B转速',
						icon: wind,
						state: "000",
						show:false
					},
					{
						name: '空气1',
						icon: smoke,
						state: "000",
						show:true
					},
					{
						name: '空气2',
						icon: smoke,
						state: "000",
						show:true
					}
				],
				id:''

			}
		},
		computed: {
			...mapState('temp', ['tempList']),
			...mapState('humi', ['humiList']),
			...mapState('fan', ['fan1', 'fan2']),
			...mapState('light', ['light1','light2']),
			...mapState('air', ['air1','air2']),
			Series1() {
				let series = [{
						name: "室内温度",
						type:'line',
						data: this.tempList[this.id-1].data.temp1Arr,
					},
					// {
					// 	name: "室外温度",
					// 	type:'line',
					// 	data: this.tempList[0].data.temp1Arr
					// }
				]
				return series
			},
			Series2() {
				let series = [{
						name: "湿度1",
						type:'line',
						data: this.humiList[this.id-1].data.humi1Arr,
					},
					// {
					// 	name: "湿度2",
					// 	type:'line',
					// 	data: this.humiList[0].data.humi1Arr
					// }
				]
				return series
			},
		},
		watch: {
			tempList:{
				deep:true,
				immediate:true,
				handler(a,b){
					this.id=localStorage.getItem("Id")
					// console.log(this.id-1,a);
					this.equipList[1].state=a[this.id-1].data.temp1,
					this.equipList[2].state=a[this.id-1].data.temp2
				}
			},
			humiList:{
				deep:true,
				immediate:true,
				handler(a,b){
					this.id=localStorage.getItem("Id")
					this.equipList[3].state=a[this.id-1].data.humi1,
					this.equipList[4].state=a[this.id-1].data.humi2
				}
			},
			light1(a, b) {
				this.equipList[0].state = a
			},
			fan1(a, b) {
				this.equipList[1].state = a
			},
			fan2(a, b) {
				this.equipList[2].state = a
			},
			air1(a, b) {
				// console.log("空气1",a);
				this.equipList[7].state = a
			},
			air2(a, b) {
				this.equipList[8].state = a
			},

		}
	}
</script>

<style>
	.cardList {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
	}
</style>

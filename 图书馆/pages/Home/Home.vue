<template>
	<view class="equipState" @click>
		<My-routeChange></My-routeChange>
		<uni-card title="设备状态" thumbnail="../../static/images/deviceControl.png">
			<view class="cardList">
				<uni-card v-for="equip in equipList" :title="equip.name" v-if="equip.show" style="width:22%;flex: none;">
					<image :src="equip.icon" mode="widthFix" style="width:60%;"></image><br>
					{{equip.state}}
				</uni-card>
			</view>
		</uni-card>
		<uni-card title="非法传入信息" thumbnail="../../static/images/deviceControl.png">
			<table style="width: 100%;" border="1px" cellspacing='0'>
				<tr>
					<th>序号</th>
					<th>闯入时间</th>
				</tr>
				<tr v-for="(item,index) in illList" style="text-align: center;">
					<td>{{index+1}}</td>
					<td>{{item}}</td>
				</tr>
			</table>
		</uni-card>
		
<!-- 		<My-Chart :myOption="{
			title:'温度折线图',
			logo:'../../static/images/tempCount.png',
			danW:'℃',
			data:Series1
		}"></My-Chart>
		
		<My-Chart :myOption="{
			title:'温度柱形图',
			logo:'../../static/images/humid.png',
			data:Series2
		}"></My-Chart> -->
		
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
						show:false
					},
					{
						name: '室内温度',
						icon: temp,
						state: "000",
						show:false
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
						show:false
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
						name: '空气',
						icon: smoke,
						state: "000",
						show:true
					}
				],

			}
		},
		computed: {
			...mapState('temp', ['tempList']),
			...mapState('humi', ['humiList']),
			...mapState('fan', ['fan1', 'fan2']),
			...mapState('light', ['light']),
			...mapState('air', ['air1']),
			...mapState('list', ['illList']),
			Series1() {
				let series = [{
						name: "室内温度",
						type:'line',
						data: this.tempList[0].data.temp1Arr,
					},
					{
						name: "室外温度",
						type:'line',
						data: this.tempList[0].data.temp1Arr
					}
				]
				return series
			},
			Series2() {
				let series = [{
						name: "湿度1",
						type:'line',
						data: this.humiList[0].data.humi1Arr,
					},
					{
						name: "湿度2",
						type:'line',
						data: this.humiList[0].data.humi1Arr
					}
				]
				return series
			},
		},
		created() {
			this.$store.dispatch('list/dbillList')
		},
		watch: {
			air1(a, b) {
				this.equipList[7].state = a
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

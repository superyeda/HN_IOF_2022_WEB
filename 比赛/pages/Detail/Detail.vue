<template>
	<view class="equipState">
		<!-- <My-routeChange></My-routeChange> -->
		<uni-card title="设备状态" thumbnail="../../static/images/deviceControl.png">
			<!-- <view class="cu-form-group margin-top">
				<view class="title">开锁</view>
				<switch @change="changeLock" :class="lock?'checked':''" :checked="lock?true:false"></switch>
			</view> -->
			<view class="cardList">
				<uni-card v-for="equip in equipList" :title="equip.name" v-if="equip.show"
					style="
					width:24%;	
					<!-- #ifdef APP-PLUS -->
					width: 40%;
					flex:none;
					<!-- #endif -->
					">
					<image :src="equip.icon" mode="widthFix" style="
					width:60%;
					"></image><br>
					{{equip.state}}
				</uni-card>
			</view>
		</uni-card>
		<My-Control :id="id"></My-Control>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog ref="inputClose" :title="popContent" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- <My-LostData></My-LostData> -->
		<My-Chart :myOption="{
			title:'水质折线图',
			logo:'../../static/images/humid.png',
			danW:'%',
			data:Series2
		}"></My-Chart>
	</view>


</template>

<script>
	import request from '@/utils/request.js'
	import wind from '@/static/images/fan.png'
	import temp from '@/static/images/tempCount.png'
	import humi from '@/static/images/humid.png'
	import park from '@/static/images/park.png'
	import smoke from '@/static/images/smoke.png'
	import sun from '@/static/images/sun.png'
	import eq from "@/static/images/power.png"
	import dianl from "@/static/images/dianliu.png"
	import diany from "@/static/images/volt.png"
	import control from "@/static/images/control.png"
	import point from "@/static/images/point.png"
	import {
		mapState
	} from 'vuex'
	import {
		lock,
	} from '../../utils/mqttControl.js'
import { doPublish,doSubscribe,unSub } from '../../utils/mqtt'
	export default {

		data() {
			return {
				lock:false,
				popContent:'',
				equipList: [{
						name: '水质1',
						icon: humi,
						state: "0",
						show: true
					},{
						name: '水质2',
						icon: humi,
						state: "0",
						show: true
					},
					{
						name: '工作状态',
						icon: control,
						state: "0",
						show: true
					},
					{
						name: '位置',
						icon: point,
						state: "0",
						show: true
					},
					{
						name: '水温1',
						icon: temp,
						state: "0",
						show: true
					},
					{
						name: '水温2',
						icon: temp,
						state: "0",
						show: true
					}
				],
				item:null

			}
		},
		onLoad(e) {
			doPublish("testtopic/mode",JSON.stringify({id:parseInt(e.id),p_flg:1}))
			this.id = Number(e.id)
			uni.setStorageSync("curId",e.id)
			this.item=this.list[this.id-1]
			this.equipList[2].state=this.item.attributes.state==1?'复位':this.item.attributes.state==3?'暂停':"正常"
			this.equipList[3].state=this.item.attributes.GPS
		},
		computed: {
			...mapState('lock',['note']),
			...mapState('temp', ['tempList']),
			...mapState('humi', ['humiList']),
			...mapState('tds', ['tdsList']),
			...mapState('fan', ['fan1', 'fan2',"fan_spd"]),
			...mapState('light', ['light']),
			...mapState('list', ['list']),
			...mapState('battery', ["carList"]),
			Series1() {
				let series = [{
						name: "温度",
						type: 'line',
						data: this.tempList[this.id-1].data.temp1Arr,
					}
				]
				return series
			},
			Series2() {
				let series = [{
					name: "水质1",
					type: 'line',
					data: this.tdsList[this.id-1].data.tds1Arr,
				},
				{
					name: "水质2",
					type: 'line',
					data: this.tdsList[this.id-1].data.tds2Arr,
				}]
				return series
			},
		},
		methods: {
		},
		watch: {
			tempList: {
				deep: true,
				immediate: true,
				handler(a, b) {
					setTimeout(() => {
						this.equipList[4].state = a[this.id - 1].data.temp1,
							this.equipList[5].state = a[this.id - 1].data.temp2
					}, 500)
				}
			},
			tdsList: {
				deep: true,
				immediate: true,
				handler(a, b) {
					setTimeout(() => {
						console.log();
						this.equipList[0].state = Number(a[this.id - 1].data.tds1).toFixed(2),
						this.equipList[1].state = Number(a[this.id - 1].data.tds2).toFixed(2)
					}, 500)
				}
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

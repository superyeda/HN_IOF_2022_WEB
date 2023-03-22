<template>
	<view class="equipState" @click>
		<My-routeChange></My-routeChange>
		<uni-card title="设备状态" thumbnail="../../static/images/deviceControl.png">
			<view class="cu-form-group margin-top">
				<view class="title">开锁</view>
				<switch @change="changeLock" :class="lock?'checked':''" :checked="lock?true:false"></switch>
			</view> 
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
		<My-LostData></My-LostData>
		<My-Chart :myOption="{
			title:'温度折线图',
			logo:'../../static/images/tempCount.png',
			danW:'℃',
			data:Series1
		}"></My-Chart>

		<My-Chart :myOption="{
			title:'电量折线图',
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
						name: '光照强度',
						icon: sun,
						state: "000",
						show: false
					},
					{
						name: '温度',
						icon: temp,
						state: "000",
						show: true
					},
					{
						name: '室外温度',
						icon: temp,
						state: "000",
						show: false
					},
					{
						name: '湿度1',
						icon: humi,
						state: "000",
						show: false
						
					},
					{
						name: '湿度2',
						icon: humi,
						state: "000",
						show: false
					}, {
						name: '车速',
						icon: wind,
						state: "0",
						show: true
					},
					{
						name: '风扇B转速',
						icon: wind,
						state: "000",
						show: false
					},
					{
						name: '空气1',
						icon: smoke,
						state: "000",
						show: false
					},
					{
						name: '空气2',
						icon: smoke,
						state: "000",
						show: false
					},
					{
						name: '电量',
						icon: eq,
						state: "000",
						show: true
					},
					{
						name: '电压',
						icon: diany,
						state: "000",
						show: true
					},
					{
						name: '电流',
						icon: dianl,
						state: "000",
						show: true
					}
				],

			}
		},
		onLoad(e) {
			doPublish("testtopic/mode",JSON.stringify({id:parseInt(e.id),p_flag:1}))
			this.id = Number(e.id)
			uni.setStorageSync("curId",e.id)
			this.$store.dispatch("temp/beginData")
			this.$store.dispatch("humi/beginData")
			request({url:`bicycles/${e.id}`}).then(({data})=>{
				let info=data.data.attributes
				this.$store.commit('lock/CHANGELOCK',info.state)
				this.lock=info.state
			})
		},
		computed: {
			...mapState('lock',['note']),
			
			...mapState('temp', ['tempList']),
			...mapState('humi', ['humiList']),
			...mapState('fan', ['fan1', 'fan2',"fan_spd"]),
			...mapState('light', ['light']),
			...mapState('air', ['air1', 'air2']),
			...mapState('battery', ["carList"]),
			Series1() {
				let series = [{
						name: "室内温度",
						type: 'line',
						data: this.tempList[this.id-1].data.temp1Arr,
					}
				]
				return series
			},
			Series2() {
				let series = [{
					name: "电量",
					type: 'line',
					data: this.carList[this.id-1].data.eqList,
				}]
				return series
			},
		},
		methods: {
			changeLock(e) {
				this.$refs.popup.open('center')
				this.popContent=!this.lock?"开锁中......":"上锁中......"
				doSubscribe('testtopic/lock')
				this.lock=!this.lock
				
				this.p=setInterval(()=>{
					lock(this.id,this.lock?0:1)},2000)			
			},
			dialogInputConfirm(){
				console.log("修改成功");
			},
		},
		watch: {
			tempList: {
				deep: true,
				immediate: true,
				handler(a, b) {
					// console.log("温度====",a,this.id);
					setTimeout(() => {
						this.equipList[1].state = a[this.id - 1].data.temp1,
							this.equipList[2].state = a[this.id - 1].data.temp2
					}, 500)
				}
			},
			humiList: {
				deep: true,
				immediate: true,
				handler(a, b) {
					setTimeout(() => {
						this.equipList[3].state = a[this.id - 1].data.humi1,
							this.equipList[4].state = a[this.id - 1].data.humi2
					}, 500)
				}
			},
			carList: {
				deep: true,
				immediate: true,
				handler(a, b) {
					setTimeout(() => {
						this.equipList[9].state = Number(a[this.id-1].data.eq).toFixed(2) + '%'
						this.equipList[10].state = Number(a[this.id-1].data.vlot1).toFixed(2) + 'V',
						this.equipList[11].state = Number(a[this.id-1].data.ampere * 1000).toFixed(2) + 'mA'
					}, 500)
				}
			},
			light(a, b) {
				this.equipList[0].state = a
			},
			fan_spd(a, b) {
				
				this.equipList[5].state = a
			},
			fan2(a, b) {
				this.equipList[6].state = a
			},
			air1(a, b) {
				this.equipList[7].state = a
			},
			air2(a, b) {
				this.equipList[8].state = a
			},
			note(a,b){
				console.log(a);
				unSub("testtopic/lock")
				clearInterval(this.p)
				this.$store.dispatch('lock/changeLock',this.id)
				if(this.lock)
				this.popContent="开锁成功!"
				else
				this.popContent="上锁成功!"
				this.$store.commit('lock/sMsg',0)
			}


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

<template> 
	<view>		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog ref="inputClose" :title="popContent"
				 @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-card :title="`车辆ID:${id}`" thumbnail="/static/images/bike.png" class="bigCard">
			<view class="cu-form-group margin-top">
				<view class="title">开锁</view>
				<switch @change="changeLock" :class="lock?'checked':''" :checked="lock?true:false"></switch>
			</view> 
			<div class="cardList">
				<uni-card :title="card.title" v-for="card in cardList" style="
				<!-- #ifdef APP -->
				width:40%;
				<!-- #endif -->
				flex: none;">
					<image :src="card.url" :alt="card.title" >
					<h1>{{card.value}}</h1>
				</uni-card>
			</div>
			<uni-card title="控制台" thumbnail="../../static/images/control.png">
				<view class="cu-form-group margin-top">
					<view class="title"  style="flex:1;">鸣笛</view>
					<button @click='carBuzzer'>开关</button>
				</view> 
				<view class="cu-form-group margin-top">
					<view class="title"  style="flex:1;"> 速度</view>
					<button @click="changeSpeed(0)">0档</button>
					<button @click="changeSpeed(1)">1档</button>
					<button @click="changeSpeed(2)">2档</button>
					<button @click="changeSpeed(3)">3档</button>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title" style="flex:1;">光照阈值</view>
					<uni-number-box v-model="maxLight" :max="9999"></uni-number-box>
					<button style="margin-left: 20px;" @click="changeMaxlight">修改阈值</button>
					<!-- </div> -->
					
				</view> 
				<!-- <view class="cu-form-group margin-top">
					<view class="title">减速</view>
					<button @click="subSpeed">降档</button>
				</view> -->
			</uni-card>
				<My-Chart
				:myOption="{
					title:'电量折线图',
					logo:'../../static/images/power.png',
					myType:'line',
					danW:'%',
					data:Series2
				}"></My-Chart>
				<My-chart2 :myOption="{
					title:'温度折线图',
					logo:'../../static/images/tempCount.png',
					danW:'℃',
					data:Series1
				}"></My-chart2>
		</uni-card>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	import {
		buzzer,
		led,
		fan,
		lock,
		fanSpd,
		light
	} from '../../utils/mqttControl.js'
	import { mapState } from "vuex"
	import power from '@/static/images/power.png'
	import point from '@/static/images/point.png'
	import bike from '@/static/images/bike.png'
	import volt from '@/static/images/volt.png'
	import temp from '@/static/images/tempCount.png'
	import speed from '@/static/images/speed.png'
	import dianliu from '@/static/images/dianliu.png'
import myAlert from '../../utils/myAlert.js'
import { number } from 'echarts'
import {
		doSubscribe,
		unSub
	} from '../../utils/mqtt.js'
import { log } from 'mqtt/dist/mqtt'
	export default {
		data() {
			return {
				lock:false,
				buzzer:null,
				id:null,
				carInfo:null,
				popContent:'',
				speed:0,
				maxLight:100,
				cardList:[
					{
						title:"电量",
						url:power,
						value:''
					},{
						title:"电流",
						url:dianliu,
						value:''
					},
					{
						title:"电压",
						url:volt,
						value:''
					},
					{
						title:"速度",
						url:speed,
						value:''
					},
					{
						title:"位置",
						url:point,
						value:''
					},
					
					{
						title:"电池温度",
						url:temp,
						value:''
					}
				]
			}
		},
		onLoad(i) {
			this.$store.dispatch("temp/beginData")
			this.speed=this.fan_spd
			uni.setStorageSync('curId',i.id)
			this.id=i.id
			request({url:`bicycles/${i.id}`}).then(({data})=>{
				let info=data.data.attributes
				this.cardList[0].value=`${(info.power*100).toFixed(2)}%`
				this.cardList[4].value=info.GPS,
				this.$store.commit('lock/CHANGELOCK',info.state)
				this.lock=info.state
			})
		},
		computed:{
			...mapState(['isLock']),
			...mapState('lock',['note']),
			...mapState('temp', ['tempList']),
			...mapState('battery',['battery','eqList',"carList"]),
			...mapState('fan',['fan_spd']),
			Series1() {
				let series = [{
						name: "室内温度",
						type:'line',
						data: this.tempList[this.id-1].data.temp1Arr,
					}
				]
				// console.log(series,'++++++++++');
				return series
			},
			Series2() {
				let series = [{
						name: "电量",
						type:'line',
						data: this.carList[this.id-1].data.eqList,
					}
				]
				// console.log(series,"++++++++++++++++");
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
					// console.log(this.id,'-------');
					lock(this.id,this.lock?0:1)},2000)
								
			},
			dialogInputConfirm(){
				console.log("需改成功");
			},
			carBuzzer(){
				buzzer(parseInt(this.id))
			},
			changeSpeed(spd){
				fan(spd)
			},
			// 修改阈值
			changeMaxlight(){
				light(this.maxLight,parseInt(this.id))
			}
		},
		onUnload() {
			uni.setStorageSync("curId",'')
		},
		watch:{
			carList:{
				deep:true,
				handler(a,b){
					// console.log(a,"==============");
					this.cardList[0].value=Number(a[this.id-1].data.eq).toFixed(2)+'%'
					this.cardList[1].value=Number(a[this.id-1].data.ampere*1000).toFixed(2)+'mA'
					this.cardList[2].value=Number(a[this.id-1].data.vlot1).toFixed(2)+'V'
				}
			},
			tempList:{
				deep:true,
				immediate:true,
				handler(a,b){
					console.log(a,"----")
					this.cardList[5].value=a[0].data.temp1
					// this.equipList[2].state=a[0].data.temp2
				}
			},
			fan_spd:{
				immediate:true,
				handler(a,b){
					this.speed=a/10
					this.cardList[3].value=a
				}
			},
			note(a,b){

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

<style scoped>
	.cardList{
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		justify-content: space-evenly;
	}
	.turn{
		display: flex;
	}
	.turn button{
		/* display: block; */
		margin:0 10px                                                                                  ;
		width: 40%;
		justify-content: space-between;
	}
	image{
		/* #ifdef APP */
			width: 150px;
			height: 80px;
		/* #endif */
		/* #ifdef H5 */
			width: 200px;
			height: 200px;
		/* #endif */
	}
</style>

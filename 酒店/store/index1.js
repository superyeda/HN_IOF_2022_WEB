import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request.js'
import {doPublish} from '@/utils/mqtt.js'
import { log } from 'mqtt/dist/mqtt'

Vue.use(Vuex)

const temp={
	state:()=>{},
	mutations:{},
	action:{}
}

export default new Vuex.Store({
	state:{
		carNum:null,
		realData:{
			fan1:'0',
			fan2:'0',
			temp1:'',
			temp2:'',
			air:'0',
			light:''
		},
		temp1List:{createT:[],data:[]},
		temp2List:{createT:[],data:[]},
		biggerTemp1:null,
		biggerTemp2:null,
		lessTemp1:null,
		lessTemp2:null,
		time:'',
		// mode:1,
		auto:{
			temp:25,
			humi:70
		},
		manu:{
			fan1:1,
			fan2:1
		},
		newCard:''
		
	},
	mutations:{
	nowTime(state){
		let MyDate=new Date()
		let hour=parseInt(MyDate.getHours())
		let min=parseInt(MyDate.getMinutes())
		let sec=parseInt(MyDate.getSeconds())
		hour<10?hour='0'+hour:''
		min<10?min='0'+min:''
		sec<10?sec='0'+sec:''
		state.time=`${hour}:${min}:${sec}`
	},
	UPDATATEMP(state,value){
		if(value.temp1>25)state.biggerTemp1++
		else state.lessTemp1++
		if(value.temp2>25)state.biggerTemp2++
		else state.lessTemp2++
	},
	// 接收风扇状态
	RECEIVEFAN(state,value){
		console.log(value);
		if(value.fan1_spd!==1)
		state.realData.fan1=value.fan1_spd*99
		else
		state.realData.fan1=0
		if(value.fan2_spd!==1)
		state.realData.fan2=value.fan2_spd*99
		else state.realData.fan2=0
	},
	// 接收烟雾传感器数据
	RECEIVEAIR(state,value){
		console.log(value);
		state.realData.air=value.air
	},
	// 修改设备模式
	BEGINDATA(state,value){
		console.log(value);
		state.temp1List={...value.temp1}
		state.temp2List={...value.temp2}
		state.humi1List={...value.humi1}
		state.humi2List={...value.humi2}
	},
	CHANGESTATE(state,value){
		state.mode=value.mode
		state.auto={...value.auto}
		state.manu={...value.manu}
	},
	//添加卡号
	ADDCARD(state,value){
		console.log('人员注册');
		state.newCard=value.card_num
	},
	
	GETNUM(state,value){
		console.log(value);
		state.carNum=value
	},
	UPDATENUM(state,value){
		state.carNum=value
	},
	temp1Tj(state,value){
		state.realData.temp1=value[value.length-1].data
		state.biggerTemp1=value.filter((item)=>item.data>25).length
		state.lessTemp1=value.filter((item)=>item.data<25).length
		},
	temp2Tj(state,value){
		state.realData.temp2=value[value.length-1].data
		state.biggerTemp2=value.filter((item)=>item.data>25).length
		state.lessTemp2=value.filter((item)=>item.data<25).length
	}
},
actions:{
	// async getNum({commit},value){
	// 	// console.log(123);
	// 	await request({url:'parkinglot'}).then(({data})=>{
	// 		commit("GETNUM",data.usingNum)
	// 	})
	// },

	// 返回当前时间戳(秒)
	async CURTIME(value){
		let time={"time":Math.floor(new Date().getTime()/1000)}
		console.log(time);
		let i=0
		let p=setInterval(()=>{
				doPublish("testtopic/mode",JSON.stringify(time))
				i++
				if(i===4)clearInterval(p)
			},1000)
	},
	// TODO
	// 从数据库查询卡号是否存在,存在则开门,否则蜂鸣器报警
	async TAKECARD({commit},value){
		await request({url:`changeState/${value.card_num}`}).then(({data})=>{
			if(data.code===200){
				let i=0
				let p=setInterval(()=>{
						doPublish('testtopic/mode','{"led":1,"motor":1}')
						i++
						if(i===4)clearInterval(p)
					},1000)
				
			}
			else{
				console.log("该卡号不存在");
				let i=0
				let p=setInterval(()=>{
						doPublish('testtopic/mode','{"buzzer":1}')
						i++
						if(i===4)clearInterval(p)
					},1000)
				
			}
			
		})
	},
	// 车辆出库
	async LEAVE({commit}){
		await request({url:'minusPark'}).then(({data})=>{
			if(data.code===200)
			{
				commit("UPDATENUM",data.usingNum)
			}else{
				console.log("...");
			}
		})
	},
	async todayTemp1({commit}){
		await request({url:'getAllTemp1s'}).then(({data})=>{
			commit("temp1Tj",data.data)
		})
	},
	async todayTemp2({commit}){
		await request({url:'getAllTemp2s'}).then(({data})=>{
			commit("temp2Tj",data.data)
		})
	}
},
	getters:{}
})
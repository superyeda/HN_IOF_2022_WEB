import request from '@/utils/request.js'
import {doPublish} from '@/utils/mqtt.js'
const state={
	newCard:null,
	cardNum:null
};
const mutations={
	//添加卡号
	ADDCARD(state,value){
		// console.log('人员注册');
	state.newCard=value.card_num
	},
	
	GETNUM(state,value){
		console.log(value);
		state.cardNum=value
	},
	UPDATENUM(state,value){
		state.cardNum=value
	},
};
const actions={
	// 获取已打卡的数量
	async getNum({commit},value){
		// console.log(123);
		await request({url:'parkinglot'}).then(({data})=>{
			commit("GETNUM",data.usingNum)
		})
	},
	// 从数据库查询卡号是否存在,存在则开门,否则蜂鸣器报警
	async TAKECARD({commit},value){
		await request({url:`changeState/${value.card_num}`}).then(({data})=>{
			if(data.code===200){
				// let i=0
				// let p=setInterval(()=>{
						doPublish('testtopic/mode','{"led":1,"motor":1}')
					// 	i++
					// 	if(i===4)clearInterval(p)
					// },1000)
			}
			else{
				// alert("卡号不存在")
				// let i=0
				// let p=setInterval(()=>{
						doPublish('testtopic/mode','{"buzzer":1}')
				// 		i++
				// 		if(i===4)clearInterval(p)
				// 	},1000)
				
			}
			
		})
	},
	// 打开下班
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
};
const getters={
	
}
export default {
  namespaced: true,
  state,	
  getters,
  actions,
  mutations,
};
import request from '@/utils/request.js'
import {doPublish} from '@/utils/mqtt.js'
import { motor,money, buzzer } from '../../utils/mqttControl';
import { sendnMqtt} from '@/utils/pubFun.js'
import store from '../../store'
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
	async takeCard({commit},value){
		const {data} = await request({url:`reduceMoney`,method:"POST",data:{card:value.card_num}})
		if(data.open){
			uni.showToast({
				title:`${value.card_num}已出站`
			})
			sendnMqtt(doPublish,"testtopic/mode",JSON.stringify({id:parseInt(value.id),money:parseInt(data.money),mot:1}))
			store.dispatch("itemList/getItemList")
			
		}else{
			uni.showToast({
				title:`${value.card_num}未入站`,
				icon:"error"
			})
			buzzer(value.id)
		}
	},
	// 入站
	async addCard({commit},value){
		const {data}=await request({url:`checkTicket`,method:"post",data:{card:value.card_num}})
		// console.log(data);
		if(data.open){
			store.dispatch("itemList/getItemList")
			uni.showToast({
				title:`${value.card_num}已入站`
			})
			sendnMqtt(doPublish,"testtopic/mode",JSON.stringify({id:parseInt(value.id),money:parseInt(data.money),mot:1}))
		}else{
			// 返回余额
			uni.showToast({
				title:`${value.card_num}余额不足`,
				icon:"error"
			})
			sendnMqtt(money,value.id,1)
			// money(value.id,1)
		}
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
import request from '@/utils/request.js'
import {motor,buzzer} from "@/utils/mqttControl.js"
import store from '../../store'
import myAlert from '@/utils/myAlert.js'
import {
	doPublish
} from '@/utils/mqtt'
const state={ 
	newCard:'',
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
		await request({url:'parkinglot'}).then(({data})=>{
			commit("GETNUM",data.usingNum)
		})
	},
	// 从数据库查询卡号是否存在,存在则开门,否则蜂鸣器报警
	async TAKECARD({commit,dispatch},value){
			console.log('有人进入了',value);
			
	},
	// 加钱
	async AddMoney({commit},value){
		console.log('卡内余额变化',value);
		await request({
			url: `updateUserTimes/${value.card_num}`,
			method: 'post',
			data: {
				times: parseInt(value.money)
			}
		}).then(res => {
			console.log(res);
		}, reason => {
			console.log(reason)
		})
	}
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
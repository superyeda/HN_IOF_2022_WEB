import request from '@/utils/request.js'
import {
	motor,
	buzzer,
	people
} from "@/utils/mqttControl.js"
import store from '../../store'
import myAlert from '@/utils/myAlert.js'
import {
	doPublish
} from '@/utils/mqtt'
const state = {
	newCard: null,
	cardNum: null
};
const mutations = {
	//添加卡号
	ADDCARD(state, value) {
		// console.log('人员注册');
		state.newCard = value.card_num
	},
	BUZZER(){
		buzzer(1)
	},
	GETNUM(state, value) {
		console.log(value);
		state.cardNum = value
	},
	UPDATENUM(state, value) {
		state.cardNum = value
	},
};
const actions = {
	// 获取已打卡的数量
	async getNum({
		commit
	}, value) {
		await request({
			url: 'parkinglot'
		}).then(({
			data
		}) => {
			commit("GETNUM", data.usingNum)
		})
	},
	// 从数据库查询卡号是否存在,存在则开门,否则蜂鸣器报警
	async TAKECARD({
		commit
	}, value) {
		console.log('刷卡',value);
		await request({
			url: `changeState/${value.card_num}`,
			method: 'POST',
		}).then(({
			data
		}) => {
			// 卡号存在
			if (data.code === 200) {
				// setTimeout(()=>{motor(1)},100)
				const {curWorker}=data
				console.log(curWorker);
				if (curWorker.work_state) {
					console.log('上班',curWorker);
					store.commit("list/UPDATELIST",curWorker)
				} else {
					console.log('下班',curWorker);
					store.dispatch("list/takeCard",curWorker)
				}
			}else{
				// 卡号不存在
				setTimeout(()=>{buzzer(1)},100)
				// myAlert("没有卡号信息")
				// setTimeout(()=>{myAlert("没有卡号信息")},100)
				
				
			}
		})
	},
	// 打开下班
	async LEAVE({
		commit
	}) {
		await request({
			url: 'minusPark'
		}).then(({
			data
		}) => {
			if (data.code === 200) {
				commit("UPDATENUM", data.usingNum)
			} else {
				console.log("...");
			}
		})
	},
};
const getters = {

}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};

import request from '@/utils/request.js'
import {toStamp,toTime} from '@/utils/myTime.js'
const state = {
	list: null,
	swmList: [{
			id: 1,
			people: 0,
			address: '开福区',
			record:{createT:[],data:[]}
		},
		{
			id: 2,
			people: 0,
			address: "天心区",
			record:{createT:[],data:[]}
		}
	]

};
const mutations = {
	DBLIST(state, value) {
		console.log('泳池', value);
		state.list = value
	},
	// 更新余额
	UPDATELIST(state, value) {
		console.log("余额数据", value);
		state.list.forEach(item => {
			if (item.attributes.card_num === value.card_num) {
				item.attributes.balance = value.money

				if (value.way === 0) {
					item.attributes.work_state = false
					item.attributes.balance -= 2
				} else
					item.attributes.work_state = true

			}
		})
		console.log(state.list[0].attributes);
	},
	// 获取人数消息
	PNUM(state, value) {
		if(value.time<100000){
		this.dispatch("time/CURTIME")
		return
		}
		let time=toTime(value.time*1000)
		if(parseInt(value.id)===1){
			state.swmList[0].people=value.people
			state.swmList[0].record.data.push(value.people)
			state.swmList[0].record.createT.push(time)
		}
		else{
			state.swmList[1].people=value.people
			state.swmList[1].record.data.push(value.people)
			state.swmList[1].record.createT.push(time)
		}
		
	}

};
const actions = {
	async dbList({
		commit
	}) {
		await request({
			url: 'bicycles'
		}).then(({
			data
		}) => {
			commit("DBLIST", data.data)
		})
	}
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

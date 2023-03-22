import { toStamp,toTime } from '@/utils/myTime.js'
const state = {
	battery: {
		eq: '',
		volt1: '',
		volt2: '',
		ampere: ''
	},
	eqList: {
		createT: [],
		data: []
	},

};
const mutations = {
	RECEIVEBAT(state, value) {
		if (value.time < 100000) {
			this.dispatch("time/CURTIME")
			return
		}
		let id = uni.getStorageSync("curId")
		if (id === value.id) {
			console.log("电量信息", value);
			let time = toTime(value.time * 1000)
			state.battery = value
			state.eqList.createT.push(time),
			state.eqList.data.push(Number(value.eq).toFixed(2))
		}
	}

};
const actions = {

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

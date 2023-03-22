import {
	toStamp,
	toTime
} from '@/utils/myTime.js'
const state = {
	fan1: 0,
	fan2: 0,
	fan_spd: 0

};
const mutations = {
	// 接硬件收风扇状态
	RECEIVEFAN(state, value) {
		
		if(value.time<100000){
		this.dispatch("time/CURTIME")
		return
		}
		
		let id =uni.getStorageSync("curId")
		if (id === value.id) {
			console.log("车速", value);
			state.fan1=value.fan1
			state.fan2=value.fan2
			// console.log(state.fan_spd);
		}
		// if (value.fan1_spd !== 1)
		// 	state.fan1 = value.fan1_spd * 99
		// else
		// 	state.fan1 = 0
		// if (value.fan2_spd !== 1)
		// 	state.fan2 = value.fan2_spd * 99
		// else state.fan2 = 0
	},
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

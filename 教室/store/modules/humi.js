import {
	toStamp,
	toTime
} from '@/utils/myTime.js'
import request from '@/utils/request.js'
const state = {
	humiList: [{
			id: 1,
			data: {
				humi1: 0,
				humi2: 0,
				humi1Arr: [],
				humi2Arr: []
			}
		},
		{
			id: 2,
			data: {
				humi1: 0,
				humi2: 0,
				humi1Arr: [],
				humi2Arr: []
			}
		}
	]
};
const mutations = {
	// 接收硬件发来的湿度数据
	RECEIVEHUMI(state, value) {
		if (value.time < 1600000000) {
			this.dispatch("time/CURTIME",value)
			return
		}
		console.log("湿度", value);
		let time = toTime(value.time * 1000)
		for (const item of state.humiList) {
			console.log(item);
			if (item.id == value.id) {
				item.data.humi1 = value.humi1
				item.data.humi2 = value.humi2
				item.data.humi1Arr.push([time, value.humi1])
				item.data.humi2Arr.push([time, value.humi2])
			} else break
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

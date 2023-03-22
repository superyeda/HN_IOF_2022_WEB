import {
	toStamp,
	toTime
} from '@/utils/myTime.js'
const state={
	lightList: [{
			id: 1,
			data: {
				light: 0,
				led_lv: 0,
				lightArr: [],
			}
		},
		{
			id: 2,
			data: {
				light: 0,
				led_lv: 0,
				lightArr: [],
			}
		}
	]
};
const mutations={
	RECEIVELIGHT(state,value){
		if (value.time < 100000000) {
			this.dispatch("time/CURTIME",value.id)
			return
		}
		let time = toTime(value.time)
		console.log(value,"光照强度");
		for (const item of state.lightList) {
			// console.log(item);
			if (item.id == value.id) {
				item.data.light = value.light1
				item.data.led_lv = value.led_lv
				item.data.lightArr.push([time, value.light1])
			}
		}
	}
};
const actions={

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
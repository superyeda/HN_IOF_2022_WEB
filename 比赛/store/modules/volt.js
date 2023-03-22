import {
	toStamp,
	toTime
} from '@/utils/myTime.js'
import request from '@/utils/request.js'
const state = {
	voltList: [{
			id: 1,
			data: {
				volt1: 0,
				volt2: 0,
				volt1Arr: [],
				volt2Arr: []
			}
		},
		{
			id: 2,
			data: {
				volt1: 0,
				volt2: 0,
				volt1Arr: [],
				volt2Arr: []
			}
		}
	]
};
const mutations = {
	// 接收硬件发来的湿度数据
	RECEIVEvolt(state, value) {
		if (value.time < 100000000) {
			this.dispatch("time/CURTIME",value.id)
			return
		}
		console.log("电压", value);
		let time = toTime(value.time)
		for (const item of state.voltList) {
			if (item.id == value.id) {
				item.data.volt1 = value.volt1
				item.data.volt2 = value.volt2
				item.data.volt1Arr.push([time, value.volt1])
				item.data.volt2Arr.push([time, value.volt2])
			}
		}
	},
	// 数据库中的温度数据
	DBvoltDATA(state, value) {
		for(const item of value){
			let time=toTime(item.created_time)
			let data=item.data
			state.voltList[0].data.volt1Arr.push([time,data])
		}
	}
};
const actions = {
	// async beginData({commit}){
	// 	await request({url:"getAllvoltd1s/1",method:"POST",data:{limit:10}}).then(res=>{
	// 		if(res.statusCode===200){
	// 			commit("DBvoltDATA",res.data.curPage)
	// 		}
	// 	})
	// }
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

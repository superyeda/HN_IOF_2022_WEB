import {
	toStamp,
	toTime
} from '@/utils/myTime.js'
import request from '@/utils/request.js'
const state = {
	tdsList: [{
			id: 1,
			data: {
				tds1: 0,
				tds2: 0,
				tds1Arr: [],
				tds2Arr: []
			}
		},
		{
			id: 2,
			data: {
				tds1: 0,
				tds2: 0,
				tds1Arr: [],
				tds2Arr: []
			}
		}
	]
};
const mutations = {
	// 接收硬件发来的湿度数据
	RECEIVETDS(state, value) {
		if (value.time < 100000000) {
			this.dispatch("time/CURTIME",value)
			return
		}
		console.log("水质", value);
		let time = toTime(value.time)
		for (const item of state.tdsList) {
			if (item.id == value.id) {
				item.data.tds1 = value.tds1
				item.data.tds2 = value.tds2
				item.data.tds1Arr.push([time, value.tds1])
				item.data.tds2Arr.push([time, value.tds2])
			}
		}
	},
	// 数据库中的温度数据
	DBTDSDATA(state, value) {
		for(const item of value){
			let time=toTime(item.created_time)
			let data=item.data
			state.tdsList[0].data.tds1Arr.push([time,data])
		}
	}
};
const actions = {
	// async beginData({commit}){
	// 	await request({url:"getAlltdsd1s/1",method:"POST",data:{limit:10}}).then(res=>{
	// 		if(res.statusCode===200){
	// 			commit("DBtdsDATA",res.data.curPage)
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

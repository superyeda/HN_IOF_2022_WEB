import request from '@/utils/request.js'
import {
	toStamp,
	toTime
} from '@/utils/myTime.js'
const state = {
	tempList:[
		{
			id:1,
			data:{
				temp1:0,
				temp2:0,
				temp1Arr:[],
				temp2Arr:[]
			}
		},
		{
			id:2,
			data:{
				temp1:0,
				temp2:0,
				temp1Arr:[],
				temp2Arr:[]
			}
		}
	]
}
const mutations = {
	// 接收硬件发来的温度数据
	RECEIVETEMP(state, value) {
		if(value.time<1600000000){
		this.dispatch("time/CURTIME",value)
		return
		}
		console.log("温度信息",value);
		let time=toTime(value.time*1000)
		for(const item of state.tempList){
			console.log(item);
			if(item.id==value.id){
				item.data.temp1=value.temp1
				item.data.temp2=value.temp2
				item.data.temp1Arr.push([time,value.temp1])
				item.data.temp2Arr.push([time,value.temp2])
			}else break
		}
	},
	// 数据库中的温度数据
	// DBTEMPDATA(state, value) {
	// 	// console.log('12312',value)
	// 	state.temp1List = {
	// 		...value.temp1
	// 	}
	// 	state.temp2List = {
	// 		...value.temp2
	// 	}
	// 	console.log(state.temp2List);
	// }
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

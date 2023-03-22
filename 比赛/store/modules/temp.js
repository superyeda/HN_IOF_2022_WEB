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
		console.log("温度",value);
		if(value.time<100000000){
		this.dispatch("time/CURTIME",value)
		return
		}
		
		console.log("温度",value);
		let time=toTime(value.time)
		// console.log(value);
		for(const item of state.tempList){
			// console.log(item.id,value.id);
			if(item.id===Number(value.id)){
				item.data.temp1=value.temp1
				item.data.temp2=value.temp2
				if(item.data.temp1Arr.length>100){
					item.data.temp1Arr.shift()
					item.data.temp2Arr.shift()
				}
				item.data.temp1Arr.push([time,value.temp1])
				item.data.temp2Arr.push([time,value.temp2])
			}
		}
	},
	// 数据库中的温度数据
	DBTEMPDATA(state, value) {
		for(const item of value.curPage){
			let time=toTime(item.created_time)
			let data=item.data
			state.tempList[0].data.temp1Arr.push([time,data])
		}
	}
};
const actions = {
	async beginData({commit}){
		await request({url:"getAllTemp1s/1",method:"POST",data:{limit:20}}).then(res=>{
			if(res.statusCode===200){
				commit("DBTEMPDATA",res.data)
			}
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

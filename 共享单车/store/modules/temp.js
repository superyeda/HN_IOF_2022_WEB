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
	console.log("温度信息",value);
		if(value.time<100000000){
		this.dispatch("time/CURTIME",value)
		return
		}
		
		let time=toTime(value.time*1000)
		for(const item of state.tempList){
			console.log(item.id,value.id);
			if(item.id==value.id){
				item.data.temp1=value.temp1
				item.data.temp2=value.temp2
				if(item.data.temp1Arr.length>50	){
					item.data.temp1Arr.shift()
					item.data.temp2Arr.shift()
				}
				item.data.temp1Arr.push([time,value.temp1])
				item.data.temp2Arr.push([time,value.temp2])
			}
		}
		// console.log(state.tempList,"00000000000");
	},
	// 数据库中的温度数据
	DBTEMPDATA(state, value) {
		// debugger
		for(const item of value.curPage){
			let time=toTime(item.created_time)
			let data=item.data
			state.tempList[0].data.temp1Arr.push([time,data])
		}
	}
};
const actions = {
	async beginData({commit}){
		await request({url:"getAllTemp1s/1",method:"POST",data:{limit:10}}).then(res=>{
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

import {toTime} from '@/utils/myTime.js'
const state={
	air:null,
	airList:{createT:[],data:[]}
	
};
const mutations={
	
	RECEIVEAIR(state,value){
		console.log(value);
		if(value.time<100000){
		this.dispatch("time/CURTIME")
		return
		}
		
		let time=toTime(value.time*1000)
		state.air=value.air
		// if(state.airList.data.length>9){
		// 	state.airList.data.shift()
		// 	state.airList.createT.shift()
		// 	state.airList.data.push(value.air)
		// 	state.airList.createT.push(time)
		// }
		// else
		// {
			state.airList.data.push(value.air)
			state.airList.createT.push(time)
		// }
		state.air=value.air
		uni.setStorageSync('airList',state.airList)
	},
	// 缓存中的数据
	DBAIRDATA(state,value){
		state.airList={...value}
		state.air=value.data[9]
	},
	BEGINAIR(state,value){
		state.air=value
		},
	
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
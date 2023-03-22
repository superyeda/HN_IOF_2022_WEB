import request from '@/utils/request.js'
const state={
	temp1:null,
	temp1List:{createT:[],data:[]},
};
const mutations={
	// 接收硬件发来的温度数据
	RECEIVETEMP(state,value){
		console.log(value);
		let time=new Date(value.time*1000).toISOString()
		state.temp1=value.temp1
		if(state.temp1List.data.length>9){
			state.temp1List.data.shift()
			state.temp1List.createT.shift()
			state.temp1List.data.push(value.temp1)
			state.temp1List.createT.push(time)
		}
		else
		{
			state.temp1List.data.push(value.temp1)
			state.temp1List.createT.push(time)
		}
		uni.setStorageSync('temp1List',state.temp1List)
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
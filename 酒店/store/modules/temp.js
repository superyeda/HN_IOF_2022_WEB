import Vue from 'vue'

const state={
	temp1:25,
	temp2:30,
	temp1List:{createT:[],data:[]},
	temp2List:{createT:[],data:[]},
	biggerTemp1:null,
	biggerTemp2:null,
	lessTemp1:null,
	lessTemp2:null,
};
const mutations={
	RECEIVETEMP(state,value){
		this.commit("UPDATATEMP",value)
		let time=new Date(value.time*1000).toLocaleString()
		state.realData.temp1=value.temp1
		state.realData.temp2=value.temp2
		if(state.temp1List.data.length>9){
			state.temp1List.data.shift()
			state.temp1List.createT.shift()
			state.temp1List.data.push(value.temp1)
			state.temp1List.createT.push(time)
			
			state.temp2List.data.shift()
			state.temp2List.createT.shift()
			state.temp2List.data.push(value.temp2)
			state.temp2List.createT.push(time)
		}
		else
		{
			state.temp1List.data.push(value.temp1)
			state.temp1List.createT.push(time)
			
			state.temp2List.data.push(value.temp2)
			state.temp2List.createT.push(time)
		}
		uni.setStorage({
			key:'temp1List',
			data:JSON.stringify(state.temp1List),
		})
		uni.setStorage({
			key:'temp2List',
			data:JSON.stringify(state.temp2List),
		})
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
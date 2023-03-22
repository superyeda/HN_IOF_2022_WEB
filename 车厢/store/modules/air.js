
const state={
	air1:'',
	air2:'',
	
};
const mutations={
	// 接收硬件空气数据
	RECEIVEAIR(state,value){
		if(value.time<100000000){
		this.dispatch("time/CURTIME")
		return
		}
		console.log("空气",value)
		state.air1=value.air1
		state.air2=value.air2
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
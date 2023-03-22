
const state={
	air:null,
	
};
const mutations={
	// 接收硬件空气数据
	RECEIVEAIR(state,value){
		console.log(value)
		state.air=value.air
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
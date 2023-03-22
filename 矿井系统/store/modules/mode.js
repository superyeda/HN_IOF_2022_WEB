
const state={
	mode:1,
		temp:25,
		humi:70,
		air:400,
		fan1:2,
		fan2:1,
};
const mutations={
	CHANGESTATE(state,value){
		state.mode=value.mode
		state.auto={...value.auto}
		state.manu={...value.manu}
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
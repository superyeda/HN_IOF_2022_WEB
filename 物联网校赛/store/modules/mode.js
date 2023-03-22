
const state={
	mode:1,
	// 车间一
	auto:{
		fan1:3,
		led1:0
	},
	// 车间二
	manu:{
		led2:0
	},
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
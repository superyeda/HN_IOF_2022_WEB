
const state={
	light:null,
	led1:null,
	led2:null
};
const mutations={
	
	RECEIVELIGHT(state,value){
		console.log(value);
		state.light=value.light
		state.led1=value.led1
		state.led2=value.led2
	}
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
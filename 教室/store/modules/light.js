
const state={
	light1:null,
	light2:null
	
};
const mutations={
	RECEIVELIGHT(state,value){
		console.log("光照强度",value)
		state.light1=value.light1
		state.light2=value.light2
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

const state = {
	fan1: null,

};
const mutations = {
	// 接硬件收风扇状态
	RECEIVEFAN(state, value) {
		console.log(value);
		if(value.fan1==="3")state.fan1="停止"
		if(value.fan1==="1")state.fan1="正转"
		if(value.fan1==="2")state.fan1="反转"
		console.log("风扇",state.fan1);
	},
};
const actions = {

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

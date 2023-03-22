const state = {
};
const mutations = {
	MYALERT(e){
		console.log("报警",e);
		uni.showToast({
			title:"车辆前方有人经过",
			icon:"error"
		})
	}
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

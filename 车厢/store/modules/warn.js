const state = {
};
const mutations = {
	MYALERT(value){
		console.log("报警",value);
		uni.showToast({
			title:`车厢发出报警`,
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

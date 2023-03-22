const state = {
};
const mutations = {
	MYALERT(state,value){
		console.log("报警",value);
		const status=value.alert1==1?"ERROR":value.alert2==1?"WARNING":"正常"
		uni.showToast({
			title:`${value.id}饮水机，发出${status}`,
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

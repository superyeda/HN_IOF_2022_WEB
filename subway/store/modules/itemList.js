import request from '@/utils/request.js'
const state = {
	items:[]
};
const mutations = {
	ITEMLIST(state,value){
		state.items=value
		// console.log(state.itemList,'00000000000');
	}
};
const actions = {
	async getItemList({commit}){
		const {data}=await request({url:"subway-members"})
		// console.log(data,',,,,,,,,,,,');
		commit("ITEMLIST",data.data)
		}
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

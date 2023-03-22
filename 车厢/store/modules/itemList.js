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
	async getItemList({commit},value){
		const {data}=await request({url:`getAllProduct/${value}`,method:"POST"})
		console.log(data,',,,,,,,,,,,');
		commit("ITEMLIST",data.products)
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

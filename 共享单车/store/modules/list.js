import request from '@/utils/request.js'
const state={
	list:null
};
const mutations={
	DBLIST(state,value){
		console.log('车辆列表',value);
		state.list=value
	}
	
};
const actions={
	async dbList({commit}){
		await request({url:'bicycles'}).then(({data})=>{
			commit("DBLIST",data.data)
		})
	}
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
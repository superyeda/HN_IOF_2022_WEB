import request from '@/utils/request.js'
const state={
	peopleList:null,
};
const mutations={
peopleList(state,value){
	state.peopleList=value
	console.log(state.peopleList);
}
	
};
const actions={
	async GETPEOPLELIST({commit}){
		await request({url:"workers"}).then(({data})=>{
				commit('peopleList',data.data)
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
import request from '@/utils/request.js'
import store from "../../store"
const state = {
	work_s:[0,0]
	};
const mutations = {
	CHANGESTATE(state,value){
		state.work_s[value.index]=value.value
	}
};
const actions = {
	async changeWork({commit,state},value){
		console.log("工作状态",value);
		if(state.work_s[value.id-1]!=value.work_s)
		{
			console.log(state.work_s[value.id-1]!=value.work_s);
			commit("CHANGESTATE",{index:value.id-1,value:value.work_s})
			const {data}=await request({url:"bicycle/changeState",method:"POST",data:{id:value.id,work_s:value.work_s}})
			if(data.code===200){
				store.dispatch("list/dbList")
			}
		}
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

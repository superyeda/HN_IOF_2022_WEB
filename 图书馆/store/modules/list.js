import request from '@/utils/request.js'
import {toTime} from "@/utils/myTime"
const state={
	list:null,
	illList:[]
};
const mutations={
	DBLIST(state,value){
		console.log('列表',value);
		state.list=value
	},
	ADDILL(state,value){
		state.illList.push(value)
	},
	DBILLLIST(state,value){

		for(const item of value){
			state.illList.push(item.attributes.trespass_time)
		}
	}
	
};
const actions={
	async dbList({commit}){
		await request({url:'bicycles'}).then(({data})=>{
			commit("DBLIST",data.data)
		})
	},
	// 非法名单
	async dbillList({commit}){
		await request({url:"trespasses"}).then((res)=>{
			if(res.statusCode===200)
				commit("DBILLLIST",res.data.data)
		})
	},
	// 非法闯入
	async illegal({commit},value){
		console.log(value);
		let time=toTime(value.time)
		await request({url:"c-trespass",data:{time,id:"1"},method:"POST"}).then(({data})=>{
			if(data.code===200){
				commit("ADDILL",time)
			}
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
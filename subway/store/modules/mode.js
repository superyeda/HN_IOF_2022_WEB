
const state={
	beginData:[
		{
			id:1,
			temp:0,
			humi:0
		},
		{
			id:2,
			temp:0,
			humi:0
		}
	]
};
const mutations={
	CHANGESTATE(state,value){
		console.log("修改",value);
		state.beginData[value.id-1]={...value.data}
	},
	// 初始值
	MAXVALUE(state,value){
		console.log("初始值",value);
		
		if(value.id==='1'){
			state.beginData[0].temp=value.temp
			state.beginData[0].humi=value.humi
		}else{
			state.beginData[1].temp=value.temp
			state.beginData[1].humi=value.humi
		}
	}
	
};
const actions={
	
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

const state={
	beginData:[
		{
			id:1,
			temp1:0,
			temp2:0,
			light:0
		},
		{
			id:2,
			temp1:0,
			temp2:0,
			light:0
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
			state.beginData[0].temp1=value.t_p1
			state.beginData[0].temp2=value.t_p2
			state.beginData[0].light=value.l_p
		}else{
			state.beginData[1].temp1=value.t_p1
			state.beginData[1].temp2=value.t_p2
			state.beginData[1].light=value.l_p
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
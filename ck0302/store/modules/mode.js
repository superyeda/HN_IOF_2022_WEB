
const state={
	beginData:[
		{
			mode:1,
			temp:25,
			humi:70,
			light:100,
			air:70,
			fan1:0,
			fan2:0,
			led1:0,
			motor:3
		},
		{
			mode:1,
			temp:25,
			humi:70,
			light:100,
			air:70,
			fan1:0,
			fan2:0,
			led1:0,
			motor:3
		}
	]
};
const mutations={
	CHANGESTATE(state,value){
		console.log("修改",value);
		state.beginData[value.id-1]={...state.beginData[value.id-1],...value.data}
	},
	// 初始值
	MAXVALUE(state,value){
		
		if(value.id==='1'){
			state.beginData[0]={...state.beginData[0],...value}
		}else{
			state.beginData[1]={...state.beginData[1],...value}
		}
		console.log("初始值",state.beginData[0]);
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
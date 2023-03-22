
const state={
	beginData:[
		{
			mode:1,
			temp:25,
			humi:70,
			light:100,
			air:70,
			fan1:2,
			fan2:1,
			led1:0,
			motor:0
		},
		{
			mode:1,
			temp:25,
			humi:70,
			light:100,
			air:70,
			fan1:2,
			fan2:1,
			led1:0,
			motor:0
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
		console.log("初始值",value);
		if(value.id==='1'){
			state.beginData[0]={...state.beginData[0],...value}
		}else{
			state.beginData[1]={...state.beginData[1],...value}
		}
		console.log(state.beginData);
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
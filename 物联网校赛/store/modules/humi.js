
import request from '@/utils/request.js'
const state={
	humi1:null,
};
const mutations={

	// 接收硬件发来的湿度数据
	RECEIVEHUMI(state,value){
		console.log(value);
		state.humi1=value.humi1
	},
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
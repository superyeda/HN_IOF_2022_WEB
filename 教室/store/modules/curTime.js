import {time} from '@/utils/mqttControl.js'
const state = {

};
const mutations = {
	
};
const actions = {
// 返回当前时间戳(秒)
	async CURTIME(state,value){
		console.log("硬件要时间",value);
		console.log(value.id);
		time(parseInt(value.id))
	},
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

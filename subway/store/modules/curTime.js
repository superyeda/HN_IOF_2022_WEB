import {time} from '@/utils/mqttControl.js'
const state = {

};
const mutations = {
	
};
const actions = {
// 返回当前时间戳(秒)
	async CURTIME({commit},value){
		time(value)
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
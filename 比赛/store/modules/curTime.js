import {time} from '@/utils/mqttControl.js'
import {doPublish} from '@/utils/mqtt.js'
const state = {

};
const mutations = {
	
};
const actions = {
// 返回当前时间戳(秒)
	async CURTIME({commit},value){
		let time={"time":Math.floor(new Date().getTime()/1000),"id":parseInt(value.id),work_s:2}
		doPublish("testtopic/mode",JSON.stringify(time))
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

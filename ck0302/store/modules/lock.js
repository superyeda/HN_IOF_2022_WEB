import request from '@/utils/request.js'
import {
		lock
	} from '../../utils/mqttControl.js'
const state = {
	isLock: false,
	note:0,
};
const mutations = {
	CHANGELOCK(state,value) {
		state.isLock = value
	},
	sMsg(state,value){
		
		state.note=value
	}
};
const actions = {
	
	async changeLock({commit},value){
		// 修改自行车状态
			await request({url:`bicycle/changeState/${value}/2`,method:'post'}).then(({data})=>{
					if(data.code===200)commit('CHANGELOCK',data.curState)
				})
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

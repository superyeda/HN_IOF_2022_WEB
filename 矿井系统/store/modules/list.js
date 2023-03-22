import request from '@/utils/request.js'
import {toRelTime,toStamp} from '@/utils/myTime.js'
import {doPublish} from '@/utils/mqtt'
const state = {
	list: []
};
const mutations = {
	DBLIST(state, value) {
		state.list = value
		doPublish('testtopic/mode',JSON.stringify({people:state.list.length,motor:1}))
		
	},
	UPDATELIST(state, value) {
		state.list.push(value)
		setTimeout(()=>{doPublish('testtopic/mode',JSON.stringify({people:state.list.length,motor:1}))},100)
	}
};
const actions = {
	async dbList({
		commit
	}) {
		await request({
			url: 'getWorkingPeople'
		}).then(({
			data
		}) => {
			console.log(data);
			
			commit("DBLIST", data.workers)
			
		})
	},
	async takeCard({
		commit
	}, value) {
		await request({
			url: 'c-work-times',
			method:"post",
			data:{
				name:value.name,
				start_time:value.start_time,
				duration:toRelTime(toStamp(new Date())-value.start_time),
				card_num:value.card_num
			}
		}).then(res=>{
			console.log("添加记录",res);
			this.dispatch('list/dbList')
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

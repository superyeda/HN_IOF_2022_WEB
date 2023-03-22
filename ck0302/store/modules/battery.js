import { toStamp,toTime } from '@/utils/myTime.js'
const state = {
	battery: {
		eq: '',
		volt1: '',
		volt2: '',
		ampere: ''
	},
	eqList: {
		createT: [],
		data: []
	},
	carList:[
		{
			id:1,
			data:{
				eq:0,
				vlot1:0,
				vlot2:0,
				ampere:0,
				eqList:[]
			}
		},
		{
			id:2,
			data:{
				eq:0,
				vlot1:0,
				vlot2:0,
				ampere:0,
				eqList:[]
			}
		}
	]
};
const mutations = {
	RECEIVEBAT(state, value) {
		console.log('电量状态',value);
		if (value.time < 100000) {
			this.dispatch("time/CURTIME",value.id)
			return
		}
		let time=toTime(value.time*1000)
		for(const item of state.carList){
			console.log(item);
			if(item.id==value.id){
				item.data.eq=value.eq
				item.data.vlot1=value.vlot1
				item.data.vlot2=value.vlot2
				item.data.ampere=value.ampere
				if(item.data.eqList.length>50) item.data.eqList.shift()
				item.data.eqList.push([time,value.eq])
			}else break
		}
	}

};
const actions = {

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

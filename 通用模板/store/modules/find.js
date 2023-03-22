import { toTime } from '../../utils/myTime'
const state = {
	lostData:[]
};
const mutations = {
	LOSTDATA(state,value){
		console.log(parseInt(value.timehalf1*65536+value.timehalf2));
		let time=toTime(parseInt(value.timehalf1*65536+value.timehalf2*1))
		let data=value.temp1
		state.lostData.push({time,data})
		console.log(state.lostData);
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

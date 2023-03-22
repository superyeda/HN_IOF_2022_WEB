
const state = {
	fan1:null,
	fan2:null,

};
const mutations = {
	// 接硬件收风扇状态
	RECEIVEFAN(state, value) {
		if(value.time<100000){
		this.dispatch("time/CURTIME")
		return
		}
		uni.setStorageSync("fan",JSON.stringify({fan1:value.fan1,fan2:value.fan2}))
		console.log(value);
		if(value.fan1==1)
		state.fan1='正转'
		if(value.fan1==2)
		state.fan1='反转'
		if(value.fan1==3)
		state.fan1='停转'
		console.log(state.fan1);
		// if (value.fan1_spd !== 1)
		// 	state.fan1 = value.fan1_spd * 99
		// else
		// 	state.fan1 = 0
		// if (value.fan2_spd !== 1)
		// 	state.fan2 = value.fan2_spd * 99
		// else state.fan2 = 0
	},
	BEGINFAN(state,value){
		state.fan1=value.fan1,
		state.fan2=value.fan2
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

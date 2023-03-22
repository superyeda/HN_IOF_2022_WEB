import {time} from '@/utils/mqttControl.js'
const state = {

};
const mutations = {
	
};
const actions = {
// 返回当前时间戳(秒)
	async CURTIME(value){
		time()
		// let time={"time":Math.floor(new Date().getTime()/1000)}
		// console.log(time);
		// let i=0
		// let p=setInterval(()=>{
				// doPublish("testtopic/mode",JSON.stringify(time))
			// 	i++
			// 	if(i===4)clearInterval(p)
			// },1000)
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

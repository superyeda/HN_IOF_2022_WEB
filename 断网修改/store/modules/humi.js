
import request from '@/utils/request.js'
const state={
	humi1:null,
	humi2:null,
	humi1List:{createT:[],data:[]},
	humi2List:{createT:[],data:[]}
};
const mutations={
	// 获取数据湿度数据
	DBHUMIDATA(state,value){
		state.humi1List={...value.humi1}
		state.humi2List={...value.humi2}
	},
	
	// 接收硬件发来的湿度数据
	RECEIVEHUMI(state,value){
		let time=new Date(value.time*1000).toLocaleString()
		state.humi1=value.humi1
		state.humi2=value.humi2
		if(state.humi1List.data.length>9){
			state.humi1List.data.shift()
			state.humi1List.createT.shift()
			state.humi1List.data.push(value.humi1)
			state.humi1List.createT.push(time)
			
			state.humi2List.data.shift()
			state.humi2List.createT.shift()
			state.humi2List.data.push(value.humi2)
			state.humi2List.createT.push(time)
		}
		else
		{
			state.humi1List.data.push(value.humi1)
			state.humi1List.createT.push(time)
			
			state.humi2List.data.push(value.humi2)
			state.humi2List.createT.push(time)
		}
		// uni.setStorage({
		// 	key:'humi1List',
		// 	data:JSON.stringify(state.humi1List),
		// })
		// uni.setStorage({
		// 	key:'humi2List',
		// 	data:JSON.stringify(state.humi2List),
		// })
		uni.setStorageSync("humi1List",state.humi1List)
		uni.setStorageSync("humi2List",state.humi2List)
	},
};
const actions={
	async todayHumi1({commit}){
		await request({url:'getAllHumi1s'}).then(({data})=>{
			commit("Humi1Tj",data.data)
		})
	},
	async todayHumi2({commit}){
		await request({url:'getAllHumi2s'}).then(({data})=>{
			commit("Humi2Tj",data.data)
		})
	}
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
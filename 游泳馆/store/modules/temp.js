import request from '@/utils/request.js'
import {
	toStamp,
	toTime
} from '@/utils/myTime.js'
const state = {
	temp1: null,
	temp2: null,
	temp1List: {
		createT: [],
		data: []
	},
	temp2List: {
		createT: [],
		data: []
	},
	biggerTemp1: null,
	biggerTemp2: null,
	lessTemp1: null,
	lessTemp2: null,
};
const mutations = {
	// 接收硬件发来的温度数据
	RECEIVETEMP(state, value) {
		
		if(value.time<100000){
		this.dispatch("time/CURTIME")
		return
		}
		let id =uni.getStorageSync("curId")
		if (id === value.id) {
			console.log("温度信息", value);
			let time=toTime(value.time*1000)
			state.temp1 = value.temp1
			state.temp2 = value.temp2
			state.temp1List.data.push(value.temp1)
			state.temp1List.createT.push(time)
			state.temp2List.data.push(value.temp2)
			state.temp2List.createT.push(time)
			// uni.setStorageSync('temp1List', state.temp1List)
			// uni.setStorageSync('temp2List', state.temp2List)
		}

	},
	UPDATATEMP(state, value) {
		if (value.temp1 > 25) state.biggerTemp1++
		else state.lessTemp1--
		if (value.temp2 > 25) state.biggerTemp2++
		else state.lessTemp2--
	},


	// 数据库中的温度数据
	DBTEMPDATA(state, value) {
		// console.log('12312',value)
		state.temp1List = {
			...value.temp1
		}
		state.temp2List = {
			...value.temp2
		}
		console.log(state.temp2List);
	},
	// 初始化统计温度s
	temp1Tj(state, value) {
		if (!value.length) return
		state.temp1 = value[value.length - 1].data
		state.biggerTemp1 = value.filter((item) => item.data > 25).length
		state.lessTemp1 = value.filter((item) => item.data < 25).length
	},
	temp2Tj(state, value) {
		if (!value.length) return
		state.temp2 = value[value.length - 1].data
		state.biggerTemp2 = value.filter((item) => item.data > 25).length
		state.lessTemp2 = value.filter((item) => item.data < 25).length
	}
};
const actions = {
	async todayTemp1({
		commit
	}) {

		await request({
			url: 'getAllTemp1s'
		}).then(({
			data
		}) => {
			commit("temp1Tj", data.data)
		})
	},
	async todayTemp2({
		commit
	}) {
		await request({
			url: 'getAllTemp2s'
		}).then(({
			data
		}) => {
			commit("temp2Tj", data.data)
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

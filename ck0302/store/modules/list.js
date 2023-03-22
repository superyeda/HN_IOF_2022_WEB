import request from '@/utils/request.js'
import {doPublish} from '@/utils/mqtt.js'
const state = {
	list: null,
	illList: null
};
const mutations = {
	DBLIST(state, value) {
		console.log('列表', value);
		state.list = value
	},
	ILLLIST(state, value) {
		console.log("非法传入名单", value);
		state.illList = value
	}
};
const actions = {
	async dbList({commit},value) {
		await request({url: 'parking-spots'}).then(({data}) => {
			const num=data.data.filter(item=>item.attributes.state).length
			if(value!==undefined)
				if(value.state){
						uni.showToast({
							title:value.msg,
						})
					setTimeout(()=>{doPublish('testtopic/mode',`{"id":${value.id},"motor":1,"people":${50-num}}`)},10)
					}
				else
				{
					uni.showToast({
						title:"没钱了",
						icon:"error"
					})
					setTimeout(()=>{doPublish('testtopic/mode',`{"id":${value.id},"buzzer":1,"people":${50-num}}`)},10)
				}
				

			commit("DBLIST", data.data)
		})
	},
	// 获取非法闯入名单
	async illList({
		commit
	}) {
		await request({
			url: 'trespasses'
		}).then(({
			data
		}) => {
			commit("ILLLIST", data.data)
		})
	},
	// 有人非法传入
	async addIll({
		commit,
		dispatch
	}, value) {
		console.log("有人非法传入", value);
		if (!value.air_a) {
			let time = toTime(parseInt(value.time) * 1000)
			const that = this
			console.log(that);
			await request({
				url: 'c-trespass',
				method: "post",
				data: {
					id: value.id,
					time
				}
			}).then(({
				data
			}) => {
				console.log(data);
				dispatch("illList")
			})


		} else {
			uni.showToast({
				title: "烟雾浓度过高",
				icon: 'error'
			})
		}
		// await request({url:'c-trespass',method:"post",data:{}})
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

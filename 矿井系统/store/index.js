import Vue from 'vue'
import Vuex from 'vuex'
import temp from "./modules/temp"
import air from "./modules/air"
import humi from "./modules/humi"
import fan from "./modules/fan"
import light from './modules/light'
import mode from './modules/mode'
import card from './modules/card'
import time from './modules/curTime'
import list from './modules/list'
import lock from './modules/lock'

Vue.use(Vuex)

export default new Vuex.Store({
	strict:true,
	state:{
		 isOnline:0,
		 isLock:0
	},
	mutations:{
		CHANGEONLINE(state,value){
			state.isOnline=value
		},
		CHANGELOCK(state,value){
			state.isLock=value
		}
	},
	actions:{
	},
	modules:{
		temp,
		humi,
		air,
		humi,
		fan,
		light,
		mode,
		card,
		time,
		list,
		lock
	}
})


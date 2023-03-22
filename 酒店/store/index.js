import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request.js'
import {doPublish} from '@/utils/mqtt.js'
import temp from "./modules/temp"

Vue.use(Vuex)

export default new Vuex.Store({
	strict:true,
	modules:{
		temp
	}
})


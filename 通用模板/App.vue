<script>
	import battery from './store/modules/battery.js'
import {
		createConnection,
		doSubscribe
	} from './utils/mqtt.js'
	export default {
		onLaunch: function() {
			// this.$store.dispatch("temp/todayTemp1")
			// this.$store.dispatch("temp/todayTemp2")
			// let temp1 = uni.getStorageSync('temp1List')
			// let temp2 = uni.getStorageSync('temp2List')
			// if (temp1)
			// 	this.$store.commit('temp/DBTEMPDATA', {
			// 		temp1,
			// 		temp2
			// 	})
			this.$store.dispatch('list/dbList')
		},
		onShow: function() {
			createConnection()
			// doSubscribe('testtopic/takeCard')
			doSubscribe('testtopic/temp')
			doSubscribe('testtopic/humi')
			doSubscribe('testtopic/light')
			doSubscribe('testtopic/curTime')
			doSubscribe("testtopic/fan")
			doSubscribe("testtopic/air")
			doSubscribe('testtopic/note')
			doSubscribe('testtopic/battery')
			doSubscribe('testtopic/alert')
			doSubscribe("testtopic/parameter")
			// CHANGE
			doSubscribe("testtopic/found")
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "uview-ui/index.scss";
	@import url('./static/fonts/iconfont.css');
	;

	/*每个页面公共css */
	body {
		background-color: rgba(200, 200, 200, 0.2);
	}
</style>

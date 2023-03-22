<script>
	import {createConnection,doSubscribe} from './utils/mqtt.js'
	export default {
		onLaunch: function() {
			this.$store.dispatch('people/GETPEOPLELIST')
			let temp1=uni.getStorageSync('temp1List')
		},
		onShow: function() {
			createConnection()
			doSubscribe('testtopic/takeCard')
			doSubscribe('testtopic/temp')
			doSubscribe('testtopic/light')
			doSubscribe('testtopic/curTime')
			doSubscribe("testtopic/fan")
			doSubscribe("testtopic/humi")
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import url('./static/fonts/iconfont.css');;
	/*每个页面公共css */
body{
	background-color:rgba(200,200,200,0.2);
}
</style>

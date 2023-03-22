<script>
	import battery from './store/modules/battery.js'
import {
		createConnection,
		doSubscribe
	} from './utils/mqtt.js'
	export default {
		onLaunch: function() {
			this.$store.dispatch('list/dbList')
			this.$store.dispatch('itemList/getItemList')
		},
		onShow: function() {
			createConnection()
			doSubscribe('testtopic/takeCard')
			doSubscribe('testtopic/addCard')
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
			doSubscribe("testtopic/volt")
			doSubscribe("testtopic/tds")
			doSubscribe("testtopic/work")
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

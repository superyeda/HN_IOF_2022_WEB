<script>
	import {createConnection,doSubscribe} from './utils/mqtt.js'
	export default {
		onLaunch: function() {
			// this.$store.dispatch("getNum")
			this.$store.dispatch("todayTemp1")
			this.$store.dispatch("todayTemp2")
			// let temp1=localStorage.getItem('temp1List')
			// let temp2=localStorage.getItem('temp2List')
			let temp1=[]
			let temp2=[]
			uni.getStorage({
				key:'temp1List',
				success(res) {
					temp1=res.data
				}
			})
			uni.getStorage({
				key:'temp2List',
				success(res) {
					temp2=res.data
				}
			})
			if(temp1)
			this.$store.commit('BEGINDATA',{temp1:JSON.parse(temp1),temp2:JSON.parse(temp2)})
		},
		onShow: function() {
			createConnection()
			doSubscribe('testtopic/takeCard')
			doSubscribe('testtopic/temp')
			doSubscribe('testtopic/light')
			doSubscribe('testtopic/curTime')
			doSubscribe("testtopic/fan")
			doSubscribe("testtopic/air")
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

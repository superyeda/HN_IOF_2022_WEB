<template>
	<view class="login">
		<!-- 图文卡片模式 -->
		<uni-card title="登录物联网系统后台" style="width: 50%;margin:200rpx auto;text-align: center;">
				<uni-easyinput focus v-model="username" placeholder="请输入用户名"></uni-easyinput><br>
				<uni-easyinput focus type="password" v-model="password" placeholder="请输入密码"></uni-easyinput><br>
				<button type="primary" @click="login">登录</button>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				username:"admin",
				password:"admin"
			}
		},
		methods: {
			login(){
				
				if(this.username==="admin"&&this.password==="admin"){
					uni.showToast({
						title:"登录成功"
					})
					// #ifdef H5
					uni.navigateTo({
						url:"/pages/List/List"
					})
					// #endif
					// #ifdef APP
					uni.switchTab({
						url:"/pages/List/List"
					})
					// #endif
					
				}else{
					uni.showToast({
						title:"账号或密码错误",
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.login{
		height: 100%;
	}
</style>
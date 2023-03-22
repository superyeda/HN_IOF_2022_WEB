<template>
	<!-- #ifdef H5 -->
	<view class="routeChange">
		<uni-card>
			<navigator url="/pages/Home/Home">主页</navigator>
		</uni-card>
		<uni-card>
			<navigator url="/pages/List/List">数据列表</navigator>
		</uni-card>
		<uni-card>
			<navigator url="/pages/Register/Register">充值入口</navigator>
		</uni-card>
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		name:"routeChange",
		data() {
			return {
			};
		},
		methods:{
		}
	}
</script>

<style>
.routeChange{
	display: flex;
	text-align: center;
}
.active{
	background-color: beige;
}
</style>
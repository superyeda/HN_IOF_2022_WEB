<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="充钱" thumbnail="../../static/images/bike.png">
			<uni-forms ref="form">
				<uni-forms-item label="卡号" name="name">
					<uni-easyinput  v-model="id" placeholder="请输入卡号" />
				</uni-forms-item>
				<uni-forms-item label="金额" name="money">
					<uni-easyinput  v-model="money" placeholder="请输入充值金额" />
				</uni-forms-item>
			</uni-forms>
			
			<button @click="submit" type="primary">提交</button>
		</uni-card>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				id:'',
				money:0
			}
		},
		methods: {
			async submit(){
				const {data}=await request({url:"topUp",method:"POST",data:{card:this.id,amount:this.money}})
				uni.showToast({
					title:`${data.msg},目前余额${data.money}`
				})
			}
		}
	}
</script>

<style>

</style>

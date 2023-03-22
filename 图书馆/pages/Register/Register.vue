<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="添加图书" thumbnail="../../static/images/bike.png">
			<uni-forms ref="form">
				<uni-forms-item label="图书ID" name="ID">
					<uni-easyinput  v-model="item.ID" placeholder="请输入图书ID" />
				</uni-forms-item>
				<uni-forms-item label="书名" name="NAME">
					<uni-easyinput  v-model="item.NAME" placeholder="请输入详细街道信息" />
				</uni-forms-item>
				<uni-forms-item label="位置信息" name="ADDR">
					<uni-easyinput  v-model="item.ADDR" placeholder="请输入位置信息" />
				</uni-forms-item>
			</uni-forms>
			
			<button @click="submit" type="primary">提交</button>
		</uni-card>
	</view>
</template>

<script>
	import {doSubscribe,unSub}  from '@/utils/mqtt'
	import request from '@/utils/request'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				item:{
					ID:'',
					NAME:'',
					ADDR:''
				},
				show:false,
			}
		},
		methods: {
			submit(){
				if(!this.item.ID||!this.item.ADDR||!this.item.NAME)
				uni.showToast({
					title:"用户信息不能为空",
					icon:'none'
				})
				else{
					this.addSuccess()
				}
			},
			addSuccess(){
				// TODO:等待接口写完
				let newItem={name:this.item.NAME,book_num:this.item.ID,position:this.item.ADDR};
				request({url:'b-create',method:'post',data:newItem}).then(({data})=>{
					if(data.code===200){
						uni.showToast({
							title:"添加成功"
						})
					}else{
						uni.showToast({
							title:"ID已存在",
							icon:"error"
						})
					}
				},reason=>{console.log(reason)})
				this.item={NAME:'',ID:'',ADDR:''}
			}
		}
	}
</script>

<style>

</style>

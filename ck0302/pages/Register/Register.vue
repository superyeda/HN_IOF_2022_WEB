<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="充值人口" thumbnail="../../static/images/bike.png">
			<button @click="submit" type="primary">点击</button>
		</uni-card>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="base" message="成功消息" :duration="2000" :before-close="true" @confirm="addSuccess" @close="close">
						<view v-if="!newCard">
							读卡中...
						</view>
						<view v-else style="text-align: center;">
							卡号读取成功<br>
							卡号:{{newCard}}
							<input type="number" placeholder="请输入充值余额" v-model="money">
						</view>
				</uni-popup-dialog>
				</uni-popup>
	</view>
</template>

<script>
	import {doSubscribe,unSub}  from '@/utils/mqtt'
	import request from '@/utils/request'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				show:false,
				money:null
			}
		},
		computed:{
			...mapState("card",['newCard'])
		},
		methods: {
			submit(){
					this.$refs.popup.open("center")
					doSubscribe("testtopic/addCard")
			},
			close(){
				this.$refs.popup.close()
				unSub('testtopic/addCard')
			},
			async addSuccess(){
				if(!this.newCard){
					uni.showToast({
						title:"未识别到卡号",
						icon:'none'
					})
					return
				}
				const {data}=await request({url:"recharge",method:"POST",data:{card:this.newCard,money:this.money}})
				this.$refs.popup.close()
				console.log(data);
				if(data.code===200)
				uni.showToast({
					title:"修改成功"
				})
				else
				uni.showToast({
					title:data.msg,
					icon:"error"
				})
				this.money=0
				this.$store.commit("card/UPDATENEW",0)
				console.log(this.newCard);
				unSub('testtopic/addCard')
			}
		}
	}
</script>

<style>

</style>

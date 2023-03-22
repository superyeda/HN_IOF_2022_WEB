<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="注册" thumbnail="../../static/images/people.png">
			<uni-forms ref="form">
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput  v-model="info.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="年龄" name="age">
					<uni-easyinput  v-model="info.age" placeholder="请输入年龄" />
				</uni-forms-item>
			</uni-forms>
			
			<button @click="submit" type="primary">提交</button>
		</uni-card>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="base" message="成功消息" :duration="2000" :before-close="true" @confirm="addSuccess" @close="close">
						<view v-if="!newCard">
							读卡中...
						</view>
						<view v-else style="text-align: center;">
							卡号读取成功<br>
							卡号:{{newCard}}
						</view>
				</uni-popup-dialog>
				</uni-popup>
	</view>
</template>

<script>
	import {doSubscribe,unSub}  from '@/utils/mqtt'
	import request from '@/utils/request'
	import {mapState} from 'vuex'
	import myAlert from '@/utils/myAlert.js'
	export default {
		data() {
			return {
				info:{
					name:'',
					age:'',
				},
				show:false,
			}
		},
		computed:{
			...mapState("card",['newCard'])
		},
		methods: {
			submit(){
				if(!this.info.name||!this.info.age)
				myAlert('用户信息不能为空')
				else{
					this.$refs.popup.open("center")
					doSubscribe("testtopic/addCard")
				}
			},
			close(){
				this.$refs.popup.close()
				unSub('testtopic/addCard')
			},
			addSuccess(){
				if(!this.newCard){
					myAlert("未识别到卡号")
					return
				}
				// TODO:获取mqtt卡号添加人员到数据库
				let newPeople={name:this.info.name,card_num:this.newCard};
				request({url:'c-create',method:'post',data:newPeople}).then(res=>{
					console.log(res);
				},reason=>{console.log(reason)})
				console.log(newPeople);
				this.$refs.popup.close()
				myAlert("添加成功")
				unSub('testtopic/addCard')
				this.info={name:'',age:''}
			}
		}
	}
</script>

<style>

</style>

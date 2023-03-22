<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="人员信息录入" thumbnail="../../static/images/peopleInfo.png">
			<uni-forms ref="form">
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput  v-model="user.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="性别" name="sex">
					<uni-data-checkbox  v-model="user.sex" :localdata="sexList" />
				</uni-forms-item>
				<uni-forms-item label="年龄" name="age">
					<uni-easyinput  v-model="user.age" placeholder="请输入年龄" />
				</uni-forms-item>
				<uni-forms-item label="电话" name="tel">
					<uni-easyinput  v-model="user.tel" placeholder="请输入电话" />
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
	export default {
		data() {
			return {
				user:{
					name:'',
					sex:1,
					age:'',
					tel:''
				},
				show:false,
				sexList:[{"value":1,"text":"男"},{"value":2,"text":"女"}],
			}
		},
		computed:{
			...mapState(['newCard'])
		},
		methods: {
			submit(){
				if(!this.user.name||!this.user.sex||!this.user.age||!this.user.tel) alert("用户信息不能为空")
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
					// #ifdef H5
					alert("未识别到卡号")
					// #endif
					// #ifdef APP
					uni.showToast({
						title:"未识别到卡号",
						icon:'none'
					})
					// #endif
					return
				}
				// TODO:获取mqtt卡号添加人员到数据库
				let newPeople={name:this.user.name,card_num:this.newCard};
				request({url:'c-create',method:'post',data:newPeople}).then(res=>{
					console.log(res);
				},reason=>{console.log(reason)})
				console.log(newPeople);
				this.$refs.popup.close()
				// #ifdef H5
				alert("添加成功")
				// #endif
				// #ifdef APP
				uni.showToast({
					title:"修改成功"
				})
				// #endif
				unSub('testtopic/addCard')
				this.user={name:'',sex:'',age:'',tel:''}
			}
		}
	}
</script>

<style>

</style>

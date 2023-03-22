<template>
	
	<view>
		<My-routeChange></My-routeChange>
			<uni-card title="车库状态" thumbnail="../../static/images/park.png">
				<div class="cardList">
					<My-workState title="剩余车位数" :num="100-this.$store.state.carNum"></My-workState>
					<My-workState title="已占车位数" :num="this.$store.state.carNum"></My-workState>
				</div>

			</uni-card> 
			<button @click="test">关闭蜂鸣器</button>
			<button @click="test1">开启蜂鸣器</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {doPublish} from '../../utils/mqtt'
	export default {
		data() {
			return {
			}
		},
		computed: {
			
		},
		methods: {
			test(){
				doPublish('testtopic/mode','{"mode":2,"led":0}')
			},
			test1(){
				doPublish('testtopic/mode','{"mode":2,"led":1}')
			}
		},
		
		computed:{
		}
	}
</script>

<style>
.cardList{
	display: flex;
	flex-wrap: wrap;
	justify-content:space-around;
}
</style>

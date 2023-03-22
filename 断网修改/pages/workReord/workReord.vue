<template>
	<view>
		<My-routeChange></My-routeChange>
			<uni-card title="工厂人员信息表" thumbnail="../../static/images/peoples.png">
				<div class="cardList">
					<My-workState title="张三" :peopleInfo="peopleInfo"></My-workState>
				</div>
	
			</uni-card> 
			<button @click="test">关闭蜂鸣器</button>
			<button @click="test1">开启蜂鸣器</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {buzzer} from '../../utils/mqttControl.js'
	export default {
		data() {
			return {
			}
		},
		computed: {
			
		},
		methods: {
			test(){
				buzzer()
			},
			test1(){
				buzzer(1)
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

<template>
	<view style="width:30%;">
		<uni-card thumbnail="../../static/images/peopleInfo.png" :title="title" :peopleInfo="peopleInfo" style="flex:none;margin: 5px;">
			
		</uni-card>
	</view>
</template>

<script>
	import {doPublish} from '../utils/mqtt'
	export default {
		name:"workState",
		props:{
			title:{
				type:String,
			},
			peopleInfo:{
				type:Object
			}
		},
		data() {
			return {
				hour:'00',
				min:'00',
				miao:'00',				
				timer:null
			};
		},
		methods:{
		},
		mounted() {

		},
		beforeDestroy() {
		}
	}
</script>

<style>
.active{
	background-color: red;
}
.active view{
	color: white;
}
</style>
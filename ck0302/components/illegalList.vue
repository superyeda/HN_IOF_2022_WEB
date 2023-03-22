<template>
	<uni-card title="非法闯入名单信息">
		<table style="width: 100%;" border="1px" cellspacing='0'>
			<tr>
				<th>序号</th>
				<th>教室</th>
				<th>时间</th>
			</tr>
			
			<tr v-for="(item,index) in illList" v-if="item.attributes.classroom===id" style="text-align: center;">
				<td>{{index+1}}</td>
				<td>{{item.attributes.classroom}}</td>
				<td>{{item.attributes.trespass_time}}</td>
			</tr>
		</table>
	</uni-card>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"illegalP",
		props:{
			id:{
				
			}
		},
		data() {
			return {
				
			};
		},
		created() {
			this.$store.dispatch("list/illList")
		},
		computed:{
			...mapState("list",["illList"]),
		}
	}
</script>

<style>

</style>
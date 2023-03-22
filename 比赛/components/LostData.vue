<template>
	<view v-if="lostData.length">
		<uni-card title="遗失数据" thumbnail="">
			<template v-if="lostData.length">
				<scroll-view scroll-y="true">
					<table style="width: 100%;" border="1px" cellspacing='0'>
						<tr>
							<th>序号</th>
							<th>数据</th>
							<th>时间</th>
						</tr>
						<tr v-for="(item,index) in lostData" style="text-align: center;">
							<td>{{index+1}}</td>
							<td>{{item.data}}</td>
							<td>{{item.time}}</td>
						</tr>
					</table>
				</scroll-view><br>
				
				<page-pagination :total="lostData.length" :pageSize="5" :showAround="true" :btnText="true" :showPageInfo="true" @change='change'></page-pagination>
			</template>
		</uni-card>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name:"LostData",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('find',['lostData']),
		},
		methods: {
			change(currentPage, type){
				  this.currentPage = currentPage;
				  if(currentPage)
				  this.showList=this.dataList.slice(currentPage*10-10,currentPage*10)
				  console.log("点击了" + type +"，当前页：" + currentPage);
			}

		},
	}
</script>

<style>

</style>
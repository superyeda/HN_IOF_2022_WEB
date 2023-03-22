<template>
	<view>
		<My-routeChange></My-routeChange>
			<uni-card title="查询数据" style="overflow:inherit;">
				<view class="cu-form-group margin-top">
					<view class="title">图书ID</view>
					<input type="text" placeholder="请输入图书ID" v-model="ID">
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">借阅人</view>
					<input type="text" placeholder="请输入借阅人信息" v-model="SNO"/>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">查询范围</view>
					<uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至"/>
				</view>
				<br>
					<button type="primary" @click="getList">查询</button>
					<br>
				<template v-if="dataList.length">
					<scroll-view scroll-y="true">
						<view class="cate" >
							{{dataCate[cateIndex]}}
						</view>
						<table style="width: 100%;" border="1px" cellspacing='0'>
							<tr>
								<th>序号</th>
								<th>数据</th>
								<th>时间</th>
							</tr>
							<tr v-for="(item,index) in showList" style="text-align: center;">
								<td>{{index+1}}</td>
								<td>{{item.data}}</td>
								<td>{{item.created_time}}</td>
							</tr>
						</table>
					</scroll-view><br>
					
					<page-pagination :total="dataList.length" :pageSize="10" :showAround="true" :btnText="true" :showPageInfo="true" @change='change'></page-pagination>
				</template>
				<template v-else>
					<view style="text-align: center;"><h1>暂无数据</h1></view>
				</template>
			</uni-card>
	</view>
</template>

<script>
import request from '@/utils/request.js'
import {toTime,toStamp} from "@/utils/myTime"
import myAlert from '@/utils/myAlert.js'
import {mapState} from 'vuex'
	export default {
		name: "findData",
		data() {
			return {
				datetimerange: [],
				// dataCate:['温度','电量','湿度2','烟雾1','烟雾2'],
				dataCate:['温度','电量'],
				dataId:[],
				cateIndex:-1,
				idIndex:-1,
				dataList:[],
				showList:[],
				currentPage:1,
				ID:'',
				SNO:'',
			};
		},
		computed:{
			...mapState("list",["list"])
		},
		created() {
			this.list.forEach(item=>{
				this.dataId.push(item.id)
			})
		},
		methods:{
			cateChange(e) {
				this.cateIndex = e.detail.value
			},
			idChange(e) {
				this.idIndex = e.detail.value
			},
			async getList(){
				this.vailUrl()
			},
		vailUrl(){
			if(!this.ID||!this.SNO)
			uni.showToast({
				title:"请输入查询的条件",
				icon:"error"
			})
			return;
			let findCate=''
			switch(this.cateIndex){
				case 0:
					findCate='getAllTemp1s'
					break
				case 1:
					findCate='getAllBatteries'
					break
				// case 2:
				// 	findCate='getAllHumid1s'
				// 	break
				// case 3:
				// 	findCate='getAllHumid2s'
				// 	break
				// case 4:
				// 	findCate='getAllAqi1s'
				// 	break
				// case 5:
				// 	findCate='getAllAqi2s'
					// break
				default:
					return ''
			}
			return findCate
			
		},
		  change(currentPage, type){
			  this.currentPage = currentPage;
			  if(currentPage)
			  this.showList=this.dataList.slice(currentPage*10-10,currentPage*10)
			  console.log("点击了" + type +"，当前页：" + currentPage);
		}
			
		}
	}
</script>

<style>
.cate{
	font-size: 30px;
	margin: 5px;
	text-align: center;
	font-weight: 700;
}
</style>

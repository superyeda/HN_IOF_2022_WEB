<template>
	<view>
		<My-routeChange></My-routeChange>
		<uni-card title="查询数据" style="overflow:inherit;">
			<view class="cu-form-group margin-top">
				<view class="title">车辆ID</view>
				<picker @change="idChange" :value="idIndex" :range="dataId">
					<view class="picker">
						{{idIndex>-1?dataId[idIndex]:'请选择需要查询的数据'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">类型</view>
				<picker @change="cateChange" :value="cateIndex" :range="dataCate">
					<view class="picker">
						{{cateIndex>-1?dataCate[cateIndex]:'请选择需要查询的数据'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">查询范围</view>
				<!-- <uni-section :title="'日期时间范围用法：' + '[' + datetimerange + ']' " type="line"></uni-section> -->
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
							<th>丢失数据</th>
						</tr>
						<tr v-for="(item,index) in dataList" style="text-align: center;">
							<td>{{index+1}}</td>
							<td>{{item.data}}</td>
							<td>{{item.created_time}}</td>
							<td>{{item.disconnect?"√":""}}</td>
						</tr>
					</table>
				</scroll-view><br>
				
				<page-pagination :total="count" :pageSize="20" :showAround="true" :btnText="true" :showPageInfo="true" @change='change'></page-pagination>
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
				dataCate:['温度','湿度'],
				dataId:[],
				cateIndex:-1,
				idIndex:-1,
				dataList:[],
				showList:[],
				currentPage:1,
				count:''
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
				let islegal=this.vailUrl()
				if(!islegal)return
				let beginT=toStamp(this.datetimerange[0]) 
				let endT=toStamp(this.datetimerange[1])
				const {data}=await request({url:`${islegal}/${this.dataId[this.idIndex]}`,method:"post",data:{"limit":20,"curPage":this.currentPage,startTime:beginT,endTime:endT}})
				this.dataList=data.curPage
				this.count=data.count
				// console.log(this.dataList);
			},
		vailUrl(){
			if(this.idIndex===-1){myAlert('车辆ID不能为空');return ''}
			if(this.cateIndex===-1){myAlert('查询类型不能为空');return ''}
			if(this.datetimerange.length<2){myAlert('时间范围不能为空'); return ''}
			let findCate=''
			switch(this.cateIndex){
				case 0:
					findCate='getAllTemp1s'
					break
				case 1:
					findCate='getAllHumid1s'
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
			  this.getList()
			  // if(currentPage)
			  // this.showList=this.dataList.slice(currentPage*10-10,currentPage*10)
			  // console.log("点击了" + type +"，当前页：" + currentPage);
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

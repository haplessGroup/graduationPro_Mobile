<template>
	<view>
		<view>
			<uni-nav-bar fixed="true">
				<view style="margin: auto auto;font-weight: bold;">数据查询历史</view>
				<view slot="left" @click="goBack">
					<view style="margin-top: 10px;float: left;">
						<uni-icons type="back" size="30"></uni-icons>
					</view>
					<view style="float: left;margin-top: 10px;line-height: 25px;">
						<text >返回</text>
					</view>
				</view>
			</uni-nav-bar>
		</view>
		<!-- 搜索栏 -->
		<view>
			<uni-search-bar 
				placeholder="数据历史搜索" 
				bgColor="#EEEEEE" 
				@confirm="search"
				@clear="clear"/>
		</view>
		<!-- 数据展示 -->
		<view>
			<view v-if="historylist.length==0" style="text-align: center;">
				<text>暂无数据~</text>
			</view>
			<view v-for="(item,index) in historylist" :key="index" v-if="historylist.length!=0">
				<uni-card :is-shadow="false" is-full style="text-align: center;">
					<text style="float: left;">{{index+1}}</text>
					<text class="uni-h6">{{item.dataname}}</text>
					<text style="float: right;">{{item.viewtime}}</text>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				historylist:[]
			}
		},
		onLoad() {
			this.viewDataHistory()
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			viewApi(){
				uni.request({
					// 将用户账号传递给后端，用来筛选自己查询的数据，而不是所有数据
					url:"http://127.0.0.1:5000/viewdatahistory?account="+this.userInfo.account,
					method:"GET",
					success: (res) => {
						// console.log(res)
						if(res.data=="no result")
						{
							console.log(res.data)
						}else if(res.data=="ERROR")
						{
							uni.showToast({
								title:"系统出错了~",
								icon:"none"
							})
						}else{
							this.historylist=res.data
						}
					}
				})
			},
			// 查看历史内容
			viewDataHistory(){
				uni.showLoading({
					title:"正在查询中..."
				})
				uni.request({
					// 将用户账号传递给后端，用来筛选自己查询的数据，而不是所有数据
					url:"http://127.0.0.1:5000/viewdatahistory?account="+this.userInfo.account,
					method:"GET",
					success: (res) => {
						uni.hideLoading()
						// console.log(res)
						if(res.data=="no result")
						{
							console.log(res.data)
						}else if(res.data=="ERROR")
						{
							uni.showToast({
								title:"系统出错了~",
								icon:"none"
							})
						}else{
							this.historylist=res.data
						}
					}
				})
				
			},
			// 当回车搜索时触发此函数
			search(e){
				uni.showLoading({
					title:"正在搜索中..."
				})
				uni.request({
					url:"http://127.0.0.1:5000/searchdatahistory",
					method:"POST",
					data:{"dataname":e.value,"account":this.userInfo.account},
					success: (res) => {
						uni.hideLoading()
						if(res.data=="ERROR")
						{
							uni.showToast({
								title:"查询出错~",
								icon:"none"
							})
						}else if(res.data=="no result")
						{
							uni.showToast({
								title:"未找到结果~",
								icon:"none"
							})
						}else{
							this.historylist=res.data
						}
					},
					fail: (err) => {
						uni.hideLoading()
						console.log(err+"查询接口错误~")
					}
				})
			},
			//当点击清空时出发此函数
			 clear(e){
				// console.log(e)
				this.viewApi()
			 }
		}
	}
</script>

<style>

</style>

<template>
	<view class="container">
		<!-- 导航 -->
		<uni-nav-bar title="数据中心" style="font-weight: bold;"></uni-nav-bar>
		<view>
			<uni-section title="电影" type="line" padding>
				<uni-list>
					<!-- uni-list-item需要添加link属性点击事件才会生效 -->
					<uni-list-item 
						title="豆瓣电影top250排行"
						@click="showTopMovie('豆瓣电影top250排行')" 
						link></uni-list-item>
				</uni-list>
			</uni-section>
		</view>
		<view>
			<uni-section title="旅游城市" type="line" padding>
				<uni-list>
					<uni-list-item 
						title="热门旅游城市推荐" 
						@click="showHotTravelCity('热门旅游城市推荐')" 
						link></uni-list-item>
				</uni-list>
			</uni-section>
		</view>
		<view>
			<uni-section title="IT" type="line" padding>
				<uni-list>
					<uni-list-item 
						title="各开发语言使用情况"  
						link 
						@click="gotoProLanguage('各开发语言使用情况')"></uni-list-item>
					<uni-list-item title="最受欢迎的软件top" link @click="showToast()"></uni-list-item>
					<uni-list-item title="国内IT公司top" link @click="showToast()"></uni-list-item>
				</uni-list>
			</uni-section>
		</view>
		<view>
			<uni-section title="经济" type="line" padding>
				<uni-list>
					<uni-list-item title="股票"  link @click="showToast()"></uni-list-item>
				</uni-list>
			</uni-section>
		</view>
		<view>
			<uni-section title="美妆" type="line" padding>
				<uni-list>
					<uni-list-item title="整形医院好评榜单"  @click="showToast()" link></uni-list-item>
				</uni-list>
			</uni-section>
		</view>
		<view>
			<uni-section title="教育" type="line" padding>
				<uni-list>
					<uni-list-item title="国内高校排行"  @click="showToast()" link></uni-list-item>
					<uni-list-item title="国内近十年考研人数分析" @click="showToast()" link></uni-list-item>
				</uni-list>
			</uni-section>
		</view>
		<!-- 悬浮按钮 -->
		<view>
			<Fab></Fab>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import {mapState,mapMutations} from 'vuex'
	import Fab from "@/components/fab.vue"
	export default {
		data() {
			return {
				userToken:''
			}
		},
		components:{
			uniSection,
			Fab
		},
		onLoad() {
			this.setuserInfo()
			// 监听网络
			uni.onNetworkStatusChange(function (res) {
				console.log(res.isConnected);
				console.log(res.networkType);
				if(res.networkType=="none")
				{
					uni.showToast({
						title:"当前未连接网络",
						icon:"none",
						position:"top"
					})
				}else{
					uni.showToast({
						title:"当前网络状态为:"+res.networkType,
						icon:"none",
						position:"top"
					})
				}
				
			});
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods: {
			...mapMutations(["setuserInfo"]),
			showTopMovie(tit){
				// console.log(this.userInfo.account)
				this.addDataViewHistory(tit)
				if(this.userInfo.account==="")
				{
					
					uni.showToast({
						title:"请先登录~",
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"../login/login"
						})
					},1000)
				}else{
					uni.navigateTo({
						url:"./movie/dbmovie"
					})
				}
			},
			showHotTravelCity(tit){
				this.addDataViewHistory(tit)
				if(this.userInfo.account==="")
				{
					
					uni.showToast({
						title:"请先登录~",
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"../login/login"
						})
					},1000)
				}else{
					uni.navigateTo({
						url:"./travel/travelcity"
					})
				}
			},
			gotoProLanguage(tit){
				this.addDataViewHistory(tit)
				if(this.userInfo.account==="")
				{
					
					uni.showToast({
						title:"请先登录~",
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"../login/login"
						})
					},1000)
				}else{
					uni.navigateTo({
						url:"it/prolanguage"
					})
				}
			},
			showToast(){
				uni.showToast({
					title:"正在开发中...",
					icon:"none"
				})
			},
			// 点击增加数据查询历史
			addDataViewHistory(tit){
				uni.request({
					url:"http://127.0.0.1:5000/adddataviewhistory",
					method:"POST",
					data:{"dataname":tit,"account":this.userInfo.account},
					success: (res) => {
						if(res.data=="ok")
						{
							console.log("增加查询历史数据成功!")
						}else if(res.data=="failed")
						{
							console.log("增加查询历史数据失败!")
						}else{
							console.log("后台错误!")
						}
					},
					fail: (err) => {
						console.log(err+"调用插入历史接口失败!")
					}
				})
			}
		}
	}
</script>

<style>
</style>

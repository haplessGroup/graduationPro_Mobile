<template>
	<view class="user">
		<!-- 自定义导航栏 -->
		<view>
			<uni-nav-bar title="个人中心" class="nv"></uni-nav-bar>
		</view>
		<view>
			<uni-card :is-shadow="false" is-full>
				<view style="width: 400rpx;margin: 0rpx auto;" v-if="userInfo.account==''">
					<button type="primary" @click="gotoLogin">去登陆</button>
				</view>
				<view v-if="userInfo.account!=''" style="height: 130px;margin-top: 15px;">
					<!-- 头像 -->
					<view class="avator" style="float: left;">
						<image src="../../static/images/bg4.jpg" mode="" class="im"></image>
					</view>
					<!-- 基本信息 -->
					<view style="float: left;margin-left: 10px;">
						<!-- 用户名 -->
						<view style="font-size: 50rpx;margin-top: 10px;margin-left: 10px;font-weight: bold;color: black;">
							{{userInfo.nickname}}
						</view>
						<!-- 账号 -->
						<view style="font-size: 30rpx;margin-top: 30px;margin-left: 10px;">
							<span>账号:{{userInfo.account}}</span>
							<span style="margin-left: 10px;">状态:{{userInfo.accstatus}}</span>
						</view>
					</view>
				</view>
			</uni-card>
			<uni-list class="ls">
				<uni-list-item 
					:show-extra-icon="true" 
					showArrow 
					:extra-icon="extraIcon.info" 
					title="个人信息" 
					@click="gotoUserInfo()"
					link></uni-list-item>
				<uni-list-item 
					:show-extra-icon="true" 
					showArrow 
					:extra-icon="extraIcon.feedback" 
					title="用户反馈" 
					@click="gotoUserAdvice"
					link></uni-list-item>
				<uni-list-item
					:show-extra-icon="true" 
					showArrow 
					:extra-icon="extraIcon.history" 
					title="数据查询历史"
					@click="gotohistory"
					link></uni-list-item>
				<uni-list-item 
					:show-extra-icon="true" 
					showArrow 
					:extra-icon="extraIcon.customer" 
					title="客服" 
					link
					@click="showModal"></uni-list-item>
				<uni-list-item 
					:show-extra-icon="true" 
					showArrow 
					:extra-icon="extraIcon.setting" 
					title="设置"
					@click="gotoSettings"
					link></uni-list-item>
			</uni-list>
		</view>
		<!-- 悬浮按钮 -->
		<view>
			<Fab></Fab>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import Fab from '@/components/fab.vue'
	export default{
		data()
		{
			return{
				// 列表的图标
				extraIcon:{
					info:{
						size: '30',
						type: 'contact'
					},
					feedback:{
						size:'30',
						type:'chatbubble-filled'
					},
					customer:{
						size:'30',
						type:'chatboxes-filled'
					},
					history:{
						size:'30',
						type:"list"
					},
					setting:{
						size:'30',
						type:'gear-filled'
					}
				},
				
			}
		},
		components:{
			Fab
		},
		onLoad(){
			console.log(this.userInfo)
			this.setuserInfo()
			// 监听网络变化
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
				uni.connectSocket({
				  url: 'wss://127.0.0.1:5000',
				  success(data){
					  console.log(data)
				  }
				});
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods:{
			...mapMutations(['setuserInfo','setUser']),
			gotoUserInfo(){
				if(this.userInfo.account=="")
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
						url:"./userinfo/userinfo"
					})
				}	
			},
			showModal(){
				uni.showModal({
					title: '提示',
					content: '如有问题请添加客服QQ:2498459886或者点击屏幕下方按钮拨打电话',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			gotoLogin(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			gotoSettings(){
				if(this.userInfo.account=="")
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
						url:"./settings/settings"
					})
				}
			},
			gotoUserAdvice(){
				if(this.userInfo.account=="")
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
						url:"useradvice/useradvice"
					})
				}
				
			},
			gotohistory(){
				if(this.userInfo.account=="")
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
						url:"dataistory/datahistory"
					})
				}
				
			}
			
		}
	}
</script>

<style>
	.nv{
		font-weight: bold;
	}
	
	.avator{
		width: 100px;
		height: 100px;
		border-radius: 10px;
		border: 1rpx solid #000;
	}
	.im{
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}
	.ls{
		font-weight: bold;
		font-size: 18px
	}
	.user{
		height: var(--status-bar-height);
		width: 100%;
	}
</style>

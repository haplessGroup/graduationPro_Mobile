<template>
	<view>
		<uni-popup ref="popup" background-color="#fff" >
			<view class="popup-content" width="80%">
				<view class="text">
					<view style="text-align: center;font-weight: bold;font-size: 20px;">
						<text>声明</text>
					</view>
					
					<view>
						<text>1、感谢数据提供网站：豆瓣、Maigoo、马蜂窝、携程旅行、自驾游天下(个人博客)、旅图君(个人博客)、快票出行、搜狐、TIOBE。</text>
					</view>
					<view>
						<text>2、本平台目前正处于开发阶段，所以数据量较少，功能较为简单。</text>
					</view>
					<view>
						<text>3、感谢指导老师的辛苦指导。</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<view>
			<!-- 导航 -->
			<uni-nav-bar >
				<view style="margin: auto auto;font-weight: bold;font-size: 16px;">
					首页
				</view>
			</uni-nav-bar>
		</view>
		<!-- 通告栏 -->
		<view>
			<!-- single：是否单行 -->
			<!-- 
				原生html：marquee
			 -->
			<uni-notice-bar showIcon scrollable single text="本软件正在紧张开发中...请耐心等待哦~"></uni-notice-bar>
		</view>
		<!-- 卡片 -->
		<view>
			<uni-card title="简单介绍" style="margin: 20rpx 0 0 0;">
				<view style="text-indent: 2em;">
					本平台主要用于对某些特定领域的数据分析，其中主要包括：豆瓣电影排行、各开发语言使用......
					本平台主要使用的技术有：Vue框架、Element Plus框架以及ECharts数据可视化等等。
				</view>
			</uni-card>
		</view>
		<!-- 折叠面板 -->
		<view style="margin-top: 20rpx;">
			<Collapse></Collapse>
		</view>
		<!-- 悬浮按钮 -->
		<view>
			<Fab></Fab>
		</view>
	</view>
</template>

<script>
	import Collapse from '../../components/collapse.vue'
	import Fab from '@/components/fab.vue'
	export default {
		data() {
			return {
				type:"center"
			}
		},
		onLoad() {
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
		mounted() {
			this.showPopup()
		},
		// onPullDownRefresh() {
		// 	console.log('refresh');
		// 	setTimeout(function () {
		// 		// 3秒后停止刷新
		// 		uni.stopPullDownRefresh();
		// 	}, 3000);
		// },
		components:{
			Collapse,
			Fab
		},
		methods: {
			open(){
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('top')
			},
			showPopup(){
				this.$refs.popup.open(this.type)
			}

		}
	}
</script>

<style>
	/* 加上deep避免影响全局 */
	/deep/.uni-popup .uni-popup__wrapper {
		/* !import 设置优先级 */
	    width: 80% !important; 
	    padding: 40rpx;
		border-radius: 20rpx;
	}
</style>

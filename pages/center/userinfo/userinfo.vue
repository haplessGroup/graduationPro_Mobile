<template>
	<view>
		<view>
			<uni-nav-bar>
				<view style="margin: auto auto;font-weight: bold;">个人信息</view>
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
		<!-- 个人信息展示 -->
		<view>
			<uni-list>
				<!-- line-height是为了让文字垂直居中 -->
				<uni-list-item title="头像" style="line-height: 150rpx;">
					<!-- direction 为row时，代表水平排列此时的footer就代表在右边 -->
					<view direction="row" slot="footer" style="width: 150rpx;height: 150rpx;border: 1rpx solid black;border-radius: 10rpx;margin-top: -10rpx;">
						<image src="../../../static/images/bg4.jpg" style="width: 150rpx;height: 150rpx;"></image>
					</view>
				</uni-list-item>
				<uni-list-item title="名字" :rightText="userInfo.nickname"/>
				<uni-list-item title="账号" :rightText="userInfo.account"/>
				<uni-list-item title="更多信息" link @click="moreInfo"/>
			</uni-list>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			},
			moreInfo(){
				uni.navigateTo({
					url:"./moreinfo"
				})
			},
		}
	}
</script>

<style>
/* #ifdef H5 */
	@media screen and (min-width: 768px) and (max-width: 1425px) {
		.swiper {
			height: 630px;
		}
	}

	@media screen and (min-width: 1425px) {
		.swiper {
			height: 830px;
		}
	}

	/* #endif */
</style>

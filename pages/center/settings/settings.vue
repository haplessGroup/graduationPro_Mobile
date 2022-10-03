<template>
	<view>
		<!-- 导航 -->
		<view>
			<uni-nav-bar class="snv" fixed="true">
				<view class="sh">设置</view>
				<view slot="left" @click="goBack">
					<view class="snicon">
						<uni-icons type="back" size="30"></uni-icons>
					</view>
					<view class="sback">
						<text >返回</text>
					</view>
				</view>
			</uni-nav-bar>
		</view>
		<view>
			<uni-list>
				<uni-list-item
					:show-extra-icon="true" 
					showArrow 
					title="修改密码"
					@click="updatePassWord"
					link></uni-list-item>
				<uni-list-item
					:show-extra-icon="true" 
					showArrow 
					title="注销登录"
					@click="removeUserInfoAnToken"
					link></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				// 作用是将vuex中的内容清空
				userinfo:["","","","","","",""]
			}
		},
		methods: {
			...mapMutations(['setUser']),
			// 注销登录
			removeUserInfoAnToken(){
				uni.showActionSheet({
					itemList: ['注销登录'],
					success: (res) =>{
						uni.showLoading({
							title:"注销中..."
						})
						// 移除本地缓存以及vuex中的数据
						uni.removeStorage({
							key: 'userinfo',
							success: (res) =>{
								uni.hideLoading()
								uni.removeStorage({
									key:"usertoken"
								})
								uni.switchTab({
									url:"../center"
								})
								// 这里存在一个this指向问题，回调函数success通过使用箭头函数解决
								this.setUser(this.userinfo)
							}
						})
					},
				});
			},
			// 返回上一层
			goBack(){
				uni.navigateBack({
					delta:1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			},
			updatePassWord(){
				uni.navigateTo({
					url:"updatepassword/updatepassword"
				})
			}
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
	.snv{
		width: 100%;
	}
	.sh{
		margin: auto auto;
		
	}
	.snicon{
		margin-top: 10px;
		float: left;
	}
	.sback{
		float: left;
		margin-top: 10px;
		line-height: 25px;
	}
</style>

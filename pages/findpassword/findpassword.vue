<template>
	<view>
		<!-- 导航 -->
		<view>
			<uni-nav-bar style="width: 100%;" fixed="true">
				<view style="margin: auto auto;font-weight: bold;">找回密码</view>
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
		<!-- 验证以及找回密码 -->
		<view class="main">
			<!-- 身份验证 -->
			<view v-if="active==1" style="width: 300px;height: 100px;margin:50% auto 0 auto;text-align: center;">
				<text style="font-weight: bold;margin-right: 10px;">身份证:</text>
				<uni-easyinput 
					v-model="idCard" 
					placeholder="请输入注册时的身份证"
					style="width: 200px;display: inline-block;"></uni-easyinput>
					<button type="primary" style="margin-top: 20px;width: 300px;" @click="findIdCard">下一步</button>
			</view>
			<view v-if="active==2" style="width: 300px;height: 100px;margin:50% auto 0 auto;text-align: center;">
				<text style="font-weight: bold;margin-right: 10px;">新密码:</text>
				<uni-easyinput 
					v-model="newPass" 
					placeholder="请输入新密码"
					style="width: 200px;display: inline-block;"
					type="password"></uni-easyinput>
					<button type="primary" style="margin-top: 20px;width: 300px;" @click="findpassword">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:1,
				idCard:"",
				newPass:""
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// 点击按钮验证身份证
			findIdCard(){
				uni.showLoading({
					title:"验证中..."
				})
				uni.request({
					url:"http://127.0.0.1:5000/findidcard",
					method:"POST",
					data:{"idcard":this.idCard},
					success: (res) => {
						uni.hideLoading()
						if(res.data=="ok")
						{
							this.active+=1
						}else if(res.data=="IdCard is no exist")
						{
							uni.showToast({
								title:"身份证错误或身份证未注册~",
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"系统出错~",
								icon:"none"
							})
						}
					},
					fail: (err) => {
						uni.hideLoading()
						console.log(err)
					}
				})
			},
			// 设置新密码
			findpassword(){
				uni.showLoading({
					title:"正在更改密码..."
				})
				uni.request({
					url:"http://127.0.0.1:5000/findpassword",
					method:"POST",
					data:{"idcard":this.idCard,"newpassword":this.newPass},
					success: (res) => {
						uni.hideLoading()
						if(res.data=="ok")
						{
							uni.showToast({
								title:"重新设置成功!",
								icon:"none"
							})
							setTimeout(()=>{
								uni.redirectTo({
									url:"../login/login"
								})
							},2000)
						}else if(res.data=="update failed")
						{
							uni.showToast({
								title:"重置密码失败!",
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"系统出现错误!",
								icon:"none"
							})
						}
					},
					fail: (err) => {
						uni.hideLoading()
						console.log(err)
					}
				})
			}
		},
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
	page{
		background-color: white;
	}
	.main{
		
	}
</style>

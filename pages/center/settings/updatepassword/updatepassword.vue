<template>
	<view>
		<view>
			<uni-nav-bar class="snv" fixed="true">
				<view class="sh">修改密码</view>
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
		<!-- 用户填写校验信息以及设置新密码 -->
		<view style="margin-top: 100px;text-align: center;width: 100%;">
			<!-- 校验信息 -->
			<view style="margin: 0 auto;">
				<view>
					<text style="font-weight:bold;">电话号码：</text>
					<uni-easyinput 
						style="width: 200px;display: inline-block;" 
						v-model="phone" 
						placeholder="请输入注册时的手机号"></uni-easyinput>
				</view>
				<!-- 旧密码 -->
				<view style="margin-top: 20px;margin-left: 15px;">
					<text style="font-weight: bold;">原密码:</text>
					<uni-easyinput 
						style="width: 200px;display: inline-block;margin-left: 10px;" 
						v-model="oldpass"
						type="password"
						placeholder="请输入原密码"></uni-easyinput>
				</view>
				<!-- 新密码 -->
				<view style="margin-top: 20px;margin-left: 15px;">
					<text style="font-weight: bold;">新密码:</text>
					<uni-easyinput 
						style="width: 200px;display: inline-block;margin-left: 10px;" 
						v-model="newpass"
						type="password"
						placeholder="请输入新密码"></uni-easyinput>
				</view>
				<!-- 提交按钮 -->
				<view>
					<button type="primary" style="width: 300rpx;margin-top: 30px;" @click="updatePassWord">确定修改</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				phone:"",
				oldpass:"",
				newpass:""
			}
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
			updatePassWord(){
				if(this.oldpass==""||this.phone==""||this.newpass=="")
				{
					uni.showToast({
						title:"请填写完整!",
						icon:"none"
					})
				}else{
					uni.showLoading({
						title:"修改中..."
					})
					// 验证手机和原密码对不对
					uni.request({
						url:"http://127.0.0.1:5000/verifypassword",
						method:"POST",
						data:{"userphone":this.phone,"password":this.oldpass},
						success: (res) => {
							// 如果对，则进行修改
							if(res.data=="ok")
							{
								uni.request({
									url:"http://127.0.0.1:5000/updatepassword",
									method:"POST",
									data:{"newpassword":this.newpass,"account":this.userInfo.account},
									// 若请求接口成功
									success: (res) => {
										uni.hideLoading()
										// 如果返回的结果为ok
										if(res.data=="ok")
										{
											uni.showToast({
												title:"修改成功!",
												icon:"none"
											})
											// 修改成功就移除本地信息缓存并重新登录
											// 移除userinfo
											uni.removeStorage({
												key:"userinfo",
												success: (res) => {
													console.log(res)
												},
												fail: (err) => {
													console.log(err)
												}
											})
											// 移除usertoken
											uni.removeStorage({
												key:"usertoken",
												success: (res) => {
													console.log(res)
												},
												fail: (err) => {
													console.log(err)
												}
											})
											setTimeout(()=>{
												uni.redirectTo({
													url:"../../../login/login"
												})
											},1000)
										}else if(res.data=="failed")
										{
											uni.showToast({
												title:"修改失败!",
												icon:"none"
											})
										}else{
											uni.showToast({
												title:"系统出错!",
												icon:"none"
											})
										}
									},
									// 若请求接口失败
									fail: (err) => {
										uni.hideLoading()
										uni.showToast({
											title:"后台请求失败!",
											icon:"none"
										})
									}
								})
								// 如果验证信息失败
							}else if(res.data=="no result")
							{
								uni.hideLoading()
								uni.showToast({
									title:"信息验证失败!",
									icon:"none"
								})
							}else{
								uni.hideLoading()
								uni.showToast({
									title:"后台错误!",
									icon:"none"
								})
							}
						},
						fail: (err) => {
							uni.hideLoading()
							uni.showToast({
								title:"验证请求失败!",
								icon:"none"
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
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

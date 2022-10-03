<template>
	<view class="container">
		<uni-nav-bar title="登录"></uni-nav-bar>
		<view style="margin-top: 25%;height: 500px;">
			<uni-card :is-shadow="true" style="height: 400px;" class="content">
				<view style="font-size: 18px;font-weight: bold;color: black;">欢迎登录</view>
				<view style="font-weight: bold;">账号:
					<uni-easyinput 
						v-model="loginForm.usernumber" 
						placeholder="请输入账号" 
						style="width: 250px;display: inline-block;margin-top: 20px;margin-left: 10rpx;"></uni-easyinput>
				</view>
				<view style="font-weight: bold;">密码:
					<uni-easyinput 
						v-model="loginForm.password" 
						placeholder="请输入密码" 
						type="password" 
						style="width: 250px;display: inline-block;margin-top: 20px;margin-left: 10rpx;"></uni-easyinput>
				</view>
				<view style="margin-top: 30px;color: #007AFF;">
					<!-- 注册 -->
					<view style="display: inline-block;" @click="gotoRegister">
						<text >账号注册 | </text>
					</view>
					<!-- 找回密码 -->
					<view style="display: inline-block;margin-left: 5px;" @click="findPassword">
						找回密码
					</view>
				</view>
				<!-- 登录按钮 -->
				<view style="margin-top: 10px;">
					<button type="primary" @click="login()" style="width: 300px;">登录</button>
				</view>
				<!-- 其他登录方式 -->
				<!-- <view style="margin-top: 100px;" @click="otherLogin">
					<text>其他方式>></text>
				</view> -->
			</uni-card>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				loginForm:{
					usernumber:'',
					password:'',
				},
				userInfo:[],
				usertoken:'',
			}
		},
		methods: {
			...mapMutations(['setuserInfo']),
			login(){
				if(this.loginForm.usernumber==='' || this.loginForm.password===''){
					 uni.showToast({
					 	title:"不能为空！",
						icon:"error"
					 })
				}else{
					uni.showLoading({
						title:"正在登录..."
					})
					// console.log(this.loginForm)
					// axios发送post请求
					uni.request({
						url:"http://127.0.0.1:5000/login",
						method:"POST",
						data:{'usernumber':this.loginForm.usernumber,"password":this.loginForm.password},
						success: (res) => {
							uni.hideLoading()
							if(res.data==="account faild"){
								uni.showToast({
									title:"账号不存在或者错误！",
									icon:"none"
								})
							}
							else if(res.data==="password faild")
							{
								uni.showToast({
									title:"密码错误！",
									icon:"none"
								})
							}else if(res.data==="Sorry，the database is wrong"){
								uni.showToast({
									title:"抱歉，系统出问题了~！",
									icon:"none"
								})
							}else{
								// 登录成功
								// console.log(res.data)
								if(res.data.isloginallowed=='否'||res.data.accstatus=="禁用")
								{
									uni.showToast({
										title:"账号已被封停，有问题请联系客服~",
										icon:"none"
									})
								}else{
									this.usertoken=res.data.token
									uni.setStorage({
										key: 'usertoken',
										data: this.usertoken,
										success: function () {
											console.log('success');
										}
									});
										this.userInfo=[
											res.data.account,
											res.data.accstatus,
											res.data.identity,
											res.data.nickname,
											res.data.regitime,
											res.data.userphone,
											res.data.isloginallowed
										]
										// 将信息存储在本地
										uni.setStorage({
											key:"userinfo",
											data:this.userInfo,
											success: (res) => {
												// 登录时调用vuex的方法
												this.setuserInfo()
												uni.showToast({
													title:"登录成功!",
													icon:"success"
												})
												
											}
										})
										
										// 三秒后跳转到首页
										uni.switchTab({
											url: '../index/index'
										})
								}
								
							}
						},
						fail: (err) => {
							uni.hideLoading()
							console.log(err)
						}
					})
				}
			},
			gotoRegister(){
				uni.navigateTo({
					url:"../register/register"
				})
			},
			findPassword(){
				uni.navigateTo({
					url:"../findpassword/findpassword"
				})
			},
		}
	}
</script>

<style>
	/* page设置背景颜色为全白 */
	page{
		background-color: white;
	}
	.content{
		text-align: center;
	}
</style>

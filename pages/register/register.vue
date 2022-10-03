<template>
	<view>
		<view>
			<uni-nav-bar style="width: 100%;" fixed="true">
				<view style="margin: auto auto;font-weight: bold;">账号注册</view>
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
		<!-- 注册信息 -->
		<view>
			<!-- <view class="top">
				<view class="inner" v-if="avatar == ''" @click="chooseAvatar">
					<image src="../../static/images/add.png"></image>
					<view>添加头像</view>
				</view>
				<image v-else class="inner" :src="avatar"></image>
			</view> -->
			<view style="text-align: center;">
				登录账号:
				<uni-easyinput
					v-model="userForm.account" 
					placeholder="请输入登录账号" 
					style="width: 250px;display: inline-block;margin-top: 20px;margin-left: 10rpx;"></uni-easyinput>
			</view>
			<view style="text-align: center;">
				设置密码:
				<uni-easyinput
					v-model="userForm.password" 
					placeholder="请设置登录密码" 
					type="password"
					style="width: 250px;display: inline-block;margin-top: 20px;margin-left: 10rpx;"></uni-easyinput>
			</view>
			<view style="text-align: center;">
				设置昵称:
				<uni-easyinput
					v-model="userForm.nickname" 
					placeholder="请设置账号昵称" 
					style="width: 250px;display: inline-block;margin-top: 20px;margin-left: 10rpx;"></uni-easyinput>
			</view>
			<view style="text-align: center;">
				用户电话:
				<uni-easyinput
					v-model="userForm.phone" 
					placeholder="请输入用户电话" 
					style="width: 250px;display: inline-block;margin-top: 20px;margin-left: 10rpx;"></uni-easyinput>
			</view>
			<view style="text-align: center;">
				用户身份证:
				<uni-easyinput
					v-model="userForm.IDCard" 
					placeholder="请输入用户身份证" 
					style="width: 250px;display: inline-block;margin-top: 20px;margin-left: 10rpx;"></uni-easyinput>
			</view>
			<view>
				<button type="primary" @click="submit" style="width: 230px;margin-top: 30px;">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userForm:{
					account:"",
					password:"",
					nickname:"",
					phone:"",
					IDCard:"",
					identity:"普通",
					accstatus:"正常",
					isloginallowed:"是"
				},
				avatar:""
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			
			// 数据校验
			checkUserForm() {
				if (this.userForm.account == '') {
					uni.showToast({
						title: '没有账号下次怎么登录呢',
						icon:"none"
					})
					return false
				}
				if (this.userForm.nickname == '') {
					uni.showToast({
						title: '一个好听的昵称更彰显你的个性',
						icon:"none"
					})
					return false
				}
				if (this.userForm.password == '') {
					uni.showToast({
						title: '加个密吧',
						icon:"none"
					})
					return false
				}
				if (this.userForm.phone === "" ) {
					uni.showToast({
						title: '留下一个电话，有空打给你',
						icon:"none"
					})
					console.log(1)
					return false;
				} 
				if (!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(this.userForm.phone)) {
					console.log(2)
					uni.showToast({
						title: '错误的电话号码',
						icon:"none"
					})
					return false
				}
				return true
			},
			submit(){
				if(this.checkUserForm()===false)
				{
					return
				}
				uni.showLoading({
					title:"注册中，请稍后..."
				})
				// this.uploadAvatar()
				let form=this.userForm
				uni.request({
					url:"http://127.0.0.1:5000/registration",
					method:"POST",
					data:{
						"account":form.account,
						"password":form.password,
						"nickname":form.nickname,
						"userphone":form.phone,
						"useridcard":form.IDCard,
						"identity":form.identity,
						"accstatus":form.accstatus,
						"isloginallowed":form.isloginallowed
					},
					success: (res) => {
						console.log(res.data)
						uni.hideLoading()
						if(res.data==="info has been registrated")
						{
							uni.showToast({
								title:"信息已被注册哦!请修改登录账号/昵称/电话/身份证号。",
								icon:"none"
							})
						}
						else if(res.data=="ok")
						{
							uni.showToast({
								title:"注册成功!",
								icon:"none"
							})
							setTimeout(()=>{
								uni.redirectTo({
									url:"../login/login"
								})
							})
						}else if(res.data=="Registration faild")
						{
							uni.showToast({
								title:"注册失败!",
								icon:"none"
							})
						}
						else{
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
	page{
		background-color: white;
	}
	.avator{
		width: 100px;
		height: 100px;
		border-radius: 10px;
		border: 1rpx solid #000;
	}
	.top {
		width: 100%;
		height: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
	}
	.inner view {
		font-size: 8px;
	}
	
	.top .inner {
		width: 80px;
		height: 80px;
		border-radius: 10px;
		border: 1px solid #007AFF;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
	}
	
	.top image {
		width: 36px;
		height: 36px;
	}
	
</style>

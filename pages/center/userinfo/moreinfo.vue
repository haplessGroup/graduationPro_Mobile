<template>
	<view>
		<!-- 导航 -->
		<view>
			<uni-nav-bar style="width: 100%;">
				<view style="margin: auto auto;font-weight: bold;">更多信息</view>
				<view slot="left" @click="goBack" >
					<view style="margin-top: 10px;float: left;">
						<uni-icons type="back" size="30"></uni-icons>
					</view>
					<view style="float: left;margin-top: 10px;line-height: 25px;">
						<text >返回</text>
					</view>
				</view>
				<view slot="right" >
					<button style="font-size: 10px;background-color: #09BB07;" type="primary" size="mini" @click="saveChange">保存</button>
				</view>
			</uni-nav-bar>
		</view>
		<!-- 详细信息 -->
		<view>
			<uni-list style="font-weight: bold;">
				<uni-list-item title="名字" :rightText="userinfo.nickname" clickable @click="change1()"></uni-list-item>
				<uni-list-item title="电话" :rightText="userinfo.userphone" clickable @click="change2()"></uni-list-item>
				<uni-list-item title="账号" :rightText="userInfo.account" clickable @click="showToast()"></uni-list-item>
				<uni-list-item title="账号状态" :rightText="userInfo.accstatus" clickable @click="showToast()"></uni-list-item>
				<uni-list-item title="用户身份" :rightText="userInfo.identity" clickable @click="showToast()"></uni-list-item>
				<uni-list-item title="注册时间" :rightText="userInfo.regitime" clickable @click="showToast()"></uni-list-item>
			</uni-list>
		</view>
		<view>
			<!-- 输入框示例 -->
			<!-- isMaskClick点击蒙版是否关闭弹窗 -->
			<uni-popup ref="inputDialog1" type="dialog" isMaskClick>
				<uni-popup-dialog 
					ref="inputClose"  
					mode="input" 
					title="修改名字"
					placeholder="请输入新名字" 
					@confirm="dialogInputConfirm1"
					:value="userInfo.nickname"></uni-popup-dialog>
			</uni-popup>
			<uni-popup ref="inputDialog2" type="dialog" isMaskClick>
				<uni-popup-dialog 
					ref="inputClose"  
					mode="input" 
					title="修改电话"
					placeholder="请输入新电话" 
					@confirm="dialogInputConfirm2"
					:value="userInfo.userphone"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				userinfo:{
					nickname:"",
					userphone:""
				},
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			this.setuserInfo()
			this.userinfo.nickname=this.userInfo.nickname
			this.userinfo.userphone=this.userInfo.userphone
		},
		methods: {
			...mapMutations(['setuserInfo']),
			goBack(){
				uni.navigateBack({
					delta:1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			},
			// 改变名字
			change1(){
				this.inputDialogToggle1()
			},
			// 改变电话
			change2(){
				this.inputDialogToggle2()
			},
			// 点击可显示弹出层
			inputDialogToggle1() {
				this.$refs.inputDialog1.open()
			},
			inputDialogToggle2() {

				this.$refs.inputDialog2.open()
			},
			// 点击弹出层确定按钮之后的操作,弹出层输入的值会直接传递给val参数
			dialogInputConfirm1(val) {
				this.userinfo.nickname=val
				console.log(val)
				// 关闭窗口
				this.$refs.inputDialog1.close()
			},
			dialogInputConfirm2(val) {
				this.userinfo.userphone=val
				console.log(val)
				// 关闭窗口
				this.$refs.inputDialog2.close()
			},
			// 用户其他信息不可修改，点击提示
			showToast(){
				uni.showToast({
					title:"该信息不可修改！",
					icon:"none"
				})
			},
			saveChange(){
				uni.showLoading({
					title:"保存中..."
				})
				uni.request({
					url:"http://127.0.0.1:5000/updateuserinfo",
					method:"POST",
					data:{
						"account":this.userInfo.account,
						"nickname":this.userinfo.nickname,
						"userphone":this.userinfo.userphone},
					success: (res) => {
						uni.hideLoading()
						if(res.data=='ok')
						{
							// 修改成功就隐藏loading框
							
							uni.showToast({
								title:"成功,请重新登陆!",
								icon:"none"
							})
							setTimeout(()=>{
								uni.removeStorage({
									key:"userinfo",
									success: (res) => {
										uni.redirectTo({
											url:"../../login/login"
										})
									}
								})
							},3000)
						}else if(res.data=="update failed")
						{
							uni.showToast({
								title:"修改失败!",
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"后台出错了哦~",
								icon:"none"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>

<template>
	<view>
		<view>
			<uni-nav-bar style="width: 100%;">
				<view style="margin: auto auto;font-weight: bold;">用户反馈</view>
				<view slot="left" @click="goBack" >
					<view style="margin-top: 10px;float: left;">
						<uni-icons type="back" size="30"></uni-icons>
					</view>
					<view style="float: left;margin-top: 10px;line-height: 25px;">
						<text >返回</text>
					</view>
				</view>
			</uni-nav-bar>
		</view>
		
		<!-- 用户填写提交反馈建议等 -->
		<view style="margin-top: 20px;text-align: center;">
			<!-- 选择类别 -->
			<view style="width: 280px;margin: 0 auto;" @click="showDrawer('showLeft')">
				<text style="font-weight: bold;margin-top: -20px;">选择类别:</text>
				<uni-easyinput 
					style="width: 200px;display: inline-block;margin-left: 10px;" 
					v-model="form.category" 
					focus 
					placeholder="请选择类别" 
					disabled>
				</uni-easyinput>
				<!-- 抽屉显示内容 -->
				<uni-drawer ref="showLeft" mode="left" :width="270" @change="change($event,'showLeft')">
					<view class="close" v-for="(item,index) in choice" :key="index">
						<view @click="choiceText(index)">{{item}}</view>
					</view>
				</uni-drawer>
			</view>
			<!-- 用户填写qq -->
			<view style="width: 280px;margin: 20px auto;">
				<text style="font-weight: bold;margin-left: 30px;">QQ:</text>
				<uni-easyinput 
					style="width: 200px;display: inline-block;margin-left: 10px;" 
					v-model="form.qnumber" 
					placeholder="请输入您的QQ号码">
				</uni-easyinput>
			</view>
			<!-- 用户填写email -->
			<view style="width: 280px;margin: 20px auto;">
				<text style="font-weight: bold;margin-left: 20px;">Email:</text>
				<uni-easyinput 
					style="width: 200px;display: inline-block;margin-left: 10px;" 
					v-model="form.email" 
					placeholder="请输入您的Email">
				</uni-easyinput>
			</view>
			<!-- 用户填写多行文本 -->
			<view style="width: 300px;margin: 20px auto;overflow: hidden;">
				<text style="font-weight: bold;margin-left: 28px;float: left;">你想说:</text>
				<uni-easyinput
					type="textarea"
					autoHeight
					maxlength="255"
					style="width: 200px;display: inline-block;margin-left: 10px;float: left;" 
					v-model="form.advice" 
					placeholder="请提交您的建议或者评价...(不超过255个字)">
					<!-- 因为设置了固定宽度，所以使用 -->
				</uni-easyinput>
			</view>
			<!-- 评分 -->
			<view style="width: 300px;margin: 20px auto;overflow: hidden;">
				<text style="font-weight: bold;margin-left: 25px;float: left;">请打分:</text>
				<uni-rate style="float: left;margin-left: 10px;" v-model="form.rate" @change="onChangeRate()" />
			</view>
			<!-- 提交按钮 -->
			<view style="margin-top: 100px;">
				<button type="primary" style="width: 200px;" @click="submitAdvice">确定提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				showLeft: false,
				choice:["提交Bug","用户体验","用户需求","用户建议","其他"],
				form:{
					category:'',
					qnumber:'',
					email:'',
					advice:'',
					rate:'',
				}
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
			showDrawer(e) {
				this.$refs[e].open()
			},
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			choiceText(e){
				// console.log(this.choice[e])
				this.form.category=this.choice[e]
				// 选择之后就关闭抽屉
				this.$refs["showLeft"].close()
			},
			onChangeRate() {
				console.log(this.form.rate);
			},
			submitAdvice(){
				var form=this.form
				if(form.value=="" || form.qnumber=="" || form.email=="" || form.textarea=="" || form.rate=="")
				{
					uni.showToast({
						title:"请填写完哦~",
						icon:"none"
					})
				}else{
					uni.showLoading({
						title:"提交中..."
					})
					uni.request({
						url:"http://127.0.0.1:5000/submitadvice",
						method:"POST",
						data:{
							"account":this.userInfo.account,
							"nickname":this.userInfo.nickname,
							"category":form.category,
							"qnumber":form.qnumber,
							"email":form.email,
							"advice":form.advice,
							"rate":form.rate,
							"status":"待处理"
						},
						success: (res) => {
							uni.hideLoading()
							if(res.data=="ok")
							{
								
								uni.showToast({
									title:"提交成功!",
									icon:"success"
								})
								// 提交成功则一秒后返回center页面
								setTimeout(()=>{
									uni.switchTab({
										url:"../center"
									})
								},1000)
							}else if(res.data=="failed")
							{
								uni.showToast({
									title:"提交失败!",
									icon:"error"
								})
							}else{
								uni.showToast({
									title:"系统出错了!",
									icon:"error"
								})
							}
						}
					})
				}
			}
			
		},
		
		
	}
</script>

<style>
	page{
		background-color: white;
	}
	.close {
		padding: 10px;
	}
</style>

<template>
	<view>
		<view>
			<uni-nav-bar style="width: 100%;" fixed="true">
				<view style="margin: auto auto;font-weight: bold;">开发语言使用情况</view>
				<view slot="left" @click="goBack">
					<view style="margin-top: 10px;float: left;">
						<uni-icons type="back" size="30"></uni-icons>
					</view>
					<view style="float: left;margin-top: 10px;line-height: 25px;">
						<text >返回</text>
					</view>
				</view>
				<!-- 刷新按钮 -->
				<view
					style="margin-right: 10px;"
					@click="refresh"
					slot="right">
					<image src="../../../static/images/refresh.png" style="width: 30px;height: 30px;"></image>
				</view>
			</uni-nav-bar>
		</view>
		<!-- 开发语言使用信息 -->
		<view class="tit">开发语言Top前20</view>
		<view class="mtable">
			<!-- 级联选择器 -->
			<uni-data-picker 
				placeholder="请选择年份" 
				popup-title="请选择月份" 
				:localdata="dataTree" 
				v-model="time"
				@change="afterSelectshowLanguage">
			</uni-data-picker>
			<uni-table 
				ref="table" 
				:loading="loading" 
				border 
				stripe 
				emptyText="暂无更多数据" 
				style="height: 500px;">
				<uni-tr>
					<uni-th width="150" align="center">ID</uni-th>
					<uni-th width="150" align="center">2022</uni-th>
					<uni-th width="150" align="center">2021</uni-th>
					<uni-th width="150" align="center">名称</uni-th>
					<uni-th width="150" align="center">使用率(%)</uni-th>
					<uni-th width="150" align="center">变化率(%)</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in languageList" :key="index">
					<uni-td align="center">{{item.id}}</uni-td>
					<uni-td align="center">{{item.sort}}</uni-td>
					<uni-td align="center">{{item.lastsort}}</uni-td>
					<uni-td align="center">{{item.prolanguage}}</uni-td>
					<uni-td align="center">{{item.rating}}</uni-td>
					<uni-td align="center">{{item.change}}</uni-td>
				</uni-tr>
			</uni-table>
			<view style="font-size: 13px;text-align: center;color: gray;margin-top: 10px;">(*注:数据来源--搜狐)</view>
		</view>
		<!-- 数据饼状图 -->
		<view>
			<view class="tit">语言使用情况Top10对比图</view>
			<view class="charts-box">
			  <qiun-data-charts
			    type="pie"
			    :chartData="chartData"
			    background="none"
			  />
			</view>
			<view style="font-size: 13px;text-align: center;color: gray;margin-top: 10px;">(*注:此图中的百分比是按照百人计算)</view>
		</view>
		<view>
			<uni-section title="数据专业分析" type="circle">
				<uni-collapse  accordion >
					<uni-collapse-item title="1、排名变化情况?">
						<view class="contents">
							<text class="text">
								1、前 20 比较惨的是 Go ，上个月刚从 13 名爬上 11 名，这个月又跌回去了;
								2、比较猛的是 Delphi/Object Pascal ，从上个月的 15 名冲上了 12 名；R 语言从上个月的 13 名冲上了 11 名;
								3、此外，Swift 的排名仍在往下掉，2 月从第 10 名掉到 12 名，这个月继续掉到了 14 名;
								4、MATLAB 从 14 → 15 ，下跌一名;
								5、Ruby、 VB 、 Objective-C、Perl 的排名都没变化;
							</text>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="2、Python为何能高居榜首?">
						<view class="contents">
							<text class="text">
								1、<strong>优点</strong>:
								(1)、语法简单;
								(2)、相对于其他语言来说易学;
								(3)、可移植性高;
								(4)、不用担心内部机制的运作;
								(5)、既支持面向过程的函数编程也支持面向对象的抽象编程;
								(6)、可扩展性和可嵌入性强;
								(7)、具有丰富的库;
								2、<strong>缺点</strong>:
								(1)、运行速度慢:运行速度慢是解释型语言的通病,Python 也不例外。
								(2)、代码加密困难:不像编译型语言的源代码会被编译成可执行程序，Python 是直接运行源代码，因此对源代码加密比较困难。
							</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</uni-section>
		</view>
		<view class="judge">
			<view class="textarea">
				<view class="minp">
					<uni-easyinput 
						placeholder="请发表您的评论...(不超过255个汉字)"
						maxlength="255" 
						type="textarea" 
						autoHeight 
						v-model="textvalue" 
						clearable
						@input="sumWords"
						></uni-easyinput>
				</view>
				<view class="mbut">
					<button type="primary" @click="sureToSend()">确认发表</button>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="mdiv">
				<view class="divider"></view>
			</view>
			<!-- 展示用户评论 -->
			<view class="content">
				<view style="text-align: center;" v-if="userMessage.length==0">
					暂无评论，快来抢占沙发啦~
				</view>
				<!-- 如果获取的评论不为空 -->
				<view v-if="userMessage.length!=0" style="width: 100%;">
					<view v-for="(item,index) in userMessage" :key="index" >
						<!-- 用户留言内容 -->
						<view class="usermessage">
							{{item.lacontent}}<span style="font-size: 15px;color: gray;">({{item.latime}})</span>
						</view>
						<!-- 用户信息 -->
						<view class="userinfo">
							<!-- 楼数 -->
							<span class="uspan">第{{index+1}}楼</span>
							<!-- 用户账号 -->
							<span class="uspan">{{item.laaccount}}</span>
							<!-- 用户昵称 -->
							<span class="uspan">{{item.lanickname}}</span>
							<!-- 删除操作 -->
							<span v-if="item.laaccount===userInfo.account">
								操作:<span 
										class="oper"
										@click="deleteMessage(item.id)">
										删除
									</span>
							</span>
						</view>
						<!-- 分割线 -->
						<view style="width: 100%;margin: 0 auto;">
							<view class="divider"></view>
						</view>
					</view>
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
				languageList:[],
				loading:false,
				// 饼状图数据
				chartData:{
				  "categories":[],
				   "series": [
				          {
				              "data": [
				                  {
				                    "name": "Python",
				                    "value": 14
				                  },
				                  {
				                    "name": "C",
				                    "value": 13
				                  },
				                  {
				                    "name": "java",
				                    "value": 11
				                  },
				                  {
				                    "name": "C++",
				                    "value": 9
				                  },
				                  {
				                    "name": "C#",
				                    "value": 6
				                  },
				                  {
				                    "name": "Visual Basic",
				                    "value": 6
				                  },
				                  {
				                    "name": "JavaScript",
				                    "value": 2
				                  },
				                  {
				                    "name": "PHP",
				                    "value": 2
				                  },
				                  {
				                    "name": "Assembly language",
				                    "value": 2
				                  },
				                  {
				                    "name": "SQL",
				                    "value": 2
				                  },
								  {
									  "name":"其他",
									  "value":33
								  }
								  
				              ]
				          }
				      ]
				},
				time: '1-1',
				dataTree: [{
					text: "2022年",
					value: "1-0",
					children: [{
						text: "3月",
						value: "1-1"
					},
					{
						text: "4月",
						value: "1-2"
					},
					{
						text: "5月",
						value: "1-3",
						disable: true
					}]
				}],
				windowWidth:0,
				textvalue:'',
				userMessage:[],
			}
		},
		updated() {
			if(this.time=='1-1'){
				return this.chartData.series[0].data=[
					{
						"name": "Python",
						"value": 14
					},
					{
						"name": "C",
						"value": 13
					},
					{
						"name": "java",
						"value": 11
					},
					{
						"name": "C++",
						"value": 9
					},
					{
						"name": "C#",
						"value": 6
					},
					{
						"name": "Visual Basic",
						"value": 6
					},
					{
						"name": "JavaScript",
						"value": 2
					},
					{
						"name": "PHP",
						"value": 2
					},
					{
						"name": "Assembly language",
						"value": 2
					},
					{
						"name": "SQL",
						"value": 2
					},
					{
						"name":"其他",
						"value":33
					}
				]
			}
			if(this.time=='1-2')
			{
				return this.chartData.series[0].data=[
					{
					  "name": "Python",
					  "value": 14
					},
					{
					  "name": "C",
					  "value": 13
					},
					{
					  "name": "Java",
					  "value": 11
					},
					{
					  "name": "C++",
					  "value": 8
					},
					{
					  "name": "C#",
					  "value": 7
					},
					{
					  "name": "Visual Basic",
					  "value": 5
					},
					{
					  "name": "JavaScript",
					  "value": 2
					},
					{
					  "name": "Assembly language",
					  "value": 2
					},
					{
					  "name": "SQL",
					  "value": 2
					},
					{
					  "name": "PHP",
					  "value": 2
					},
					{
						"name":"其他",
						"value":34
					}
				]
			}
		},
		onLoad() {
			this.showProLanguage()
			uni.getSystemInfo({
				success: (res) => {
					this.windowWidth=res.windowWidth
				}
			})
			this.showLanguageMessage()
		},
		computed:{
			...mapState(["userInfo"]),
			CharData(){
				console.log("asdasd")
				
			}
		},
		
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// 当用户输入的字数大于等于255时，提示不能再输入
			sumWords:function(){
				if(this.textvalue.length>=255)
				{
					uni.showToast({
						title:"您不能再输入啦~",
						icon:"none",
					})
				}
			},
			// 请求语言数据
			showProLanguage(){
				var path=''
				if(this.time=='1-1')
				{
					path="http://127.0.0.1:5000/showprolanguage"
				}else if(this.time=='1-2')
				{
					path="http://127.0.0.1:5000/showprolanguage4"
				}
				this.loading=true
				uni.request({
					url:path,
					method:"GET",
					success: (res) => {
						if(res.data=="failed")
						{
							this.loading=false
							uni.showToast({
								title:"数据请求失败~",
								icon:"none"
							})
						}else if(res.data=="ERROR")
						{
							this.loading=false
							uni.showToast({
								title:"后台出现错误~",
								icon:"none"
							})
						}else{
							this.loading=false
							this.languageList=res.data
						}
					}
				})
			},
			// 请求留言数据
			showLanguageMessage(){
				uni.request({
					url:'http://127.0.0.1:5000/getprolanguagemess',
					method:"GET",
					success: (res) => {
						// console.log(res.data)
						if(res.data=="no result")
						{
							console.log("暂无评论")
						}else if(res.data=="ERROR")
						{
							uni.showToast({
								title:"系统出错了",
								icon:"none"
							})
						}else{
							this.userMessage=res.data
							console.log(this.userMessage)
						}
					},
					fail: (err) => {
						uni.showToast({
							title:"数据请求失败。",
							icon:"error"
						})
					}
				})
			},
			deleteMessage(id){
				uni.showLoading({
					title:"删除中..."
				})
				const path="http://127.0.0.1:5000/languagemesstodel"
				uni.request({
					url:path,
					method:"POST",
					data:{"id":id,"account":this.userInfo.account},
					success:(res)=>{
						if(res.data=='ok')
						{
							uni.showToast({
								title: '恭喜！删除成功！',
								icon: 'none',
							})
							setTimeout(()=>{
								uni.redirectTo({
									url:"prolanguage"
								})
							},1000)
						}else if(res.data=='failed')
						{
							uni.showToast({
								title: '删除失败欸...',
								icon: 'none',
							})
						}else{
							uni.showToast({
								title: '后台出现错误了哦...',
								icon: 'none',
							})
						}
					}
				})
			},
			sureToSend(){
				const path="http://127.0.0.1:5000/languagemesstosend"
				var user=this.userInfo
				console.log(user.account)
				if(this.textvalue==="")
				{
					uni.showToast({
					    title: '多少写点东西。',
					    icon: 'error',
					})
				}else{
					uni.showLoading({
						title:"发表中..."
					})
					uni.request({
						url:path,
						method:"post",
						data:{
							"laaccount":user.account,
							"lanickname":user.nickname,
							"laidentity":user.identity,
							"lacontent":this.textvalue,
						},
						success:(res)=>{
							uni.hideLoading()
							if(res.data=="ok")
							{
								uni.showToast({
									title: '发表成功！',
									icon: 'none',
								})
								setTimeout(()=>{
									this.textvalue=""
									uni.redirectTo({
										url:"prolanguage"
									})
								},1000)
							}else if(res.data=="failed")
							{
								uni.showToast({
									title: '发表失败！',
									icon: 'none',
								})
							}else{
								uni.showToast({
									title: '后台出现错误了哦。',
									icon: 'none',
								})
							}
						},
						fail: (err) => {
							console.log(err)
						}
					})
				
				}
			},
			// 刷新按钮
			refresh(){
				uni.showLoading({
					title:"刷新中..."
				})
				setTimeout(()=>{
					uni.redirectTo({
						url:"prolanguage"
					})
					uni.hideLoading()
				},1000)
			},
			// 在选择时间之后
			afterSelectshowLanguage(){
				this.showProLanguage()
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
	.tit{
		font-weight: bold;
		font-size: 30rpx;
		text-align: center;
		margin-top: 30px;
	}
	.mtable{
		margin-top: 10px;
	}
	.charts-box{
	  width: 100%;
	  height:300px;
	}
	.judge{
		width: 100%;
		background-color: #DCDCDC;
		height: 500px;
		overflow: auto;
	}
	.content{
		padding: 10px;
		width: 80%;
		height: 30px;
		text-indent: 2em;
		margin: 0 auto;
		width: 80%;
	}
	.oper{
		font-size: 10px;
		cursor: pointer;
		color: #005CC5;
	}
	.mnv{
		font-weight: bold;
	}
	.mh{
		margin: 10px auto;
	}
	.mnicon{
		margin-top: 10px;
		float: left;
	}
	.mback{
		float: left;
		margin-top: 30rpx;
	}
	.mtable{
		margin-top: 10px;
		height: 500px;
		overflow-y: auto;
	}
	.minp{
		width: 100%;
		background-color: white;
		margin-top: 30px;
	}
	.mbut{
		width: 100px;
		margin-top: 10px;
		float: right;
	}
	.mdiv{
		width: 80%;
		margin: 0 auto;
	}
	.divider{
		border-top: 0.5px solid #000;
		margin-top: 10px;
		width: 100%;
	}
	.usermessage{
		font-size: 15px;
		font-weight: bold;
		font-family: "仿宋";
	}
	.userinfo{
		margin-top: 20px;
		font-size: 15px;
		display: flex;
		flex-direction: row;
	}
	.uspan{
		flex:1;
	}
	.textarea{
		width: 80%;
		margin: 0px auto;
		overflow: hidden; /*解决外边距塌陷*/
	}
	.contents {
		padding: 15px;
	}

	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}
</style>

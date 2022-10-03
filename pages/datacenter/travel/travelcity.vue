<template>
	<view class="container">
		<!-- 导肮 -->
		<view>
			<uni-nav-bar style="width: 100%;" fixed="true">
				<view style="margin: auto auto;font-weight: bold;">热门旅游城市推荐</view>
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
		<view class="tit">12个热门旅游城市推荐</view>
		<view style="margin-top: 10px;height: 500px;overflow-y: auto;">
			<uni-table 
				ref="table" 
				:loading="loading" 
				border 
				stripe 
				emptyText="暂无更多数据" 
				style="height: 500px;">
				<uni-tr>
					<uni-th width="150" align="center">ID</uni-th>
					<uni-th width="150" align="center">城市名</uni-th>
					<uni-th width="150" align="center">旅游热度</uni-th>
					<uni-th width="150" align="center">2021旅游产值总额</uni-th>
					<uni-th width="150" align="center">2021游客人数</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in cityData" :key="index">
					<uni-td align="center">{{item.id}}</uni-td>
					<uni-td align="center">{{item.cityname}}</uni-td>
					<uni-td align="center">{{item.popularityindex}}</uni-td>
					<uni-td align="center">{{item.tourmoney}}</uni-td>
					<uni-td align="center">{{item.tournumber}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<!-- 城市信息 -->
		<view>
			<view style="text-align: center;font-size: 14px;margin-top: 20px;font-weight: bold;">
				<text >四季旅游城市推荐</text>
			</view>
			
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType"
					:active-color="activeColor" @clickItem="onClickItem" />
			</view>
			<view class="content">
				<view v-if="current === 0">
					<text class="content-text">
						<uni-collapse  accordion>
							<uni-collapse-item title="扬州">
								<view class="content">
									<text class="text">
										“烟花三月下扬州”，李白的这句诗让无数人记住了扬州这个地方，也是春季最推荐观光的地方。三月的扬州，花红柳绿，春风送暖，景色秀丽，煞是好看，而春季来扬州，必游瘦西湖。
										瘦西湖可以说是扬州最著名的湖上园林了，自然景观旖旎多姿，尤其在春季，绽放出最美的姿态。绿柳成荫，再加上山茶、石榴、杜鹃、碧桃等花树相伴，每年吸引着各地游客来踏青赏花。
										而且，这里还是乾隆皇帝下江南时的必游之地以及千百年来无数文人墨客的流连之地，如今看到的大虹桥、钓鱼台、白塔、熙春台等建筑景观，都与乾隆皇帝有着不可分割的关系。景区内众多墨宝和故事，也非常值得品味。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="杭州">
								<view class="content">
									<text class="text">
										这座自古就被人称作“人间天堂”的杭城，山、泉、湖、桥、塔、寺样样俱全，风景中的色彩也随着时间逐渐多样化起来。而三月的杭州，春风恣意荡漾，桃花明艳，新柳如烟，处处呈现春意盎然的生机，春天是最佳游玩时间。
										说到杭州，或许大多数人都会想到西湖，它无疑是西湖美的代表，以其秀丽的湖光山色和众多的名胜古迹闻名中外，成为中国著名的旅游胜地。西湖的美在于晴天水潋滟，雨天山空蒙。
										无论雨雪晴阴，无论早霞晚辉，都能变幻成景；在春花，秋月，夏荷，冬雪中各具美态。而游览西湖，可步行，可骑行，可乘坐游船，无论哪一种方式，都能让你领略到西湖之美。若你什么都不想做，也可以寻找一个安静的角落，静静地发呆，也是非常享受的。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="丽江">
								<view class="content">
									<text class="text">
										丽江位于云南省西北部， 历史悠久，以其独特的人文景观和自然风光，成为我国知名的旅游城市。神秘的“东方女儿国”泸沽湖，安静闲适的束河古镇，巍峨雄伟的玉龙雪山，山清水秀的拉市海和波澜壮阔的虎跳峡都是丽江非常知名的景点。
										而且因为丽江独特的地理和气候环境，形成了温暖宜人的气候，一年四季都非常适合游玩，但以3、4月份最美，此时的丽江古城和玉龙雪山光芒四射，散发出最美的一面。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="三亚">
								<view class="content">
									<text class="text">
										三亚，是中国最南部的热带滨海旅游城市，我国著名的海滨城市，得天独厚的气候形成了最美的海岛风光和最佳的空气质量，从而有了“东方夏威夷”的美誉。而水清沙白的海滩，枝繁叶茂的雨林及物美价廉的海鲜是三亚的招牌。
									</text>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</text>
				</view>
				<view v-if="current === 1">
					<text class="content-text">
						<uni-collapse  accordion>
							<uni-collapse-item title="哈尔滨">
								<view class="content">
									<text class="text">
										哈尔滨是首先要推荐的城市，因为这里也是被很多人所忽略的避暑胜地。以哈尔滨为首的黑龙江绝对是国内最佳的避暑胜地，这里夏天环境优雅，温度也不算太高，交通各方面也比较方便。自从去年去了一次哈尔滨，我就对这里的夏天产生了很大的改观。当然，如果你觉得哈尔滨还不够凉爽，可以继续向北走，那么一定会有个让你觉得十分凉爽的城市。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="贵阳">
								<view class="content">
									<text class="text">
										贵阳虽然秋冬天常年见不到太阳，但是绝对是个十分适合避暑的城市。这里夏天的平均气温在20多度，环境比较原生态，各方面环境也还不错，对部分人来说除了食物太辣受不了，其他都是十分理想的度假胜地。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="六盘水">
								<view class="content">
									<text class="text">
										六盘水也是个十分适合避暑的地方，这里被誉为中国唯一的“凉都”，从这个称号就可以看出来六盘水绝对是个最适合避暑的地方。这里的平均气温20多度，环境优美，适合游玩的地方也特别多。不仅有草原，度假村，还有各种有意思的游玩项目。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="承德">
								<view class="content">
									<text class="text">
										 承德也是个宝藏旅行地，可能很多人听到承德的第一印象就是承德避暑山庄，作为清朝皇帝的避暑胜地，可见承德的凉爽之处。当然，承德除了避暑山庄，还有很多值得玩的地方，当然，如果你想在承德找个不吹空调都容易感冒的地方，非木兰围场那一带莫属了。
									</text>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</text>
				</view>
				<view v-if="current === 2">
					<text class="content-text">
						<uni-collapse  accordion>
							<uni-collapse-item title="北京">
								<view class="content">
									<text class="text">
										北京实际上是一座一年四季都可以去旅游的城市，但是为什么推荐秋天呢？首先，秋天的北京，气候凉爽，不必担心会像夏日那样让人热喘不上气。同时，北京的秋季非常美，尤其是香山的红叶，鼎鼎大名，如果有兴趣的，可以去看看。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="西安">
								<view class="content">
									<text class="text">
										和北京很相似，西安的景点基本上也是以古建筑居多，但是秋天的西安，绝对是其他季节无法比拟的，实在太美。西安的秋天，层林尽染，丹桂飘香，金黄的银杏树下，这座千年古城重新焕发出生机与活力，让人不得不爱。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="敦煌">
								<view class="content">
									<text class="text">
										推荐甘肃敦煌的理由只有一个：景美人少。敦煌是河西走廊十分重要的一座城市，因为大名鼎鼎的莫高窟而享誉世界，这里除了世界闻名的莫高窟，还有月牙泉鸣沙山，千佛洞、玉门关、阳关、雅丹魔鬼城等等。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="杭州">
								<view class="content">
									<text class="text">
										 说起杭州，很多人的脑海中不禁会想起成片的荷花开满西湖的美景，殊不知，秋天的杭州同样值得游览。进入秋季，杭州也开始凉快了下来，城市不仅充满了湿润，更是有满城的桂花香，而这个时节，也正是品尝杭州桂花糕的最好季节。
										 西湖依旧是杭州最好的景区，秋天的西湖，没有了夏天的那份躁动，让人能感到一种心旷神怡，乘舟于西湖之上，欣赏落日余晖，不得不说，连人的心都会多一份宁静。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="大理">
								<view class="content">
									<text class="text">
										 大理的风景，在秋季显得格外迷人，尤其是夏末秋初的时候，色彩十分鲜明。大理的风景以面朝洱海，背靠苍山是一种什么样的感受呢？除了苍山洱海，大理还有很多古镇和古城，不仅特色鲜明，而且较为小众，保持着较好的原貌，非常值得去打卡。
									</text>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</text>
				</view>
				<view v-if="current === 3">
					<text class="content-text">
						<uni-collapse  accordion>
							<uni-collapse-item title="哈尔滨">
								<view class="content">
									<text class="text">
										冬季旅行首选哈尔滨，哈尔滨的冬季是一个浪漫的童话城市，有着梦幻的索菲亚大教堂，漫天的雪花飘落，映衬着街角的霓虹灯，堪比浪漫偶像剧场景。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="昆明">
								<view class="content">
									<text class="text">
										昆明一年四季都是四季如春，即使到了冬季，昆明也同样吸引着无数游客前来参观，成群结队的红嘴鸥来昆明过冬，已成为一道亮丽的风景线。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="西双版纳">
								<view class="content">
									<text class="text">
										西双版纳自然资源丰富，热带雨林自然景观令人十分赞叹，全年平均气温在22度左右，冬季去，景区门票淡季价格更便宜，在这里还可以感受西双版纳少数民族的特色风情和历史文化习俗，推荐大家一定要去傣族园和西双版纳热带雨林动物园。
									</text>
								</view>
							</uni-collapse-item>
							<uni-collapse-item title="杭州">
								<view class="content">
									<text class="text">
										 俗话说得好“上有天堂，下有苏杭”，提起杭州，首先想到杭州西湖，大部分游客喜欢春夏秋季游玩西湖，但是你见过冬季的西湖吗？下了雪的西湖，宛如披上了一层白色的外衣，十分的灵动；
									</text>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</text>
				</view>
			</view>
		</view>
		<view>
			<uni-section title="数据专业分析" type="circle">
				<uni-collapse  accordion >
					<uni-collapse-item title="1、旅游行业目前的前景如何?">
						<view class="contents">
							<text class="text">
								1、<strong>发展历程</strong>:纵观中国旅游业的发展历程,自1978年以来,国家开始重视并大力发展旅游业。随着社会经济发展、人民生活水平提高及消费观念升级,旅游门槛开始下移,由官方接待逐步向普通大众开放,旅游越来越成为居民日常生活的组成部分,出境旅游、入境旅游、国内旅游逐渐成为旅游业的三大发展形式;
								<br>2、<strong>中国旅游行业发展现状</strong>:2012至2019年国内旅游人次稳步增长,2020年受到新冠肺炎疫情限制,旅游总人次下降至28.79亿人次,同比减少52.1%，2021年回升至32.46亿人次,同比增长12.8%,用户出游意愿正在逐步恢复。2021年国内旅游总人次为32.46亿,其中城镇居民23.42亿人次,同比增长13.4%;农村居民9.04亿人次,同比增长11.1%;
								<br>3、<strong>旅游行业总收入</strong>:据文旅部数据,2021年国内旅游收入(旅游总消费)约为2.92万亿元,较2020年增加0.69万亿元,同比增长31%,恢复到2019年的51%;
								<br>4、<strong>发展前景</strong>:2021年旅游行业经历了“中高后低”的复苏受阻之路,国内散发疫情不断扰动行业的复苏进程,防疫管控力度从此前的渐进放松趋势转为敏捷收紧态势,相信随着各项防疫措施手段的有效实施,旅游行业终将迈入更高水平的新常态,复苏之路虽然曲折但依然持续,国内部分具备扩张成长潜力、经营管理能力较强、资源禀赋较为优质的景区龙头和旅游出行产业链资源强、用户粘性高的OTA龙头依然有望迎来景气拐点,成为后疫情时代在出行和服务业板块复苏的生力军;
							</text>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="2、目前哪些地方更受游客欢迎?">
						<view class="contents">
							<text class="text">
								就上表的数据来看,目前重庆等地是比较受游客喜欢的旅游景点。但由于受到目前席卷国内外的疫情的影响,数据也是在不断的发生变化,对于目前而言,上海疫情严重,严重影响了游客去上海游玩的兴趣,
								所以这个问题目前没有准确的答案。
							</text>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="3、如何避免“照片与实物”严重不符的现象发生?">
						<view class="contents">
							<text class="text">
								1、<strong>询问当地人</strong>:如果你想知道那些网红景点是不是真的和照片上一摸一样时,个人认为最好的办法就是找个当地人问问。当然,你有去过的朋友或者亲戚在附近的话,那就非常的lucky了;
								2、<strong>网络查找</strong>:大概意思就是从你看到这个景点信息的来源之处或者其他平台(例如:某音、某红书等等)找到相关景点的信息,翻看下方去过游客的评论,这样你就大概知道网红景点是不是真的存在啦~;
								(如果有不恰当的地方请原谅。如有更好的办法,请提交给后台人员嗷~)
							</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</uni-section>
		</view>
		<!-- 用户评论 -->
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
			<view class="tcontent">
				<view style="text-align: center;" v-if="userMessage.length==0">
					暂无评论，快来抢占沙发啦~
				</view>
				<!-- 如果获取的评论不为空 -->
				<view v-if="userMessage.length!=0" style="width: 100%;">
					<view v-for="(item,index) in userMessage" :key="index" >
						<!-- 用户留言内容 -->
						<view class="usermessage">
							{{item.dbcontent}}<span style="font-size: 15px;color: gray;">({{item.dbtime}})</span>
						</view>
						<!-- 用户信息 -->
						<view class="userinfo">
							<!-- 楼数 -->
							<span class="uspan">第{{index+1}}楼</span>
							<!-- 用户账号 -->
							<span class="uspan">{{item.account}}</span>
							<!-- 用户昵称 -->
							<span class="uspan">{{item.nickname}}</span>
							<!-- 删除操作 -->
							<span v-if="item.account===userInfo.account">
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
	import {mapState,mapActions} from 'vuex'
	export default {
		data() {
			return {
				cityData:[],
				loading:false,
				textvalue:'',
				userMessage:[],
				isLocalRefresh:true,
				windowWidth:0,
				items: ['春', '夏', '秋','东'],
				activeColor: '#007aff',
				styleType: 'button',
				current: 0,
			}
		},
		onLoad(){
			this.showTravelCity()
			this.showHotTravelcityMess()
			// 获取屏幕信息
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.windowWidth)
					this.windowWidth=res.windowWidth
				}
			})
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			goBack:function(){
				uni.navigateBack({
					delta:1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			},
			showTravelCity:function(){
				this.loading=true
				uni.request({
					url:'http://127.0.0.1:5000/travelcity',
					method:"GET",
					success:(res)=>{
						// console.log(res.data)
						this.loading=false
						this.cityData=res.data
					}
				})
			},
			sumWords:function(){
				if(this.textvalue.length>=255)
				{
					uni.showToast({
						title:"您不能再输入啦~",
						icon:"error",
					})
				}
			},
			// 请求用户评论
			showHotTravelcityMess:function(){
				uni.request({
					url:'http://127.0.0.1:5000/hottravelcitymess',
					method:"GET",
					success: (res) => {
						console.log(res.data)
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
				const path="http://127.0.0.1:5000/delethottravelcitymess"
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
									url:"dbmovie"
								})
							},1000)
						}else if(res.data=='failed')
						{
							uni.showToast({
								title: '删除失败欸...',
								icon: 'error',
							})
						}else{
							uni.showToast({
								title: '后台出现错误了哦...',
								icon: 'error',
							})
						}
					}
				})
			},
			// 发表用户评论
			sureToSend(){
				const path="http://127.0.0.1:5000/travelmessosend"
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
							"travelaccount":user.account,
							"travelnickname":user.nickname,
							"travelidentity":user.identity,
							"travelcontent":this.textvalue,
						},
						success:(res)=>{
							let that=this
							uni.hideLoading()
							if(res.data=="ok")
							{
								uni.showToast({
									title: '发表成功！',
									icon: 'success',
								})
								setTimeout(()=>{
									this.textvalue=""
									// 强制刷新当前页
									uni.redirectTo({
										url:"travelcity"
									})
								},1000)
							}else if(res.data=="failed")
							{
								uni.showToast({
									title: '发表失败！',
									icon: 'error',
								})
							}else{
								uni.showToast({
									title: '后台出现错误了哦。',
									icon: 'error',
								})
							}
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
						url:"travelcity"
					})
					uni.hideLoading()
				},1000)
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
	.container{
		background-color: white;
		
	}
	.tit{
		font-weight: bold;
		font-size: 30rpx;
		text-align: center;
		margin-top: 30px;
	}
	.content {
		padding: 15px;
	}
	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}
	.judge{
		width: 100%;
		background-color: #DCDCDC;
		height: 500px;
		overflow: auto;
	}
	.textarea{
		width: 80%;
		margin: 0px auto;
		overflow: hidden; /*解决外边距塌陷*/
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
	.tcontent{
		padding: 10px;
		width: 80%;
		height: 30px;
		text-indent: 2em;
		margin: 0 auto;
		width: 80%;
	}
	.usermessage{
		font-size: 15px;
		font-weight: bold;
		font-family: "仿宋";
	}
	.userinfo{
		margin-top: 20px;
		font-size: 10px;
		display: flex;
		flex-direction: row;
	}
	.uspan{
		flex:1;
	}
	.oper{
		font-size: 10px;
		cursor: pointer;
		color: #005CC5;
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

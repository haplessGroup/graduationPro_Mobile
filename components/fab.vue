<template>
	<view>
		<!-- 悬浮功能按钮 -->
		<uni-fab 
			ref="fab" 
			:pattern="pattern" 
			:content="content" 
			horizontal="right" 
			vertical="bottom"
			direction="vertical" 
			@trigger="trigger" />
	</view>
</template>

<script>
	export default {
		name:"fab",
		data() {
			return {
				// 可选配置样式
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				content: [
					{
						iconPath: '../../static/fabimages/phone.png',
						// selectedIconPath: '../../static/fabimages/phoneselected.png',
						text: '客服电话',
						active: false
					}
				]
			};
		},
		methods:{
			trigger(e){
				console.log(e)
				this.content[e.index].active = !e.item.active
				if(e.item.text==="客服电话")
				{
					uni.makePhoneCall({
						phoneNumber:"17723068254"
					})
				}
				console.log(e.item.text)
				this.content[e.index].active = false
			}
		}
	}
</script>

<style>

</style>

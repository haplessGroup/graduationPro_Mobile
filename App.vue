<script>
	export default {
		onLoad() {
			uni.connectSocket({
			  url: 'wss://127.0.0.1:5000',
			  success(data){
				  console.log(data)
			  }
			});
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}
</style>

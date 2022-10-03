import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

// 公共状态
const store=new Vuex.Store({
	state(){
		return{
			userInfo:{
				account:'',
				accstatus:'',
				identity:'',
				nickname:'未登录',
				regitime:'',
				userphone:'',
				isloginallowed:''
			}
		}
	},
	// mutations中不支持异步（例如axios）
	mutations:{
		// 登陆时调用
		setuserInfo(state){
			// console.log(userinfo+"aaaaaa")
			uni.getStorage({
				key:"userinfo",
				success:function(res){
					state.userInfo.account=res.data[0]
					state.userInfo.accstatus=res.data[1]
					state.userInfo.identity=res.data[2]
					state.userInfo.nickname=res.data[3]
					state.userInfo.regitime=res.data[4]
					state.userInfo.userphone=res.data[5]
					state.userInfo.isloginallowed=res.data[6]
				},
			})
			console.log(state.userInfo)
		},
		setUser(state,userinfo){
			console.log(userinfo)
			state.userInfo.account=userinfo[0]
			state.userInfo.accstatus=userinfo[1]
			state.userInfo.identity=userinfo[2]
			state.userInfo.nickname=userinfo[3]
			state.userInfo.regitime=userinfo[4]
			state.userInfo.userphone=userinfo[5]
			state.userInfo.isloginallowed=userinfo[6]
		},
	},
})
export default store
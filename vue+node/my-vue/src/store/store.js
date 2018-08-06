import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
		userInfo:{},
		blogArr:[]
	},
	getters:{
		getUserInfo:(state)=>{
			return state.userInfo
		}
	},
	mutations:{
		saveUserInfo:(state,user)=>{
			state.userInfo = user
		},
		saveBlogs:(state,blogs)=>{
			state.blogArr = blogs
		},
		sameTime:(state,blogs)=>{
			state.blogArr = blogs
		},
		removeBlog:(state,title)=>{
			state.blogArr.forEach(function(item,index) {
				if(item.title === title){
					state.blogArr.splice(index,1)
				}
			});
		}
	},
	actions:{
		setUser({commit},user){
			commit("saveUserInfo",user)
		},
		blogList({commit},blogs){
			commit("saveBlogs",blogs)
		}
	}
})
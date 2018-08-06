import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import News from './views/News'
import Login from './views/Login'
import Register from './views/Register'
import Write from './views/Write'
import PersonInfo from './views/PersonInfo'
import UserSet from './views/UserSet'


Vue.use(VueRouter)

export default new VueRouter({
	mode:'history',
	linkActiveClass:'active',
	routes:[
		{
			name:'homeLink',
			path:'/',
			component:Home,
		},
		{
			name:'newsLink',
			path:'/news',
			component:News
		},
		{
			name:'loginLink',
			path:'/login',
			component:Login
		},
		{
			name:'regLink',
			path:'/register',
			component:Register
		},
		{
			name:'writeLink',
			path:'/write',
			component:Write
		},
		{
			name:'personLink',
			path:'/personInfo',
			component:PersonInfo
		},
		{
			name:'usersetLink',
			path:'/userset',
			component:UserSet
		}
	]
})


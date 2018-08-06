<template>
	<div class="set text-center">
		<div class="col-md-4 offset-4 alert alert-warning alert-dismissible fade show" role="alert" v-show="isShow">
			<strong>提示：删除成功！</strong>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			    <span aria-hidden="true">&times;</span>
			</button>
		</div>
		<table class="table table-hover col-md-8 offset-2">
	    <thead>
	    <tr>
	      <th scope="col">#</th>
	      <th scope="col">标题</th>
	      <th scope="col">时间</th>
	      <th scope="col">处理</th>
	    </tr>
	    </thead>
	    <tbody>
	    <tr v-for="(blog,index) in blogs" :key="index">
	      <th>{{ index+1 }}</th>
	      <td>{{ blog.title }}</td>
	      <td>{{ blog.blogDate | changeDate }}</td>
	      <td>
	      	<button type="type" class="btn btn-outline-info">修改</button>
	      	<button type="type" class="btn btn-outline-danger" @click="delBlog(blog.title)">删除</button>
	      </td>
	    </tr>
	    </tbody>
	</table>
	</div>
</template>
<script>
import moment from 'moment'
	export default{
		data(){
			return {
				blogs:[],
				isShow:false
			}
		},
		filters:{
			changeDate(value){
		      return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
		    }
		},
		methods:{
			getBlogs(){
				this.$axios.get('/users/personInfo',{
					params:{
						email:this.$store.state.userInfo.email
					}
				}).then(res=>{
					this.blogs = res.data.result.blogList
					//数据同步
	      			this.$store.commit("sameTime",this.blogs)
				})
			},
			delBlog(param){
				this.$axios.post('/users/delete',{
						email:this.$store.state.userInfo.email,
						title:param
				}).then(res=>{
					this.isShow = true
					this.$store.commit('removeBlog',param)
				})
			}
		},
		mounted(){
			this.getBlogs()
		}
	};
</script>

<style scoped>
	
</style>
<template>
	<div class="info">
		<div class="media text-center">
		 	<div class="media-body">
		 		<img class="rounded-circle" :src="'/static/'+user.avatar" width="100" height="100"> 
		    	<h5 class="mt-0">{{ user.email }} 的个人信息</h5>
		     </div>
		</div>
		<form class="row"  v-show="isShow">
		 	<div class="col-md-6 offset-3">
		 	<div class="form-group">
			    <label for="exampleFormControlInput1">邮箱地址:</label>
			    <input type="email" class="form-control" id="exampleFormControlInput1" :value="user.email" disabled>
			</div>
			<div class="form-group">
			    <label for="exampleFormControlInput1">昵称:</label>
			    <input type="email" class="form-control" id="exampleFormControlInput1"  :value="user.nickname" disabled>
			</div>
			<div class="form-group">
			    <label for="exampleFormControlInput1">密码:</label>
			    <input type="text" class="form-control" id="exampleFormControlInput1" :value="user.password" disabled>
			</div>
			 	<div class="form-check form-check-inline">
				  	<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="0" disabled v-model="sex">
				  	<label class="form-check-label" for="inlineRadio1">男</label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" disabled v-model="sex">
				<label class="form-check-label" for="inlineRadio2">女</label>
			</div>
			<div class="form-group">
			    <label for="exampleFormControlTextarea1">个人简介:</label>
			    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :value="user.bio" disabled></textarea>
		    </div>
				<p class="text-muted">账号创建于:{{ user.created_time | formatDate}}
				<button type="type" class="btn btn-outline-info btn-sm float-right" @click.prevent="updateInfo()" v-show="isShow">修改</button>
				</p>
			</div>
		</form>	
		<form class="row"  v-show="!isShow">
		 	<div class="col-md-6 offset-3">
		 	<div class="form-group">
			    <label for="exampleFormControlInput1">邮箱地址:</label>
			    <input type="email" class="form-control" id="exampleFormControlInput1"  v-model="newUser.email" disabled>
			</div>
			<div class="form-group">
			    <label for="exampleFormControlInput1">昵称:</label>
			    <input type="email" class="form-control" id="exampleFormControlInput1"  v-model="newUser.nickname">
			</div>
			<div class="form-group">
			    <label for="exampleFormControlInput1">密码:</label>
			    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="newUser.password">
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="0"  v-model="newUser.gender">
				  <label class="form-check-label" for="inlineRadio1">男</label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1"  v-model="newUser.gender">
				  <label class="form-check-label" for="inlineRadio2">女</label>
			</div>
			<div class="form-group">
			    <label for="exampleFormControlTextarea1">个人简介:</label>
			    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="newUser.bio"></textarea>
			  </div>
				<p class="text-muted">信息修改于:{{ user.last_modfied_time | formatDate}}
					<button v-show="!isShow" type="type" class="btn btn-outline-success btn-sm float-right" @click.prevent="confirmInfo()">提交</button>
					<button v-show="!isShow" type="type" class="btn btn-outline-secondary btn-sm float-right" @click.prevent="goBack()">返回</button>
				</p>
			</div>
		</form>	
	</div>
</template>
<script>
	export default{
		data(){
			return {
				user:{},
				sex:0,
				isShow:true,
				newUser:{
					email:'',
					nickname:'',
					gender:0,
					password:'',
					bio:''
				}
			}
		},
		methods:{
			infos(){
				this.$axios.get('/users/personInfo',{
					params:this.$store.state.userInfo
				}).then(res=>{
					this.user = res.data.result
					this.newUser.email = this.user.email
					this.sex = this.user.gender
				})
			},
			goBack(){
				this.isShow = true
			},
			updateInfo(){
				this.isShow = false
			},
			confirmInfo(){
				this.$axios.post('/users/personInfo',this.newUser).then(res=>{
					this.$router.push({name:'homeLink'})
				})
			}
		},
		mounted(){
			this.infos()
		}
	};
</script>
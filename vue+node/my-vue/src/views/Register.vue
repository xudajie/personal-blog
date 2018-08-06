<template>
	<div class="text-center">
    <form class="form-signin" id="form-reg">
        <h1 class="h3 mb-3 font-weight-normal">用户注册</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" class="form-control" placeholder="Email address" required autofocus v-model="email">
        <label for="inputPassword" class="sr-only">Nickname </label>
        <input type="text"  class="form-control" placeholder="Nickname" required
        v-model="nickname">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" class="form-control" placeholder="Password" required v-model="password">
        <button class="btn btn-lg btn-success btn-block" type="submit" @click.prevent="getReg">注册</button>
        <p class="float-left mt-3">已有账户？<router-link  class="text-danger float-right" :to="{name:'loginLink'}" title="">点击登录</router-link ></p>
    </form>
</div>
</template>

<script>

export default {
  name: 'Register',
  data () {
    return {
     	email:'',
     	password:'',
     	nickname:''
    }
  },
  methods:{
  	getReg(){
  	let user = {
  		email:this.email,
  		password:this.password,
  		nickname:this.nickname,
  	}
  	this.$axios.post('/users/register',user).then((response)=>{
  			this.$router.push({name:'loginLink'})
  		})
    }
  }
};
</script>

<style scoped>
#form-reg{
	width: 300px;	
	height: 200px;
	margin: 0 auto;
}
</style>

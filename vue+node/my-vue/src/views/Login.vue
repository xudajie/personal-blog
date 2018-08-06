<template>
	<div class="text-center">
    <form class="form-signin" id="login">
        <h1 class="h3 mb-3 font-weight-normal">用户登录</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" name="email" class="form-control" placeholder="Email address" required autofocus v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" name="password" class="form-control" placeholder="Password" required v-model="password">
        <button class="btn btn-lg btn-success btn-block" type="submit" @click.prevent="getLog">登录</button>
        <p class="float-left mt-3">没有账户？<router-link class="text-danger float-right" :to="{name:'regLink'}" title="">点击创建</router-link ></p>
    </form>
    
</div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
     	email:'',
     	password:''
    }
  },
  //组建内守卫，只要点击退出跳转到login页面，让当前用户清空
  beforeRouteEnter(to,from,next){
    next(vm=>vm.$store.dispatch("setUser",{}))
  },
  methods:{
    getLog(){
      let user = {
        email:this.email,
        password:this.password
      }
      this.$axios.post('/users/login',user).then(res=>{
        this.$router.push({name:'homeLink'})
        //将用户登录信息保存到state里
        return this.$store.dispatch("setUser",res.data.result)
      })
    }
  }
};
</script>

<style scoped>
#login{
	width: 300px;	
	height: 200px;
	margin: 0 auto;
}
</style>

<template>
 <div class="container-fluid">
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 class="my-0 mr-md-auto font-weight-normal">Blogs System</h5>
            <nav class="my-2 my-md-0 mr-md-3 ">
                <router-link class="p-2 text-dark" :to="{name:'homeLink'}">首页</router-link>
               <a href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ getInfo.email }}
                </a>
                <div class="dropdown-menu mt-3" aria-labelledby="navbarDropdownMenuLink">
                    <router-link class="dropdown-item" :to="{name:'personLink'}">个人主页</router-link>
                     <router-link class="dropdown-item" :to="{name:'writeLink'}">发布内容</router-link>
                    <router-link class="dropdown-item" :to="{name:'usersetLink'}">内容处理</router-link>
                    <router-link class="dropdown-item" :to="{name:'loginLink'}">登出</router-link>
                </div>
                <span v-show="getInfo.status !== 0">
                    <router-link class="btn btn-outline-primary mx-2" :to="{name:'loginLink'}">登录</router-link>
                    <router-link class="btn btn-outline-primary" :to="{name:'regLink'}">注册</router-link>
                </span>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {

    }
  },
  computed:{
    getInfo(){
        return this.$store.getters.getUserInfo
    }
  }
};
</script>

<style scoped>

</style>

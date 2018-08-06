<template>
		<div class="row">
		  <div class="media col-md-8 offset-2" v-for="(blog,index) in blogs" :key="index">
        <div class="media-body mx-3">
          <router-link :to="{name:'newsLink',query:{title:blog.title}}">
            <h5 class="pb-4 tcl">{{ blog.title }}</h5>
          </router-link>
          <p class="text-muted">{{ blog.content |splitContent }}</p>
        <div class="media">
          <span class="text-primary">发布人：{{ blog.author }}</span><br>
          <span class="text-muted mx-5 px-5">时间:{{ blog.blogDate | changeDate }}</span>
          <small class="badge badge-danger mr-1" v-for="(check,index) in blog.checkboxes">{{ check }}</small>
        </div>
         <hr>
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'All',
  data () {
    return {
      blogs:[]
    }
  },
  methods:{
    getBlogs(){
      this.$axios.get('/users/blogs').then(res=>{
        res.data.result.forEach(item=>{
          item.forEach((e)=>{
            this.blogs.push(e)
          })
        })
        return this.$store.dispatch("blogList",this.blogs)
      })
    }
  },
  mounted(){
    this.getBlogs()
  },
  filters:{
    changeDate(value){
      return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
    }
  }
};
</script>

<style scoped>
.all .media #timg{
  width: 200px;
  height: 110px;
  border-radius: 3px;
}
.all .media .media-body .tcl{
  color: #222;
}
a {
 text-decoration: none;
}
.all .media .media-body .tcl:hover{
  color: #003fff;
}

</style>

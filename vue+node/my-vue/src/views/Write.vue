<template>
  <div class="col-md-8 offset-2">
    <form v-if="!isShow" v-on:submit="submitBlog">
      <h3 class="page-header">编辑博客</h3>
      <label>主题：</label>
      <input class="form-control" type="text" v-model="blog.title">
      <label>分类：</label>
      <div class="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.checkboxes">
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.checkboxes">
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.checkboxes">
        <label>Angular.js</label>
        <input type="checkbox" value="Angular.js" v-model="blog.checkboxes">
      </div>
      <label>内容：（支持MarkDown语法和highlight高亮显示）</label>
      <div id="editor">
        <textarea v-model="blog.content"></textarea>
        <div v-html="compiledMarkdown"></div>
      </div>
      <br>
      <label>作者：{{ blog.email }}</label>
      <button class="btn btn-primary float-right">提交</button>
    </form>
    <div v-if="isShow" class="blogShow well">
      <router-link class="btn btn-outline-secondary" :to="{name:'homeLink'}">返回</router-link>
      <h2 class="page-header">您的博客发布成功！</h2>
      <p>
        <h3>博客总览</h3>
      </p>
      <p>主题：{{ blog.title }}</p>
      <p>内容：{{ blog.content }}</p>
      <p>
        博客分类：
      <ul>
        <li v-for="checkbox in blog.checkboxes">
          {{ checkbox }}
        </li>
      </ul>
      </p>
      <p>作者：{{ blog.email }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
  name: 'Read',
  data () {
    return {
      blog:{
      	checkboxes:[],
      	content:'',
      	title:'',
        email:this.$store.state.userInfo.email
      },
      isShow:false,
    }
  },
  methods:{
    submitBlog(e){
      if(!this.blog.title || !this.blog.content){
        alert('请填写正确的信息！');
      }else{
        this.$axios.post('/users/write',this.blog)
        .then((response)=>{
          console.log(response.data);
          this.isShow = true;
        })
      }
      e.preventDefault();
    }
  },
  computed: {
    compiledMarkdown: function () {
      return Marked(this.blog.content, { sanitize: true })
    }
  },
};
</script>


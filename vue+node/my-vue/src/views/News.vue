<template>
  <div class=" col-md-8 offset-2">
    <div class="card">
      <div class="card-header lead">
       标题：{{ blog.title }}
      </div>
      <div class="card-body">
        内容：
        <blockquote class="blockquote mb-0">
          <p v-html="compiledMarkdown"></p>
          <footer class="blockquote-footer float-right">来自于：{{ blog.author }}<cite title="Source Title" class="ml-3">日期：{{ blog.blogDate | formatDate }}</cite></footer>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
 import Marked from 'marked'
 import highlightjs from 'highlight.js'
 import 'highlight.js/styles/googlecode.css'

 export default {
   components: {Marked, highlightjs},
   data() {
       return {
         blog:{}
       }
     },
   computed: {
       compiledMarkdown: function () {
         return Marked(this.blog.content, { sanitize: true })
       }
    },
    methods:{
      getBlogs(){
        this.$store.state.blogArr.forEach((item)=>{
          if(this.$route.query.title === item.title){
            this.blog = item
          }
        });
      }
    },
    created(){
      this.getBlogs()
    }
 };
</script>

<style>
 #editor {
   height: 500px;
   font-family: 'Helvetica Neue', Arial, sans-serif;
 }

 textarea, #editor div {
   display: inline-block;
   width: 49%;
   height: 100%;
   vertical-align: top;
   box-sizing: border-box;
   padding: 0 20px;
 }

 textarea {
   border: none;
   border-right: 1px solid #ccc;
   resize: none;
   outline: none;
   background-color: #f6f6f6;
   font-size: 14px;
   font-family: 'Monaco', courier, monospace;
   padding: 20px;
 }

 code {
   color: #f66;
 }
</style>
const express = require('express')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const session = require('express-session')
const app = express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(session({
  //配置加密字符串，他会在原有加密基础上和这个字符串拼接起来加密
  ////目的是为了增加安全性
  secret: 'test',
  resave: false,
  //无论是否使用session，我都默认直接给你分配一把钥匙
  saveUninitialized: true,
  cookie : {
    maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },

}))


app.use('/users',users)

app.listen(8082,()=>{
	console.log('Server is running...')
})
const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const router = express.Router()


//链接数据库
mongoose.connect('mongodb://localhost:27017/myblog',{useNewUrlParser:true})

mongoose.connection.on('connected',()=>{
	console.log('MongoDB connected success.')
})

mongoose.connection.on('error',()=>{
	console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected',()=>{
	console.log('MongoDB connected disconnected.')
})

//登录
router.post('/login',(req,res,next)=>{
	User.findOne({
        email:req.body.email,
        password:req.body.password
    },(err,user)=>{
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        if(!user){
            return res.status(200).json({
                err_code: 200,
                message: 'Email or password is invalid'
            })
        }
        req.session.user = user
        res.status(200).json({
            err_code:0,
            message:'Ok',
            result:{
                email:user.email,
                status:user.status
            }
        })
    })
})

//注册
router.post('/register', (req, res) => {
    var body = req.body
    //注册时先去数据库中找，判断 email or nickname是否存在
    User.findOne({
        $or: [{
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, (err, data) => {
        //服务器错误
        if (err) {
            return res.status(500).json({
                success: 500,
                message: 'Internal error.'
            })
        }
        //如果在数据库中找到一个用户的email or nickname 相同
        //提示：该email or nickname 已存在，请重新输入
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'email or nickname is already is exist.'
            })
        }
        //数据库中找不到对象，则将新的数据发送到数据库中
        new User(body).save((err, user) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                })
            }
            //注册成功，使用Session记录用户的登录状态
            req.session.user = user
            res.status(200).json({
                err_code: 0,
                message: 'Ok.'
            })
        })
    })
})

//查询个人信息
router.get('/personInfo',(req,res)=>{
    User.findOne(req.query,(err,data)=>{
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        res.status(200).json({
            err_code:0,
            message:'Ok',
            result:data
        })
    })
})

//修改个人信息
router.post('/personInfo',(req,res)=>{
    let eml = req.body.email
    let user = {
        nickname:req.body.nickname,
        gender:parseInt(req.body.gender),
        password:req.body.password,
        bio:req.body.bio
    }
    
    User.update({email:eml},{$set:user},{multi: true},(err,data)=>{
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        res.status(200).json({
            err_code:0,
            message:'Update success.',
        })
    })
})

//添加个人博客
router.post('/write',(req,res)=>{
    let email = req.body.email
    User.update({email:email},{$addToSet:{
        blogList:{
            author:email,
            title:req.body.title,
            content:req.body.content,
            checkboxes:req.body.checkboxes,
        }
    }},(err,data)=>{
       if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        res.status(200).json({
            err_code:0,
            message:'Update success.',
        })
    })
})

//删除个人博客
router.post('/delete',(req,res)=>{
    // console.log(req.body.email+'--'+req.body.title)
    User.update({email:req.body.email},{
        $pull:{
            blogList:{
                title:req.body.title
            }
        }
    },(err,data)=>{
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        res.status(200).json({
            err_code:0,
            message:'Update success.',
        })
    })
})

//查询数据库所有blogList
router.get('/blogs',(req,res)=>{
    User.find({status:0},(err,data)=>{
        let blogs = []
        data.forEach( function(item) {
            blogs.push(item.blogList)
        });
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        res.status(200).json({
            err_code:0,
            message:'Update success.',
            result:blogs
        })
    })
})

module.exports = router
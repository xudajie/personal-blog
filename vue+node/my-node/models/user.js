const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let userSchema = new Schema({
	email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modfied_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: Math.random().toString().slice(2,3)+'.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    birthday: {
        type: Date
    },
    status: {
    	//0:没有权限限制
    	//1：不可以评论
    	//2：不可以登录
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },
    blogList:[
        {
            title:String,
            content:String,
            checkboxes:Array,
            blogDate:{
                type: Date,
                default: Date.now
            },
            author:String
        }
    ]
})

module.exports = mongoose.model('User',userSchema)
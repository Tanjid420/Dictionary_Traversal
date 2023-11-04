const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const jwt=require("jsonwebtoken");
const config=require("config");
const { json } = require('express');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    username:{
        type:String,
        required:true

    },
    id:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
        required:true
    },
    wordList:{
        
        type:[String]
    }
})
userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({
        email :this.email,
        id: this._id },
        "mysecurekey",{
            expiresIn : "3h"
        }
    );
    return token;
}
module.exports=mongoose.model("User",userSchema);


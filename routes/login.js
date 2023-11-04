const express=require("express");
const passport = require("passport");
const router=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const config=require("config");
const jwt_decode=require("jwt-decode")
const axios=require("axios");
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
router.post("/login",async(req,res)=>{
 
  
    const {email,password} = req.body;
    res.body=email;
    //console.log(email+" "+password)
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser){
             return res.status(404).json({message: "User Doesn't Exist!"});
        }

        const passwordMatch = await bcrypt.compare(password,existingUser.password);
        
        if(!passwordMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        
         //console.log(existingUser)
       const token=existingUser.generateAuthToken();
        localStorage.setItem("jwtToken","Bearer "+token);
     
       //console.log(decoded);
       localStorage.setItem("jwtToken",token);
       const jwtTok=localStorage.getItem('jwtToken')
       //console.log(jwtTok);
       const  decoded = jwt_decode(jwtTok);
        //console.log(decoded);
      res.redirect("/");
      

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message:"Something Went Wrong"});
    }
} )

module.exports=router;

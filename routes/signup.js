const express=require("express");
const router=express.Router();
const User=require("../models/user");
const passport=require("passport");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const VerificationToken=require("../models/verificationToken");
const config=require("config");
const {generateToken,mailSender}=require("../utils/mail");
const nodemailer=require('nodemailer');
const dotenv =require('dotenv');
const {google} =require('googleapis');

dotenv.config({path: "../config.env"})

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
router.post("/register",async(req,res)=>{
    
    try{
      
        const{email,username,password}=req.body;
        const  confirmPassword=req.body. confirmPassword;
       
        const existingUser = await User.findOne({email:email});
       
        if(existingUser!=null){
            return res.status(400).json({message: "User Already Exists!"});
        }
       
        if(password !==  confirmPassword ) {
            return res.status(400).json({message: "Passwords don't match"});
        }   
       
        const hashedPassword = await bcrypt.hash(password,12);

      
        
        const result =  new User({
            email,
            password: hashedPassword,
            username
        });
        await result.save()
        const token=result.generateAuthToken();
        localStorage.setItem("jwtToken","Bearer "+token);
        
        const jwtTok=localStorage.getItem('jwtToken')
        
        const otp = generateToken();
       
        const tokenResult = new VerificationToken({
            owner:result._id,
            token:otp
        }); 
        await tokenResult.save();
        
        const transport=await mailSender()
       
        transport.sendMail({
            from:'ashraful1185058@gmail.com',
            to:result.email,
            subject:'Account Verification',
            html:`<h1>Verification Code<br>${otp}</h1>`
        },(err,info)=>{
            if(err)
            {
                console.log(err)

            }
            else{
                console.log(info)
            }
        })
       // console.log(tokenResult.owner)
       res.render("verify",{tokenResult:tokenResult.owner});
     
       
       

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong!" });
    }

   
  
})
router.post("/verify",async(req,res)=>{
    const {otp,userID}=req.body;
    
    console.log(req.body);

    if(!userID || !otp.trim()) return res.send({message: "Missing Parameters"});

    try {
        const user = await User.findById(userID);
        console.log(`it's in verify ${user}`);
        if(!user) return res.status(404).json({message : "User Not Found"});

        if(user.isVerified) return res.send({message: "Account already verified"});

        const verifiedToken = await VerificationToken.findOne({owner:user._id});

        if(!verifiedToken) return res.status(404).json({message : "Token Not Fund"});

        if(otp===verifiedToken.token){
            await VerificationToken.findByIdAndDelete(verifiedToken._id);
            console.log("you are fine")
            const result = await User.findByIdAndUpdate(userID,
                {
                    $set: {isVerified:true},
                },
                { new: true });
            
                return res.redirect("/");
        }else{
            return res.send({message: "Invalid userID"});

        }
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong!" });
    }

    
})
module.exports=router;
 
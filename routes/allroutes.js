const express=require("express");
const router=express.Router();
const text=require("../public/js/scrap");
const Word=require("../models/words")
const User=require("../models/user")
const auth=require("../middleware/auth")
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const jwt=require("jsonwebtoken");
const jsonData=require("../public/json/crossPuzzle");
const { data } = require("cheerio/lib/api/attributes");
const words = require("../models/words");
const { route } = require("./signup");
const jwt_decode=require("jwt-decode")
const token=localStorage.getItem("jwtToken");

router.post("/api",async(req,res)=>
{ 
    let scraptxt={};
  
    const url=req.body.urlName;
    const textArea=req.body.textArea;
    //console.log(textArea)
    if(url)
    {
          scraptxt=await text.payload(url);
    }
    
   
    const token=localStorage.getItem("jwtToken");
        
        //console.log(token);
    if(token!=="")
    { 
        if(url)
        {
           
            const tok=localStorage.getItem("jwtToken");
             res.render("apicall",{Scraptxt:scraptxt,token:token,tok:tok})
        }
        if(textArea)
        {const tok=localStorage.getItem("jwtToken");
            res.render("textapi",{Scraptxt:textArea,token:token,tok:tok})
        }
       
    }
    else
    {
        res.redirect("/signup");
    }
    
})
router.get("/contact",(req,res)=>{
    const token=localStorage.getItem("jwtToken");
    const tok=localStorage.getItem("jwtToken");
    res.render("contact",{token:tok})
   
})

router.get("/games",(req,res)=>{
    const token=localStorage.getItem("jwtToken");
    // console.log("hello")
    if(token!=="")
    {
      
        console.log(token)
        const tok=localStorage.getItem("jwtToken");
         res.render("Games",{token:tok})
    }
    else
    {
        res.redirect("/signup")
    }
   
})
router.get("/games/word-Puzzle",(req,res)=>{
    const token=localStorage.getItem("jwtToken");
    if(token!="")
    {
         res.render("cross");
    }
    else
    {
        res.redirect("/signup")
    }
   
  
   
})
router.get("/games/quiz",(req,res)=>{
    const token=localStorage.getItem("jwtToken");
    if(token!=="")
    {
          res.render("QuizOption");
    }
    else
    {
        res.redirect("/signup")
    }
   
   
})
router.get("/games/quiz/word",(req,res)=>{
    res.render("Quiz",{id:1})
})
router.get("/games/quiz/idioms",(req,res)=>{
    res.render("Quiz",{id:2})
})
router.get("/games/score",(req,res)=>{
    res.render("score")
})



router.get("/signup",(req,res)=>{
  //  console.log(localStorage.getItem("jwtToken"));
    res.render("Form3");
})
router.get("/leaderboard",async(req,res)=>{
    console.log("hello")
    let userObject=[];
    const user=await User.find({})
    user.forEach((data)=>{
        if(data.isVerified)
        {
             const userData={
            userName:data.username,
            wordList:data.wordList

        }
        userObject.push(userData)
        }
      
    })
   // console.log(token)
    for(let x=0;x<userObject.length-1;x++)
    {
        for(let y=x+1;y<userObject.length;y++)
        {
            let tempa=userObject[x];
            
            if(tempa.wordList.length<userObject[y].wordList.length)
            {
                userObject[x]=userObject[y]
                userObject[y]=tempa
                
            }
        }
        
    }const token=localStorage.getItem("jwtToken");
  
    
    if(token!=="")
    {

        //console.log(token)
        const tok=localStorage.getItem("jwtToken");


        res.render("leaderboard",{userObject,token:tok});
    }
    else
    {
       // console.log(token)
        console.log("can not find token")
        res.redirect("/signup")
    }
   
   
    
})
router.get("/leaderboard/my-words",async (req,res)=>{
    const jwtTok=localStorage.getItem("jwtToken")
    const  decoded = jwt_decode(jwtTok);
    const userWord=await User.find({email:decoded.email});
    const token=localStorage.getItem("jwtToken");
    if(token!=="")
    {
         res.render("LeaderboardWord",{wordList:userWord[0].wordList})
    }
    else
    {
        res.redirect("/signup")
    }
   
   
  //console.log(decoded)

})
router.get("/reset",(req,res)=>{
    res.render("reset");
})
router.get("/forget",(req,res)=>{
    res.render("forget");
})
router.get("/faq",(req,res)=>{
   // console.log(req.user);
    res.render("faq");
})
router.get("/media",(req,res)=>{
    res.render("media");
})
router.get("/",(req,res)=>{
    const tok=localStorage.getItem("jwtToken");
    res.render("Dictionary",{token:tok});
})
router.get("/logout",(req,res)=>{
    //req.logOut();
    localStorage.setItem("jwtToken","");
   // console.log(localStorage.getItem("jwtToken"));
    res.redirect("/signup");
  
})


module.exports=router;
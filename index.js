const express=require("express");
const app=express();
const path=require("path");
const text=require("./public/js/scrap");
const mongoose = require('mongoose');
const Word=require("./models/words")
const User=require("./models/user");
const session=require("express-session");
const morgan=require("morgan");
const flash = require('connect-flash');
const passport=require("passport");
const LocalStrategy=require("passport-local");
const { v4: uuid } = require('uuid');
const methodOverride=require("method-override");
const { Cookie } = require("express-session");
const { getMaxListeners } = require("process"); 
const signupRoutes=require("./routes/signup");

const allRoutes=require("./routes/allroutes");
const loginRoutes=require("./routes/login");
const cookieParser = require("cookie-parser");
const sendData=require("./routes/sendData");
const connect=require("connect")
const config=require("config");
const jwt=require("jsonwebtoken")
const jwt_decode=require("jwt-decode")
uuid(); 
if(!config.get("jwtPrivateKey")){
    console.error("Fatal error");
    process.exit(1);
}
  mongoose.connect('mongodb://localhost:27017/wordData',{useNewUrlParser:true})
  .then(()=>{
      console.log("Connection Open");
  })
  .catch(err=>{
      console.log("oh no ");
      console.log(err);
  })

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

app.use(flash());
app.use(morgan('dev'));
app.use("/",loginRoutes);
app.use("/",signupRoutes);
app.use("/",allRoutes);
app.post("/addWord",async(req,res)=>{
    const wordToAdd=req.body.data;
   // console.log(wordToAdd);
    const jwtToken=req.headers.authorization;
    if(jwtToken!="Bearer")
    {
         const  decoded = jwt_decode(jwtToken);
    const userEmail=decoded.email;
    //console.log(userEmail);
    const findUser=await User.updateOne({email:userEmail},{ $push: { wordList: wordToAdd}});
   // console.log("hit it");
  // console.log(req.header["Authorization"])
    res.json({
        status:"got it"
    })
    }
   else {
       res.send({message:"log in first"});
   }
})

app.post("/send",async(req,res)=>{
    //console.log(req.body);
   
   
        const jwtToken=req.headers.authorization;
        const  decoded = jwt_decode(jwtToken);
        const userEmail=decoded.email;
      // console.log(userEmail);
    const searchWord=req.body;
   const findData=await Word.findOne({word:(searchWord.data+" ").toLocaleLowerCase()});
    //console.log(findData);
    let flag=false;
    try{
        //console.log(searchWord.data);
        if(findData.word!=null)
        {
        //    console.log(findData.word.toString());
        //     console.log(userEmail.toString());
            const userFindData=await User.aggregate([
                {
                    $match:{email:userEmail}
                },
                {
                    $match:{wordList:findData.word}
                }]
            )
            const ddd=await User.find({email:userEmail});
            ddd.forEach((ele)=>{
                ele.wordList.forEach((words)=>{
                 let flag1=false;
                   // console.log(words);
                   // console.log(`i am to find ${findData.word}`);
                //    console.log(`words ${words}  ${words.length}`);
                //    console.log(`findData ${findData.word}  ${findData.word.length}`);
                   if(words+" "===findData.word)
                   {
                    //    console.log("fffffffffuck yooooou");
                      // console.log(words);
                       flag=true;
                       flag1=true;
                       return ;
                   }
                })
                if(flag1)
                {
                    flag1=false;
                    return;
                }
                //console.log(ele);
            }) 
           
        //    const lll=ddd.wordList;
        //    console.log(lll);
          // console.log(userFindData);
        // const userFindData=db.users.aggregate({$match:{email:"a@g.com"}},{$match:{wordList:"define"}})
        // console.log(userFindData)
            
        }
         
    }
    catch(err)
    {
        console.log("did not found");
       // console.log(err);
    }
   //console.log(flag);
    if(!flag)
    {
        //console.log(`it's in the wordlist  ${findData.word}`)
       // console.log("fukc you");
         res.json({
        
        status:findData
    })
    
    }
    else
    {
        flag=false,
        res.json({
            
            status:"undefined"
        })
    }
   
})

// app.post("/register",(req,res)=>{
//     res.send(req.body);
// })



app.listen(3000,()=>{
    console.log("i am listening");
}) 

const jwt=require("jsonwebtoken");
const config=require("config");
module.exports=function(req,res,next){
  //  console.log(req.body)
   
//    const authHeader=req.headers["authorization"];
//    const token=authHeader&&authHeader.split(" ")[1];
//  //const token = req.headers.authorization.split(" ")[1];
//    console.log(token);
    const token=req.header["x-auth-token"]
    console.log(token);
    if(token==null)
    {
        return res.status(401).send("Access Denied");
    }
    try{
        
   
       const PrivateKey=config.get("jwtPrivateKey");
        console.log(PrivateKey);
       
            const decoded=jwt.verify(token,config.get("jwtPrivateKey"),(err,user)=>{
                if(err)return res.sendStatus(403)
                req.user=decoded; 
                //console.log(err);
             
          console.log("fuck you all"); 
          //console.log(`i am decode${decode}`);
           
           // console.log(`i am req user ${req.user}`);
           next();
            })
       
         
         
    }
    catch(err)
    {
        res.status(400).send("Invalid Token");
    }
   
}

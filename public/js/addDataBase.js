const mongoose=require("mongoose");
const fs=require("fs");
const Word=require("../../models/words");
mongoose.connect('mongodb://localhost:27017/wordData',{useNewUrlParser:true})
  .then(()=>{
      console.log("Connection Open");
  })
  
  //console.log(Word);
  new Word({word:"fuck"}).save();
  
const fileData=fs.readFileSync("./../txt/allWords.txt","utf8")
const spFileData=fileData.split("\r\n");
for (var i = 0; i < spFileData.length - 1; i++) {
    spFileData[i] += " ";
}
//console.log(spFileData);

// spFileData.forEach(async(el)=>{
//     await new Word({word:el}).save();

// })

for(let x=210000;x<spFileData.length;x++)
{
    new Word({word:spFileData[x]}).save()
}

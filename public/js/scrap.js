
const axios=require('axios');
const cheerio=require('cheerio');
const express = require('express')
const app = express()

const getData=async(pageUrl)=>{
    const arr=[];

    const{data}=await axios.get(pageUrl);
    const $=cheerio.load(data);
    const p=$("p");
    p.each((i,el)=>{
        const $el=$(el);
     
       arr.push($el.text());
       
      
       
    })
    
 
 return arr;

}



module.exports={"payload":getData};

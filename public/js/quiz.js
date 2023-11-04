document.addEventListener('DOMContentLoaded', async (event) => {
    

const quizVocabulary=await fetch("../../json/quiz-vocabulary.json");
const quizData=await quizVocabulary.json();
const phrase=await fetch("../../json/quiz-phrase.json");
const phraseData=await phrase.json();
const idn=document.querySelector("#idn");
const dif=idn.innerHTML;

    const random=()=>{
    return Math.floor(Math.random()*quizData.length)

}
const random1=()=>{
    return Math.floor(Math.random()*phraseData.length)
}

const rand=()=>{
    return Math.floor(Math.random()*4+1)
}

let sc=0; 
var dataMeaning=" "
let idx=0;
let rn=0;

let box1=document.querySelector(".box1");
let box2=document.querySelector(".box2");
 let box3=document.querySelector(".box3");
 let  box4=document.querySelector(".box4");
let   box5=document.querySelector(".box5");
if(dif==1)
{


const reOrder=()=>{
   
  let ar=[0,0,0,0,0];
  let ar1=[];
    let ran=random();
 
 
 
    var data=quizData[idx];
    var dataShow=data[0].word;
    dataMeaning=data[0].meaning;
    
    while(ar1.length>0)
{ 
    ar1.pop()
}
    if(ar[0]===0)
    {
        ran=random();
        let tempData=quizData[ran];
        let dtBox=tempData[0].meaning;
        function again()
        {
            ran=random();
         tempData=quizData[ran];
         dtBox=tempData[0].meaning;
        }
       
       
        while(ar1.includes(dtBox))
        {
            
            again();
        }
      
        box2.innerHTML=`${tempData[0].meaning}`
        ar1.push(dtBox)
     
        ar[0]=1;
    }
    if(ar[1]===0)
    {  ran=random();
        let tempData=quizData[ran];
        let dtBox=tempData[0].meaning;
        function again()
        {
            ran=random();
         tempData=quizData[ran];
         dtBox=tempData[0].meaning;
        }
       
       
        while(ar1.includes(dtBox))
        {
            
            again();
        }
        
        
              box3.innerHTML=`${tempData[0].meaning}`
              ar1.push(dtBox)
            
              ar[1]=1;
        
      
    }
    if(ar[2]===0)
    {
        ran=random();
        let tempData=quizData[ran];
        let dtBox=tempData[0].meaning;
        function again()
        {
            ran=random();
         tempData=quizData[ran];
         dtBox=tempData[0].meaning;
        }
       
       
        while(ar1.includes(dtBox))
        {
            
            again();
        }
       
       
              box4.innerHTML=`${tempData[0].meaning}`
              ar1.push(dtBox)
            
              ar[2]=1;
    
}
    if(ar[3]===0)
    {
        ran=random();
        let tempData=quizData[ran];
        let dtBox=tempData[0].meaning;
        function again()
        {
            ran=random();
         tempData=quizData[ran];
         dtBox=tempData[0].meaning;
        }
       
        while(ar1.includes(dtBox))
        {
            
            again();
        }
        
              box5.innerHTML=`${tempData[0].meaning}`
              ar1.push(dtBox)
             
              ar[3]=1;
    
}
const shuffel=(dtm)=>{
    if(ar1.includes(dataMeaning))
    {
        return ;
    }
    else
    {
        rn=rand();
        if(rn===1)
        {
            box2.innerHTML=`${dtm}`;
        }
        else if(rn===2)
        {
            box3.innerHTML=`${dtm}`;
        }
        else if(rn===3)
        {
            box4.innerHTML=`${dtm}`;
        }
        else 
        {
            box5.innerHTML=`${dtm}`;
        }

    }
}

shuffel(dataMeaning);
    box1.innerHTML=`Meaning of ${dataShow.charAt(0).toUpperCase() + dataShow.slice(1)}`

    
}
reOrder();


box2.addEventListener('click',(e)=>{
    let box2data=e.target.innerText;
 
    if(box2data===dataMeaning)
    {
        idx+=1;
        console.log(box2data)
        console.log(dataMeaning)
        sc+=1;
        
        box2.setAttribute("style","background-color:#09ff00");
        
        window.localStorage.setItem("score",sc);
        console.log(window.localStorage.getItem("score"))
        reOrder();
        
        setInterval(async ()=>{
              box2.removeAttribute("style")
             },1000)
       

    }
    else
    {
        idx+=1;
        reOrder();
    }


})
box3.addEventListener('click',(e)=>{
    let box3data=e.target.innerText;
 
    if(box3data===dataMeaning)
    {
        idx+=1;
        console.log(box3data)
        console.log(dataMeaning)
        sc+=1;
    
        box3.setAttribute("style","background-color:#09ff00");
        
        window.localStorage.setItem("score",sc);
        console.log(window.localStorage.getItem("score"))
        reOrder();

      setInterval(async ()=>{
            box3.removeAttribute("style")
        },1000)

    }
    else
    {
        idx+=1;
        reOrder();
    }


})
box4.addEventListener('click',(e)=>{
    let box4data=e.target.innerText;
 
    if(box4data===dataMeaning)
    {
        idx+=1;
        
        sc+=1;
        
        box4.setAttribute("style","background-color:#09ff00");
        
        window.localStorage.setItem("score",sc);
      
        reOrder();
      
        setInterval(async ()=>{
            box4.removeAttribute("style")
        },1000)


    }
    else
    {
        idx+=1;
        reOrder();
    }


})
box5.addEventListener('click',(e)=>{
    let box5data=e.target.innerText;
 
    if(box5data===dataMeaning)
    {
        idx+=1;
        console.log(box5data)
        console.log(dataMeaning)
        sc+=1;
       
        box5.setAttribute("style","background-color:#09ff00");
       
        window.localStorage.setItem("score",sc);
        console.log(window.localStorage.getItem("score"))
        
 reOrder();

 setInterval(async ()=>{
    box5.removeAttribute("style")
},1000)

    }
    else
    {
        idx+=1;
        reOrder();
    }
   

})
}
else
{
    
const reOrder=()=>{
    
  
   let ar=[0,0,0,0,0];
   let ar1=[];
     let ran=random1();
  
  
    
     var data=phraseData[idx];
     var dataShow=data[0].Phrase;
     console.log(dataShow)
     dataMeaning=data[0].meaning;
     
     while(ar1.length>0)
 { 
     ar1.pop()
 }
     if(ar[0]===0)
     {
         ran=random1();
         let tempData=phraseData[ran];
         let dtBox=tempData[0].meaning;
         function again()
         {
             ran=random1();
          tempData=phraseData[ran];
          dtBox=tempData[0].meaning;
         }
        
        
         while(ar1.includes(dtBox))
         {
             
             again();
         }
         console.log(`box 2 data ${tempData[0].meaning}`)
         box2.innerHTML=`${tempData[0].meaning}`
         ar1.push(dtBox)
        
         ar[0]=1;
     }
     if(ar[1]===0)
     {  ran=random1();
         let tempData=phraseData[ran];
         let dtBox=tempData[0].meaning;
         function again()
         {
             ran=random1();
          tempData=phraseData[ran];
          dtBox=tempData[0].meaning;
         }
        
        
         while(ar1.includes(dtBox))
         {
             
             again();
         }
         

               console.log(`box 3 data ${tempData[0].meaning}`)
               box3.innerHTML=`${tempData[0].meaning}`
               ar1.push(dtBox)
             
               ar[1]=1;
         
       
     }
     if(ar[2]===0)
     {
         ran=random1();
         let tempData=phraseData[ran];
         let dtBox=tempData[0].meaning;
         function again()
         {
             ran=random1();
          tempData=phraseData[ran];
          dtBox=tempData[0].meaning;
         }
        
        
         while(ar1.includes(dtBox))
         {
             
             again();
         }
        
         console.log(`box 4 data ${tempData[0].meaning}`)
               box4.innerHTML=`${tempData[0].meaning}`
               ar1.push(dtBox)
              
               ar[2]=1;
     
 }
     if(ar[3]===0)
     {
         ran=random1();
         let tempData=phraseData[ran];
         let dtBox=tempData[0].meaning;
         function again()
         {
             ran=random1();
          tempData=phraseData[ran];
          dtBox=tempData[0].meaning;
         }
        
         while(ar1.includes(dtBox))
         {
             
             again();
         }
         console.log(`box 5 data ${tempData[0].meaning}`)
               box5.innerHTML=`${tempData[0].meaning}`
               ar1.push(dtBox)
              
               ar[3]=1;
     
 }
 const shuffel=(dtm)=>{
     if(ar1.includes(dataMeaning))
     {
         return ;
     }
     else
     {
         rn=rand();
         if(rn===1)
         {
             box2.innerHTML=`${dtm}`;
         }
         else if(rn===2)
         {
             box3.innerHTML=`${dtm}`;
         }
         else if(rn===3)
         {
             box4.innerHTML=`${dtm}`;
         }
         else 
         {
             box5.innerHTML=`${dtm}`;
         }
 
     }
 }
 
 shuffel(dataMeaning);
     box1.innerHTML=`Meaning of Idioms --${dataShow.charAt(0).toUpperCase() + dataShow.slice(1)}`
 
     
 }
 reOrder();
 
 
 box2.addEventListener('click',(e)=>{
     let box2data=e.target.innerHTML;
  
     if(box2data===dataMeaning)
     {
         idx+=1;
         console.log(box2data)
         console.log(dataMeaning)
         sc+=1;
        
         box2.setAttribute("style","background-color:#09ff00");
        
         window.localStorage.setItem("score",sc);
         console.log(window.localStorage.getItem("score"))
         reOrder();
         
         setInterval(async ()=>{
               box2.removeAttribute("style")
              },1000)
        
 
     }
     else
     {
         idx+=1;
         reOrder();
     }
 
 
 })
 box3.addEventListener('click',(e)=>{
     let box3data=e.target.innerText;
  
     if(box3data===dataMeaning)
     {
         idx+=1;
         console.log(box3data)
         console.log(dataMeaning)
         sc+=1;
         
         box3.setAttribute("style","background-color:#09ff00");
        
         window.localStorage.setItem("score",sc);
         console.log(window.localStorage.getItem("score"))
         reOrder();
 
       setInterval(async ()=>{
             box3.removeAttribute("style")
         },1000)
 
     }
     else
     {
         idx+=1;
         reOrder();
     }
 
 
 })
 box4.addEventListener('click',(e)=>{
     let box4data=e.target.innerText;
  
     if(box4data===dataMeaning)
     {
         idx+=1;
         console.log(box4data)
         console.log(dataMeaning)
         sc+=1;
         
         box4.setAttribute("style","background-color:#09ff00");
       
         window.localStorage.setItem("score",sc);
         console.log(window.localStorage.getItem("score"))
         reOrder();
       
         setInterval(async ()=>{
             box4.removeAttribute("style")
         },1000)
 
 
     }
     else
     {
         idx+=1;
         reOrder();
     }
 
 
 })
 box5.addEventListener('click',(e)=>{
     let box5data=e.target.innerText;
  
     if(box5data===dataMeaning)
     {
         idx+=1;
         console.log(box5data)
         console.log(dataMeaning)
         sc+=1;
         
         box5.setAttribute("style","background-color:#09ff00");
       
         window.localStorage.setItem("score",sc);
         console.log(window.localStorage.getItem("score"))
         
  reOrder();
 
  setInterval(async ()=>{
     box5.removeAttribute("style")
 },1000)
 
     }
     else
     {
         idx+=1;
         reOrder();
     }
    
 
 })
}
  





})
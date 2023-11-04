
  document.addEventListener('DOMContentLoaded', async (event) => {
    const token=document.querySelector("#token");
    const dataToken=token.innerHTML;
      const checkData=async(data)=>{
           const searchData={data};
    const options={
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer" + dataToken
          },
          body: JSON.stringify(searchData)
    }

    const fetchData=await fetch("/send",options)
    const status=await fetchData.json();
    try{
         if(status.status.word!="undefined"){
          
             return status.status.word;
           
         }

         
    }
    catch(err){
        console.log(err)
      
    }
  
       
    
    }
 

    let string="";
    const text=document.querySelectorAll("p");
    let set=new Set();
    let a=0;
    const fetCh=async()=>{
          for(let txt of text){
        string=txt.innerHTML;
        txt.removeAttribute("style")
        const split=string.split(" ");
     
        txt.innerHTML="";
        for(let x=0;x<split.length;x++){
    
        let sp=split[x];
            
       
       
        if(sp.length>3)
        {
             await checkData(sp).then(res=>{
            let get=set.has(sp);
     
         if(res!==undefined&&get!==true)
         { 
            
            txt.innerHTML=txt.innerHTML+" "+"<span>"+sp+"</span>";
           
            set.add(sp);
            
         }
         else{
            txt.innerHTML=txt.innerHTML+" "+sp;
         }

             
        })
       
       
       
    }
        
   
         
        else
        {
          
            txt.innerHTML=txt.innerHTML+" "+sp;
        }
    
        
    }
}
    }

    await fetCh()
  const tool=async()=>{
       const span=document.querySelectorAll("span");
   
    span.forEach((span)=>{
        
        span.classList.add(".tooltip");
    })
  }
  tool()
   
    const tooltipContainer=document.querySelector(".tooltip-container");
    
    const tooltips=Array.from(document.getElementsByClassName(".tooltip"));
    
    
    
    let count=0;
    
    tooltips.forEach(async (tooltip) => {
         let word=tooltips[count].innerText;
         word=word.toLocaleLowerCase();
          
         count++; 
        tooltip.addEventListener("mouseenter", async(e) => {
           
            
        const getDesiredWord=await getWord(word); 
       
        

            const definition=getDesiredWord.data[0].meanings[0].definitions[0].definition
            
        const example=getDesiredWord.data[0].meanings[0].definitions[0].example
        const antonym=getDesiredWord.data[0].meanings[0].definitions[0].antonyms
        const synonyms=getDesiredWord.data[0].meanings[0].definitions[0].synonyms
        tooltipContainer.classList.add("fade-in");
        tooltipContainer.style.left = `${e.pageX}px`;
        tooltipContainer.style.top = `${e.pageY}px`;
        tooltipContainer.innerHTML=`<div style="overflow:hidden"><b>Definition:</b><span class="hidden" style="background-color:#00af6c">${definition}</span></div>`+`<div><b>Example:</b><span class="hidden" style="background-color:#ffa500">${example}</span></div>`+`<div ><b>Synonyms:</b><span class="hidden" style="background-color:#35baf6">${synonyms}</span></div>`+`<div><b>Antonyms:</b><span class="hidden" style="background-color:#ba55d3">${antonym}</span> </div>`
        
    
        
        });
    
        tooltip.addEventListener("mouseout", (e) => {
          tooltipContainer.classList.remove("fade-in");
        
         
        });
      });
      
      tooltipContainer.addEventListener('mouseenter', () => {
    
        
        tooltipContainer.classList.add("fade-in");
    
    })
    tooltipContainer.addEventListener('mouseout', () => {
       
      
        tooltipContainer.classList.remove("fade-in");
    
    })
    
    const getWord=async (word)=>{
        try{
             const config={headers:{Accept:"application/json"}};
        const res=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,config);
        return res;
        }
        catch(e)
        {
            console.log("errror",e);
        }
    
    
        }
        const pronunciaton =async (word)=>{
          try{
               const config={headers:{Accept:"application/json"}};
          const res=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,config);
          return res;
          }
          catch(e)
          {
              console.log("errror",e);
          }
      
      
          }
        
    
        
    
    });
   
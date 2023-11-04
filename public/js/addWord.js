
     const  set=new Set();
     document.addEventListener("contextmenu",(e)=>{
      const token=document.querySelector("#token")
      const dataToken=token.innerHTML;
      
         e.preventDefault();
         function playSound(url) {
            var audio = new Audio(url);
            audio.play();
        }
      const addData=async(data)=>{
         const searchData={data:data};
    
  const options={
      method:"POST",
      headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer" + dataToken
           
        },
        body: JSON.stringify(searchData)
  }

  const fetchData=await fetch("/addWord",options)
  const status=await fetchData.json();
  console.log(status);
}
             
           const tooltipContainer=document.querySelector(".add-to-database");
            let addWord="";
            
            if(e.target.className===".tooltip")
            {
               addWord =e.target.innerText
              
                 
                tooltipContainer.classList.add("fade-in");
                tooltipContainer.style.left = `${e.pageX}px`;
                tooltipContainer.style.top = `${e.pageY-30}px`;
                tooltipContainer.innerHTML=`<button id="buttonEjs"><b>Add to List</b></button>`;
               const button=document.querySelector("#buttonEjs");
               
              button.addEventListener("click",async()=>{
                 await addData(addWord.toLocaleLowerCase());
                 e.target.innerHTML=`<span style="background-color:green">${e.target.innerText}</span>`
                 tooltipContainer.classList.remove("fade-in");
                 const getWord=async (word)=>{
                  try{
                       const config={headers:{Accept:"application/json"}};
                  const res=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                  return res;
                  }
                  catch(e)
                  {
                      console.log("errror",e);
                  }
              
              
                  }
                 const pronun=await getWord(addWord)
                 const url=pronun.data[0].phonetics[0].audio
                 playSound(url)
                
                 console.log()
                 

              })
               
            }
           
            
           
             
        },false);

      document.addEventListener("click",(e)=>{
                  const tooltipContainer=document.querySelector(".add-to-database");
                  
                  tooltipContainer.classList.remove("fade-in");
               
                  
               },false)
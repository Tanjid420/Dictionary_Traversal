document.addEventListener('DOMContentLoaded', async (event) => {
    const score=window.localStorage.getItem("score");
    const idScore=document.querySelector("#score");
    if(score==null)
    {
        idScore.innerHTML=`Score: ${0}` 
    }
    else
    {
        idScore.innerHTML=`Score: ${score}` 
    }
    
    window.localStorage.removeItem("score");
 


})
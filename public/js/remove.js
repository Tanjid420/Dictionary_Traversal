
document.addEventListener('DOMContentLoaded', async (event) => {
    const remove=document.querySelector("#remove");
    const tok=document.querySelector("#tok");
    const join_out=document.querySelector("#Join-Out")
    if(tok.innerHTML!==" ")
    {
        remove.setAttribute("href","/logout");
        join_out.innerHTML="LogOut"
        
    }
    else
    {
        remove.setAttribute("href","/signup");
        join_out.innerHTML="Join Now"
      
    }

})
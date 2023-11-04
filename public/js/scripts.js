var tabs = document.querySelectorAll(".lboard_tabs ul li");
var today = document.querySelector(".today");
var month = document.querySelector(".month");
var year = document.querySelector(".year");
var items = document.querySelectorAll(".lboard_item");

tabs.forEach(function(tab){
	tab.addEventListener("click", function(){
		var currenttab = tab.getAttribute("data-li");
		
		tabs.forEach(function(tab){
			tab.classList.remove("active");
		})

		tab.classList.add("active");

            items.forEach(function(item){
			item.style.display = "none";
		})

		if(currenttab == "today"){
			today.style.display = "block";
		}
		else if(currenttab == "month"){
			month.style.display = "block";
		}
		else{
			year.style.display = "block";
		}

	})
})

var acc=document.getElementsByClassName('accordion');
var i;
var len=acc.length;
for(i=0;i<len;i++){
	acc[i].addEventListener('click',function(){
		this.classList.toggle('active');
		var panel=this.nextElementSibling;
		if(panel.style.maxHeight){
			panel.style.maxHeight=null;
		}
		else{
			panel.style.maxHeight=panel.scrollHeight+'px'
		}
	})
}
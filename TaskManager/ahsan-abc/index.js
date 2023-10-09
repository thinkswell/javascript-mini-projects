
const list = document.querySelector("#input")
const uo = document.querySelector("#in")
const date_ = document.querySelector("#date")
const time = document.querySelector("#time")

function update()
{
    const now = new Date();

    window.setTimeout(update,1000)

    var h = now.getHours();
    var m = now.getMinutes();
     var s = now.getSeconds()
    if (h > 12)
        h = h - 12
    time.innerHTML = `${h}:${m}:${s}`
   
    
}

function date()
{
    const now = new Date();
 
  

    var da= now.getDate();
    var m = now.getMonth()+1;
    var y = now.getFullYear()
    var day = now.getDay();
    
    switch (parseInt(now.getDay()))
    {
        case 0: day = "sun"; break;
        case 1: day = "mon"; break;
        case 2: day = "tue"; break;
        case 3: day = "wed"; break;
        case 4: day = "thu"; break;
        case 5: day = "fri"; break;
        case 6: day = "sat";break;
    }
    
    date_.innerHTML = `${da} / ${m} / ${y} , ${day}`
   
    
}

date()

// search___________________________________________________________________________
// search___________________________________________________________________________
var b = false
  

document.querySelector("#google").addEventListener("click",
function (event)
{
 
    if (b == true) {
        this.value = ""
        b = false}
  
   

    
})
document.querySelector("#google").addEventListener("keypress",
    function (event)
    {
      
        if (event.key == "Enter")
            b = true
    
       

        
    })










// to-do-list________________________________________________
// to-do-list________________________________________________
console.log(date)
console.log(date)

if (!localStorage.getItem("num"))
    localStorage.setItem("num", 0);

  








list.addEventListener("keyup",
    
    function (event) {

        if (event.key == "Enter" && this.value!= "") {
               add(this.value,true) 
            this.value = ""

        }    }
)

const add = (iteam ,waha) => {
    var i = document.createElement("li");


       
  
    i.innerHTML = `<button class="but" > x </button> ${iteam}  `
        ;
    console.log(iteam);
   
    var b = true
    i.addEventListener("click",
        function (event) {
            if (b == true) {
                this.firstChild.style.visibility = "visible"
                this.style.backgroundColor = "blue";
                this.style.textDecoration = "line-through"
                b = false
            }
            else {
                this.firstChild.style.visibility = "hidden"
                this.style.backgroundColor = "deepskyblue";
                this.style.textDecoration = "none"
                b = true
            }
            
        }

        
    
    )

 
    
    uo.appendChild(i);
    if (waha == true)
    {
        var count = localStorage.getItem("num")
        count = parseInt(count);
        count = count + 1
        localStorage.setItem("num", count)
        localStorage.setItem(count.toString(), iteam)
    }

    i.querySelector("button").addEventListener("click",
        function (event) {
            var chil = 0 
            for (j = 0; j < 100;j++)
            {
                if (uo.childNodes[j] == i) {
                    chil = j + 1;
                    break;
                }
            }
            

            i.remove();

             del(chil)

          }
      )

      
    
    
}


function del(num)
{
    for (i = num; i < parseInt(localStorage.getItem("num")); i++)
    {
        localStorage.setItem(num.toString(),localStorage.getItem((num+1).toString()))

        
    }
    localStorage.removeItem(localStorage.getItem("num"))
    localStorage.setItem("num",parseInt(localStorage.getItem("num"))-1)
    
}

    



for (i = 1; i <= parseInt(localStorage.getItem("num")); i++)
{
    if (localStorage.getItem(i.toString())) 
        add(localStorage.getItem(i.toString()), false)
    

}

// note-2__________________________________________________________________________________________
// note-2__________________________________________________________________________________________
// note-2__________________________________________________________________________________________

if ( !localStorage.getItem("note_counter"))
    localStorage.setItem("note_counter", 1)

 if (!localStorage.getItem("current_note")) 
{localStorage.setItem("current_note", 1)
localStorage.setItem("note1", "_null")}





const co = document.querySelector("#area");
const save = document.querySelector("#save")



function add_note()
{

    localStorage.setItem("note_counter", (parseInt(localStorage.getItem("note_counter")) + 1))
    localStorage.setItem("note" + localStorage.getItem("note_counter"), " ")
    localStorage.setItem("current_note",localStorage.getItem("note_counter"))
    display(parseInt(localStorage.getItem("note_counter")))
    
}

function display(no)
{
    console.log("display")
    co.innerHTML = "jobie"
    if (no > 0 && no <= parseInt(localStorage.getItem("note_counter")))
    {
        co.value = " "

        co.value = localStorage.getItem("note" + no.toString())
        var total = localStorage.getItem("note_counter")
        document.querySelector("#show_count").innerHTML = `${no}/${total}`
        }
}


function pre_note()
{
    console.log("in pre")
    if (parseInt(localStorage.getItem("current_note")) > 1) {
        localStorage.setItem("current_note", parseInt(localStorage.getItem("current_note"))-1)
        display(parseInt(localStorage.getItem("current_note")))
    }

}
function next_note()
{
    console.log("in next")
    if (parseInt(localStorage.getItem("current_note")) < parseInt(localStorage.getItem("note_counter"))) {
        localStorage.setItem("current_note", parseInt(localStorage.getItem("current_note"))+1)
        display(parseInt(localStorage.getItem("current_note")))
    }

}


function save_note()
{
    localStorage.setItem("note" + localStorage.getItem("current_note"), co.value)
    display(parseInt(localStorage.getItem("current_note")))
}


function remove_note()
{

        var cu = parseInt(localStorage.getItem("current_note"))
    if (cu <= parseInt(localStorage.getItem("note_counter")) && cu > 1)
    {
        var con = confirm("are you really want to delete this note ?")

        if (con)
        {
            for (i = cu; i < parseInt(localStorage.getItem("note_counter")); i++)
            {
                localStorage.setItem("note"+i.toString(),localStorage.getItem("note"+(i+1).toString()))
            }
            localStorage.removeItem("note" + localStorage.getItem("note_counter"))
            localStorage.setItem("note_counter", parseInt(localStorage.getItem("note_counter")) - 1)
            localStorage.setItem("current_note", cu - 1)
            display(cu-1)
            }
        
        }
}

display(parseInt(localStorage.getItem("current_note")))









// sites__________________________________________________________
// sites__________________________________________________________



const sites = document.querySelector("#sites")






if ( !localStorage.getItem("site_counter"))
    localStorage.setItem("site_counter", 0)





for (i = 1; i <=parseInt(localStorage.getItem("site_counter")); i++)
{    
    
  
    var str = localStorage.getItem("site" + i.toString())
  
    var arr = str.split("&")
  

    var path = arr[0]
    var nam = arr[1]
    add_site(path,nam)
}
    

/* 
 <div class="site_iteam">
        <a title="we make dev" href="https://wemakedevs.org/"
          ><img src="https://wemakedevs.org/favicon.ico" alt="we make dev" />
        </a>
        <i>we make dev</i>
        <button>remove</button>
      </div> */

function add_site(path, nam )
{

    const iteam = document.createElement("div");

    iteam.className = "site_iteam"

    iteam.innerHTML = `<a title="${nam}" href="${path}" target = "_blank"
    ><img src="${path}favicon.ico" alt="${nam}" />
  </a>
  <i>${nam}</i>
  <button class = "remove_site"> X</button>`
    
  

    iteam.addEventListener("mouseleave",
    
        function (event)
        {
            var re_but = iteam.querySelector(".remove_site")
            
            re_but.style.display = "none"

        }
    )
    
    iteam.addEventListener("mouseover",
        function (event) {
          
            var re_but = iteam.querySelector(".remove_site")
            
            re_but.style.display = "block"


            
           
        })

        iteam.querySelector(".remove_site").addEventListener("click",
                
                function (event)
                {
                
                if ( confirm("Are you really want to delete this site shortcut ?"))   
                    {
                        var del;
                    
                    
                        for (i = 1; i <= parseInt(localStorage.getItem("site_counter")); i++) {
                            if (iteam == sites.children[i]) {
                                del = i;
                                break;
                            }
                        }
                    
                  
                        iteam.remove()
                  
                        for (y = del; y < parseInt(localStorage.getItem("site_counter")); y++) {
                            localStorage.setItem("site" + y.toString(), localStorage.getItem("site" + ((y + 1).toString())))
                       
                        }
                        localStorage.removeItem("site" + localStorage.getItem("site_counter"))
                        localStorage.setItem("site_counter", parseInt(localStorage.getItem("site_counter")) - 1)
                    }
                   
           
                    
                 
                    

                   
                    }
            
    )

    sites.appendChild(iteam)
  


    
}





function save_site()
{
    var path = document.querySelector("#url").value;
    document.querySelector("#url").value = "";
    var nam = document.querySelector("#site_name").value;
    document.querySelector("#site_name").value = "";
    add_site(path,nam)

    var val = `${path}&${nam}`

    localStorage.setItem("site_counter", parseInt(localStorage.getItem("site_counter")) + 1)
    
    localStorage.setItem("site" + localStorage.getItem("site_counter"), val)
    
   cancel_site()



}

function cancel_site()
{
   
    document.querySelector("#site_add").style.display = "none";


}


document.querySelector("#create_site").addEventListener("click",

    function ()
    {
        console.log("run");
        document.querySelector("#site_add").style.display = "flex";

    }

)



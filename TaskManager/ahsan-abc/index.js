
const list = document.querySelector("#input")
const priority = document.querySelector("#priority")
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
    h = String(h).padStart(2, "0");
    m = String(m).padStart(2, "0");
    s = String(s).padStart(2, "0");

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

document.querySelector("#add_task").addEventListener("click", function ()
{
    if(list.value.trim() !== "")
    {
        add(
            list.value,
            priority.value,
            true
        );

        list.value = "";
    }
});








// to-do-list________________________________________________
// to-do-list________________________________________________
console.log(date)
console.log(date)

if (!localStorage.getItem("num"))
    localStorage.setItem("num", 0);

  








list.addEventListener("keyup",
    
    function (event) {

        if (event.key == "Enter" && this.value!= "") {
            add(this.value, priority.value, true)
            this.value = ""

        }    }
)
const add = (iteam, priorityValue, waha) => {

    const i = document.createElement("li");

    let priorityClass = priorityValue.toLowerCase();

    i.innerHTML = `
    
    <div class="task_content">

        <span class="priority_badge ${priorityClass}">
            ${priorityValue}
        </span>

        <span class="task_text">
            ${iteam}
        </span>

    </div>

    <button class="but">×</button>
    `;

    var b = true;

    i.addEventListener("click",
        function (event)
        {
            if(event.target.classList.contains("but"))
                return;

            if (b)
            {
                this.style.opacity = "0.6";
                this.style.textDecoration = "line-through";
                b = false;
            }
            else
            {
                this.style.opacity = "1";
                this.style.textDecoration = "none";
                b = true;
            }
        }
    );

    uo.appendChild(i);

    if (waha == true)
    {
        let count = parseInt(localStorage.getItem("num"));

        count++;

        localStorage.setItem("num", count);

        const task = {
            text: iteam,
            priority: priorityValue
        };

        localStorage.setItem(
            count.toString(),
            JSON.stringify(task)
        );
    }

    i.querySelector(".but").addEventListener("click",
        function ()
        {
            i.remove();
        }
    );
}

function del(num)
{
    for (i = num; i < parseInt(localStorage.getItem("num")); i++)
    {
        localStorage.setItem(
            i.toString(),
            localStorage.getItem((i + 1).toString())
        );
    }

    localStorage.removeItem(localStorage.getItem("num"));

    localStorage.setItem(
        "num",
        parseInt(localStorage.getItem("num")) - 1
    );
}

function exportCSV()
{
    let csv = "Task,Priority\n";

    for (
        let i = 1;
        i <= parseInt(localStorage.getItem("num"));
        i++
    )
    {
        const task = JSON.parse(
            localStorage.getItem(i.toString())
        );

        if (task)
        {
            csv += `${task.text},${task.priority}\n`;
        }
    }

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "tasks.csv";

    link.click();
}  



for (i = 1; i <= parseInt(localStorage.getItem("num")); i++)
{
    if (localStorage.getItem(i.toString()))
    {
        const task = JSON.parse(
            localStorage.getItem(i.toString())
        );

        add(task.text, task.priority, false);
    }
}

// note-2__________________________________________________________________________________________
// note-2__________________________________________________________________________________________
// note-2__________________________________________________________________________________________

if ( !localStorage.getItem("note_counter"))
    localStorage.setItem("note_counter", 1)

if (!localStorage.getItem("current_note"))
{
    localStorage.setItem("current_note", 1);
    localStorage.setItem("note1", "");
}





const co = document.querySelector("#area");
const save = document.querySelector("#save")



function add_note()
{
    let count = parseInt(localStorage.getItem("note_counter"));

    count++;

    localStorage.setItem("note_counter", count);

    localStorage.setItem("note" + count, "");

    localStorage.setItem("current_note", count);

    display(count);
}

function display(no)
{
    if (
        no > 0 &&
        no <= parseInt(localStorage.getItem("note_counter"))
    )
    {
        const savedNote =
            localStorage.getItem("note" + no);

        co.value = savedNote || "";

        let total =
            localStorage.getItem("note_counter");

        document.querySelector("#show_count")
        .innerHTML = `${no}/${total}`;
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

    iteam.innerHTML = `
    <a title="${nam}" href="${path}" target="_blank">
        <img src="https://www.google.com/s2/favicons?domain=${path}&sz=64" alt="${nam}" />
    </a>

    <i>${nam}</i>

    <button class="remove_site">X</button>
    `;
    
  

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
                    
                    
                        for (let i = 0; i < sites.children.length; i++)
                            {
                                if (iteam == sites.children[i])
                                {
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



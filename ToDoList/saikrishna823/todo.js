const input=document.getElementById("task")
const add=document.getElementById("add")
const tasks=document.getElementById("tasks")
let isCompleted=false;
function addTask(){
  const inputValue=input.value;
if(inputValue.length===0){
    alert("Kindly enter a Task Name ")
    }
        else{
            tasks.innerHTML+=`<div class='task-container'>${inputValue}</div>`
        let allTasks=document.querySelectorAll(".task-container");
        allTasks.forEach((task)=>{
            task.onclick=()=>{
            task.style.textDecoration="line-through";
            task.style.backgroundColor="green";
        }
        })
          
        input.value=" ";
       
        }
        
    }


 
    

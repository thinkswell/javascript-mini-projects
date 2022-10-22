// initialize the count as 0
// listen for clicks on the increment button
// increment the count variable when the butto is clicked (log it out)
// change the count-el in the HTML to reflect the new count

let saveEl = document.getElementById("save-el")

let count =  0
let countEl = document.getElementById("count-el")

function increment(){
   count += 1
//    document.getElementById("count-el").innerText = count
countEl.innerText = count
}

function decrement(){
    count -= 1
 //    document.getElementById("count-el").innerText = count
 countEl.innerText = count
 }

// 1.) Grab the save-el paragraph and store it in a variable called saveEl
// 2.) Create a variable that contains both the count and separator,              i.e., "12 - "
// 3.) Render the variable in the saveEl using innerText
// NB: Make sure to not declare the existing content of the paragraph
function save(){
    let countStr = " " + count + " - "
    saveEl.innerText += countStr     // innerText can be used as textContent (MDN)
    count = countEl.innerText = 0
}


//concepts:
//script tag
//variables
//numbers
//strings
//console.log()
//functions
//the DOM
//getElementById()
//innerText
//textContent


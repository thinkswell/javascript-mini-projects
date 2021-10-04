console.log("This is Notes JAvascript")

document.getElementById('addBtn').addEventListener("click", add);
showNotes();

function add(e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let mySelector = document.getElementById('mySelector');

    let notes = localStorage.getItem("notes");
    let notesTitle = localStorage.getItem("notesTitle");
    let color = localStorage.getItem("color");

    console.log(notes);
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (notesTitle == null) {
        notesTitleObj = [];
    } else {
        notesTitleObj = JSON.parse(notesTitle);
    }
    if (color == null) {
        colorObj = [];
    } else {
        colorObj = JSON.parse(color);
    }
    notesObj.push(addTxt.value);
    notesTitleObj.push(addTitle.value);
    colorObj.push(mySelector.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj));
    localStorage.setItem("color", JSON.stringify(colorObj));

    addTxt.value = "";
    addTitle.value = "New Notes";
    mySelector = "";
    showNotes();
    showTime()
}


function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesTitle = localStorage.getItem("notesTitle");
    let color = localStorage.getItem("color");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (notesTitle == null) {
        notesTitleObj = [];
    } else {
        notesTitleObj = JSON.parse(notesTitle);
    }
    if (color == null) {
        colorObj = [];
    } else {
        colorObj = JSON.parse(color);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        let y = index + 90;
        let x = 'color' + y;
        let t1 = 'time'+index;
        html +=
            `<div class=" gradient-border newCard card mx-2 my-2 ${x}" id="${index+90}" style="width: 18rem;">
        <div class="card-body">
        <h7 id="${t1}">11:23</h7>
            <h5 class="card-title" >${notesTitleObj[index]}</h5>
            
            
            <p class="card-text" id="${index+10}">${element} </p>
            
            <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</button>
            <button id="${index}op" onclick="editNotes(${index+90}, ${index+10})" class=" btn btn-primary editBtn">Edit</button>
        </div>
    </div>`



    
        // let changerr = document.getElementsByClassName(x);
        // console.log(changerr);
        // changerr.innerHTML = `<p>bold</p>`;
        // switch (colorObj[index]) {
        //     case 0:
        //         change.style.backgroundColor = rgb(235, 22, 206);
        //         break;
        //     case 1:
        //         change.style.backgroundColor = rgb(194, 129, 129);
        //         break;
        //     case 2:
        //         change.style.backgroundColor = rgb(129, 187, 139);
        //         break;
        //     case 3:
        //         change.style.backgroundColor = rgb(173, 206, 142);
        //         break;


        // }
        
    // timechange.innerText = "12:34";
       
    });
    


    


    let notesEle = document.getElementById("allNotes");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    } else {
        notesEle.innerHTML = `<b class="nthng">Nothing to Show! Notes Empty --> Go to Add Notes section to add Notes </b>`
    }


    
    
}

// Show time

function showTime() {
    notesObj.forEach(function (element, index) {
        let t1 = 'time'+index;
        let timechange = document.getElementById(t1);
        timechange.style.color = "blue";
        timechange.style.opacity = 0.2;

        let newdate = new Date();
        console.log(newdate);
        let x = newdate.getDate();
        timechange.innerText = x+"/"+newdate.getMonth()+'/'+newdate.getFullYear();
        console.log(timechange.innerText);
        console.log("dgdffddf");


        let y = index + 90;
        // document.getElementById(y).style.backgroundColor = "red";


        let color = localStorage.getItem("color");
        if (color == null) {
            colorObj = [];
        } else {
            colorObj = JSON.parse(color);
        }

            switch (colorObj[index]) {
                case "1":
                    document.getElementById(y).style.backgroundColor = "pink";
                    break;
                case "2":
                    document.getElementById(y).style.backgroundColor = "red";
                    break;
                case "3":
                    document.getElementById(y).style.backgroundColor = "green";
                    break;
                case "4":
                    document.getElementById(y).style.backgroundColor = "yellowgreen";
                    break;
                
                default:
                    break;
            }
        
        

    });
}

// Delete Notes FUcntion

function deleteNotes(index) {
    console.log(index);
    let notes = localStorage.getItem("notes")
    let notesTitle = localStorage.getItem("notesTitle");
    let color = localStorage.getItem("color");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    if (notesTitle == null) {
        notesTitleObj = [];
    } else {
        notesTitleObj = JSON.parse(notesTitle);
    }
    if (color == null) {
        colorObj = [];
    } else {
        colorObj = JSON.parse(color);
    }

    notesObj.splice(index, 1);
    notesTitleObj.splice(index, 1);
    colorObj.splice(index, 1);


    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("color",JSON.stringify(colorObj))
    localStorage.setItem("notesTitle",JSON.stringify(notesTitleObj))
    showNotes();
    showTime();
}

let searchBtn = document.getElementById('searchTxt');
searchBtn.addEventListener("input", search);

function search() {
    let txt = searchBtn.value;
    console.log("Enterres:- ", txt);
    let cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(function (element) {
        let cardTxt = element.getElementsByClassName("card-text")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(txt)) {
            console.log("yes");
            element.style.display = "block";
        } else element.style.display = "none";
    });
}

//Edit Notes
function editNotes(yess, pa) {
    let index2 = document.getElementById(yess);
    let index3 = document.getElementById(pa);
    console.log(index2)
    // let html23 = index2.innerHTML;
    let htmll = `<textarea class="form-control editDiv" id="exampleFormControlTextarea1" rows="3" column="3">${index3.textContent}</textarea>
    <button id="op" onclick="saveData(${pa},${yess})" class=" btn btn-primary editBtn saveBtn">Save</button>
    `;
    console.log(index2);
    console.log(index3)

    index2.innerHTML = htmll;
    // console.log(index2);
    // showNotes();
    showTime()
}

function saveData(pa, yess) {
    index3 = document.getElementById(pa);
    let saveBtn = document.getElementById('exampleFormControlTextarea1');

    let notes = localStorage.getItem("notes")


    notesObj = JSON.parse(notes);
    notesObj[pa - 10] = saveBtn.value;
    console.log(saveBtn.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));


    let neww = `
    <div class="card-body">
        <h5 class="card-title">Notes ${pa-10+1}</h5>
        
        <p class="card-text" id="${pa-10+10}">${notesObj[pa-10]} </p>
        
        <button id="${pa-10}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</button>
        <button id="${pa-10}op" onclick="editNotes(${pa-10+90}, ${pa-10+10})" class=" btn btn-primary editBtn">Edit</button>
    </div>
    `;
    
    let index33 = document.getElementById(yess);
    index33.innerHTML = neww;
    showTime()


}
showTime();



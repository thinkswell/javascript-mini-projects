const new_bookmark_btn = document.getElementById("new_bkm");
const new_grp = document.getElementById("new_grp");
const overlay = document.querySelector(".overlay");
const closeBkmModal = document.querySelector(".closeBkm");
const closeGrpModal = document.querySelector(".closeGrp");
const new_grp_modal = document.querySelector(".new_group_modal");
const new_items_modal = document.querySelector(".new_items_modal");
const new_items_submit = document.getElementById('new_items_submit');
const new_grp_submit = document.getElementById("new_grp_submit");
var new_bkm_name = document.getElementById("bkm_name");
var new_bkm_url = document.getElementById("url");
var new_grp_name = document.getElementById("group_name");
const getBookmarks = JSON.parse(localStorage.getItem("data"));
const getGroups = JSON.parse(localStorage.getItem("groups"));
const display_grp = document.getElementById("group_list");
const display_bkm = document.getElementById("bookmarks_list");

let bookmarks_list = [];
let groups_list = [];
if(getBookmarks){
    bookmarks_list = getBookmarks;
}

if(getGroups){
    groups_list = getGroups;
}

const addBookmark = (name, url, groupName) =>{
    bookmarks_list.push({ name: name,
        url : url, 
        grpName : groupName
    });
};

const addGroup = (name) => {
    groups_list.push({
        name : name
    })
}

function grp_name(e){
    console.log(e);
}

function render_grp(){
    display_grp.innerText = "";
    groups_list.forEach(element => {
    let button = document.createElement('button');
    button.href = element.name;
    button.value = element.name;
    button.onclick = ()=>{
        grp_name(element.name);
    };
    let li = document.createElement('li');
    button.innerText = toTitleCase(element.name);
    li.appendChild(button);
    display_grp.appendChild(li);
    });
}

function render_bkm(){
    display_bkm.innerText = "";
    bookmarks_list.forEach(element =>{
        let anchor = document.createElement('a');
        anchor.href = `${element.url}`;
        let li = document.createElement('li');
        li.innerText = toTitleCase(element.name);
        anchor.appendChild(li);
        display_bkm.appendChild(anchor);
    });
}

let grp = "adsf"
// Functions Declaration 
function openModal(e){
    e.classList.remove("hidden");
    overlay.classList.remove("hidden");
    console.log("Modal opened")
}
function closeModal(e){
    e.classList.add("hidden");
    overlay.classList.add("hidden");
    console.log("Modal Closed")
    render_grp();
}

new_items_submit.addEventListener('click', ()=>{
    if(new_bkm_name.value != "" && new_bkm_url.value != ""){
        addBookmark(new_bkm_name.value, new_bkm_url.value, grp);
        localStorage.setItem('data', JSON.stringify(bookmarks_list));
        new_bkm_name.value = "";
        new_bkm_url.value = "";
    }
    closeModal(new_items_modal)
});

new_grp_submit.addEventListener('click', ()=>{
    if(new_grp_name.value != null){
        addGroup(new_grp_name.value);
        localStorage.setItem('groups', JSON.stringify(groups_list));
        new_grp_name.value = "";
    }
    closeModal(new_grp_modal);
});

// Open and close New bookmarks modal
new_bookmark_btn.addEventListener('click',()=>{openModal(new_items_modal)})
closeBkmModal.addEventListener('click',()=>{closeModal(new_items_modal)});
// Open and close New Group Modal
new_grp.addEventListener('click', ()=>{openModal(new_grp_modal)});
closeGrpModal.addEventListener('click', ()=>{closeModal(new_grp_modal)});
// Close on clicking on overlay
overlay.addEventListener('click', ()=>{
    closeModal(new_grp_modal)
    closeModal(new_items_modal)
})
// Close on escape
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !new_items_modal.classList.contains("hidden")) {
        closeModal(new_items_modal);
    } else if(e.key === "Escape" && !new_grp_modal.classList.contains("hidden")){
        closeModal(new_grp_modal);
    }
});

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}
render_grp();
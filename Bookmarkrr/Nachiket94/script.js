const new_bookmark_btn = document.getElementById("new_bkm");
const new_grp_btn = document.getElementById("new_grp");
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
const groups_list_ul = document.querySelector(".list");
const bkm_list_ul = document.querySelector(".bookmarks_block");

let tab_url;
let tab_title;
let list_item = "";
let bookmarks_list = [];
let groups_list = [];
let current_grp;
if(getBookmarks){
    bookmarks_list = getBookmarks;
}

if(getGroups){
    groups_list = getGroups;
}

function addBookmark(name, url, groupName) {
    bookmarks_list.push({
        name: toTitleCase(name),
        url: url,
        grpName: groupName
    });
}

function addGroup(name) {
    groups_list.push({
        name: toTitleCase(name)
    });
}

function grp_name(e){
    let bkm_to_display = [];
    let bkm_to_display_url = [];
    bkm_names_list = bookmarks_list.map(a => a.name);
    bkm_url_list = bookmarks_list.map(a => a.url);
    let bkm_grp_list = bookmarks_list.map(a => a.grpName);
    console.log(bkm_names_list)
    for(let i = 0; i < bookmarks_list.length; i++){
        if(bkm_grp_list[i] == e){
            bkm_to_display.push(bkm_names_list[i]);
            bkm_to_display_url.push(bkm_url_list[i]);
            console.log(bkm_to_display)
        }
    }
    render_bkm(bkm_to_display, bkm_to_display_url);
}

function render_grp(){
    display_grp.innerText = "";
    groups_list.forEach(element => {
    let button = document.createElement('button');
    button.href = element.name;
    button.value = element.name;
    button.onclick = ()=>{
        current_grp = element.name;
        grp_name(element.name);
        groups_list_ul.classList.add("hidden");
        bkm_list_ul.classList.toggle("hidden");
        new_bookmark_btn.classList.toggle("hidden");
        new_grp_btn.classList.add("hidden");
    };
    let li = document.createElement('li');
    button.innerText = element.name;
    li.appendChild(button);
    display_grp.appendChild(li);
    });
}

function render_bkm(names_list, url_list){
    display_bkm.innerText = "";
    list_item = "";
    for(let i = 0; i < names_list.length; i++){
        list_item += `
            <a href="${url_list[i]}" target="_blank">
                <li>${names_list[i]}</li>
            </a>
            <span class="delete">x</span>
        `
    }
    display_bkm.innerHTML = list_item;
}

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
    addBookmark(new_bkm_name.value, new_bkm_url.value, current_grp);
    localStorage.setItem('data', JSON.stringify(bookmarks_list));
    new_bkm_name.value = "";
    new_bkm_url.value = "";
    grp_name(current_grp);
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
new_bookmark_btn.addEventListener('click',()=>{
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        tab_url = tabs[0].url;
        tab_title = tabs[0].title;
        new_bkm_name.value = tab_title;
        new_bkm_url.value = tab_url;
    });
    openModal(new_items_modal)
})
closeBkmModal.addEventListener('click',()=>{closeModal(new_items_modal)});
// Open and close New Group Modal
new_grp_btn.addEventListener('click', ()=>{openModal(new_grp_modal)});
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
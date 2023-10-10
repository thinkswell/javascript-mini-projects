const cards=document.querySelectorAll(".cards");

cards.forEach(cards=>{
    cards.addEventListener('click',()=>{
        cards.classList.toggle('active');
    })
})
function remove(){
    cards.forEach(cards=>{
    cards.classList.remove('active');
})
}

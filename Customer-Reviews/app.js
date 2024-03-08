const reviews = [
    {
        id: 1,
        name: "Deogratius Kimaryo",
        job: "Developer",
        img: "images/deo-image.jpg",
        text: "Abc is a developer's haven. The robust tools, seamless integration, and extensive library make coding a breeze. The platform's constant updates and support reflect a commitment to empowering developers to create exceptional software.",
    },
    {
        id: 2,
        name: "Benie Fernandes",
        job: "Games Developer",
        img: "images/benie-image.jpg",
        text: "The Games takes gaming to new heights. With jaw-dropping graphics, immersive gameplay, and a vast game library, it's a must-have for both casual gamers and hardcore enthusiasts. The console's performance pushes the boundaries of what gaming technology can achieve.",  
    },
    {
        id: 3,
        name: "Beatrice John",
        job: "CyberSecurity Engineer",
        img: "images/bea-image.jpg",
        text: "XYZ is a fortress against online threats. Its advanced algorithms, real-time monitoring, and proactive approach to cybersecurity provide peace of mind in today's digital landscape. A must-install for anyone serious about protecting their digital assets.",
    }
]

//select items
const img = document.getElementById("img-person");
const  author = document.getElementById("author");
const  job = document.getElementById("job");
const  info = document.getElementById("info");

const nextBtn = document.querySelector(".bi-chevron-right");
const prevBtn = document.querySelector(".bi-chevron-left");

//set starting  item
let currentItem = 0;

//Load initial item
window.addEventListener("DOMContentLoaded", function(){
    showPerson(currentItem)
})

//show the person
function showPerson(person){
    const item = reviews[person];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

//show the next person
nextBtn.addEventListener('click', function(){
    currentItem++;
    if(currentItem > reviews.length -1){
        currentItem = 0;
    }
    showPerson(currentItem);
});

//show the prev person
prevBtn.addEventListener('click', function(){
    currentItem--;
    if(currentItem < 0){
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
});
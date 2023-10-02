let reviews = [{
    imageUrl: './person-1.jpg',
    name: 'Susan smith',
    designation: 'Web Developer',
    description: 'I am baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry'
},
{
    imageUrl: './person-1.jpg',
    name: 'John DOe',
    designation: 'Web Developer',
    description: 'I am baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry'
}
];


let activeIndex = 0;
window.addEventListener("DOMContentLoaded", function() {
    showPerson();
})

//previous button
prevButton = document.getElementById('prev-button');
prevButton.addEventListener('click',() => {
    if(activeIndex > 0) {
        activeIndex = activeIndex - 1;
    } else {
        prevButton.setAttribute('disabled', '');
    }
    console.log("active index: " + activeIndex);
});

prevButton.removeAttribute('disabled', '');


if(activeIndex < 1){
    prevButton.setAttribute('disabled', '');
} else if(activeIndex > reviews.length - 1 ){
    nextButton.setAttribute('disabled', '');
}

nextButton = document.getElementById('next-button');
nextButton.addEventListener('click',() => {
    if(activeIndex === reviews.length){
        nextButton.setAttribute('disabled', '');
        
    }else {
    activeIndex = activeIndex + 1;

    }

    showPerson();
    console.log("active index: " + activeIndex);

});


let cardImage = document.getElementById('card-image');
let title = document.getElementById('title');
let job = document.getElementById('job');
let description = document.getElementById('description');

function showPerson(){
    cardImage.src = reviews[activeIndex].imageUrl;
    title.textContent = reviews[activeIndex].name;
    job.textContent = reviews[activeIndex].designation;
    description.textContent = reviews[activeIndex].description;
}

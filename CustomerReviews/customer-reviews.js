// Starting mock data
let reviews = [
    {
        img: "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1",
        name: "Alice Johnson",
        review: "Great service and support!"
    },
    {
        img: "https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg",
        name: "Bob Smith",
        review: "Very satisfied with the purchase."
    },
    {
        img: "https://img.cutenesscdn.com/-/ppds/c639593c-3f0b-48a5-a623-13f772f411ba.png",
        name: "Carol White",
        review: "Could be better, but good overall."
    }
];
let currentIndex = 0;

function displayReview(index) {
    const img = document.getElementById('customer-image');
    const name = document.getElementById('customer-name');
    const review = document.getElementById('customer-review');
    img.style.opacity = 0;
    name.style.opacity = 0;
    review.style.opacity = 0;

    setTimeout(() => {
        img.src = reviews[index].img;
        name.innerText = reviews[index].name;
        review.innerText = reviews[index].review;
        img.style.opacity = 1;
        name.style.opacity = 1;
        review.style.opacity = 1;
    }, 500); 
}

function setupSidebar() {
    const sidebar = document.querySelector('.sidebar');
    reviews.forEach((review, index) => {
        const div = document.createElement('div');
        div.textContent = review.name;
        div.onclick = () => {
            currentIndex = index;
            displayReview(index);
        };
        sidebar.appendChild(div);
    });
}

function nextReview() {
    currentIndex = (currentIndex + 1) % reviews.length;
    displayReview(currentIndex);
}

function previousReview() {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    displayReview(currentIndex);
}

function randomReview() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * reviews.length);
    } while (randomIndex === currentIndex);
    currentIndex = randomIndex;
    displayReview(currentIndex);
}

window.onload = () => {
    displayReview(currentIndex);
    setupSidebar();
};

function toggleForm() {
    const form = document.getElementById('review-form');
    form.style.display = form.style.display === "none" ? "block" : "none";
}

document.getElementById('new-review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const review = document.getElementById('review').value;

    const newReview = { img: image, name: name, review: review };
    reviews.push(newReview);
    displayReview(reviews.length - 1);
    addReviewToSidebar(newReview, reviews.length - 1); 
    toggleForm(); 
});

function addReviewToSidebar(review, index) {
    const sidebar = document.querySelector('.sidebar');
    const div = document.createElement('div');
    div.textContent = review.name;
    div.onclick = () => {
        currentIndex = index;
        displayReview(index);
    };
    sidebar.appendChild(div);
}

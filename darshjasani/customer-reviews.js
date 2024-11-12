let reviews = [
    { name: "John Doe", image: "https://via.placeholder.com/100?text=JD", review: "This is an amazing product! I highly recommend it to everyone.", rating: 5 },
    { name: "Jane Smith", image: "https://via.placeholder.com/100?text=JS", review: "Great customer service and quick delivery. Will buy again!", rating: 4 },
    { name: "Mike Johnson", image: "https://via.placeholder.com/100?text=MJ", review: "The quality exceeded my expectations. Very satisfied!", rating: 4.5 }
];

let currentReview = 0;
let currentRating = 0;


function updateReview() {
    const review = reviews[currentReview];
    document.getElementById('customer-name').textContent = review.name;
    document.getElementById('customer-review').textContent = review.review;
    document.getElementById('customer-image').src = review.image;
    updateMainReviewStarRating(review.rating);
    
    document.getElementById('review-container').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('review-container').style.opacity = 1;
    }, 300);
}

function updateMainReviewStarRating(rating) {
    const starContainer = document.getElementById('customer-rating');
    starContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star');
        if (i <= rating) {
            star.classList.add('checked');
        }
        starContainer.appendChild(star);
    }
}

function updateModalStarRating(rating) {
    const stars = document.querySelectorAll('.modal .star-rating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'checked');
        } else {
            star.classList.remove('fas', 'checked');
            star.classList.add('far');
        }
    });
}


document.getElementById('prev-btn').addEventListener('click', () => {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    updateReview();
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentReview = (currentReview + 1) % reviews.length;
    updateReview();
});

document.getElementById('random-btn').addEventListener('click', () => {
    currentReview = Math.floor(Math.random() * reviews.length);
    updateReview();
});

// Modal functionality
const modal = document.getElementById('add-review-modal');
const addReviewBtn = document.getElementById('add-review-btn');
const closeBtn = document.getElementsByClassName('close')[0];

addReviewBtn.onclick = function() {
    modal.style.display = "block";
    currentRating = 0;
    updateModalStarRating(currentRating);
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Star rating functionality
// Star rating functionality
const modalStarRating = document.querySelector('.modal .star-rating');
modalStarRating.addEventListener('click', (e) => {
    if (e.target.matches('i')) {
        const rating = parseInt(e.target.getAttribute('data-rating'));
        currentRating = rating;
        updateModalStarRating(rating);
    }
});



function addEmoji(emoji) {
    const reviewTextarea = document.getElementById('new-review');
    reviewTextarea.value += emoji;
}

document.getElementById('submit-review').addEventListener('click', () => {
    const name = document.getElementById('new-name').value;
    const imageFile = document.getElementById('new-image').files[0];
    const review = document.getElementById('new-review').value;

    if (name && imageFile && review && currentRating > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            reviews.push({ name, image: e.target.result, review, rating: currentRating });
            currentReview = reviews.length - 1;
            updateReview();
            modal.style.display = "none";

            // Clear input fields
            document.getElementById('new-name').value = '';
            document.getElementById('new-image').value = '';
            document.getElementById('new-review').value = '';
            currentRating = 0;
            updateModalStarRating(currentRating);
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please fill in all fields and select a rating');
    }
});

updateReview();
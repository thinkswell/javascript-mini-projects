let canva = document.querySelector(".canva");

function changeColor(color, event) {
    canva.style.background = getComputedStyle(event.target).getPropertyValue('--clr');
    document.querySelectorAll('span').forEach(function(item) {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
}

document.querySelectorAll('span').forEach(function(span) {
    span.addEventListener('click', function(event) {
        changeColor(event.target.style.getPropertyValue('--clr'), event);
    });
});

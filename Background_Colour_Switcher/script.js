const buttons = document.querySelectorAll(".button")
const body = document.body


buttons.forEach( (button) => {
    button.addEventListener('click', (e) => {
        if (e.target.id) {
            body.style.backgroundColor = e.target.id;
            body.style.transition = "0.2s ease-in"
        }
    })
})
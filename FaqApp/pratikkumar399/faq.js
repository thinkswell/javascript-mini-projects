// lets grab the faq first

const faq = document.getElementsByClassName("faq-content");



for (let i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
        this.classList.toggle("active");
    })
}
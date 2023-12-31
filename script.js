const fortunes = [
    "Your future is looking bright!",
    "A new opportunity will come your way soon.",
    "You will find happiness in unexpected places.",
    "Don't be afraid to take risks.",
    "Good things will happen when you least expect them.",
    "Believe in yourself, and you will succeed."
  
];

document.getElementById("generate-fortune").addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const fortuneText = fortunes[randomIndex];
    document.querySelector(".fortune").textContent = fortuneText;
});

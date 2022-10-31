const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    let username = loginForm.username.value;
    let password = loginForm.password.value;

    // Set Username and Password here by changing values
    username = "user";
    password = "user";

    if (username === "user" && password === "user") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
});
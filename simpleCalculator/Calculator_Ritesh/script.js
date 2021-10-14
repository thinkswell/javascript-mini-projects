let result = document.querySelector(".result");
let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let allBtn = document.querySelectorAll(".btn");

allBtn.forEach(input =>{
    input.addEventListener("click", () => {
        if((input.textContent === `0` || input.textContent === `.`) && result.value.lenght === 0){
            return
        }
        result.value+= input.textContent;
    });
});

equal.addEventListener("click", () =>{
    if(result.value !== "") {
        result.value = eval(result.value);
    } else{
        alert("Enter valid input");
    }
});

clear.addEventListener("click",() => {
    result.value = "";
});

result.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && result.value !== "") {
        result.value = eval(result.value);
    }
});
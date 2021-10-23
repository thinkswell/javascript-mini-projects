
updateText = () => {
    let text = document.getElementById('text-input').value;
    document.getElementById('text-output').innerText = text
}

makeBold = (elem) => {
    elem.classList.toggle('active');
    document.getElementById('text-output').classList.toggle('bold');
}

makeItalic = (elem) => {
    elem.classList.toggle('active');
    document.getElementById('text-output').classList.toggle('italic')
}

makeUnderline = (elem) => {
    elem.classList.toggle('active');
    let formattedText = document.getElementById('text-output');
    if(formattedText.classList.contains('underline')) {
        formattedText.classList.remove('underline');
    } else {
        formattedText.classList.add('underline');
    }
}

alignText = (elem, alignType) => {
    document.getElementById('text-output').style.textAlign = alignType;
    let buttonList = document.getElementsByClassName('align');
    for(let buttonValue of buttonList) {
        buttonValue.classList.remove('active');
    }
    elem.classList.add('active');
    // for(let i = 0; i < buttonList.length; i++) {
    //     buttonList[i].classList.remove('active');
    // }
}


//ITERATIONS OF NORMAL JAVASCRIPT V/S ES6+ JAVASCRIPT
// let fruits = ["apple","papaya","guava","watermelon","orange","banana"];
// console.log("For loop:");
// for(let i = 0; i < fruits.length; i++) {
//     console.log(fruits[i]);
// }

// console.log("For of:");
// for(let j of fruits) {
//     console.log(j);
// }


//WE CANNOT USE RETURN INSIDE THE FOREACH FUNCTION AND SAVE THE VALUE TO OTHER VALUE; IT WILL COME AS UNDEFINED
// console.log("For Each:");
// fruits.forEach((data) => {
//     console.log(data);
// })


//HERE WE CAN USE RETURN INSIDE THE MAP FUNCTION AND GET THE VALUE IN SOME OTHER VARIABLE
// console.log("map:");
// fruits.map((value) => {
//     console.log(value);
// })

// let fruits = ["apple","papaya","guava","watermelon","orange","banana"];
// let newFruits = fruits.map((fruit) => {
//     return fruit;
// })

// console.log(newFruits);


//FILTER METHOD OF MAP FUNCTIONS IS EXPLAINED
// let fruits = ["apple","papaya","guava","watermelon","orange","banana"];
// newFruits = fruits.map((fruit) => {
//     return fruit
// }).filter((value) => {
//     if(value == "banana") {
//         return false
//     } else {
//         return true
//     }
// })
// console.log(newFruits)




//DESTRUCTURING

// let user = [
//     {
//         firstName: "Tushar",
//         lastName: "Maity"
//     },
//     (user) => {
//         console.log("I set the user to: ", user);
//     }
// ]

// let [newUser, setUser] = user;
// console.log(newUser);
// setUser({ firstName: "Cool", lastName: "Things"})



//PROMISES
// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve({
//         //     firstName: "Tushar",
//         //     latsName: "Maity"
//         // })
//         reject("Something went wrong: ")
//     }, 2000);
// })


// //then here is for success and catch here is for catching the errors
// promise.then((response) => {
//     console.log("Here is the response after 2s :");
//     console.log(response);
// }).catch((error) => {
//     console.log(error);
// })

// console.log("Hey!! should this run : ??");

//PROMISES WITH REAL API
//FETCHING THE DATA
// const URL = "https://randomuser.me/api/"

//     let userPromise = fetch(URL);
//     userPromise.then((response) => {
//         return response.json();
//     }).then((data) => {
//         console.log(data.results[0].name.first);
//         console.log(data.results[0].name.last);
//         console.log(data.results[0].location.country);
//         console.log(data.results[0].location.state);
//         console.log(data.results[0].location.city);
//         console.log("///////////////////")
//     })
//     .catch((error) => {
//         console.log(error);
//     })



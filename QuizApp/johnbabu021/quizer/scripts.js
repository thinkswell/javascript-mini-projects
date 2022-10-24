const header = document.querySelector('.headline')
const form = document.querySelector('.form')
const hamburger = document.querySelector('.hamburger')
const hamdiv = document.querySelector('.hamburger div')
const options = form.querySelectorAll('.option')
const answers = document.querySelectorAll('.ans')
const buttons = document.querySelectorAll('button')
const question = document.querySelector('.que')
const alertBox = document.querySelector('.alert__box')
const alertBoxScore = document.querySelector('.alert__box span')
const score = document.querySelector('.score')
const totalScore = document.querySelector(".total__score")
const themeSelector = document.querySelector('.theme_mode')


var axios;

// let xhttp = new XMLHttpRequest()
let x;
let index = 0;
let result = 0;
score.textContent = index
totalScore.textContent = result
alertBox.style.display = "none"
const arrlength = [0, 1, 2, 3]
arrlength.sort((a, b) => { return 0.5 - Math.random() })
hamburger.addEventListener('mouseover', hamFunction)
hamburger.addEventListener('mouseout', hamFunction1)
let correctAnswer;
let submitting = false;

const evalFunc = async function () {

    // if (xhttp.status === 200) {
        form.style.display = "block"
        toggleLoading()

        options.forEach(item => {
            item.checked = false;
        })
 
        if (x.results[index].incorrect_answers.length === 3) {
            answers[arrlength[0]].innerHTML = x.results[index].correct_answer
            answers[arrlength[1]].innerHTML = x.results[index].incorrect_answers[0]
            answers[arrlength[2]].innerHTML = x.results[index].incorrect_answers[1]
            answers[arrlength[3]].innerHTML = x.results[index].incorrect_answers[2]
            question.innerHTML = x.results[index].question
            correctAnswer = x.results[index].correct_answer;

        }
        else {
            index++;
            answers[arrlength[0]].innerHTML = x.results[index].correct_answer
            answers[arrlength[1]].innerHTML = x.results[index].incorrect_answers[0]
            answers[arrlength[2]].innerHTML = x.results[index].incorrect_answers[1]
            answers[arrlength[3]].innerHTML = x.results[index].incorrect_answers[2]
            question.innerHTML = x.results[index].question
            correctAnswer = x.results[index].correct_answer;


        }
    // }
}

// xhttp.onload = function() {
//     x = JSON.parse(this.response)
//     console.log(x);
//     evalFunc();
// }
// xhttp.open('GET', "https://opentdb.com/api.php?amount=10", true)
// xhttp.send()

async function getData() {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10`);
    return response;
}

(async() => {
    try {
        const result = await getData();   
        x = result.data;
        evalFunc();
    } catch (err) {
        console.log(err);
    }
})();




const onHandleSubmit = () => {
    var count = 0;
    if (submitting) {
        return; // ignore if the user has already submitted the answer for this question
    }
    (options.forEach((item) => {
        if (item.checked) {
            submitting = true;
            if (item.value === options[arrlength[0]].value) {
                var timer = 2;
                document.getElementById('timer').innerHTML = timer;
                document.getElementById('question_switch_info').style.visibility = "visible";
                var nextQuestionTimer = setInterval(function() {
                    timer -= 1;
                    if(timer <= 0) {
                        clearInterval(nextQuestionTimer);
                        document.getElementById('question_switch_info').style.visibility = "hidden";
                    }
                    document.getElementById('timer').innerHTML = timer;
                }, 1000)
              
                let correctAnswerId = options[arrlength[0]].value + 'a';
                showRightAnswer(correctAnswerId);
                function showRightAnswer() {
                    document.getElementById(options[arrlength[0]].value + 'a').classList.add('correct-answer');
                    setTimeout(() => {
                        form.style.display = "none"
                        index++
                        result++
                        evalFunc();
                        score.textContent = index
                        totalScore.textContent = result
                        document.getElementById(correctAnswerId).classList.remove('correct-answer');
                    }, 2000);
                }
            }
            else {
                var timer = 2;
                document.getElementById('timer').innerHTML = timer;
                document.getElementById('question_switch_info').style.visibility = "visible";
                var nextQuestionTimer = setInterval(function() {
                    timer -= 1;
                    if(timer <= 0) {
                        clearInterval(nextQuestionTimer);
                        document.getElementById('question_switch_info').style.visibility = "hidden";
                    }
                    document.getElementById('timer').innerHTML = timer;
                }, 1000)
              
                let correctAnswerId = options[arrlength[0]].value + 'a';
                let wrongAnswerId = item.value + 'a';
                showRightAndWrongAnswer();
                function showRightAndWrongAnswer() {
                    document.getElementById(correctAnswerId).classList.add('correct-answer');
                    document.getElementById(wrongAnswerId).classList.add('wrong-answer');
                    setTimeout(() => {
                        index++
                        evalFunc();
                        score.textContent = index
                        document.getElementById(correctAnswerId).classList.remove('correct-answer');
                        document.getElementById(wrongAnswerId).classList.remove('wrong-answer');
                    }, 2000);
                }
            }
            setTimeout(() => {
                toggleLoading()
                submitting = false;
            }, 2000)

            arrlength.sort((a, b) => { return 0.5 - Math.random() })

            if (index === 10) {
                alertBox.style.display = "block"
                alertBoxScore.textContent = result

            }

        }
        else {
            count++;
        }

    }))
    if (count == 4) {
        alert("Please select an option!");
    }

}

const toggleLoading = () => {
    document.querySelector(".form").classList.toggle("hide");
    document.querySelector(".form").classList.toggle("show");
    document.querySelector(".lds-ring").classList.toggle("hide");
    document.querySelector(".lds-ring").classList.toggle("show");

}

function hamFunction() {

    hamdiv.classList.add('blackhover')
}

function hamFunction1() {

    hamdiv.classList.remove('blackhover')
}

function onHandleReset() {
    index = 0;
    result = 0;
    toggleLoading()

    form.style.display = "none"
    // xhttp.onload = function () {

        // if (xhttp.status)

            // if (xhttp.status === 200) {

                async function getData() {
                    const response = await axios.get(`https://opentdb.com/api.php?amount=10`);
                    return response;
                }
                
                (async() => {
                    try {
                        const result = await getData();   
                        x = result.data;
                    
                    } catch (err) {
                        console.log(err);
                    }
                })();

                setTimeout(() => {
                    document.querySelector(".lds-ring").classList.add("hide");
                    form.style.display = "block"
                    form.classList.remove('hide')
                    form.classList.add('show')
                }, 2000)

                options.forEach(item => {
                    item.checked = false;
                })

                // x = JSON.parse(this.response)
                if (x.results[index].incorrect_answers.length === 3) {
                    answers[arrlength[0]].innerHTML = x.results[index].correct_answer
                    answers[arrlength[1]].innerHTML = x.results[index].incorrect_answers[0]
                    answers[arrlength[2]].innerHTML = x.results[index].incorrect_answers[1]
                    answers[arrlength[3]].innerHTML = x.results[index].incorrect_answers[2]
                    question.innerHTML = x.results[index].question
                    correctAnswer = x.results[index].correct_answer;

                }
                else {
                    index++;
                    answers[arrlength[0]].innerHTML = x.results[index].correct_answer
                    answers[arrlength[1]].innerHTML = x.results[index].incorrect_answers[0]
                    answers[arrlength[2]].innerHTML = x.results[index].incorrect_answers[1]
                    answers[arrlength[3]].innerHTML = x.results[index].incorrect_answers[2]
                    question.innerHTML = x.results[index].question
                    correctAnswer = x.results[index].correct_answer;


                }
            // }
    // }
    // xhttp.open('GET', "https://opentdb.com/api.php?amount=10", true)
    // xhttp.send()

 

    score.textContent = index
    totalScore.textContent = result
    alertBox.style.display = "none"
}

function darkMode() {
    document.body.classList.toggle("dark");
    document.querySelector('.right_btn')
    document.querySelector('.left_btn')
    document.querySelector('.container')

    localStorage.setItem('theme', themeSelector.textContent)
    const value = localStorage.getItem('theme')


    value === 'Dark Mode' ? themeSelector.textContent = "Light Mode" : themeSelector.textContent = "Dark Mode"
    document.querySelector(".form").classList.toggle("dark");
}

(function () {
    const value = localStorage.getItem('theme')
    if (value === 'Dark Mode') {
        darkMode()
    }
    else if (value === 'Light Mode') {
        return null
    }
    else {
        localStorage.setItem('theme', 'Light Mode')
    }
})()

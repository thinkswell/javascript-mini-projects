function memoryGame(targetEle) {
  targetEle.addEventListener("click", _verifyClick);

  let boxLength = 5;
  let lastLimit = 1;
  let highscore = localStorage.getItem("highScore") || 0;
  let currentScore = 0;
  let lastOrder = [];
  let btnele = "";
  let isRunning = false;

  /**
   *
   * @returns random value for highlight
   *  */

  function _RandomValues() {
    let min = 0;
    let max = boxLength;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function _updateHighScore() {
    highscore = Math.max(currentScore, highscore);
    let highscoreEle = document.getElementById("highscore");
    highscoreEle.innerText = Number(highscore);
    localStorage.setItem("highScore", highscore);
  }

  function _updateScore() {
    let scoreEle = document.getElementById("score");
    scoreEle.innerHTML = currentScore;
  }

  /**
   *
   * @param {*} eleId
   * @param {*} duration
   */

  function _blink(eleId, duration, idx = -1) {
    setTimeout(function () {
      let ele = document.getElementById(eleId);
      ele.classList.add("box__item--highlight");

      /**
       * remove the old class
       */

      setTimeout(function () {
        ele.classList.remove("box__item--highlight");
        if (idx == -1) {
          isRunning = false;
        }
        if (idx == lastOrder.length - 1) {
          isRunning = false;
        }
      }, 500);
    }, duration);
  }

  function _verifyClick(event) {
    if (
      !event.target.classList.contains("box__item") ||
      lastOrder.length == 0 ||
      isRunning
    ) {
      return;
    }

    let ele = event.target;

    if (Number(ele.dataset.idx) == lastOrder[0]) {
      _blink(Number(ele.dataset.idx), 0);
      lastOrder.shift();

      /**
       * caling the next time
       */
      if (lastOrder.length == 0) {
        currentScore++;
        _updateScore();
        _updateHighScore();
        lastLimit++;
        setTimeout(start, 2000);
      }
      return;
    }

    /**
     * incase selection is wrong
     */
    ele.classList.add("box__item--highlightwrong");
    setTimeout(function () {
      ele.classList.remove("box__item--highlightwrong");
    }, 500);
    targetEle.classList.add("moveanimation");

    /**
     * reset the variables
     *
     */

    lastLimit = 1;
    currentScore = 0;
    _updateScore();
    lastOrder = [];
    btnele.classList.remove("start__btn--disable");
  }

  function start(ele) {
    isRunning = true;
    if (ele) {
      btnele = ele;
      btnele.classList.add("start__btn--disable");
      targetEle.classList.remove("moveanimation");
    }

    for (let limit = 0; limit < lastLimit; limit++) {
      lastOrder.push(_RandomValues());
    }
    console.log(lastOrder);

    for (let idx = 0; idx < lastOrder.length; idx++) {
      _blink(lastOrder[idx], idx * 1000, idx);
    }
  }

  function render() {
    let tmpl = "";

    tmpl += `<div class= "flex justify-spacebetween m-b-10">    
          <div class="flex">
            Score :
            <span id="score">
              0
            </span>
          </div>

          <div class="flex">
            High Score :
            <span id="highscore">
              0
            </span>
          </div>
        </div>`;

    tmpl += '<div  class ="box">';
    for (let idx = 0; idx < boxLength; idx++) {
      tmpl += `<div class="box__item" id=${idx} data-idx = ${idx}></div>`;
    }
    tmpl += "</div>";
    targetEle.innerHTML = tmpl;
    _updateHighScore();
  }

  return {
    render: render,
    start: start,
  };
}

let container = document.getElementById("container");
let mg = new memoryGame(container);
mg.render();

let btn = document.querySelector(".start__btn");
btn.addEventListener("click", function () {
  mg.start(btn);
});

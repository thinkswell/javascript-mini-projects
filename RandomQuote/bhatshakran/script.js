import {
  colors,
  text,
  author,
  main_wrapper,
  inner,
  input__wrapper,
} from "./utils.js";

var select;

let UIController = (function () {
  return {
    displayItem: function (data, cat = false) {
      text.textContent = data.text;
      author.textContent = data.author;
      if (cat) {
        const random = Math.floor(Math.random() * (data.length - 1) + 1);
        text.textContent = data[random].text;
        author.textContent = data[random].author;
      }
    },

    changeColor: function () {
      let color1, color2;
      const random = Math.floor(Math.random() * (colors.length - 1) + 1);
      color1 = colors[random];
      main_wrapper.style.background = color1;
      color2 = colors[random - 1];
      inner.style.background = color2;
    },

    renderTags: function (data) {
      let selectList = document.createElement("select");
      selectList.id = "mySelect";
      selectList.name = "tags";
      input__wrapper.appendChild(selectList);
      select = selectList;

      for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.value = data[i].name;
        option.text = data[i].name;
        selectList.appendChild(option);
      }
    },
  };
})();

let controller = (function (UICtrl) {
  let setUpEventListeners = function () {
    const nextBtn = document.querySelector(".right__icon");

    nextBtn.addEventListener("click", generateQuote);
    window.addEventListener("DOMContentLoaded", async () => {
      await getTags();
      selectHandler();
      generateQuote(false);
    });
  };
  const selectHandler = () => {
    select.addEventListener("change", async () => {
      axios.head;
      const res = await axios.get(
        `https://goquotes-api.herokuapp.com/api/v1/all?type=tag&val=${select.value}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const quotes = res.data.quotes;

      // displayQuote
      UICtrl.displayItem(quotes, true);
      // change color
      UICtrl.changeColor();
    });
  };

  const generateQuote = async (x = true) => {
    //   send network request
    const res = await axios.get(
      "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
    );
    // quote variable
    const quote = res.data.quotes[0];
    // display quote in the ui
    UICtrl.displayItem(quote);
    // change ui color
    if (x !== false) {
      UICtrl.changeColor();
    }
  };

  const getTags = async () => {
    const res = await axios.get(
      "https://goquotes-api.herokuapp.com/api/v1/all/tags"
    );
    const tags = res.data.tags;

    // render tags in the ui
    UICtrl.renderTags(tags);
  };

  return {
    init: function () {
      console.log("Application started");
      setUpEventListeners();
    },
  };
})(UIController);

controller.init();

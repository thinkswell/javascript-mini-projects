const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let phonetics = "";
      let definitionContent = ``;
      data[0].phonetics.forEach((element) => {
        if (element.hasOwnProperty("text")) {
          phonetics += element.text + " ";
        }
      });
      data[0].meanings.forEach((element) => {
        let def = ``;
        let num=1;
        element.definitions.forEach((element) => {
          def += String(num)+`.` + element.definition+`<br><br>`;
          num++;
        });
        definitionContent += `<div class="details">
        <p>${element.partOfSpeech}</p>
        <p>${phonetics}</p>
        </div>
        <p class="word-meaning">
        ${def}
      </p>
      <p class="word-example">
        ${element.definitions[0].example || "No Example found"}
      </p>`;
      });
      result.innerHTML =
        ` <div class="word">
      <h3>${inpWord}</h3>
      <button onclick="playSound()">
        <span class="material-symbols-rounded"> volume_up </span>
      </button>
    </div>` + definitionContent;

      let audioLink;
      for (let audio in data[0].phonetics) {
        if (audio !== "") {
          audioLink = audio;
          break;
        }
      }

      sound.setAttribute(
        "src",
        `${
          //   data[0].phonetics[0].audio === ""
          //     ? data[0].phonetics[1].audio
          //     : data[0].phonetics[0].audio
          audioLink
        }`
      );
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't find the Word!</h3>`;
    });
});
function playSound() {
  sound.play();
}

const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const infoText = wrapper.querySelector(".info-text");
const synonyms = wrapper.querySelector(".synonyms .list");
const volumeIcon = wrapper.querySelector(".word i");
const removeIcon = wrapper.querySelector(".search span");
let audio;

function data(result, word) {
  wrapper.classList.remove("active");
  wrapper.offsetWidth;
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span> ${word}</span>. Please search another word.`;
  } else {
    wrapper.classList.add("active");
    document.querySelector(".word p").innerText = result[0].word;
    phonetics = "";
    if (result[0].phonetics[0] !== undefined)
      phonetics = result[0].phonetics[0].text;
    document.querySelector(
      ".word span"
    ).innerText = `${result[0].meanings[0].partOfSpeech} ${phonetics}`;
    document.querySelector(".meaning span").innerText =
      result[0].meanings[0].definitions[0].definition.split(";")[0];
    document.querySelector(".example span").innerText =
      result[0].meanings[0].definitions[0].example || "Not Available";

    audio = new Audio(result[0].phonetics[0].audio);
    if (result[0].meanings[0].synonyms.length === 0) {
      synonyms.parentElement.style.display = "none";
    } else synonyms.parentElement.style.display = "block";

    synonyms.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      let tag = `<span onclick="search('${
        result[0].meanings[0].synonyms[i]
      }')">${result[0].meanings[0].synonyms[i] || ""}</span>`;

      synonyms.insertAdjacentHTML("beforeend", tag);
    }
  }
}

function fetchAPI(word) {
  wrapper.classList.remove("active");
  infoText.style.cssText = " padding: 12px; color:black";
  infoText.innerHTML = `Searching the meaning of <span> ${word}</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      infoText.style.color = "red";
      infoText.innerHTML = "Something went wrong.<br/> Error: " + error.message;
    })
    .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchAPI(e.target.value);
  }
});

volumeIcon.addEventListener("click", () => {
  if (audio.attributes[1].nodeValue.length === 0) {
    no_audio1 = new Audio(
      "https://api.dictionaryapi.dev/media/pronunciations/en/not-us.mp3"
    );
    no_audio2 = new Audio(
      "https://api.dictionaryapi.dev/media/pronunciations/en/available-us.mp3"
    );
    no_audio1.play();
    setTimeout(() => {
      no_audio2.play();
    }, 150);
  } else audio.play();
});

function search(word) {
  searchInput.value = word;
  fetchAPI(word);
}

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.innerHTML = "Type the word and press enter";
  infoText.style.cssText = " padding: 0px; color:#9a9a9a";
});

const getRandomInt = (max) => {
  return Math.floor(1 + Math.random() * (max - 1));
};

const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1/",
  Headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

const dom = {
  logo: document.getElementById("logo"),
  results: document.getElementById("results"),
  input: document.getElementById("input"),
  items: document.getElementById("search-items"),
};

let breeds = [];
const get_breeds = api.get("breeds");
get_breeds.then((res) => {
  breeds = res.data;
});

const HandleResultRendering = (breed) => {
  dom.items.innerHTML = "";
  document.getElementById("input").value = breed.name;
  console.log("🚀 ~ file: index.js:22 ~ HandleResultRendering ~ breed", breed);
  document.getElementById("results-img").src = breed.image.url;
  document.getElementById("temperament").textContent = breed.temperament;
  document.getElementById("life_span").textContent = breed.life_span;
  document.getElementById("origin").textContent =
    breed.origin === "" ? "unknown" : breed.origin;

  let progress_bars = Array.from(
    document.getElementsByClassName("progress-bar")
  );

  progress_bars.map((p, i) => {
    console.log("Amineee ", i);
    let intel = getRandomInt(5);

    [1, 2, 3, 4, 5].map((i, index) => {
      let bar = p.children[index];
      if (index < intel) bar.dataset.progress = "true";
      else bar.dataset.progress = "false";
    });

    let span = p.children[5];
    span.textContent = `${intel}/5`;

    if (intel < 3) span.dataset.dark = "false";
    else span.dataset.dark = "true";
  });

  // hide the logo on search
  dom.logo.dataset.show = "false";

  // desplay the results
  dom.results.dataset.show = "true";
};

const getBreeds = (e) => {
  let breed = e.target.value;
  console.log("🚀 ~ file: index.js:46 ~ getBreeds ~ breed", breed);
  dom.items.innerHTML = "";
  if (e.target.value === "") return false;
  breeds.filter((b, i) => {
    if (b.name.includes(breed)) {
      console.log("true");
      let item = document.createElement("div");
      item.className = "search__items__item";
      item.textContent = b.name;
      item.id = item + String(i);

      // add an eventlistner to the items
      item.addEventListener("click", () => HandleResultRendering(b));

      dom.items.append(item);
    }
  });
  return true;
};

dom.input.addEventListener("keyup", getBreeds);

const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1/",
  Headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

const dom = {
  input: document.getElementById("input"),
  items: document.getElementById("search-items"),
};

let breeds = [];
const get_breeds = api.get("breeds");
get_breeds.then((res) => {
  breeds = res.data;
});

const getBreeds = (e) => {
  let breed = e.target.value;
  console.log("🚀 ~ file: index.js:46 ~ getBreeds ~ breed", breed);
  dom.items.innerHTML = "";
  if (e.target.value === "") return false;
  breeds.filter((b) => {
    if (b.name.includes(breed)) {
      console.log("true");
      let item = document.createElement("div");
      item.className = "search__items__item";
      item.textContent = b.name;
      dom.items.append(item);
    }
  });
  return true;
};

dom.input.addEventListener("keyup", getBreeds);

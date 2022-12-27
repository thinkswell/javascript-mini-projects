"use strict";

const dom = {
  input: document.getElementById("input"),
  items: document.getElementById("search-items"),
};

const breeds = [
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item2",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item3",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item4",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item5",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item6",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item7",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item8",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
];

const getBreeds = (e) => {
  let breed = e.target.value;
  console.log("🚀 ~ file: index.js:46 ~ getBreeds ~ breed", breed);
  dom.items.innerHTML = "";
  breeds.filter((b) => {
    if (b.name.includes(breed)) {
      console.log("true");
      let item = document.createElement("div");
      item.className = "search__items__item";
      item.textContent = b.name;
      dom.items.append(item);
    }
    console.log("false");
  });
};

dom.input.addEventListener("keyup", getBreeds);

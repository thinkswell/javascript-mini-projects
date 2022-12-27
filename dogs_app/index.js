"use strict";

const breeds = [
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
  {
    name: "item1",
    description: "dfsf sdfs fsdf sdfsdf sdfsdfs sdfsdfsf dsf",
    life_span: 14,
  },
];

const getBreeds = (e) => {
  let breed = e.target.value;
  console.log("🚀 ~ file: index.js:46 ~ getBreeds ~ breed", breed);
  return breeds.filter((b) => b.name === breed);
};

const dom = {
  input: document.getElementById("input"),
};

dom.input.addEventListener("change", getBreeds);

const axios = require("axios");


export const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1/",
  Headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
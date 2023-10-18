// Importing functions from filter.js library
import { toGrayscale, toCool, toWarm, toWeightedGrayscale, toOil_painting, toSharpen, toFrost, toVignette, toKissMe, toBlackWhite, toIvory,toIvorySecond, toFade, toClassic, toSoft, toBlossom, toCartoon } from "./filter.js";

// console.log("Image processing");

const file = document.getElementById("img"); // File input
let originalImageData; // Variable to store the image data of the uploded file
let filteredImageData; // Variable to store the image data of the filtered image
let brightnessValue = 0; // variable to store the currentBrightness value
let coolValue = 0; // variable to store the currentCool value
let warmValue = 0; // variable to store the current warm value

// canvas element to draw the uploaded image
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

// Variable to store the uploaded image
let uploadedImg = new Image();

// Dictionary to hold different filtes and its values
let addedFilters = [];

// On uploading the file on the file input
file.addEventListener('change', (e) => {
    // console.log(e.target.files[0]);

    const imgFile = e.target.files[0]; // Getting the firs uploaded file

    const reader = new FileReader(); // Filereader to read the file
    let imgUrl = reader.readAsDataURL(imgFile); // Reading file using file reader and getting image url

    // When the file reader is done reading the uploaded file
    reader.onloadend = function (e) {
        uploadedImg.src = e.target.result; // Setting src of image as the image url read by file reader 

        // When image is done loading
        uploadedImg.onload = function (element) {
            console.log("Image is loaded");
        }
    }
})


// Upload button function
let uploadBtn = document.querySelector("#upload");
uploadBtn.addEventListener("click", () => {
    //calculating image canvas width and height
    canvas.width = uploadedImg.width;
    canvas.height = uploadedImg.height;

    // ctx.drawImage(uploadedImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImg, 0, 0);

    // Getting image data from the image
    originalImageData = ctx.getImageData(0, 0, uploadedImg.width, uploadedImg.height);
    filteredImageData = originalImageData;

    brightnessValue = 0;
    coolValue = 0;
    warmValue = 0;
})

// Coverting the image to grayscale when clicking on grayscale button
let grayscaleBtn = document.querySelector('#grayscale');
grayscaleBtn.addEventListener('click', function () {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toGrayscale(originalImageData);

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);
})


// To changed image into weightedGrayscale
let weightedGrayscale = document.querySelector("#weightedGrayscale");
weightedGrayscale.addEventListener('click', (e) => {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toWeightedGrayscale(originalImageData);

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);
})

// For changing the brightness
let brightnessBtn = document.querySelector('#brightness');
brightnessBtn.addEventListener('change', (e) => {

    // Getting the current brightness value
    let currentBrightness = parseInt(e.target.value);
    brightnessImage(currentBrightness);

})

// for changing cool
let coolBtn = document.querySelector('#cool');
coolBtn.addEventListener('change', (e) => {

    // warmBtn.value = 0;
    // Getting the current cool value
    let currentCoolValue = parseInt(e.target.value);

    // Getting the modified, according to cool function, image data
    filteredImageData = toCool(originalImageData, currentCoolValue);
    coolValue = currentCoolValue;

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);
})

// for changing cool
let warmBtn = document.querySelector('#warm');
warmBtn.addEventListener('change', (e) => {

    // coolBtn.value = 0;
    // Getting the current warm value
    let currentWarmValue = parseInt(e.target.value);

    // Getting the modified, according to cool function, image data
    filteredImageData = toWarm(originalImageData, currentWarmValue);

    warmValue = currentWarmValue;

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);

})

//Sketch filter
let oil_painting = document.querySelector('#oil_painting');
oil_painting.addEventListener('click', function () {

    // Getting the modified, according to grayscale function, image data
    filteredImageData = toOil_painting(originalImageData);

    // Drawing the image on canvas
    ctx.putImageData(filteredImageData, 0, 0);

})

// removing all filters
let originalImageBtn = document.querySelector("#original");
originalImageBtn.addEventListener('click', (e) => {
    //assigning original image data to filtered image data
    filteredImageData = originalImageData;

    ctx.putImageData(filteredImageData, 0, 0);

    brightnessValue = 0;
    coolValue = 0;
    warmValue = 0;
})

// Downloading filtered image
let downloadBtn = document.querySelector("#download");
downloadBtn.addEventListener("click", (e) => {
    e.target.href = canvas.toDataURL("image/png");
})

// mean Blur filter
let meanBlurBtn = document.querySelector("#meanBlur");
meanBlurBtn.addEventListener("change", (e) => {

    blurImage(parseInt(e.target.value));
})


let sharp = document.querySelector('#toSharpen');
sharp.addEventListener('click', function () {
    //Getting sharppened image data
    filteredImageData = toSharpen(originalImageData);
    //drawing image to canvas
    ctx.putImageData(filteredImageData, 0, 0);
})


//contrast filter
let contrast = document.querySelector("#contrast");
contrast.addEventListener("change", (e) => {
    addContrast(parseInt(e.target.value));
})

// function to set change the blur of the image applicable only for this file
const blurImage = (value) => {

    ctx.filter = `blur(${value}px)`;
    ctx.drawImage(uploadedImg, 0, 0);
}

const brightnessImage = (value) => {

    ctx.filter = `brightness(${value}%)`;
    ctx.drawImage(uploadedImg, 0, 0);
}

const addContrast = (value) => {
    ctx.filter = `contrast(${value}%)`;
    ctx.drawImage(uploadedImg, 0, 0);
}

//soft button filter
let softBtn = document.querySelector("#soft");
softBtn.addEventListener("click", (e) => {
    // soft();
    ctx.filter = toSoft(originalImageData);
    ctx.drawImage(uploadedImg, 0, 0);
})

//frost button filter
let fadedBtn = document.querySelector("#faded");
fadedBtn.addEventListener("click", (e) => {
    ctx.filter = toFade(originalImageData);
    ctx.drawImage(uploadedImg, 0, 0);
})


let blossomBtn = document.querySelector("#blossom");
blossomBtn.addEventListener("click", (e) => {
    ctx.filter = toBlossom(originalImageData);
    ctx.drawImage(uploadedImg,0,0);
})


let ivoryBtn = document.querySelector("#ivory");
ivoryBtn.addEventListener("click", (e) => {
    ctx.filter = toIvory(originalImageData);
    ctx.drawImage(uploadedImg, 0, 0);
})

let blackwhiteBtn = document.querySelector("#blackwhite");
blackwhiteBtn.addEventListener("click", (e) => {
    // blackwhite();
    ctx.filter = toBlackWhite(originalImageData);
    ctx.drawImage(uploadedImg, 0, 0);
})


let classicBtn = document.querySelector("#classic");
classicBtn.addEventListener("click", (e) => { 
    ctx.filter = toClassic(originalImageData);
    ctx.drawImage(uploadedImg, 0, 0); 
})

let ivory2Btn = document.querySelector("#ivory2");
ivory2Btn.addEventListener("click", (e) => {
   ctx.filter = toIvorySecond(originalImageData);
   ctx.drawImage(uploadedImg, 0, 0);
})


let vignetteBtn = document.querySelector("#vignette");
vignetteBtn.addEventListener("click", (e) => {
    filteredImageData = toVignette(originalImageData);
    ctx.putImageData(filteredImageData, 0, 0);
})


let frostBtn = document.querySelector("#frost");
frostBtn.addEventListener("click", (e) => {
    filteredImageData = toFrost(originalImageData);
    ctx.putImageData(filteredImageData, 0, 0);
})

// Applying cartoon filter
let cartoonBtn = document.querySelector("#cartoon");
cartoonBtn.addEventListener("click", () => {
    filteredImageData = toCartoon(originalImageData);
    ctx.putImageData(filteredImageData, 0, 0);
})

// checking a new filter
let kissmeBtn = document.querySelector("#kissme");
kissmeBtn.addEventListener("click", () => {
    console.log('filteredImageData');
    let filteredImageData = toKissMe(originalImageData);
    ctx.putImageData(filteredImageData, 0, 0);
})
"use strict";
export const toGrayscale = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        let red = RGBVal[index];
        let green = RGBVal[index + 1];
        let blue = RGBVal[index + 2];

        let gray_value = (red + green + blue) / 3;
        newRGBVal[index] = gray_value;
        newRGBVal[index + 1] = gray_value;
        newRGBVal[index + 2] = gray_value;
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

export const toWarm = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        newRGBVal[index] = trucate(RGBVal[index] + value);
        newRGBVal[index + 1] = RGBVal[index + 1];
        newRGBVal[index + 2] = trucate(RGBVal[index + 2] - value);
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

export const toCool = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        newRGBVal[index] = trucate(RGBVal[index] - value);
        newRGBVal[index + 1] = RGBVal[index + 1];
        newRGBVal[index + 2] = trucate(RGBVal[index + 2] + value);
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

export const brightness = (imageData, value) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        newRGBVal[index] = trucate(RGBVal[index] + value);
        newRGBVal[index + 1] = trucate(RGBVal[index + 1] + value);
        newRGBVal[index + 2] = trucate(RGBVal[index + 2] + value);
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

export const toWeightedGrayscale = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        let red = RGBVal[index];
        let green = RGBVal[index + 1];
        let blue = RGBVal[index + 2];

        let gray = 0.3 * red + 0.59 * green + 0.11 * blue;
        newRGBVal[index] = gray;
        newRGBVal[index + 1] = gray;
        newRGBVal[index + 2] = gray;
        newRGBVal[index + 3] = RGBVal[index + 3];
    }

    return newImageData;
}

//balck and white function
export const toBlackWhite = (imageData) => {
    return "contrast(175%) saturate(0%) brightness(100%)";
}


//soft image filter
export const toSoft = (imageData) => {
    return "blur(0.6px) saturate(101%) contrast(113%) brightness(105%)";
}

//to fade filter
export const toFade = (imageData) => {
    return "blur(0.2px) saturate(80%) contrast(100%) brightness(110%) grayscale(10%)";
}

//blossom filter
export const toBlossom = (imageData) => {
    return "saturate(180%) contrast(95%) brightness(130%)";
}

//ivory filter
export const toIvory = (imageData) => {
    return "contrast(75%) saturate(105%) brightness(100%) sepia(15%)";

}

//classic filter
export const toClassic = (imageData) => {
    return "contrast(125%) saturate(105%) brightness(80%) sepia(35%)";
}

//ivory second filter
export const toIvorySecond = (imageData) => {
    return "contrast(100%) saturate(100%) brightness(100%) sepia(100%)";
}



export const toOil_painting = (imageData) => {
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);

    let newRGBVal = newImageData.data;
    for (let index = 0; index < RGBVal.length; index += 4) {
        let avg = (RGBVal[index] + RGBVal[index + 1] + RGBVal[index + 2]) / 3;
        if (avg > 200) {
            newRGBVal[index] = 255;
            newRGBVal[index + 1] = 255;
            newRGBVal[index + 2] = 255;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else if (avg > 150) {
            newRGBVal[index] = 200;
            newRGBVal[index + 1] = 200;
            newRGBVal[index + 2] = 200;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else if (avg > 100) {
            newRGBVal[index] = 155;
            newRGBVal[index + 1] = 155;
            newRGBVal[index + 2] = 155;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else if (avg > 50) {
            newRGBVal[index] = 100;
            newRGBVal[index + 1] = 100;
            newRGBVal[index + 2] = 100;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
        else {
            newRGBVal[index] = 0;
            newRGBVal[index + 1] = 0;
            newRGBVal[index + 2] = 0;
            newRGBVal[index + 3] = RGBVal[index + 3];
        }
    }
    return newImageData;
}


const RGBtoHSL = (RGBArray) => {

    let HSLArray = [];

    let n = RGBArray.length;
    for (let i = 0; i < i; i += 4) {
        r = RGBArray[i] / 255;
        g = RGBArray[i + 1] / 255;
        b = RGBArray[i + 2] / 255;
        a = RGBArray[i + 3] / 255;

        max_ = max(r, g, b);
        min_ = min(r, g, b);

        let h, s, l;
        l = Math.round((max_ + min_) / 2);

        if (l < 0.5) s = (max_ - min_) / (max_ + min_);
        else s = (max_ - min_) / (2 - max_ - min_);

        if (max_ == r) h = (g - b) / (max_ - min_);
        else if (max_ == g) h = 2 - (b - r) / (max_ - min_);
        else h = 4 - (r - g) / (max_ - min_);

        HSLArray.push(h);
        HSLArray.push(s);
        HSLArray.push(l);
    }

    return HSLArray;
}


export const toSharpen = (imageData) => {
    let width = imageData.width;
    let height = imageData.height;
    let mix_value = 0.1;
    var x, sx, sy, red, green, blue, alpha, dstOff, srcOff, wt, cx, cy, scy, scx,
        weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = new Image(),
        dstData = imageData,
        dstBuff = dstData.data,
        srcBuff = imageData.data,
        y = height;

    while (y--) {
        x = width;
        while (x--) {
            sy = y;
            sx = x;
            dstOff = (y * width + x) * 4;
            red = 0;
            green = 0;
            blue = 0;
            alpha = 0;

            for (cy = 0; cy < katet; cy++) {
                for (cx = 0; cx < katet; cx++) {
                    scy = sy + cy - half;
                    scx = sx + cx - half;

                    if (scy >= 0 && scy < height && scx >= 0 && scx < width) {
                        srcOff = (scy * width + scx) * 4;
                        wt = weights[cy * katet + cx];

                        red += srcBuff[srcOff] * wt;
                        green += srcBuff[srcOff + 1] * wt;
                        blue += srcBuff[srcOff + 2] * wt;
                        alpha += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = red * mix_value + srcBuff[dstOff] * (1 - mix_value);
            dstBuff[dstOff + 1] = green * mix_value + srcBuff[dstOff + 1] * (1 - mix_value);
            dstBuff[dstOff + 2] = blue * mix_value + srcBuff[dstOff + 2] * (1 - mix_value);
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }
    console.log("Sharpen filter");
    return dstData;
}


// Mean blur filter
export const toMeanBlur = (imageData, windowSize) => {

    // todo have to improve the algorithm for large windowSize

    windowSize = windowSize < 1 ? 1 : windowSize;

    let RGBVal = imageData.data;
    let width = imageData.width;
    let height = imageData.height;

    let newImageData = new ImageData(width, height);
    let newRGBval = newImageData.data;

    for (let i = 0; i < height - windowSize - 1; i++) {
        for (let j = 0; j < width - windowSize - 1; j++) {
            let currSum = getSum(RGBVal, i, j, windowSize, width, height);

            for (let i = 0; i < currSum.length; i++) {
                currSum[i] /= windowSize * windowSize;
                Math.round(currSum[i]);
            }

            let p = ((i + Math.floor(windowSize / 2)) * width * 4) + ((j + Math.floor(windowSize / 2)) * 4);

            newRGBval[p] = currSum[0];
            newRGBval[p + 1] = currSum[1];
            newRGBval[p + 2] = currSum[2];
            newRGBval[p + 3] = RGBVal[p + 3];
        }


    }

    return newImageData;

}


//=============================== Utility functions ============================================


// Function to find the mean of a matrix
const mean = (arr, size) => {
    let sum = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            sum += arr[i][j];
        }
    }

    return sum / (size * size);
}

// function to find the variance of a matrix
const variance = (arr, size) => {

    let m = mean(arr, size);

    let sum = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            sum += Math.pow(arr[i][j] - m, 2);
        }
    }

    return sum / (size * size);
}

// function to find weight of a pixel
const weight = (b, s) => Math.exp(-b * s);

// function to find the distance of each pixel from center of the array
const distanceFromCenter = (size) => {

    let center = Math.floor(size / 2) - 1;
    let arr = [];

    for (let i = 0; i < size; i++) {
        let temp = [];
        for (let j = 0; j < size; j++) {
            temp.push(Math.sqrt(Math.pow(i - center, 2), Math.pow(j - center, 2)));
        }

        arr.push(temp);
    }

    print(arr);
}

const getPixel = (arr, x, y, width, height) => {
    let p = (x * 4 * width) + (y * 4);

    return [arr[p], arr[p + 1], arr[p + 2], arr[p + 3]];
}

const getSum = (arr, i, j, size, width, height) => {
    let sum = [0, 0, 0, 0];
    for (let k = i; k < i + size; k++) {
        for (let l = j; l < j + size; l++) {

            let pixel = getPixel(arr, k, l, width, height);
            sum[0] += pixel[0];
            sum[1] += pixel[1];
            sum[2] += pixel[2];
            sum[3] += pixel[3];

        }
    }

    return sum;
}


function saturate(imageData, value) {
    value = value / 100;
    var RGBVal = imageData.data;
    for (var index = 0; index < RGBVal.length; index += 4) {
        var red = RGBVal[index];
        var green = RGBVal[index + 1];
        var blue = RGBVal[index + 2];
        var gray = 0.2989 * red + 0.5870 * green + 0.1140 * blue; //weights from CCIR 601 spec
        RGBVal[index] = trucate(-gray * value + RGBVal[index] * (1 + value));
        RGBVal[index + 1] = trucate(-gray * value + RGBVal[index + 1] * (1 + value));
        RGBVal[index + 2] = trucate(-gray * value + RGBVal[index + 2] * (1 + value));
    }
    return imageData;
};



export const toFrost = (imageData) => {

    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;

    for (let index = 0; index < RGBVal.length; index += 4) {
        newRGBVal[index] = trucate(RGBVal[index] - 25);
        newRGBVal[index + 1] = RGBVal[index + 1];
        newRGBVal[index + 2] = trucate(RGBVal[index + 2] + 25);
        newRGBVal[index + 3] = RGBVal[index + 3];
    }


    newImageData = saturate(newImageData, 100);
    // newImageData = contrastImage(newImageData, 50);

    return newImageData;
}


//vignette image filter
export const toVignette = (imageData) => {
    let width = imageData.width;
    let height = imageData.height;
    let RGBVal = imageData.data;
    let newImageData = new ImageData(imageData.width, imageData.height);
    let newRGBVal = newImageData.data;
    let centerX = width / 2;
    let centerY = height / 2;
    let radius = Math.max(centerX, centerY);
    let maxDistance = radius * radius;
    for (let index = 0; index < RGBVal.length; index += 4) {
        let x = (index / 4) % width;
        let y = Math.floor((index / 4) / width);
        let distance = (x - centerX) * (x - centerX) + (y - centerY) * (y - centerY);
        let factor = 1 - distance / maxDistance;
        if (factor < 0) {
            factor = 0;
        }
        newRGBVal[index] = RGBVal[index] * factor;
        newRGBVal[index + 1] = RGBVal[index + 1] * factor;
        newRGBVal[index + 2] = RGBVal[index + 2] * factor;
        newRGBVal[index + 3] = RGBVal[index + 3];
    }
    return newImageData;
};


// Importing functions from usingopencv

export const toEdge = (imageData) => {

    // Making cv.Mat from image data
    let originalMat = new cv.matFromImageData(imageData);

    // Making an empty cv.Mat to store the result
    let edgeMat = new cv.Mat();

    originalMat.convertTo(edgeMat, cv.CV_8UC4, 1, 0);

    // converting the image to grayscale
    cv.cvtColor(edgeMat, edgeMat, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(edgeMat, edgeMat, 100, 120, 3.8, false);
    cv.cvtColor(edgeMat, edgeMat, cv.COLOR_GRAY2RGBA);

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data
    filteredImageData.data.set(edgeMat.data);

    return filteredImageData;
}

export const toBilateral = (imageData) => {
    // Making cv.Mat from image data

    // TODO this is not workings
    let originalMat = new cv.matFromImageData(imageData);

    // Making an empty cv.Mat to store the result
    let bilMat = new cv.Mat();

    originalMat.convertTo(bilMat, cv.CV_8U, 1, 0);

    // converting colorspace from rgba to rgb
    cv.cvtColor(bilMat, bilMat, cv.COLOR_RGBA2RGB, 0);
    // cv.adaptiveThreshold(bilMat, bilMat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 11, 12);

    cv.bilateralFilter(bilMat, bilMat, 9, 75, 75, cv.BORDER_DEFAULT);

    cv.cvtColor(bilMat, bilMat, cv.Color_RGB2RGBA, 0);

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data
    filteredImageData.data.set(bilMat.data);

    return filteredImageData;
}

export const toCartoon = (imageData) => {

    let edgeData = toMeanBlur(imageData, 5);
    console.log(edgeData);
    edgeData = toEdge(edgeData);

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data

    for (let i = 0; i < imageData.data.length; i += 4) {
        filteredImageData.data[i] = imageData.data[i] | imageData.data[i+1];
        filteredImageData.data[i + 1] = imageData.data[i + 1] | imageData.data[i + 2];
        filteredImageData.data[i + 2] = imageData.data[i + 2] | imageData.data[i];
        filteredImageData.data[i + 3] = imageData.data[i + 3];
    }

    return filteredImageData;

}

export const toKissMe = (imageData) => {

    let originalMat = new cv.matFromImageData(imageData);
    let anotherImageData = cv.imread('red-lips');

    cv.resize(anotherImageData, anotherImageData, new cv.Size(imageData.width / 2, imageData.height / 2), cv.INTER_AREA);

    let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data

    for (let i = 0; i < imageData.data.length; i += 4) {
        filteredImageData.data[i] = imageData.data[i];
        filteredImageData.data[i + 1] = imageData.data[i + 1];
        filteredImageData.data[i + 2] = imageData.data[i + 2];
        filteredImageData.data[i + 3] = imageData.data[i + 3];
    }

    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = i / (4 * imageData.width);
        x += (imageData.height / 2) - (anotherImageData.rows / 2);
        x = x * 4 * imageData.width;
        x = parseInt(x);

        if (anotherImageData.data[i] > 0) filteredImageData.data[x] = anotherImageData.data[i] & 255;
        if (anotherImageData.data[i + 1] > 0) filteredImageData.data[x + 1] = anotherImageData.data[i + 1] & 255;
        if (anotherImageData.data[i + 2] > 0) filteredImageData.data[x + 2] = anotherImageData.data[i + 2] & 255;
        if (anotherImageData.data[i + 3] > 0) filteredImageData.data[x + 3] = anotherImageData.data[i + 3] & 255;
    }

    return filteredImageData;
}


// Utility functions
const trucate = (value) => Math.min(255, Math.max(0, value));

function imageDataToImage(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
}

const gaussainKernel = (size, sigma) => {
    let sum = 0;

    let kernel = new Array(size);
    for (let i = 0; i < size; i++) {
        kernel[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            kernel[i][j] = Math.exp(-(Math.pow(i - size / 2, 2) + Math.pow(j - size / 2, 2)) / (2 * Math.pow(sigma, 2)));
            sum += kernel[i][j];
        }
    }

    // normalizing the kernel
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            kernel[i][j] /= sum;
        }
    }

    return kernel;
}

// function to find the transpose of a matrix
function transpose(matrix) {
    let result = new Array(matrix[0].length);
    for (let i = 0; i < matrix[0].length; i++) {
        result[i] = new Array(matrix.length);
        for (let j = 0; j < matrix.length; j++) {
            result[i][j] = matrix[j][i];
        }
    }
    return result;
}

// function to multiply two matrices
function multiply(matrix1, matrix2) {
    let result = new Array(matrix1.length);
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = new Array(matrix1[0].length);
        for (let j = 0; j < matrix1[0].length; j++) {
            result[i][j] = 0;
            for (let k = 0; k < matrix1.length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}

// function to convert a 2d araay to a 1d array
function flatten(matrix) {

    let result = new Array(matrix.length * matrix[0].length);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            result[i * matrix[0].length + j] = matrix[i][j];
        }
    }
    return result;
}

// //cartoon filter
// export const toCartoon = (imageData) => {

//     let edgeData = toBlur(imageData, 8);
//     console.log(edgeData);
//     edgeData = toEdge(edgeData);

//     let filteredImageData = new ImageData(imageData.width, imageData.height); // Converting the blurred image to image data

//     for (let i = 0; i < imageData.data.length; i += 4) {
//         filteredImageData.data[i] = imageData.data[i] | edgeData.data[i];
//         filteredImageData.data[i + 1] = imageData.data[i + 1] | edgeData.data[i + 1];
//         filteredImageData.data[i + 2] = imageData.data[i + 2] | edgeData.data[i + 2];
//         filteredImageData.data[i + 3] = imageData.data[i + 3];
//     }

//     return filteredImageData;

// }


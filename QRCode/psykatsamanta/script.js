let container1 = document.getElementById("container1");
let form = container1.querySelector("form");
let fileInput = form.querySelector("input");
let infoText = form.querySelector("p");
let QRData = container1.querySelector("textarea");
let QRImg = form.querySelector("img");
let copyBtn = document.getElementById("copy");
let resetBtn = document.getElementById("reset");

form.onclick = () => {
  fileInput.click();
};

fileInput.onchange = (e) => {
  let file = e.target.files[0];
  if (!file) {
    return;
  }
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(formData, file);
};

let fetchRequest = (formData, file) => {
  infoText.innerText = "QR Code is uploading ....";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "Upload QR Code To Scan"
        : "Couldn't Scan QR Code";
      if (!result) {
        return;
      }
      QRData.innerText = result;
      QRImg.src = URL.createObjectURL(file);
      container1.classList.add("active");
    })
    .catch(() => {
      QRData.innerText = "Couldn't Scan The QR Code";
    });
};

copyBtn.onclick = () => {
  let text = QRData.textContent;
  navigator.clipboard.writeText(text);
  copyBtn.style.background = "#2532a5";
  copyBtn.style.color = "#fff";
  setTimeout(() => {
    copyBtn.style.background = "#fff";
    copyBtn.style.color = "#3744bd";
  }, 100);
};

resetBtn.onclick = () => {
  resetBtn.style.background = "#2532a5";
  resetBtn.style.color = "#fff";
  setTimeout(() => {
    resetBtn.style.background = "#fff";
    resetBtn.style.color = "#3744bd";
  }, 100);
  container1.classList.remove("active");
};

let container2 = document.getElementById("container2");
let QRText = container2.querySelector(".form input");
let generateBtn = document.getElementById("generate");
let qrImg = container2.querySelector(".qr-code img");
let downloadBtn = document.getElementById("download");

generateBtn.onclick = () => {
  let QRValue = QRText.value;
  if (!QRValue) {
    return;
  }
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${QRValue}`;
  qrImg.onload = () => {
    container2.classList.add("activate");
  };
};

downloadBtn.onclick = () => {
  let ImageURL = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${QRText.value}`;
  //Fetching the response as a blob
  fetch(ImageURL)
    .then((res) => res.blob())
    .then((file) => {
      //URL.createObjectURL() creates a url of passed object
      let tempURL = URL.createObjectURL(file);
      //Create a anchor element
      let aTag = document.createElement("a");
      //Set its url as the tempurl
      aTag.href = tempURL;
      //Set the name of the downloaded file as filename
      aTag.download = file.type;
      document.body.appendChild(aTag);
      // console.log(file);
      // console.log(aTag.download);
      //Clicking the aTag so that the file download
      aTag.click();
      aTag.remove();
    });
};

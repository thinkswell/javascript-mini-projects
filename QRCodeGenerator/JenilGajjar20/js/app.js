const form = document.getElementById("generate-form");
const qrCode = document.getElementById("qrcode");

function onSubmitGenerate(e) {
  e.preventDefault();
  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Enter URL!!");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qrCode.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
}

function generateQRCode(url, size) {
  const qrCode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
}

function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

function clearUI() {
  qrCode.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();
}

function createSaveBtn(saveUrl) {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 text-white font-bold w-1/3 rounded hover:bg-red-700 py-2 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
}

hideSpinner();

form.addEventListener("submit", onSubmitGenerate);

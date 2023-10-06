const fileWorker = new Worker("fileWorker.js");
fileWorker.onmessage = (mssg) => {
  document.getElementById("rem").innerHTML = mssg.data;
};
document.getElementById("fileP").addEventListener("change", function () {
  let re = new FileReader();
  re.onload = function () {
    fileWorker.postMessage(document.getElementById("fileP").files[0]);
  };
  re.readAsText(this.files[0]);
});

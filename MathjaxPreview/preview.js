const textarea = document.getElementsByTagName('textarea')[0];
const previewBox = document.getElementById('result')

const renderPreview = (ev) => {
  previewBox.innerHTML = ev.target.value
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise()
}

textarea.addEventListener("input", renderPreview);

const titleInp = document.getElementById('title');
const codeInp = document.getElementById('code');
const saveBtn = document.getElementById('save');
const searchInp = document.getElementById('search');
const list = document.getElementById('snippets');

function render(filter = '') {
  chrome.storage.sync.get(null, items => {
    list.innerHTML = '';
    Object.keys(items)
      .filter(key => key.toLowerCase().includes(filter.toLowerCase()))
      .reverse()
      .forEach(key => {
        const data = items[key];
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${key}</strong>
          <button class="delete" data-key="${key}">×</button>
          <div class="code">${data.code}</div>
          <small>Saved: ${new Date(data.time).toLocaleString()}</small>
        `;
        li.querySelector('.delete').onclick = () => {
          chrome.storage.sync.remove(key, () => render(searchInp.value));
        };
        list.appendChild(li);
      });
  });
}

saveBtn.onclick = () => {
  const title = titleInp.value.trim();
  const code = codeInp.value.trim();
  if (!title || !code) return alert("Please fill both title and code!");
  
  chrome.storage.sync.set({
    [title]: { code, time: Date.now() }
  }, () => {
    titleInp.value = '';
    codeInp.value = '';
    render(searchInp.value);
  });
};

searchInp.oninput = () => render(searchInp.value);
render();
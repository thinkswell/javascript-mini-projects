function layerComponent() {
  let storage = JSON.parse(localStorage.getItem('todolist'));
  // if there is no item in localstorage, initialize new object array
  storage = storage ? storage : [];

  let layer = document.getElementById('layer-component');
  layer.innerHTML = '';

  // create a div element with class name 'list'
  function listElement(id, title, createdAt, resolved) {
    // set time with momentjs
    const time = moment(createdAt).locale('en-US').fromNow();

    return `
      <div class="list">
        <div class="list-info" style="opacity: ${resolved ? '0.5' : '1'}">
          <h3 class="title" style="text-decoration: ${resolved ? 'line-through' : 'none'}">${title}</h3>
          <p class="time">${time}</p>
        </div>
        <div class="list-action">
          <button
            class="fas fa-check btn resolved-btn"
            value=${id}
            style="box-shadow: ${resolved ? 'inset 0 0 10px #ccd8c8' : '0 0 10px #ccd8c8'}"
          ></button>
          <button value=${id} class="fas fa-minus btn delete-btn"></button>
        </div>
      </div>
    `;
  }

  storage.map(elem => {
    layer.innerHTML += listElement(
      elem.id,
      elem.title,
      elem.createdAt,
      elem.resolved,
    );
  });

  listAction();
}

function listAction() {
  const deleteBtn = document.querySelectorAll('.list .list-action .delete-btn');
  const resolvedBtn = document.querySelectorAll('.list .list-action .resolved-btn');

  // initialize delete list function
  function deleteList(listID) {
    let storage = JSON.parse(localStorage.getItem('todolist'));
    // if there is no item in localstorage, initialize new object array
    storage = storage ? storage : [];

    const res = storage.filter((elem) => {
      return elem.id !== listID
    });

    localStorage.setItem('todolist', JSON.stringify(res));
  }

  function resolvedList(listID) {
    let storage = JSON.parse(localStorage.getItem('todolist'));
    // if there is no item in localstorage, initialize new object array
    storage = storage ? storage : [];
    // find todolist data then change property value 'resolved' to 'true'
    storage.map((elem) => {
      if (elem.id === listID) {
        if (elem.resolved === true) {
          elem.resolved = false;
        }
        else {
          elem.resolved = true;
        }
      }
    });

    localStorage.setItem('todolist', JSON.stringify(storage));
  }

  deleteBtn.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      deleteList(event.target.value);

      // update todolist data
      layerComponent();
    });
  });

  resolvedBtn.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      resolvedList(event.target.value);

      // update todolist data
      layerComponent();
    });
  });
}

function inputComponent() {
  const inputField = document.getElementsByClassName('input-title')[0];
  const submitBtn = document.getElementById('submit-btn');

  // read user typing
  inputField.addEventListener('keyup', (event) => {
    inputField.value = event.target.value;
  });
  
  submitBtn.onclick = () => {
    let storage = JSON.parse(localStorage.getItem('todolist'));
    // if there is no item in localstorage, initialize new object array
    storage = storage ? storage : [];

    // create unique ID for each list
    const listID = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < 10; i++) {
      listID[i] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    
    // insert new data into storage array object
    storage.push({
      id: listID.join(''),
      title: inputField.value,
      createdAt: new Date(),
      resolved: false,
    });

    // update local storage with new data
    localStorage.setItem('todolist', JSON.stringify(storage));

    layerComponent();
    inputField.value = '';
  }
}

inputComponent();
layerComponent();
listAction();

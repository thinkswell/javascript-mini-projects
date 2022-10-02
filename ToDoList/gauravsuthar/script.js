const listContainer = document.querySelector('.list-container');
const addNewTodoButton = document.querySelector('.add-new-todo-button')
const addNewContent = document.querySelector('.add-new-content');
const footerButtons = document.getElementById('footer-buttons');
const addNewContentTextarea = document.querySelector('.add-new-content--textarea');
const submit = document.querySelector('.footer-buttons--submit');
const cancel = document.querySelector('.footer-buttons--cancel');
const deleteIcon = document.querySelector('.icon-delete');

const onOutsideClick = function(e) {
  if(!avatarContainer.contains(e.target)) {
    avatarContainer.classList.add('hidden')
  }
}
document.addEventListener('mousedown', onOutsideClick)
let id;
const data = [{
  id: 123,
  description: "Engineering Manager helps in department",
  url: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Prescription02&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Blue03&eyeType=Surprised&eyebrowType=Default&mouthType=Smile&skinColor=Pale",
  
},
             {
  id: 124,
  description: "Covid hell appeared in India",
  url: "https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Round&hatColor=Red&clotheType=ShirtVNeck&clotheColor=Black&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale",
  
},
]

const markupFunc = (el) => `<div data-id="${el.id}" class="xyz relative min-w-full ">
    <div class="todo-list overflow-hidden relative flex justify-between items-center rounded-md shadow-md bg-white font-sans font-light tracking-wide text-sm text-gray-600 cursor-pointer">
          <!-- <a href="#" class="cross-button hidden text-gray-500 absolute -top-1.5 -right-1.5 hover:text-red-500">
            <svg class="w-5 h-5" fill="#fff" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 
          </a> -->
          
        <span class="w-auto p-3 pr-0"><img draggable="false" src="${el.url}" class="w-12 h-12 rounded-full " alt="random user"></span>
        <p class="w-3/5 py-3 todo-list--text">${el.description}</p>
        <div class="self-stretch relative overflow-hidden">
        <a href="#" class="focus:outline-none h-full transform duration-75 px-3 flex justify-center items-center text-gray-500 focus:ring-2 focus:border-blue-300 todo-list--edit-button w-auto hover:text-blue-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></a>
        
       <a href="#" class="cross-button shadow-inner h-full opacity-0 absolute top-0 left-0.5 transform translate-x-full focus:outline-none px-3 flex justify-center items-center bg-red-600 hover:bg-red-700 text-gray-50 w-auto"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></a>
        </div>
      </div>
    <div class="re-editor shadow-xl rounded-md bg-white p-4 hidden">
      <textarea name="" id="" placeholder="Write something here..." rows="10" class="re-write-textarea text-gray-500 w-full border-2 border-gray-200 rounded p-4 resize-none outline-none focus:ring-2 focus:border-blue-300"></textarea>
      <div class="flex justify-between mt-2">
        <img draggable="false" src=${el.url} class="w-8 h-8 rounded-full " alt="random user">
        <div class="re-write-buttons text-sm">
          <button class="re-write-buttons--close py-1 px-3 transition-color duration-300 hover:text-white hover:bg-red-500 text-red-500 focus:outline-none focus:ring-2 focus:border-blue-300 border border-red-500 hover:border-red-500 rounded ">Close</button>
       <button class="re-write-buttons--save py-1 px-3 transition-color duration-300 hover:text-white hover:bg-green-600 bg-green-500 focus:outline-none focus:ring-2 focus:border-blue-300 text-gray-50 border border-green-500 rounded hover:border-green-600">Save</button>
        </div>
      </div>
    </div>
  </div>`

const renderTodoListScreen = function() {
  if(data.length === 0) {
    listContainer.insertAdjacentHTML('afterbegin', `<div class="empty-message p-3 text-red-500 text-center">Empty todo list ☹️</div>`);
  } else {
  data.forEach((list) => {
    const markup = markupFunc(list);
    listContainer.insertAdjacentHTML('afterbegin', markup);
  })  
  }
}
renderTodoListScreen();

const resetForm = function() {
  addNewContentTextarea.value = '';
  submit.disabled = true;
}


cancel.addEventListener('click', () => {
  addNewContent.classList.add('hidden');
  resetForm();
})

submit.addEventListener('click', (e) => {
  e.preventDefault();
  
  const inputValue = addNewContentTextarea.value;
  id = Date.now()
  const element = {
    id,
    description: inputValue,
    url: avatarSelector.children[0].src,
  }
  data.push(element)
  addNewContent.classList.add('hidden')
  listContainer.insertAdjacentHTML('afterbegin', markupFunc(element));
  resetForm();
})

addNewContentTextarea.addEventListener('input', function() {
  if(this.value) submit.disabled = false;
  else submit.disabled = true;
})

const descriptionTruncateOnDisplay = function(str) {
  
  return str.length >= 40 ? str.trim().slice(0,39) + '...' : str;
}

listContainer.addEventListener('click', function(e) {
  e.preventDefault();
  const editButton = e.target.closest('.todo-list--edit-button')
  const parentElement = e.target.closest('.xyz');
  const currentElement = data.find(element => element.id === +parentElement.dataset.id)
  if(editButton) 
    {
      const editButtonParent = editButton.closest('.xyz');
      addNewContent.classList.add('hidden')
      editButtonParent.querySelector('.re-editor').classList.toggle('hidden');
      editButtonParent.querySelector('.re-write-textarea').focus();
      editButtonParent.querySelector('.re-write-textarea').value =            currentElement.description;
      return;
}
  const saveButton = e.target.closest('.re-write-buttons--save');
  if(saveButton) {
   const inputValue = saveButton.closest('.re-editor').querySelector('.re-write-textarea').value;
   currentElement.description = inputValue;
    saveButton.closest('.re-editor').classList.add('hidden');
    parentElement.querySelector('.todo-list--text').textContent = descriptionTruncateOnDisplay(currentElement.description);
  }
  const closeButton = e.target.closest('.re-write-buttons--close');
  if(closeButton) closeButton.closest('.re-editor').classList.add('hidden');
  
  const deleteButton = e.target.closest('.cross-button');
  if(deleteButton) {
    const removeElementIndex = data.findIndex(element => element.id === parentElement.dataset.id)
    data.splice(removeElementIndex, 1)
    parentElement.style.transform = `translateX(-100px)`;
    parentElement.style.opacity = 0;
    setTimeout(() => parentElement.remove(), 300);
  }
})


let tick = 0;
const crossButtonSlider = function() {
 console.log(tick)
 document.querySelectorAll('.cross-button').forEach(element => {
   element.classList.toggle('left-0.5')
   element.classList.toggle('focus:ring-2')
   element.classList.toggle('focus:border-blue-300')
  element.style.opacity = tick ? 0 : 1;
   element.style.transform =  `translateX(${tick * 100}%)`
 });
}

deleteIcon.addEventListener('click', (e) => {
  e.preventDefault();
  if(!addNewContent.classList.contains('hidden')) {
    addNewContent.classList.add('hidden')
  }
   document.querySelectorAll('.todo-list--edit-button').forEach(element => {
  element.classList.toggle('opacity-0')
element.classList.toggle('invisible')
})
  crossButtonSlider();
  tick = tick ? 0 : 1;
})

addNewTodoButton.addEventListener('click', function() {
addNewContent.classList.remove('hidden'); 
addNewContentTextarea.focus();
   document.querySelectorAll('.todo-list--edit-button').forEach(element => {
  element.classList.remove('opacity-0')
element.classList.remove('invisible')
})
  tick = 1;
  crossButtonSlider();
  tick = 0;
})

const avatarSelector = document.querySelector('.avatar-selector')
const avatarContainer = document.querySelector('.avatar-container')
avatarSelector.addEventListener('click', function(e) {
  e.preventDefault();
  avatarContainer.classList.toggle('hidden');
})

avatarContainer.addEventListener('click', (e) => {
    e.preventDefault();
  if(!e.target.closest('.avatar-container')) avatarContainer.classList.add('hidden');
  const avatarLink = e.target.closest('.avatar-link');
  if(avatarLink) {
      avatarSelector.children[0].src = avatarLink.children[0].src;
    avatarContainer.classList.add('hidden');
  }
})
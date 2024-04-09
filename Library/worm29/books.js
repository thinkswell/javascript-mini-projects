let myLibrary = [];


function book(title, author, numOfPages, readOrNot) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readOrNot = readOrNot;
}


function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBook();
    saveLibrary();
}

function loadLibrary() {
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    else {
        myLibrary = [];
    }
    displayBook();
}

function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function displayBook() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = '';
    myLibrary.forEach((element, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const title = document.createElement('h2');
        title.textContent = `Title : ${element.title}`;

        const author = document.createElement('p');
        author.textContent = `Author: ${element.author}`;

        const numOfPages = document.createElement('p');
        numOfPages.textContent = `NumOfPages: ${element.numOfPages}`;

        const readOrNot = document.createElement('p');
        readOrNot.textContent = `Read Or Not: ${element.readOrNot}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-index', index);
        removeButton.addEventListener('click', function () {
            removeBookFromLibrary(this.getAttribute('data-index'));
        });


        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(numOfPages);
        bookCard.appendChild(readOrNot);
        bookCard.appendChild(removeButton);

        libraryContainer.appendChild(bookCard);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadLibrary();
    function addBookToTheLibrary(title, author, numOfPages, readOrNot) {
        const bookExists = myLibrary.some(book => book.title === title && book.author === author);
        if (!bookExists) {
            const newBook = new book(title, author, numOfPages, readOrNot)
            myLibrary.push(newBook);
            saveLibrary();
            displayBook();
        } else {
            const bookAlreadyExistsComponent = document.getElementById('book-exits-component');
            bookAlreadyExistsComponent.innerHTML = '';

            const message = document.createElement('p');
            message.textContent = "Book Already Exist!!";
            bookAlreadyExistsComponent.appendChild(message);

            setTimeout(() => {
                message.remove()
            }, 1000);
        }
    }

    const newBookBtn = document.getElementById('new-book-btn');
    const bookFormContainer = document.getElementById('book-form-container');
    const bookForm = document.getElementById('book-form');

    newBookBtn.addEventListener('click', function () {
        bookFormContainer.style.display = 'block';
    })

    bookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const numOfPages = document.getElementById('pages').value;
        const readOrNot = document.getElementById('readStatus').checked ? 'Read' : 'Not Read';

        addBookToTheLibrary(title, author, numOfPages, readOrNot);
        displayBook();

        bookForm.reset();
        bookFormContainer.style.display = 'none';
    });
})


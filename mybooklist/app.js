class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

//UI Object is used to do everything that happens on the frontend
class UI {
    constructor() { }
    addBookToTable(bookToAdd) {
        const bookList = document.querySelector('#book-list');
        // create table row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
    <td>${bookToAdd.title}</td>
    <td>${bookToAdd.author}</td>
    <td>${bookToAdd.isbn}</td>
    <td><a href='#' class='delete'>X<a></td>
    `;
        bookList.appendChild(newRow);
    }
    clearInputFields() {
        const inputFields = document.getElementsByTagName('input');
        for (const field of inputFields) {
            field.value = '';
        }
    }
    alertUser(message, color) {
        const resultContainer = document.getElementById('result-container');
        const newDiv = document.createElement('div');
        newDiv.style.backgroundColor = `${color}`;
        newDiv.style.textAlign = 'center';
        newDiv.style.borderRadius = '2em';
        newDiv.innerText = `${message}`;
        newDiv.className = 'row alert';
        resultContainer.insertAdjacentElement('afterbegin', newDiv);
        setTimeout(function () {
            document.getElementsByClassName('row alert')[0].remove();
        }, 3000);
    }
    deleteBook(target) {
        target.parentElement.parentElement.remove();
    }
}

class Storage {
    constructor () {

    }
    static addBookToLocalStorage(book) {
        const storage = Storage.loadLocalStorage()
        storage.push(book);
        localStorage.setItem('books', JSON.stringify(storage));
    }

    static deleteBookFromLocalStorage(book) {
        const trow = book.parentElement.parentElement;
        const td = trow.getElementsByClassName('td');
        console.log(td);
    }

    static loadLocalStorage(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBookFromLocalStorage(){
        const books = Storage.loadLocalStorage();
        const ui = new UI();
        books.forEach(element => {
            ui.addBookToTable(new Book(element.title, element.author, element.isbn));
        });
    }
}




// EventListener
document.addEventListener('DOMContentLoaded', Storage.displayBookFromLocalStorage);
document.getElementById('input-form').addEventListener('submit', function (e) {
    console.log('submitting');
    // get input values
    const bookTitle = document.querySelector('#book-title-input').value;
    const bookAuthor = document.querySelector('#book-author').value;
    const bookIsbn = document.querySelector('#isbn').value;
    const ui = new UI();
    const storage = new Storage();
    if (bookAuthor === '' || bookTitle === '' || bookIsbn === '') {
        ui.alertUser('At least one of the input fields is empty', '#fa7373');

    } else {
        // create book object
        const bookToAdd = new Book(bookTitle, bookAuthor, bookIsbn);
        //add the book
        ui.addBookToTable(bookToAdd);
        Storage.addBookToLocalStorage(bookToAdd);
        // clear the input fields
        ui.clearInputFields();
        ui.alertUser('Book added', '#16c710');
    }
    e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e){
    if (e.target.className === 'delete'){
        const ui = new UI();
        ui.deleteBook(e.target);
        Storage.deleteBookFromLocalStorage(e.target);
        ui.alertUser('Book deleted', '#e88923')
    }
    e.preventDefault();
});
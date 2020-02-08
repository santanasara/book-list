
class Book {
    constructor(title, author, year, id){
        this.title = title;
        this.author = author;
        this.year = year;
        this.id = id;
    }
}

class UI {
    static displayBookList(){
       

        const books = Storage.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete" id="${book.id}">Delete</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('year').value = '';

    }

}
class Storage {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Storage.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(id){
        const books = Storage.getBooks();
        books.forEach((book, index) => {
            if(String(book.id) === String(id)){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
document.addEventListener('DOMContentLoaded', UI.displayBookList);
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;

    if(title === '' || author === '' || year == ''){
        alert('Empty fields not allowed.');
    } 
    else {
        const book = new Book(title, author, year, new Date().getUTCMilliseconds());
        console.log(book);
        UI.addBookToList(book);
        Storage.addBook(book);
        UI.clearFields();

    }

    
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Storage.removeBook((e.target).id);
});


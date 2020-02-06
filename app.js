class Book {
    constructor(title, author, year){
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

class UI {
    static displayBookList(){
        const StoredBooks = [
            {
                title: 'Grande Sertão: Veredas',
                author: 'João Guimarães Rosa',
                year: '1945'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
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

document.addEventListener('DOMContentLoaded', UI.displayBookList);
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;

    const book = new Book(title, author, year);
    console.log(book);
    UI.addBookToList(book);
    UI.clearFields();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
});


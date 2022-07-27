function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

let display = new Display();

Display.prototype.showBooks = function () {
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }
    let html = '';
    booksObj.forEach(function (element,index) {
        html += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id = ${index} onclick = "display.deleteBook(this.id)" type="button" class="btn btn-primary">Delete</button></td>
                </tr>`;
    });
    let tableBody = document.getElementById('tableBody');
    let wholeTable = document.getElementById('wholeTable');
    if (booksObj.length != 0) {
        tableBody.innerHTML = html;
    } else {
        wholeTable.innerHTML = `"No Books to show!!"
        <br>
        Add new Books to Shelf.`
    }
    
    if (booksObj.length > 6) {
        wholeTable.style = "overflow-y:scroll; height:400px;";
    } else {
        wholeTable.style = "none";
    }
}


Display.prototype.deleteBook = function(index){
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }
    booksObj.splice(index,1);
    localStorage.setItem('books',JSON.stringify(booksObj));
    display.showBooks();
}

display.showBooks();

Display.prototype.add = function (book) {
    // console.log("Adding to UI");
    display.showBooks();
    // let tableBody = document.getElementById('tableBody');
    // let uiString = `<tr>
    //                     <td>${book.name}</td>
    //                     <td>${book.author}</td>
    //                     <td>${book.type}</td>
    //                     <td><button id = ${index} onclick = "disp.deleteBook(this.id)" type="button" class="btn btn-primary">Delete</button></td>
    //                 </tr>`;

    // tableBody.innerHTML += uiString;
}

Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2 || book.type == undefined) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

    setTimeout(() => {
        message.innerHTML = '';
    }, 2000);
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', formSubmitSection);

function formSubmitSection(e) {
    // console.log("you have submitted the form");
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let history = document.getElementById('history');
    let religious = document.getElementById('religious');
    let factual = document.getElementById('factual');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (history.checked) {
        type = history.value;
    }
    else if (religious.checked) {
        type = religious.value;
    }
    else if(factual.checked){
        type = factual.value;
    }

    let book = new Book(name, author, type);    
    
    if (display.validate(book)) {
        booksObj.push(book);
        localStorage.setItem('books', JSON.stringify(booksObj));
        display.showBooks();
        display.clear();
        display.show('success', 'Book added successfully');
    }
    else {
        display.show('danger', 'This Book cannot be added');
    }
    console.log(book);
    e.preventDefault();
}



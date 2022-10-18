const Book = require("./Book.js");

class Library {
  constructor() {
    this.books = [];
  }

  addBookIntoLibrary(book) {
    this.books.push(book);
  }

  getBooks() {
    return this.books;
  }

  getBookIndexByBookId(id) {
    return this.books.findIndex((book) => book.getId() === id);
  }

  getBookByIndex(index) {
    return this.books[index];
  }

  deleteBookFromLibrary(id) {
    const findedBookIndex = this.getBookIndexByBookId(id);
    if (findedBookIndex !== -1) this.books.splice(findedBookIndex, 1);
  }
}

module.exports = Library;

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

  getBookById(id) {
    return this.books.find((book) => book.getId() === id);
  }

  deleteBookFromLibraryByIndex(index) {
    if (index !== -1) [].splice.call(this.books, index, 1);
  }
}

module.exports = Library;

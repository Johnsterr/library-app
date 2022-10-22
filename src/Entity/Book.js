const {v4: uuidv4} = require("uuid");

class Book {
  constructor(
    title,
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = "",
    fileBook = "",
    id = uuidv4()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }

  getId() {
    return this.id;
  }

  updateTitle(title) {
    this.title = title;
  }

  updateDescription(description) {
    this.description = description;
  }

  updateFileBookCover(fileBook) {
    this.fileBook = fileBook;
  }

  getFileBookCover() {
    return this.fileBook;
  }
}

module.exports = Book;

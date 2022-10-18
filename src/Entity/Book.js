const {v4: uuidv4} = require("uuid");

class Book {
  constructor(
    title,
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = ""
  ) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
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
}

module.exports = Book;

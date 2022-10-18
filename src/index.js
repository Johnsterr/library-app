require("dotenv").config();
const express = require("express");
const Library = require("./Entity/Library.js");
const Book = require("./Entity/Book.js");

const arLibrary = new Library();

arLibrary.addBookIntoLibrary(new Book("Ведьмак", "Сага о Геральте из Ривии"));
arLibrary.addBookIntoLibrary(new Book("Дюна", "Фэнтази о пустунной планете"));

const app = express();
app.use(express.json());

app.post("/api/user/login", (req, res) => {
  res.status(201);
  res.json({id: 1, mail: "test@mail.ru"});
});

app.get("/api/books", (req, res) => {
  const books = arLibrary.getBooks();
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const {id} = req.params;
  const bookIndex = arLibrary.getBookIndexByBookId(id);

  if (bookIndex !== -1) {
    res.json(arLibrary.getBookByIndex(bookIndex));
  } else {
    res.status(404);
    res.json(`Книга с id: ${id} не найдена`);
  }
});

app.post("/api/books/", (req, res) => {
  const {title, description} = req.body;
  const newBook = new Book(title, description);

  arLibrary.addBookIntoLibrary(newBook);

  res.status(201);
  res.json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const {title, description} = req.body;
  const {id} = req.params;
  const book = arLibrary.getBookById(id);

  if (book) {
    book.updateTitle(title);
    book.updateDescription(description);

    res.status(201);
    res.json(book);
  } else {
    res.status(404);
    res.json(`Книга с id: ${id} не найдена`);
  }
});

app.delete("/api/books/:id", (req, res) => {
  const {id} = req.params;
  const bookIndex = arLibrary.getBookIndexByBookId(id);

  if (bookIndex !== -1) {
    arLibrary.deleteBookFromLibraryByIndex(bookIndex);

    res.status(200);
    res.json("ok");
  } else {
    res.status(404);
    res.json(`Книга с id: ${id} не найдена`);
  }
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT);

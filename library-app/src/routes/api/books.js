const nodePath = require("path");
const {Router} = require("express");
const router = Router();
const fileBook = require("../../middleware/fileBooks.js");

const Library = require("../../Entity/Library.js");
const Book = require("../../Entity/Book.js");

const arLibrary = new Library();

arLibrary.addBookIntoLibrary(
  new Book(
    "Ведьмак",
    "Сага о Геральте из Ривии",
    "А. Сапковский",
    "",
    "",
    "",
    "public/upload/books/21.10.2022_715-witcher-cover.jpg",
    "a139d9c2-a50e-4069-9667-588e27b71383"
  )
);
arLibrary.addBookIntoLibrary(
  new Book(
    "Дюна",
    "Фэнтази о пустынной планете",
    "Ф. Герберт",
    "",
    "",
    "",
    "",
    "59960142-10db-4f28-bf64-fd42f79b9f31"
  )
);

router.get("/", (req, res) => {
  const books = arLibrary.getBooks();
  res.json(books);
});

router.post("/", (req, res) => {
  const {title, description} = req.body;

  if (!title) {
    res.status(404);
    res.json({
      errorCode: 404,
      error: `Поле title должно быть заполнено`,
    });
  }
  const newBook = new Book(title, description);

  arLibrary.addBookIntoLibrary(newBook);

  res.status(201);
  res.json(newBook);
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  const bookIndex = arLibrary.getBookIndexByBookId(id);

  if (bookIndex !== -1) {
    res.json(arLibrary.getBookByIndex(bookIndex));
  } else {
    res.status(404);
    res.send({
      errorCode: 404,
      error: `Книга с id: ${id} не найдена`,
    });
  }
});

router.put("/:id", (req, res) => {
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
    res.send({
      errorCode: 404,
      error: `Книга с id: ${id} не найдена`,
    });
  }
});

router.delete("/:id", (req, res) => {
  const {id} = req.params;
  const bookIndex = arLibrary.getBookIndexByBookId(id);

  if (bookIndex !== -1) {
    arLibrary.deleteBookFromLibraryByIndex(bookIndex);

    res.status(200);
    res.json("ok");
  } else {
    res.status(404);
    res.send({
      errorCode: 404,
      error: `Книга с id: ${id} не найдена`,
    });
  }
});

router.post("/:id/upload", fileBook.single("book-cover-img"), (req, res) => {
  if (!req.file) {
    res.json();
  }
  const {path} = req.file;
  const {id} = req.params;
  const book = arLibrary.getBookById(id);

  if (book) {
    book.updateFileBookCover(path);

    res.status(200);
    res.json(book);
  } else {
    res.status(404);
    res.send({
      errorCode: 404,
      error: `Книга с id: ${id} не найдена`,
    });
  }
});

router.get("/:id/download", (req, res) => {
  const {id} = req.params;
  const book = arLibrary.getBookById(id);

  if (!book) {
    res.status(404);
    res.send({
      errorCode: 404,
      error: `Книга с id: ${id} не найдена`,
    });
  }

  if (book.getFileBookCover() === "") {
    res.status(404);
    res.send({
      errorCode: 404,
      error: `У книги с id: ${id} не найдена обложка`,
    });
  }

  const coverPath = nodePath.join(
    __dirname,
    `../../../${book.getFileBookCover()}`
  );
  res.status(200);
  res.download(coverPath);
});

module.exports = router;

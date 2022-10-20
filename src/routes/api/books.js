const {Router} = require("express");
const router = Router();

const Library = require("../../Entity/Library.js");
const Book = require("../../Entity/Book.js");

const arLibrary = new Library();

arLibrary.addBookIntoLibrary(new Book("Ведьмак", "Сага о Геральте из Ривии"));
arLibrary.addBookIntoLibrary(new Book("Дюна", "Фэнтази о пустунной планете"));

router.get("/", (req, res) => {
  const books = arLibrary.getBooks();
  res.json(books);
});

router.post("/", (req, res) => {
  const {title, description} = req.body;
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

module.exports = router;

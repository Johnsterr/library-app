const nodeHttp = require("http");
const {Router} = require("express");
const router = Router();

const Library = require("../Entity/Library.js");
const Book = require("../Entity/Book.js");

const APP_COUNTER_URL =
  process.env.APP_COUNTER_URL || "http://book-views-counter";
const APP_COUNTER_PORT = process.env.APP_COUNTER_PORT || 3030;
const apiUrl = new URL(`${APP_COUNTER_URL}:${APP_COUNTER_PORT}`);

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
    "Фэнтази о пустунной планете",
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

  res.render("index", {
    title: "Каталог книг",
    books: books,
  });
});

router.get("/create", (req, res) => {
  const newBook = new Book("");
  res.render("create", {
    title: "Книга | Создать",
    book: newBook,
  });
});

router.post("/create", (req, res) => {
  const {title, description} = req.body;
  const newBook = new Book(title, description);

  arLibrary.addBookIntoLibrary(newBook);

  res.redirect("/");
});

router.get("/view/:id", (req, res) => {
  const {id} = req.params;
  const findedBook = arLibrary.getBookById(id);

  if (id && findedBook) {
    const counterReq = nodeHttp.request(
      `${apiUrl}counter/${id}/incr`,
      {
        method: "POST",
      },
      (cb) => {
        let responseBody = "";
        cb.setEncoding("utf8");
        cb.on("data", (chunk) => {
          responseBody += chunk;
        });

        cb.on("end", () => {
          try {
            res.render("view", {
              title: "Книга | Просмотр",
              book: findedBook,
              views: JSON.parse(responseBody).views,
            });
          } catch (e) {
            console.error(`problem with request: ${e.message}`);
          }
        });
      }
    );
    counterReq.end();
  } else {
    res.redirect("/404");
  }
});

router.get("/update/:id", (req, res) => {
  const {id} = req.params;
  const findedBook = arLibrary.getBookById(id);

  if (findedBook) {
    res.render("update", {
      title: "Книга | Редактирование",
      book: findedBook,
    });
  } else {
    res.redirect("/404");
  }
});

router.post("/update/:id", (req, res) => {
  const {title, description} = req.body;
  const {id} = req.params;
  const book = arLibrary.getBookById(id);

  if (book) {
    book.updateTitle(title);
    book.updateDescription(description);

    res.redirect(`/view/${id}`);
  } else {
    res.redirect("/404");
  }
});

router.post("/delete/:id", (req, res) => {
  const {id} = req.params;
  const bookIndex = arLibrary.getBookIndexByBookId(id);

  if (bookIndex !== -1) {
    arLibrary.deleteBookFromLibraryByIndex(bookIndex);

    res.redirect("/");
  } else {
    res.redirect("/404");
  }
});

module.exports = router;

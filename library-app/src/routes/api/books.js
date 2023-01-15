const nodePath = require("path");
const {Router} = require("express");
const router = Router();
const fileBook = require("../../middleware/fileBooks.js");
const iocContainer = require("../../inversify.config.js");

const Book = require("../../models/Book.js");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().select("-__v");
    res.json(books);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  const {title, description} = req.body;

  const newBook = new Book({
    title,
    description,
  });

  try {
    await newBook.save();
    res.json(newBook);
  } catch (e) {
    res.status(500).json({
      errorCode: 500,
      error: e,
    });
  }
});

router.get("/:id", async (req, res) => {
  const {id} = req.params;

  try {
    //const book = await Book.findById(id).select("-__v");
    const repo = iocContainer.get(BooksRepository);
    const book = await repo.getBooks(req.params.id);

    if (!book) {
      res.status(404).json({
        errorCode: 404,
        message: `Книга с ${id} не найдена`,
      });
    }
    res.json(book);
  } catch (e) {
    res.status(500).json({
      errorCode: 500,
      error: e,
    });
  }
});

router.put("/:id", async (req, res) => {
  const {title, description} = req.body;
  const {id} = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, {title, description});

    if (!book) {
      res.status(404).json({
        errorCode: 404,
        message: `Книга с ${id} не найдена`,
      });
    }

    res.redirect(`/api/books/${id}`);
  } catch (e) {
    res.status(500).json({
      errorCode: 500,
      error: e,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const book = await Book.deleteOne({_id: id});

    if (!book) {
      res.status(404).json({
        errorCode: 404,
        message: `Книга с ${id} не найдена`,
      });
    }

    res.json("ok");
  } catch (e) {
    res.status(500).json({
      errorCode: 500,
      error: e,
    });
  }
});

// router.post("/:id/upload", fileBook.single("book-cover-img"), (req, res) => {
//   if (!req.file) {
//     res.json();
//   }
//   const {path} = req.file;
//   const {id} = req.params;
//   const book = arLibrary.getBookById(id);

//   if (book) {
//     book.updateFileBookCover(path);

//     res.status(200);
//     res.json(book);
//   } else {
//     res.status(404);
//     res.send({
//       errorCode: 404,
//       error: `Книга с id: ${id} не найдена`,
//     });
//   }
// });

// router.get("/:id/download", (req, res) => {
//   const {id} = req.params;
//   const book = arLibrary.getBookById(id);

//   if (!book) {
//     res.status(404);
//     res.send({
//       errorCode: 404,
//       error: `Книга с id: ${id} не найдена`,
//     });
//   }

//   if (book.getFileBookCover() === "") {
//     res.status(404);
//     res.send({
//       errorCode: 404,
//       error: `У книги с id: ${id} не найдена обложка`,
//     });
//   }

//   const coverPath = nodePath.join(
//     __dirname,
//     `../../../${book.getFileBookCover()}`
//   );
//   res.status(200);
//   res.download(coverPath);
// });

module.exports = router;

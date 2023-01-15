import {Router} from "express";
import {iocContainer} from "../../../Application/Inversify/Container";
import {iocContainerKeys} from "../../../Application/Inversify/ContainerKeys";
import {BooksService} from "../../Services/Book/BooksService";
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const service: BooksService = iocContainer.get(
      iocContainerKeys.BOOK_SERVICE
    );
    const books = await service.findAll();
    res.json(books);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", async (req, res, next) => {
  const {title, description} = req.body;

  const service: BooksService = iocContainer.get(iocContainerKeys.BOOK_SERVICE);

  try {
    const newBook = await service.createBook({
      title,
      description,
      authors: [""],
      favorite: "",
      fileCover: "",
    });
    res.json(newBook);
  } catch (e) {
    res.status(500).json({
      errorCode: 500,
      error: e,
    });
  }
});

import {BookModel} from "../../Entities/Book/Book";
import {IBook} from "../../Entities/Book/IBook";

interface CreateBookDto {
  title: IBook["title"];
  description: IBook["description"];
  authors: IBook["authors"];
  favorite: IBook["favorite"];
  fileCover: IBook["fileCover"];
}

export class BooksService {
  constructor() {
    console.log("new BooksService");
  }

  async createBook(data: CreateBookDto): Promise<IBook> {
    const book = new BookModel(data);
    await book.save();
    return book;
  }

  findAll(): Promise<IBook[]> {
    return BookModel.find().exec();
  }
}

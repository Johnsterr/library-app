import "reflect-metadata";
import {IBooksRepository} from "./IBooksRepository";
//import {Book} from "../Book/Book";
import {injectable} from "inversify/lib/annotation/injectable";

@injectable()
export class BooksRepository implements IBooksRepository {
  books: any[];
  constructor() {
    this.books = [];
  }
  createBook(book: any) {}
  getBook(id: string) {
    return this.books.find((book) => {
      return book.id === id;
    });
  }
  getBooks() {
    return this.books;
  }
  updateBook(id: any) {}
  deleteBook(id: any) {}
}

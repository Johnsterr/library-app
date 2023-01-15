import "reflect-metadata";
import {IBooksRepository} from "./IBooksRepository";
import {Book} from "../Book/Book";
import {injectable} from "inversify/lib/annotation/injectable";

@injectable()
export class BooksRepository implements IBooksRepository {
  books: any[];
  constructor() {
    this.books = [
      new Book("Книга 1", "Автор 1", "1"),
      new Book("Книга 2", "Автор 2", "2"),
    ];
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

export interface IBook {
  id?: number | string;
  title: string;
  description?: string;
  authors: string[];
  favorite?: string;
  fileCover?: string;
}

const books: IBook[] = [
  {
    id: 1,
    title: "Книга 1",
    description: "Описание книги 1",
    authors: ["Автор 1", "Автор 2"],
    favorite: "",
    fileCover: "",
  },
  {
    id: 2,
    title: "Книга 2",
    description: "Описание книги 2",
    authors: ["Автор 1", "Автор 2"],
    favorite: "",
    fileCover: "",
  },
];

import {Injectable} from "@nestjs/common";

@Injectable()
export class BooksService {
  getAll(): IBook[] {
    return books;
  }
  addBook(
    title: string,
    authors: string[],
    description = "",
    favorite = "",
    fileCover = "",
    id = Math.random()
  ) {
    const newBook: IBook = {
      title,
      authors,
      description,
      favorite,
      fileCover,
      id,
    };

    books.push(newBook);
    return newBook;
  }
}

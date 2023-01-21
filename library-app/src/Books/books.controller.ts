import {Controller, Get} from "@nestjs/common";
import {BooksService, IBook} from "./books.service";

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): IBook[] {
    return this.booksService.getAll();
  }
}

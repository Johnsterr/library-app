import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseInterceptors,
} from "@nestjs/common";
import {HydratedDocument, QueryWithHelpers} from "mongoose";
import {BookLoggerInterceptor} from "./book.logger.interceptors";
import {BookService} from "./book.service";
import {BookIdValidationPipe} from "./book.validation.pipe";
import {CreateBookDto} from "./DTO/create-book";
import {UpdateBookDto} from "./DTO/update-book";
import {IParamId} from "./Interfaces/param-id";
import {BookDocument} from "./Schemas/book.schema";

@UseInterceptors(BookLoggerInterceptor)
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  public create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(body);
  }

  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.bookService.getAll();
  }

  @Put(":id")
  public update(
    @Param("id", BookIdValidationPipe) {id}: IParamId,
    @Body() body: UpdateBookDto
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, {}, {}> | null,
    HydratedDocument<BookDocument, {}, {}>,
    {},
    BookDocument
  > {
    return this.bookService.update(id, body);
  }

  @Delete(":id")
  public delete(
    @Param() {id}: IParamId
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, {}, {}> | null,
    HydratedDocument<BookDocument, {}, {}>,
    {},
    BookDocument
  > {
    return this.bookService.delete(id);
  }
}

import { Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Model, Connection, HydratedDocument, QueryWithHelpers } from "mongoose";
import { Book, BookDocument } from "./Schemas/book.schema";
import { CreateBookDto } from "./DTO/create-book";
import { UpdateBookDto } from "./DTO/update-book";

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<BookDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    public getAll(): Promise<BookDocument[]> {
        return this.BookModel.find().exec();
    }

    public getById(id: string): Promise<Book | null> {
        return this.BookModel.findById(id).exec();
    }

    public create(data: CreateBookDto): Promise<BookDocument> {
        const todo = new this.BookModel(data);

        return todo.save();
    }

    public update(
        id: string,
        data: UpdateBookDto
    ): QueryWithHelpers<
        HydratedDocument<BookDocument, {}, {}> | null,
        HydratedDocument<BookDocument, {}, {}>,
        {},
        BookDocument
    > {
        return this.BookModel.findOneAndUpdate({ _id: id }, data);
    }

    public delete(
        id: string
    ): QueryWithHelpers<
        HydratedDocument<BookDocument, {}, {}> | null,
        HydratedDocument<BookDocument, {}, {}>,
        {},
        BookDocument
    > {
        return this.BookModel.findOneAndRemove({ _id: id });
    }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookCommentDocument, BookComment } from "./book-comment.schema";
import { CreateBookCommentDto } from "./dto/create-book-comment";
import { UpdateBookCommentDto } from "./dto/update-book-comment";

@Injectable()
export class BookCommentService {
    constructor(@InjectModel(BookComment.name) private bookComment: Model<BookCommentDocument>) {}

    async create({ book, comment }: CreateBookCommentDto): Promise<BookComment> {
        return await this.bookComment.create({ book, comment });
    }

    async read(id: string): Promise<BookComment | null> {
        return await this.bookComment.findById(id).exec();
    }

    async update(id: string, data: UpdateBookCommentDto): Promise<void> {
        await this.bookComment.findByIdAndUpdate(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.bookComment.findByIdAndDelete(id);
    }

    async findAllBookComment(bookId: string): Promise<BookComment[] | null> {
        return await this.bookComment.find({ book: bookId }).populate("book").exec();
    }
}

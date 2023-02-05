import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from "mongoose";
import { Book } from "../Book/Schemas/book.schema";

export type BookCommentDocument = BookComment & Document;

@Schema()
export class BookComment {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: "Book",
    })
    public book: Book;

    @Prop()
    public comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);

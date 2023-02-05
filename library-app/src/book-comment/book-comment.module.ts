import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookCommentService } from "./book-comment.service";
import { BookCommentGateway } from "./book-comment.gateway";
import { BookComment, BookCommentSchema } from "./book-comment.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: BookComment.name, schema: BookCommentSchema }])],
    providers: [BookCommentService, BookCommentGateway],
})
export class BookCommentModule {}

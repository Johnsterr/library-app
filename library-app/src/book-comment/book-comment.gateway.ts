import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from "@nestjs/websockets";
import { catchError, from, map, Observable, throwError } from "rxjs";
import { BookComment } from "./book-comment.schema";
import { BookCommentService } from "./book-comment.service";
import { CreateBookCommentDto } from "./dto/create-book-comment";
import { GetBookCommentDto } from "./dto/get-book-comment";

@WebSocketGateway({ cors: true })
export class BookCommentGateway {
    constructor(private bookCommentService: BookCommentService) {}

    @SubscribeMessage("getAllComments")
    async getAllComments(
        @MessageBody() data: GetBookCommentDto
    ): Promise<Observable<WsResponse<any>>> {
        return from(this.bookCommentService.findAllBookComment(data.bookId)).pipe(
            map((res: BookComment[] | null) => ({
                event: "getAllComments",
                data: res,
            })),
            catchError((error) => throwError(error))
        );
    }

    @SubscribeMessage("addComment")
    async addComment(@MessageBody() data: CreateBookCommentDto): Promise<WsResponse> {
        const comment = await this.bookCommentService.create(data);
        return {
            event: "addComment",
            data: comment,
        };
    }
}

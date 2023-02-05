import { IsString } from "class-validator";

export class GetBookCommentDto {
    @IsString()
    bookId: string;
}

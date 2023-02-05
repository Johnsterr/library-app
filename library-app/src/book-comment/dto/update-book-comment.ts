import { IsString } from "class-validator";

export class UpdateBookCommentDto {
    @IsString()
    bookId: string;

    @IsString()
    comment: string;
}

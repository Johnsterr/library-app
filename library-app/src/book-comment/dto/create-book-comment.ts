import { IsString } from "class-validator";

export class CreateBookCommentDto {
    @IsString()
    book: string;

    @IsString()
    comment: string;
}

import {IsString, IsDefined, IsOptional, MinLength} from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(3, {
    each: true,
  })
  authors!: string[];
}

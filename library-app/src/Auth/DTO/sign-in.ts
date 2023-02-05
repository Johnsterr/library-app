import {IsString, IsDefined} from "class-validator";

export class SignInDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}

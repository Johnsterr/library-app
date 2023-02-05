import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {SignUpDto} from "./DTO/sign-up";
import {SignInDto} from "./DTO/sign-in";
import {User} from "./Schemas/user.schema";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  async signup(@Body() data: SignUpDto): Promise<Partial<User>> {
    return await this.authService.signup(data);
  }

  @Post("/signin")
  async signin(@Body() data: SignInDto): Promise<Partial<User>> {
    return await this.authService.signin(data);
  }
}

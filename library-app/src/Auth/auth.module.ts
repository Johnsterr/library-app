import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {MongooseModule} from "@nestjs/mongoose";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./Strategies/jwt.strategy";
import {User, UserSchema} from "./Schemas/user.schema";

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

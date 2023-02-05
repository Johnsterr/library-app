import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {JwtPayload} from "../Interfaces/jwt.interface";
import {User, UserDocument} from "../Schemas/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "example",
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const user: User | null = await this.userModel.findById(payload.id).exec();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

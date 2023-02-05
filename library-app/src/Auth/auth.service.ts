import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./Schemas/user.schema";
import {SignUpDto} from "./DTO/sign-up";
import {SignInDto} from "./DTO/sign-in";
import {UtilService} from "../common/utils/util.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private utilService: UtilService
  ) {}

  signup(data: SignUpDto): Promise<Partial<User>> {
    const user: UserDocument = new this.userModel({
      email: data.email,
      password: this.utilService.getHash(data.password),
      firstName: data.firstName,
      lastName: data.lastName,
    });
    return user.save().then((user: Partial<User>): Partial<User> => {
      delete user.password;
      return user;
    });
  }

  async signin(data: SignInDto): Promise<Partial<User>> {
    const user: Partial<User> | null = await this.userModel
      .findOne({
        email: data.email,
      })
      .exec();
    const password: string = this.utilService.getHash(data.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (password !== user.password) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }
}

import path from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./Auth/auth.module";
import { BookModule } from "./Book/book.module";
import { CommonModule } from "./common/common.module";
import { config } from "./config";
import { BookCommentModule } from "./book-comment/book-comment.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: path.resolve(__dirname, "../../config/.env"),
            load: [config],
            isGlobal: true,
        }),
        MongooseModule.forRoot(config().mongodbUrl),
        BookModule,
        BookCommentModule,
        AuthModule,
        CommonModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

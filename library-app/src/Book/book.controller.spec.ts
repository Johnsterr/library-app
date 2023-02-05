import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { BookService } from "./book.service";

describe("BookController", () => {
    let bookModule: INestApplication;
    let bookService = {
        data: [
            {
                id: "1",
                title: "Книга 1",
                description: "No desc",
                authors: ["Автор 1"],
            },
            {
                id: "2",
                title: "Книга 2325",
                description: "Крутая книга",
                authors: ["Автор 1", "Автор 2"],
            },
        ],
        getAll: () => {
            return bookService.data;
        },
        getById: (id: string) => {
            bookService.data.filter((elem) => elem.id === id);
        },
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [BookService],
        })
            .overrideProvider(BookService)
            .useValue(bookService)
            .compile();
        bookModule = moduleRef.createNestApplication();
        await bookModule.init();
    });

    it("/GET book", () => {
        return request(bookModule.getHttpServer())
            .get("/book")
            .expect(200)
            .expect(bookService.getAll());
    });

    afterAll(async () => {
        await bookModule.close();
    });
});

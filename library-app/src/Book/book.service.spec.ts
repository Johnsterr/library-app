import { BookService } from "./book.service";
import { Model } from "mongoose";
import { Book, BookDocument } from "./Schemas/book.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { CreateBookDto } from "./DTO/create-book";
import { UpdateBookDto } from "./DTO/update-book";
import { BookController } from "./book.controller";

describe("book service", () => {
    let service: BookService;
    let bookModel: Model<BookDocument>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookController],
            providers: [
                BookService,
                {
                    provide: getModelToken(Book.name),
                    useValue: {
                        create: jest.fn(),
                        findById: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                        findOneAndDelete: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<BookService>(BookService);
        bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));
    });

    const mockBook: Book = {
        title: "title",
        description: "description",
        authors: ["authors"],
    };

    describe("create", () => {
        const mockData: CreateBookDto = {
            title: "",
            authors: ["Author 1"],
        };

        it("create book", async () => {
            const spyCreate = jest.spyOn(bookModel, "create");
            await service.create(mockData);
            expect(spyCreate).toBeCalled();
        });
    });

    describe("read", () => {
        it("read book", async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            jest.spyOn(bookModel, "findById").mockReturnValue({
                exec: jest.fn().mockResolvedValueOnce(mockBook),
            });
            const result = await service.getById("42");
            expect(result).toEqual(mockBook);
        });
    });

    describe("update", () => {
        const mockData: UpdateBookDto = {
            authors: ["Steven King"],
            title: "",
        };

        it("update book", async () => {
            const spyUpdate = jest.spyOn(bookModel, "findByIdAndUpdate");
            await service.update("42", mockData);
            expect(spyUpdate).toBeCalled();
        });
    });

    describe("remove", () => {
        it("remove book", async () => {
            const spyRemove = jest.spyOn(bookModel, "findByIdAndDelete");
            await service.delete("42");
            expect(spyRemove).toBeCalled();
        });
    });
});

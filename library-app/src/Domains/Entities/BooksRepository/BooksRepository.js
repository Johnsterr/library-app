"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
require("reflect-metadata");
var Book_1 = require("../Book/Book");
var injectable_1 = require("inversify/lib/annotation/injectable");
var BooksRepository = /** @class */ (function () {
    function BooksRepository() {
        this.books = [
            new Book_1.Book("Книга 1", "Автор 1", "1"),
            new Book_1.Book("Книга 2", "Автор 2", "2"),
        ];
    }
    BooksRepository.prototype.createBook = function (book) { };
    BooksRepository.prototype.getBook = function (id) {
        return this.books.find(function (book) {
            return book.id === id;
        });
    };
    BooksRepository.prototype.getBooks = function () {
        return this.books;
    };
    BooksRepository.prototype.updateBook = function (id) { };
    BooksRepository.prototype.deleteBook = function (id) { };
    BooksRepository = __decorate([
        (0, injectable_1.injectable)(),
        __metadata("design:paramtypes", [])
    ], BooksRepository);
    return BooksRepository;
}());
exports.BooksRepository = BooksRepository;

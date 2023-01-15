"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var uuid_1 = require("uuid");
var Book = /** @class */ (function () {
    function Book(name, author, id) {
        if (id === void 0) { id = (0, uuid_1.v4)(); }
        this.id = id;
        this.name = name;
        this.author = author;
    }
    return Book;
}());
exports.Book = Book;

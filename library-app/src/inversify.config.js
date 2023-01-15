"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var BooksRepository_1 = require("./Domains/Entities/BooksRepository/BooksRepository");
var container = new inversify_1.Container();
container.bind(BooksRepository_1.BooksRepository).toSelf();
exports.default = container;

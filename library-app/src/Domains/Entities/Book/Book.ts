import {v4 as uuidv4} from "uuid";
import {IBook} from "./IBook";

export class Book implements IBook {
  id: string;
  name: string;
  author: string;
  constructor(name: string, author: string, id: string = uuidv4()) {
    this.id = id;
    this.name = name;
    this.author = author;
  }
}

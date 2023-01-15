import {Container} from "inversify";
import {BooksRepository} from "./Domains/Entities/BooksRepository/BooksRepository";

const container = new Container();
container.bind(BooksRepository).toSelf();

export default container;

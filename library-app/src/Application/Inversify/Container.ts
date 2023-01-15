import {Container} from "inversify";
import {BooksService} from "../../Domains/Services/Book/BooksService";
import {iocContainerKeys} from "./ContainerKeys";

const iocContainer = new Container();
iocContainer
  .bind(iocContainerKeys.BOOK_SERVICE)
  .to(BooksService)
  .inSingletonScope();

export {iocContainer};

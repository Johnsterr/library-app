import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import path from "path";

import {booksRouter} from "./Domains/Infrastructure/Book/BooksRoutes";

import {iocContainer} from "./Application/Inversify/Container";
import "./Application/DB/MongoConnection";
import {PORT} from "./Application/Constants";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/books", booksRouter);

async function start() {
  try {
    //await mongoose.connect(MONGO_DB_URL, {useUnifiedTopology: true});
    console.log(`Express server connected with Mongo`);
    app.listen(PORT, () => {
      console.log(`Express server listening on port ${PORT}\n`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

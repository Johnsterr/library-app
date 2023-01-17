import mongoose from "mongoose";
import {MONGO_DB_URL} from "../Constants";

mongoose.connect(MONGO_DB_URL);
const mongoDb = mongoose.connection;

mongoDb.on("open", () => {
  console.log("Server connected with Mongo");
});

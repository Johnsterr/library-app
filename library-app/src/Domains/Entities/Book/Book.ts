import mongoose, {Document, Schema} from "mongoose";
import {IBook} from "./IBook";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  authors: {
    type: String,
    default: "",
  },
  favorite: {
    type: String,
    default: "",
  },
  fileCover: {
    type: String,
    default: "",
  },
});

export const BookModel = mongoose.model<IBook & Document>("Book", BookSchema);

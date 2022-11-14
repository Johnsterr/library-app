const {Schema, model} = require("mongoose");

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
  fileName: {
    type: String,
    default: "",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Book", BookSchema);

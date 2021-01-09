const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  }
})

const Books = mongoose.model("Books", booksSchema)

module.exports = {
  Books
}
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
    title: {
      type: String,
      required: true,   
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      required: true,
      trim: true
    },
    publishedYear: {
      type: Number,
      required: true,
      min: 0   
    }
  },
  { timestamps: true } 
);
const Book = mongoose.model('Book', BookSchema);
export default Book;
import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/book.controller.js";

import {
  validateCreateBook,
  validateBookId,
  validateUpdateBook,
  validateDeleteBook
} from "../validators/bookValidator.js";

import validate from "../middlewares/validate.js";

const router = express.Router();


router.get("/", getBooks);

router.get("/:bookId", validateBookId, validate, getBookById);

router.post("/", validateCreateBook, validate, createBook);

router.put("/:bookId", validateUpdateBook, validate, updateBook);

router.delete("/:bookId", validateDeleteBook, validate, deleteBook);

export default router;

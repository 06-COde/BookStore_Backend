import express from "express";
import {
  getBooks,getBookById,createBook, updateBook,deleteBook} from "../controllers/book.controller.js";

const router = express.Router();


router.get("/", getBooks);           
router.get("/:bookId", getBookById); 
router.post("/", createBook);        
router.put("/:bookId", updateBook);  
router.delete("/:bookId", deleteBook); 

export default router;

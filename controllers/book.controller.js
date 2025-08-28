import Book from "../model/Book.model.js";


// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    const newBook = new Book({ title, author, genre, publishedYear });
    const savedBook = await newBook.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating book", error });
  }
};

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving books", error });
    console.error(error);
  }
};

// Get a single book by id
export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving book", error });
    console.error(error);
  }
};

// Update a book by id
export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const { title, author, genre, publishedYear } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, genre, publishedYear },
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating book", error });
    console.error(error);
  }
};

// Delete a book by id
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting book", error });
    console.error(error);
  }
};

import { body,param } from "express-validator";

export const validateCreateBook = [
    body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
    body('author')
    .notEmpty().withMessage('Author is required')
    .isString().withMessage('Author must be a string'),
    body('genre')
    .notEmpty().withMessage('Genre is required')
    .isString().withMessage('Genre must be a string'),
    body('publishedYear')
    .notEmpty().withMessage('Published Year is required')
    .isInt({ min: 0 }).withMessage('Published Year must be a valid year')
      
];

export const validateBookId = [
    param('bookId')
    .isMongoId().withMessage('Invalid book ID format')
];

export const validateUpdateBook = [
    param('bookId')
    .isMongoId().withMessage('Invalid book ID format'),
    body('title')
    .optional()
    .isString().withMessage('Title must be a string'),
    body('author')
    .optional()
    .isString().withMessage('Author must be a string'),
    body('genre')
    .optional()
    .isString().withMessage('Genre must be a string'),
    body('publishedYear')
    .optional()
    .isInt({ min: 0 }).withMessage('Published Year must be a valid year')  
];      

export const validateDeleteBook = [
    param('bookId')
    .isMongoId().withMessage('Invalid book ID format')
];              

export default {};          

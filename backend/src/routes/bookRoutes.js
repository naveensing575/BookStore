import express from 'express';
import bookController from '../controller/bookController.js';

const router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.delete('/', bookController.deleteAllBooks);

export default router;

import Book from './../model/bookModel.js';

class BookController {
  async createBook(req, res) {
    try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).send(book);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }

  async getAllBooks(req, res) {
    try {
      const books = await Book.find();
      res.status(200).send(books);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }

  async getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send(book);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(400).send('Invalid book ID');
    }
    res.status(500).send('Internal server error');
  }
}

  async updateBook(req, res) {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!book) {
        return res.status(404).send('Book not found');
      }
      res.status(200).send(book);
    } catch (err) {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(400).send('Invalid book ID');
      }
      res.status(500).send('Internal server error');
    }
  }

  async deleteBook(req, res) {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      res.status(200).send({ message: 'Book deleted successfully', book });
    } catch (err) {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(400).send('Invalid book ID');
      }
      res.status(500).send('Internal server error');
    }
  }


  async deleteAllBooks(req, res) {
    try {
      const result = await Book.deleteMany();
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }
}

const bookController = new BookController();

export default bookController;

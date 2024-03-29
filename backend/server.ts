import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose, { Document } from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;
const DB_URL = process.env.mongoDB_URL as string;

app.use(express.json());
app.use(cors());

interface IBook extends Document {
  title: string;
  author: string;
  publishYear: number;
}

// Define Book model schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishYear: Number
});

const Book = mongoose.model<IBook>('Book', bookSchema);

// Create a new book
app.post('/books', async (req: Request, res: Response) => {
  try {
    const { title, author, publishYear } = req.body as { title: string; author: string; publishYear: number };

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const newBook = await Book.create({
      title,
      author,
      publishYear
    });

    return res.status(201).send(newBook);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Get all books
app.get('/books', async (req: Request, res: Response) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Get a book by ID
app.get('/books/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Update a book
app.put('/books/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body as { title: string; author: string; publishYear: number };

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(updatedBook);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Delete a book
app.delete('/books/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/', (request: Request, response: Response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

mongoose.connect(DB_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
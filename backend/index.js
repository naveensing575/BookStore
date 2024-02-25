import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoutes from './src/routes/bookRoutes.js';

dotenv.config();

const app = express();
const PORT = 4000;
const DB_URL = process.env.mongoDB_URL;

app.use(express.json());

// Use bookRoutes
app.use('/books', bookRoutes);

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
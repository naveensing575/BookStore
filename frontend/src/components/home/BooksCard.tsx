import React from 'react';
import BookSingleCard from './BooksSingleCard';

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}

interface BooksCardProps {
  books: Book[];
}

const BooksCard: React.FC<BooksCardProps> = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books?.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;

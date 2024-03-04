import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
}

interface BooksTableProps {
  books: Book[];
}

const BooksTable: React.FC<BooksTableProps> = ({ books }) => {
  const [orderedBooks, setOrderedBooks] = useState(books);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newBooksOrder = Array.from(orderedBooks);
    const [reorderedItem] = newBooksOrder.splice(result.source.index, 1);
    newBooksOrder.splice(result.destination.index, 0, reorderedItem);
    setOrderedBooks(newBooksOrder);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>No</th>
            <th className='border border-gray-300 px-4 py-2'>Title</th>
            <th className='border border-gray-300 px-4 py-2 max-md:hidden'>
              Author
            </th>
            <th className='border border-gray-300 px-4 py-2 max-md:hidden'>
              Publish Year
            </th>
            <th className='border border-gray-300 px-4 py-2'>View</th>
            <th className='border border-gray-300 px-4 py-2'>Edit</th>
            <th className='border border-gray-300 px-4 py-2'>Delete</th>
          </tr>
        </thead>
        <Droppable droppableId="books">
          {(provided) => (
            <tbody {...provided.droppableProps} ref={provided.innerRef}>
              {orderedBooks.map((book, index) => (
                <Draggable key={book._id} draggableId={book._id} index={index}>
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className='h-12 hover:bg-gray-100 transition-colors'
                    >
                      <td className='border border-gray-300 px-4 py-2 text-center' {...provided.dragHandleProps}>
                        {index + 1}
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>
                        {book.title}
                      </td>
                      <td className='border border-gray-300 px-4 py-2 max-md:hidden'>
                        {book.author}
                      </td>
                      <td className='border border-gray-300 px-4 py-2 max-md:hidden'>
                        {book.publishYear}
                      </td>
                      <td className='border border-gray-300 px-4 py-2 text-center'>
                        <Link to={`/books/${book._id}`} className='text-green-600 hover:text-green-800'>
                          <BsInfoCircle className='text-2xl' />
                        </Link>
                      </td>
                      <td className='border border-gray-300 px-4 py-2 text-center'>
                        <Link to={`/books/edit/${book._id}`} className='text-yellow-600 hover:text-yellow-800'>
                          <AiOutlineEdit className='text-2xl' />
                        </Link>
                      </td>
                      <td className='border border-gray-300 px-4 py-2 text-center'>
                        <Link to={`/books/delete/${book._id}`} className='text-red-600 hover:text-red-800'>
                          <MdOutlineDelete className='text-2xl' />
                        </Link>
                      </td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

export default BooksTable;

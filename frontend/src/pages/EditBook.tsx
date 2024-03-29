import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

interface Book {
  _id: string;
  title: string;
  author: string;
  publishYear: string;
}

const EditBook: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publishYear, setPublishYear] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get<Book>(`http://localhost:4000/books/${id}`)
    .then((response) => {
      const { title, author, publishYear } = response.data;
      setTitle(title);
      setAuthor(author);
      setPublishYear(publishYear);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please check console');
      console.log(error);
    });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:4000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
  <label htmlFor='title' className='text-xl mr-4 text-gray-500'>
    Title
  </label>
  <input
    type='text'
    id='title'
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
  />
</div>
      <div className='my-4'>
        <label htmlFor='author' className='text-xl mr-4 text-gray-500'>
          Author
        </label>
        <input
          type='text'
          id='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <label htmlFor='publishYear' className='text-xl mr-4 text-gray-500'>
          Publish Year
        </label>
        <input
          type='number'
          id='publishYear'
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditBook;

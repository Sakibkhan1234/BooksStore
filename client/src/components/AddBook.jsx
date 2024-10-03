import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './AddBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTitle('');
      setAuthor('');
      setDescription('');
      setPrice('');
      setImage(null);
      alert('Book added successfully!');
      navigate('/'); 
    } catch (err) {
      setError('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="add-book-container">
      <h2 className="add-book-title">Add New Book</h2>
      {error && <p className="add-book-error">{error}</p>}
      <form className="add-book-form" onSubmit={handleSubmit}>
        <div className="add-book-input-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="add-book-input"
          />
        </div>
        <div className="add-book-input-group">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="add-book-input"
          />
        </div>
        <div className="add-book-input-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="add-book-textarea"
          />
        </div>
        <div className="add-book-input-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="add-book-input"
          />
        </div>
        <div className="add-book-input-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="add-book-file-input"
          />
        </div>
        <button type="submit" className="add-book-button">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;


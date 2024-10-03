import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/books');
                setBooks(res.data); // Set books that are still in stock
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []); 

    return (
        <div className="homepage">
            <h2>Featured Books</h2>
            <div className="featured-books">
                {books.map((book) => (
                    <div key={book._id} className="book-card">
                        <Link to={`/book/${book._id}`}>
                            <img 
                                src={`http://localhost:5000/${book.image}`} 
                                alt={book.title} 
                            />
                            <h3>{book.title}</h3>
                        </Link>
                        <h5 className="author">By {book.author}(Author)</h5>
                        <p className="price">₹{book.price}</p>
                        <p className="des-text">{book.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;

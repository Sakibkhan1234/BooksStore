import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import './BookDetailsPage.css';

function BookDetailsPage() {
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
   
    var navigate=useNavigate()

    useEffect(() => {
        const fetchBook = async () => {
            const res = await axios.get(`http://localhost:5000/api/books/${id}`);
            setBook(res.data);
        };
        fetchBook();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(book);
        alert(`${book.title} added to cart!`);
        navigate('/cart')
    };

    return (
        <div className="book-details">
    {book ? (
        <>
            <img 
                className='img-book'
                src={`http://localhost:5000/${book.image}`} 
                alt={book.title} 
            />
            <div className="book-details-info">
                <h3>{book.title}</h3>
                <h5 className="author">By {book.author}(Author)</h5>
                <p>{book.description}</p>
                <p className="price">₹{book.price}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </>
    ) : (
        <p>Loading...</p>
    )}
</div>
    );
}

export default BookDetailsPage;


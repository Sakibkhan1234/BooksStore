import React, { useContext } from 'react'; 
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShoppingCart.css';

function ShoppingCart() {
    const { cart, removeFromCart, totalPrice, clearCart } = useContext(CartContext); 
    const navigate = useNavigate(); 

    const handleCheckout = async () => {
        try {
            const promises = cart.map((book) => {
                return axios.patch(`http://localhost:5000/api/books/${book._id}`);
            });

            await Promise.all(promises);
            clearCart();
            alert('Checkout completed!');
            navigate('/');

        } catch (error) {
            console.error('Failed to complete checkout:', error);
            alert('Checkout failed. Please try again.');
        }
    };

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            <div className="cart-items">
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cart.map((book) => (
                        <div key={book._id} className="cart-item">
                            <img 
                                src={`http://localhost:5000/${book.image}`} 
                                alt={book.title} 
                            />
                            <div className="cart-item-details">
                                <h3>{book.title}</h3>
                                <h5 className="author">By {book.author}(Author)</h5>
                                <p className='price'>₹{book.price}</p>
                            </div>
                            <div className="cart-item-actions">
                                <button onClick={() => removeFromCart(book._id)}>Remove</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <h3 className="total-price">Total Price: ₹{totalPrice}</h3>
            <button className="checkout-button" onClick={handleCheckout}>Purchase</button>
        </div>
    );
}

export default ShoppingCart;



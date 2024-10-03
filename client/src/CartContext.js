import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (book) => {
        setCart((prevCart) => [...prevCart, book]);
    };

    const removeFromCart = (bookId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== bookId));
    };
    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce((total, book) => total + book.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import HomePage from './components/HomePage';
import BookDetailsPage from './components/BookDetailsPage';
import ShoppingCart from './components/ShoppingCart';
import AddBook from './components/AddBook';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs'; 
import ContactUs from './components/ContactUs'; 
function App() {
    return (
        <CartProvider>
            <Router>
                <Header />
                <main> 
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/book/:id" element={<BookDetailsPage />} />
                        <Route path="/cart" element={<ShoppingCart />} />
                        <Route path="/addbook" element={<AddBook />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App;


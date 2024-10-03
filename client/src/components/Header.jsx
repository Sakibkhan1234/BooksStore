import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../components/assets/bookstore.jpg';

function Header() {
    return (
        <header>
            <img src={logo} alt="Online Bookstore Logo" className="logo" />
            <h1>Online Bookstore</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Shopping Cart</Link>
                <Link to="/addbook">Add Book</Link>
            </nav>
        </header>
    );
}

export default Header;


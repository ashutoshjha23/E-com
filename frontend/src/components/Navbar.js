// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav style={{ backgroundColor: 'red', padding: '10px' }}>
            <Link to="/">Home</Link>
            <Link to="/cart" style={{ marginLeft: '20px' }}>Cart</Link>
            {user ? (
                <span onClick={handleLogout} style={{ marginLeft: '20px', cursor: 'pointer' }}>Logout</span>
            ) : (
                <>
                    <Link to="/login" style={{ marginLeft: '20px' }}>Login</Link>
                    <Link to="/signup" style={{ marginLeft: '20px' }}>Signup</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;

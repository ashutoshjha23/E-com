
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import RegisterProduct from './components/RegisterProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductPage from './components/ProductPage'; 
import { CartProvider } from './context/CartContext';
import './styles.css';
import { AuthProvider, useAuth } from './context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/register-product" className="navbar-link">Register Product</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/cart" className="navbar-link">Cart</Link>
                </li>
                {user ? (
                    <li className="navbar-item">
                        <button onClick={logout} className="navbar-button">Logout</button>
                    </li>
                ) : (
                    <>
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signup" className="navbar-link">Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register-product" element={<RegisterProduct />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/product/:id" element={<ProductPage />} /> {}
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;

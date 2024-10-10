// frontend/src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // Update quantity if the product is already in the cart
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const buyAll = () => {
        // Handle the buying logic here
        console.log('Purchased:', cartItems);
        setCartItems([]); // Clear the cart after purchase
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, buyAll }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

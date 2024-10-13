
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, buyAll } = useContext(CartContext);

    const handleBuyAll = () => {
        buyAll();
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                {item.name} - ${item.price.toFixed(2)} 
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleBuyAll}>Buy All</button>
                </>
            )}
        </div>
    );
};

export default Cart;

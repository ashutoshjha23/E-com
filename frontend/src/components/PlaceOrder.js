
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 

const PlaceOrder = ({ product }) => {
    const { cartItems, clearCart } = useCart(); 
    const [quantity, setQuantity] = useState(1); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const user = { id: 1 }; 

    const handlePlaceOrder = async () => {
        const orderData = {
            productId: product.id,
            customerId: user.id,
            quantity: quantity,
        };

        setLoading(true);
        setError(null); 

        try {
            const response = await fetch('/api/addOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Order placed successfully:', result);
                clearCart();
            } else {
                throw new Error(result.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="place-order">
            <h2>Order {product.name}</h2>
            <p>Price: ${product.price}</p>

            <div className="quantity-input">
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.quantity} 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>

            <button 
                className="place-order-btn" 
                onClick={handlePlaceOrder} 
                disabled={loading || product.quantity < 1} 
            >
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PlaceOrder;

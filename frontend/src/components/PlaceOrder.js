// frontend/src/components/PlaceOrder.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Assuming you have a context for the cart

const PlaceOrder = ({ product }) => {
    const { cartItems, clearCart } = useCart(); // Access cart items and clearCart function
    const [quantity, setQuantity] = useState(1); // Default quantity
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const user = { id: 1 }; // Placeholder for user ID, replace with actual user state

    const handlePlaceOrder = async () => {
        const orderData = {
            productId: product.id,
            customerId: user.id,
            quantity: quantity,
        };

        setLoading(true);
        setError(null); // Reset error

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
                clearCart(); // Clear the cart after placing an order
            } else {
                throw new Error(result.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setError(error.message); // Update error state
        } finally {
            setLoading(false); // Reset loading state
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
                    max={product.quantity} // Set maximum to available product quantity
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>

            <button 
                className="place-order-btn" 
                onClick={handlePlaceOrder} 
                disabled={loading || product.quantity < 1} // Disable button if loading or out of stock
            >
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PlaceOrder;

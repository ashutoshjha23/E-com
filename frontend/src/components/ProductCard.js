// frontend/src/components/ProductCard.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
        // Check if the requested quantity is available
        if (quantity > product.quantity) {
            alert('Not enough quantity available!');
            return;
        }

        // Add product to cart
        addToCart(product, quantity);

        // Deduct quantity in the database
        const newQuantity = product.quantity - quantity;

        try {
            const response = await fetch(`http://localhost:5000/api/products/${product.id}/quantity`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }

            setQuantity(1); // Reset quantity to 1 after adding to cart
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Available Quantity: {product.quantity}</p>

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

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;

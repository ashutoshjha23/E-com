// frontend/src/components/RegisterProduct.js
import React, { useState } from 'react';

const RegisterProduct = () => {
    const [productData, setProductData] = useState({ name: '', price: '', image: '', quantity: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleRegisterProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            if (!response.ok) throw new Error('Failed to register product');
            const registeredProduct = await response.json();
            console.log("Product registered successfully:", registeredProduct);
            // Reset form
            setProductData({ name: '', price: '', image: '', quantity: '' });
        } catch (error) {
            console.error("Error registering product:", error);
        }
    };

    return (
        <div>
            <h1>Register Product</h1>
            <form onSubmit={handleRegisterProduct}>
                <input name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required />
                <input name="price" type="number" value={productData.price} onChange={handleChange} placeholder="Price" required />
                <input name="image" value={productData.image} onChange={handleChange} placeholder="Image URL" required />
                <input name="quantity" type="number" value={productData.quantity} onChange={handleChange} placeholder="Quantity" required />
                <button type="submit">Register Product</button>
            </form>
        </div>
    );
};

export default RegisterProduct;

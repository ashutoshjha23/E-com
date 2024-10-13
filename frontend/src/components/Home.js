
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();
                const formattedData = data.map(product => ({
                    ...product,
                    price: Number(product.price),
                }));
                setProducts(formattedData);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const updateProductQuantity = (id, amount) => {
        setProducts(prevProducts => 
            prevProducts.map(product => 
                product.id === id ? { ...product, quantity: product.quantity + amount } : product
            )
        );
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Products</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onUpdateQuantity={updateProductQuantity} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

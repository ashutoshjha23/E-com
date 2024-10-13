
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceOrder from './PlaceOrder';

const ProductPage = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`); 
                if (!response.ok) throw new Error('Failed to fetch product');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={product.image_url} alt={product.name} />
            <PlaceOrder product={product} /> {}
        </div>
    );
};

export default ProductPage;

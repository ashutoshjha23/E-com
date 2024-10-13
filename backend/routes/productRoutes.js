const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, description, price, quantity, imageUrl, customerId } = req.body;
    try {
        const productId = await Product.create(name, description, price, quantity, imageUrl, customerId);
        res.status(201).json({ id: productId, name });
    } catch (err) {
        res.status(400).json({ message: 'Product creation failed!' });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products!' });
    }
});

router.put('/:id', async (req, res) => {
    const { name, description, price, quantity, imageUrl } = req.body;
    try {
        await Product.update(req.params.id, name, description, price, quantity, imageUrl);
        res.json({ message: 'Product updated!' });
    } catch (err) {
        res.status(400).json({ message: 'Product update failed!' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/addOrder', async (req, res) => {
    const { productId, customerId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);

        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient quantity available.' });
        }

        const totalPrice = product.price * quantity;

        const orderId = await Order.create(productId, customerId, quantity, totalPrice);

        await Product.updateQuantity(productId, product.quantity - quantity);

        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

module.exports = router;

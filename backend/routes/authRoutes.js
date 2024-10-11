const express = require('express');
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const customerId = await Customer.create(name, email, hashedPassword);
        res.status(201).json({ id: customerId, name, email });
    } catch (err) {
        res.status(400).json({ message: 'Signup failed!' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const customer = await Customer.findByEmail(email);
    if (customer && await bcrypt.compare(password, customer.password)) {
        const token = jwt.sign({ id: customer.id }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password!' });
    }
});

module.exports = router;

// backend/routes/customerRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.customer = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

// Register a new customer
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the customer already exists
        const existingCustomer = await db.promise().query('SELECT * FROM customers WHERE email = ?', [email]);
        if (existingCustomer[0].length > 0) {
            return res.status(400).send('Customer already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new customer into the database
        await db.promise().query('INSERT INTO customers (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.status(201).send('Customer registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Login a customer
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [customer] = await db.promise().query('SELECT * FROM customers WHERE email = ?', [email]);
        if (customer.length === 0) {
            return res.status(400).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, customer[0].password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        // Create and assign a token
        const token = jwt.sign({ id: customer[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, customer: { id: customer[0].id, name: customer[0].name, email: customer[0].email } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Get customer details (Protected route)
router.get('/me', authenticate, async (req, res) => {
    try {
        const [customer] = await db.promise().query('SELECT id, name, email FROM customers WHERE id = ?', [req.customer.id]);
        res.json(customer[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

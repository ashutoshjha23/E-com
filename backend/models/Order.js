// backend/models/Order.js
const db = require('../db');

class Order {
    static create(productId, customerId, quantity, totalPrice) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO orders (product_id, customer_id, quantity, total_price) VALUES (?, ?, ?, ?)',
                [productId, customerId, quantity, totalPrice],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM orders', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = Order;

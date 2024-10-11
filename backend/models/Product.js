
const db = require('../db');

class Product {
    static create(name, description, price, quantity, imageUrl, customerId) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO products (name, description, price, quantity, image_url, customer_id) VALUES (?, ?, ?, ?, ?, ?)',
                [name, description, price, quantity, imageUrl, customerId],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static update(id, name, description, price, quantity, imageUrl) {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, image_url = ? WHERE id = ?',
                [name, description, price, quantity, imageUrl, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }

    // New method to update product quantity
    static updateQuantity(id, newQuantity) {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE products SET quantity = ? WHERE id = ?',
                [newQuantity, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
}

module.exports = Product;

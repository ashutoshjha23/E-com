
const db = require('../db');

class Customer {
    static create(name, email, password) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO customers (name, email, password) VALUES (?, ?, ?)',
                [name, email, password],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM customers WHERE email = ?',
                [email],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                }
            );
        });
    }
}

module.exports = Customer;

const db = require('../db');

class Customer {
    static create(name, email, password) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO customers (name, email, password) VALUES (?, ?, ?)',
                [name, email, password],
                (err, results) => {
                    if (err) {
                        console.error('Error executing INSERT query:', err);
                        return reject(err);
                    }
                    
                    if (results && results.insertId) {
                        resolve(results.insertId);
                    } else {
                        console.error('No insertId found in results:', results);
                        reject(new Error('Insert failed: insertId is missing'));
                    }
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
                    if (err) {
                        console.error('Error executing SELECT query:', err);
                        return reject(err);
                    }
                    resolve(results[0]);
                }
            );
        });
    }
}

module.exports = Customer;

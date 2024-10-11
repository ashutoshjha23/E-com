const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'ecommerce',  
    password: 'ashutosh',  
    database: 'ecommerce',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;

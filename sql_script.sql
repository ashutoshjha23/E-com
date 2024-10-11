CREATE DATABASE ecommerce;

CREATE USER 'ecommerce'@'localhost' IDENTIFIED BY 'ashutosh';

GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce'@'localhost';

USE ecommerce;

-- Create customers table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY, -- Changed from id to customer_id
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id INT, 
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE 
);

-- Create orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE -- Updated to reference customer_id
);

SELECT * FROM orders;
SELECT * FROM customers;
SELECT * FROM products;

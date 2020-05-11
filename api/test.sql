CREATE TABLE customers ( 
    userId INT PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR (16) UNIQUE NOT NULL, 
    fullname VARCHAR (60) NOT NULL, 
    email VARCHAR (60) UNIQUE NOT NULL, 
    phone INT NOT NULL, 
    address VARCHAR (128) NOT NULL, 
    password CHAR (32) NOT NULL, 
    userRole BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE products(
    productId INT PRIMARY KEY AUTO_INCREMENT,
    productName VARCHAR(64) UNIQUE NOT NULL,
    price INT(16) NOT NULL,
    units INT(8) NOT NULL
);
CREATE TABLE orders(
    orderId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    orderStatus ENUM('Confirmed', 'Preparing', 'Sending', 'Delivered') NOT NULL DEFAULT 'Confirmed',
    paymentType VARCHAR(64) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(userId) REFERENCES customers(userId)
);
CREATE TABLE ordersDetails(
    orderDetailId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT(8) NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(orderId),
    FOREIGN KEY(productId) REFERENCES products(productId)
);
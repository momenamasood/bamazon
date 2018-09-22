CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    ItemID MEDIUMINT AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(10) NOT NULL,
    primary key(ItemID)
);



INSERT INTO Products(ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Oceans 8","ENTERTAINMENT",19.95,150),
    ("Bambi","ENTERTAINMENT",19.99,200),
    ("Carrots","GROCERY",5.99,50),
    ("Scarf","CLOTHING",75.00,5),
    ("Denim Jeans","CLOTHING",33.25,35),
    ("Water Bottle","SPORTS",13.42,42),
    ("Charlie and The Chocolate Factory","ENTERTAINMENT",15.00,25),
    ("The Nun","ENTERTAINMENT",25.50,57),
    ("Monopoly deal","ENTERTAINMENT",30.50,35),
    ("Jenga","ENTERTAINMENT",19.95,23);
    
    select * from Products;
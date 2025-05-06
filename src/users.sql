create database users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    name VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(250),
    rank VARCHAR(10),
    date VARCHAR(100),
    phone_number varchar(10)
);
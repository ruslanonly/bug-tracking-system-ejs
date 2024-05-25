-- init.sql
USE bts_database;

CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  login varchar(255) NOT NULL UNIQUE,
  password varchar(500) NOT NULL,
  email varchar(500) NOT NULL UNIQUE,
);

CREATE TABLE product (
    id INT AUTO_INCREMENT,
    name VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(200),
    moderated BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE report (
    id INT AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    product_id INT,
    playback_steps VARCHAR(1000) NOT NULL,
    actual_result VARCHAR(1000) NOT NULL,
    expected_result VARCHAR(1000) NOT NULL,
    status INT NOT NULL DEFAULT 0,
    priority INT DEFAULT 0,
    problem INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    CONSTRAINT CHECK_REPORT CHECK (status >= 0 AND status <= 4 AND priority >= 0 AND priority <= 4 AND problem >= 0)
);

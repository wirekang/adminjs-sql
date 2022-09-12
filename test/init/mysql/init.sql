CREATE DATABASE `d1`;

CREATE TABLE `d1`.`users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` tinyint UNSIGNED
);

CREATE TABLE `d1`.`posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NULL DEFAULT NULL,
  FOREIGN KEY (author_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE DATABASE `no_tables`;
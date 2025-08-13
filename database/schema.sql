-- simon_says_game.sql
CREATE DATABASE simon_says;

USE simon_says;

CREATE TABLE leaderboard (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    play_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO leaderboard (player_name, score) VALUES
('Aditya', 15),
('Priya', 10),
('Rahul', 18);

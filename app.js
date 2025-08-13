const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.set("view engine", "ejs");

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tsvhny5mud#", // change this
    database: "simon_says"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

// Home page
app.get("/", (req, res) => {
    db.query("SELECT username, score FROM scores ORDER BY score DESC LIMIT 5", (err, results) => {
        if (err) throw err;
        console.log("Leaderboard data:", results); // <-- Add this
        res.render("index", { leaderboard: results });
    });
});

// Save score API
app.post("/api/score", (req, res) => {
    const { username, score } = req.body;
    if (!username || score === undefined) {
        return res.status(400).json({ error: "Invalid data" });
    }
    db.query("INSERT INTO scores (username, score) VALUES (?, ?)", [username, score], err => {
        if (err) throw err;
        res.json({ success: true });
    });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));

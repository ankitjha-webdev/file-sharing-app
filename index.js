const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});

// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// Schema
const fileSchema = new mongoose.Schema({
    name: String,
    file: String
});

app.get('/', (req, res) => {
    res.send('Hello World');
});





app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT}`);
});
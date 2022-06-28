const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const multer = require('multer');
const File = require('./models/Files');
const upload = multer({ dest: 'uploads/' });
const bcrypt = require('bcryptjs');
// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single("file"), async (req, res) => {
    const file = {
        path: req.file.path,
        originalname: req.file.originalname,
    };
    if (req.body.password != null && req.body.password != '') {
        file.password = await bcrypt.hash(req.body.password, 10);
    }
    const uploaded = await File.create(file);
    console.log(uploaded);

    res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
    // res.send(file.originalname)
});

app.get("/file/:id", (req, res) => {
    res.send(req.params.id)
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT}`);
});
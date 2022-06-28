const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    password: String,
    downloads: {
        type: Number,
        default: 0
    },

    mimetype: {
        type: String,
    },
    size: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('File', FileSchema);
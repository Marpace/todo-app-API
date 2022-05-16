const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const themeSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true
    }
});

exports.Theme = new mongoose.model('Theme', themeSchema);
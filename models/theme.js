const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const themeSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Theme', themeSchema);

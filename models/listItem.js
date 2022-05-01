const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listItemSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ListItem", listItemSchema);
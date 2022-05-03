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
const listSchema = new Schema({
    listItems: {
        type: [listItemSchema],
    }
});

const themeSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true
    }
});

exports.List = mongoose.model("List", listSchema)

exports.ListItem = mongoose.model("ListItem", listItemSchema);

exports.Theme = new mongoose.model('Theme', themeSchema);

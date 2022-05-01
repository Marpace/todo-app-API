const mongoose = require("mongoose");



const Schema = mongoose.Schema;

const listSchema = new Schema({
    listItems: {
        type: [Object],
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("List", listSchema)


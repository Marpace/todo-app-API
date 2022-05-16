const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    listItems: [{
        content: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }],
    dateCreated: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


module.exports = mongoose.model("List", listSchema)




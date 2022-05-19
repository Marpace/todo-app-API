const mongoose = require("mongoose")
const List = require("../models/list")

exports.postAddItem = (req, res) => { 
    const listId = req.body.listId
    const newItem = {
        content: req.body.content, 
        status: req.body.status,
        _id: new mongoose.Types.ObjectId()
    };
    List.findOneAndUpdate(
        {_id: listId},
        {$push: {listItems: newItem}},
        function(err, doc){
            if(err) console.log(err);
            console.log("added new item: " + newItem)
            res.status(201).json();
        }
    )
};

exports.getItems = (req, res) => {
    const listId = req.body.listId

    List.findOne({_id: listId})
    .then(doc => {
        res.status(200).json({items: doc.listItems})
        console.log("fetched items form " + doc.title + " list")
    }).catch(err => {
        err ? console.log(err) : console.log("items found")
    });

};
exports.postDeleteItem = (req, res) => {
    const itemId = req.body.itemId
    const listId = req.body.listId
    List.findByIdAndUpdate(listId, {$pull: {listItems: {_id: itemId}}}) 
    .then((doc) => {
        res.status(200).json();
        console.log("deleted item from " + doc.title + " list")
    })
    .catch(err => console.log(err))   
};

exports.postCheckItem = (req, res) => {
    let newStatus = req.body.status === "completed" ? "active" : "completed";
    const itemId = req.body.itemId;
    const listId = req.body.listId;
    List.findByIdAndUpdate(
        listId, 
        {$set: {"listItems.$[doc].status": newStatus}}, 
        {arrayFilters: [ {"doc._id": {$eq: itemId}}]})
        .then(() => {
            console.log("item status: " + newStatus)
            res.json({newStatus: newStatus});
        })
        .catch(err => console.log(err));
};
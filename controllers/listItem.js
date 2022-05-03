
const db = require("../models/model")

exports.postAddItem = (req, res) => { 
    const newItem = new db.ListItem ({
        content: req.body.content, 
        status: req.body.status
    })
    newItem.save();
    db.List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"},
        {$push: {listItems: newItem}},
        function(err, doc){
            if(err) console.log(err);
            console.log("add new item: " + newItem)
            res.status(201).json();
        }
    )};


exports.postDeleteItem = (req, res) => {

    db.List.findByIdAndUpdate(
        "6266a251b807b257f4b187a0", 
        {$pull: {listItems: {_id: req.body.id}}}, 
        function(err, doc){
            if(err) console.log(err);
            console.log(doc)
            res.status(200).json();
        }
    );
};

exports.postCheckItem = (req, res) => {
    let newStatus = req.body.status === "completed" ? "active" : "completed";
    db.List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"}, 
        {$set: {"listItems.$[doc].status": newStatus}}, 
        {arrayFilters: [ {"doc._id": {$eq: req.body.id}}]},
        function(err, doc){
            if(err) console.log(err);
            console.log("item status: " + newStatus)
            res.json({newStatus: newStatus});
        }
   );
};
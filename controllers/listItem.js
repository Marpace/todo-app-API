
const ListItem = require("../models/listItem")
const List = require("../models/list")

exports.postAddItem = (req, res) => { 
    const newItem = new ListItem ({
        content: req.body.content, 
        status: req.body.status
    });
    newItem.save()
    List.findOneAndUpdate(
        {_id: "627739fb9278206b68a14e81"},
        {$push: {listItems: newItem}},
        function(err, doc){
            if(err) console.log(err);
            console.log("add new item: " + newItem)
            res.status(201).json();
        }
    )};


exports.postDeleteItem = (req, res) => {
    List.findByIdAndUpdate(
        "627739fb9278206b68a14e81", 
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
    List.findOneAndUpdate(
        {_id: "627739fb9278206b68a14e81"}, 
        {$set: {"listItems.$[doc].status": newStatus}}, 
        {arrayFilters: [ {"doc._id": {$eq: req.body.id}}]},
        function(err, doc){
            if(err) console.log(err);
            console.log("item status: " + newStatus)
            res.json({newStatus: newStatus});
        }
   );
};
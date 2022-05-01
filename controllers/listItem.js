const ListItem = require("../models/listItem");
const List = require("../models/list");


exports.postAddItem = (req, res) => { 
    const newItem = new ListItem ({
        content: req.body.content, 
        status: req.body.status
    })
    List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"},
        {$push: {listItems: newItem}}
    )
};


exports.postDeleteItem = (req, res) => {
    List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"}, 
        {$pull: {listItems: {_id: req.body.id}}}, 
        function(err, doc){
            if(err) console.log(err);
            console.log("Deleted Item")
            res.status(200).json();
        }
    );
};

exports.postCheckItem = (req, res) => {
    let newStatus = req.body.status === "completed" ? "active" : "completed";
    List.findOneAndUpdate(
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


const db = require("../models/model")


exports.getItems = (req, res) => {
    db.List.findOne({_id: "6266a251b807b257f4b187a0"}, function(err, doc){
        if(err) console.log(err);    
        res.status(200).json({items: doc.listItems})        
    })
};

exports.postClearCompleted = (req, res) => {
    db.List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"},
        {$pull: {listItems: {status: "completed"}}}, 
        function(err, doc){
            if(err) console.log(err);           
            console.log("Deleted completed items")
            res.status(200).json();       
        }
    );
};

exports.postUpdateListOrder = (req, res) => {
    const movedItem = new db.ListItem({
        content: req.body.content,
        status: req.body.status
    })
    const newIndex = req.body.newIndex 
    db.List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"},
        {$pull: {listItems: {_id: req.body.itemId}}}
    )
    .then(() => {
        console.log("Deleted moved item from list");
        db.List.findOneAndUpdate(
            {_id: "6266a251b807b257f4b187a0"},
            {$push: {listItems: {
                $each: [movedItem],
                $position: newIndex
            }}}
        )
        .then(() => {
            console.log("Copied moved item to index: " + newIndex);
            console.log(req.body.content)
            res.json();
        })
    })
    
    .catch( err => console.log(err));
};
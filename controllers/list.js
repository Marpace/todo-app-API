const List = require("../models/list");
const User = require("../models/user");
const mongoose = require("mongoose")

exports.getLists = (req, res) => {
    List.find({user: req.userId})
    .then(lists => {
        res.status(200).json({lists: lists})
    })
    .catch(err => console.log(err))

};

exports.getSingleList = (req, res) => {
    const listId = req.body.listId
    List.findById(listId)
    .then( list => {
        res.status(200).json({list: list})
        console.log(`Fetched ${list.title} list`)
    })
    .catch(err => console.log(err))
}

exports.postCreateList = (req, res) => {
    const newList = new List({
        title: req.body.title,
        listItems: [],
        dateCreated: req.body.dateCreated,
        user: req.userId
    })
    newList.save()
    .then(result => {
        return User.findOne({_id: req.userId});
    })
    .then(user => {
        const list = {
            title: newList.title,
            listId: newList._id
        }
        user.lists.push(list)
        return user.save();
    })
    .then(result => {
        console.log("Created ne wlist on " + newList.dateCreated)
        res.status(200).json();
    })
}

exports.postDeleteList = (req, res) => {
    const listId = req.body.listId;
    const userId = req.userId
    List.findById(listId)
    .then(list => {
       list.remove();
       User.findByIdAndUpdate(userId, {$pull: {lists: {listId: listId}}})
       .then(() => {
           res.status(200).json();
       })
    })
    .catch(err => console.log(err))
}

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

exports.postClearCompleted = (req, res) => {
    const listId = req.body.listId
    List.findByIdAndUpdate(
        {listId}, 
        {$pull: {listItems: {status: "completed"}}}
    )
    .then(() => {
        console.log("Deleted completed items")
        res.status(200).json();       
    }) 
    .catch(err => console.log(err));
};

exports.postUpdateListOrder = (req, res) => {
    const listId = req.body.listId
    const itemId = req.body.itemId
    const movedItem = {
        content: req.body.content,
        status: req.body.status,
        _id: itemId
    }
    const newIndex = req.body.newIndex 
    List.findByIdAndUpdate(
        listId,
        {$pull: {listItems: {_id: req.body.itemId}}}
    )
    .then(() => {
        console.log("Deleted moved item from list");
        List.findByIdAndUpdate(
            listId,
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
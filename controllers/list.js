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
        res.status(200).json({list: newList});
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




exports.postClearCompleted = (req, res) => {
    const listId = req.body.listId
    List.findOneAndUpdate(
        {_id: listId}, 
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
        List.findByIdAndUpdate(
            listId,
            {$push: {listItems: {
                $each: [movedItem],
                $position: newIndex
            }}}
        )
        .then(() => {
            console.log(req.body.content)
            res.json();
        })
    })
    .catch( err => console.log(err));
};

exports.saveList = (req, res) => {
    const listId = req.body.listId
    const items = req.body.items


    List.findById(listId)
    .then( doc => {
        doc.listItems = items;
        return doc.save();
    })
    .then( doc => {
        console.log(doc)
        res.status(200).json({list: doc});
    })
    .catch( err => console.log(err))
    
}
    

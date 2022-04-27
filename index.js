const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const Schema = mongoose.Schema;

////////////  MIDDLEWARE  ////////////////
app.use(express.json());
app.use(cors());

////////////  DATABASE  ////////////////
// Connect to mongoDB 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, err => err ? console.log(err) : 
    console.log('Connected to Todo-list database')
    );
    
    // create schemas and models
    //item schema 
    const listItemSchema = new Schema(
        {
            content: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }
    );
    const ListItem = mongoose.model("ListItem", listItemSchema)
    
//theme schema 
const themeSchema = new mongoose.Schema({
    theme: String
});
const Theme = new mongoose.model('Theme', themeSchema);

//list schema 
const listSchema = new Schema(
    {
        listItems: [listItemSchema]
    }
    );
const List = mongoose.model("List", listSchema)


////////////  GET ROUTES  ////////////////
app.get("/get-items", function(req, res){
    List.findOne({_id: "6266a251b807b257f4b187a0"}, function(err, doc){
        if(err) console.log(err);
        else res.status(200).json({
            items: doc.listItems
        })
    })
});

app.get("/get-theme", function(req, res){
    Theme.findOne({_id: "6260ae6b1979b63b0687f1ad"}, function(err, doc){
        if(err) console.log(err);
        else res.status(200).json(doc);
    })
});

////////////  POST ROUTES  ////////////////
app.post("/add-item", function(req, res){ 
    const newItem = new ListItem ({
        content: req.body.content, 
        status: req.body.status
    })
    newItem.save();
    List.findOne({_id: "6266a251b807b257f4b187a0"}, function(err, doc){
        if(err) console.log(err);
        else {
            doc.listItems.push(newItem);
            doc.save();  
            console.log("added new item")
            res.status(201).json();
        }
    })      
});

app.post("/delete-item", function(req, res){
    List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"}, 
        {$pull: {listItems: {_id: req.body.id}}}, 
        function(err, doc){
            if(err) console.log(err);
            else {
                console.log("Deleted Item")
                res.status(200).json();
            }
        }
    );
})

app.post("/clear-completed", function(req, res){
    List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"}, 
        {$pull: {listItems: {status: "completed"}}}, 
        function(err, doc){
            if(err) console.log(err);
            else {
                console.log("Deleted completed items")
                res.status(200).json();
            }
        }
    );
});

app.post("/change-theme", function(req, res){
    Theme.findOneAndUpdate(
        {_id: "6260ae6b1979b63b0687f1ad"}, 
        {theme: req.body.theme}, 
        function(err, doc){
            if(err) console.log(err);
            else {
                console.log("theme changed to:" + req.body.theme)
                res.status(200).json();
            }
        }
    );
});

app.post("/check-item", function(req, res){
    let newStatus = req.body.status === "completed" ? "active" : "completed";
    List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"}, 
        {$set: {"listItems.$[doc].status": newStatus}}, 
        {arrayFilters: [ {"doc._id": {$eq: req.body.id}}]},
        function(err, doc){
            if(err) console.log(err);
            else {
                    console.log(newStatus)
                res.json({newStatus: newStatus});
            }
        }
   );
});

app.post("/update-list-order", function(req, res){
    const movedItem = new ListItem({
        content: req.body.content,
        status: req.body.status
    })
    const newIndex = req.body.newIndex 
    List.findOneAndUpdate(
        {_id: "6266a251b807b257f4b187a0"},
        {$pull: {listItems: {_id: req.body.itemId}}},
        function(err, doc){
            if(err) console.log(err);
            else {
                console.log("Deleted moved item from list");
                List.findOneAndUpdate(
                    {_id: "6266a251b807b257f4b187a0"},
                    {$push: {listItems: {
                        $each: [movedItem],
                        $position: newIndex
                    }}},
                    function(err, doc){
                        if(err) console.log(err);
                        else {
                            console.log("Copied moved item to index: " + newIndex);
                            console.log(req.body.content)
                            res.json();
                        }
                    }
                );
            }
        }
    );
});


const port = process.env.port || 5000


app.listen(port, function(err){
    if(err) console.log(err);
    else console.log("Server started on port 5000")
});


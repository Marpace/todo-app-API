
const db = require("../models/theme")

exports.getTheme = (req, res) => {
    db.Theme.findOne({_id: "6260ae6b1979b63b0687f1ad"}, function(err, doc){
        if(err) console.log(err);
        res.status(200).json(doc);
    })
};

exports.postSetTheme = (req, res) => {
    db.Theme.findOneAndUpdate(
        {_id: "6260ae6b1979b63b0687f1ad"}, 
        {theme: req.body.theme}, 
        function(err, doc){
            if(err) console.log(err);           
            console.log("theme changed to:" + req.body.theme)
            res.status(200).json();
        }
    );
};
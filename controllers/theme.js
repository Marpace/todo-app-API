
const user = require("../models/user");

exports.getTheme = (req, res) => {
    const userId = req.userId;
    user.findOne({_id: userId})
    .then(user => {
        res.status(200).json({theme: user.theme})
    })
    .catch(err => console.log(err))
};

exports.postSetTheme = (req, res) => {
    const theme = req.body.theme;
    const userId = req.userId;

    user.findOne({_id: userId})
    .then(user => {
        user.theme = theme;
        return user.save();
    })
    .then(() => {
        console.log("Theme changed to: " + theme)
        res.status(200).json()
    })
    .catch(err => console.log(err));
};
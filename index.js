const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const listRoutes = require("./routes/list");
const listItemRoutes = require("./routes/listItem");
const themeRoutes = require("./routes/theme");

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        const port = process.env.PORT || 5000

        app.use(express.json());
        app.use(cors());

        app.use(listRoutes);
        app.use(listItemRoutes);
        app.use(themeRoutes);



        app.listen(port, function(err){
            if(err) console.log(err);
            else console.log("Server started on port: " + port)
        });

    })




const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const listRoutes = require("./routes/list");
const listItemRoutes = require("./routes/listItem");
const themeRoutes = require("./routes/theme");
const authRoutes = require("./routes/auth");

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
        app.use(authRoutes);

        app.listen(port, function(err){
            if(err) console.log(err);
            else console.log("Server started on port: " + port)
        });

    });




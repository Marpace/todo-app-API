const express = require("express");

const themeController = require("../controllers/theme");

const router = express.Router();

router.get("/get-theme", themeController.getTheme);

router.post("/set-theme", themeController.postSetTheme);

module.exports = router;
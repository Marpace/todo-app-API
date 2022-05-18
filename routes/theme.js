const express = require("express");

const themeController = require("../controllers/theme");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/get-theme", isAuth, themeController.getTheme);

router.post("/set-theme",isAuth, themeController.postSetTheme);

module.exports = router;
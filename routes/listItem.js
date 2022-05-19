const express = require("express");

const listItemController = require("../controllers/listItem");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/get-items", isAuth, listItemController.getItems);

router.post("/add-item", isAuth, listItemController.postAddItem);

router.post("/delete-item", isAuth, listItemController.postDeleteItem);

router.post("/check-item", isAuth, listItemController.postCheckItem);

module.exports = router;
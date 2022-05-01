const express = require("express");

const listItemController = require("../controllers/listItem");

const router = express.Router();

router.post("/add-item", listItemController.postAddItem);

router.post("/delete-item", listItemController.postDeleteItem);

router.post("/check-item", listItemController.postCheckItem);

module.exports = router;
const express = require("express");

const listController = require("../controllers/list");

const router = express.Router();

router.get("/get-items", listController.getItems);

router.post("/clear-completed", listController.postClearCompleted);

router.post("/update-list-order", listController.postUpdateListOrder);

module.exports = router;
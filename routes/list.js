const express = require("express");

const listController = require("../controllers/list");

const isAuth = require("../middleware/is-auth");

const router = express.Router();


router.post("/get-items", isAuth, listController.getItems);

router.get("/get-lists", isAuth, listController.getLists);

router.post("/get-single-list", isAuth, listController.getSingleList);

router.post("/create-list", isAuth, listController.postCreateList);

router.post("/delete-list", isAuth, listController.postDeleteList);

router.post("/clear-completed", listController.postClearCompleted);

router.post("/update-list-order", listController.postUpdateListOrder);

router.post("/add-item", listController.postAddItem);

router.post("/delete-item", listController.postDeleteItem);

router.post("/check-item", listController.postCheckItem);

module.exports = router;
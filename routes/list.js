const express = require("express");

const listController = require("../controllers/list");

const isAuth = require("../middleware/is-auth");

const router = express.Router();



router.get("/get-lists", isAuth, listController.getLists);

router.post("/get-single-list", isAuth, listController.getSingleList);

router.post("/create-list", isAuth, listController.postCreateList);

router.post("/delete-list", isAuth, listController.postDeleteList);

router.post("/clear-completed", isAuth, listController.postClearCompleted);

router.post("/update-list-order", isAuth, listController.postUpdateListOrder);



module.exports = router;
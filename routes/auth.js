const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const authController = require("../controllers/auth")

router.post('/register', authController.register);

router.post("/login", authController.login)

router.post("/delete-user", isAuth, authController.deleteUser)



module.exports = router;
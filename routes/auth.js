const express = require("express");
const router = express.Router();

const { body } = require('express-validator');

const isAuth = require("../middleware/is-auth");

const User = require("../models/user");
const authController = require("../controllers/auth")

router.post(
    '/register',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail(),
      body('password')
        .trim()
    ],
    authController.register
);

router.post("/login", authController.login)

router.post("/delete-user", isAuth, authController.deleteUser)



module.exports = router;
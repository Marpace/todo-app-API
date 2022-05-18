const express = require("express");
const router = express.Router();

const { body } = require('express-validator');

const isAuth = require("../middleware/is-auth");

const User = require("../models/user");
const authController = require("../controllers/auth")

router.put(
    '/register',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
          return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
              return Promise.reject('E-Mail address already exists!');
            }
          });
        })
        .normalizeEmail(),
      body('password')
        .trim()
    ],
    authController.register
);

router.post("/login", authController.login)

router.post("/delete-user", isAuth, authController.deleteUser)



module.exports = router;
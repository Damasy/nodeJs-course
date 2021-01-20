const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const User = require("./../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email!")
      .isEmail()
      .trim()
      .normalizeEmail(),
    body("password", "Incorrect password!")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email", "Please enter a valid email!")
      .isEmail()
      .trim()
      .normalizeEmail()
      .custom((val, { req }) => {
        return User.findOne({ email: val }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email exists already, please pick a different one!"
            );
          }
        });
      }),
    body("password", "Please enter a strong password of only numbers and text!")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((val, { req }) => {
        if (val === req.body.password) {
          return true;
        }
        throw new Error("Password must match!");
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset-password", authController.getReset);

router.post("/reset-password", authController.postReset);

router.get("/reset-password/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;

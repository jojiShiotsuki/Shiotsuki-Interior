const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/", authController.getLogin);
router.post("/", authController.postLogin);
router.get("/addproject", ensureAuth, postsController.getProfile);
router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.put("/updateStatus/:id", postsController.updateStatus);

router.put("/updateTime/:id", postsController.updateTime);

router.put("/updateDate/:id", postsController.updateDate);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;

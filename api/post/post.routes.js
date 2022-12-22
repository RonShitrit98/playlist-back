const express = require("express");
// const {
//   requireAuth,
//   requireAdmin,
// } = require("../../middlewares/requireAuth.middleware");
const { createPost, getPosts } = require("./post.controller");
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/:id", getPosts);
router.post("/create", createPost);

module.exports = router;

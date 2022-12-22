const postService = require("./post.service");
const logger = require("../../services/logger.service");

async function createPost(req, res) {
  try {
    const post = req.body;
    post.createdBy = req.session.user._id;
    post.createdAt = Date.now();
    const savedPost = await postService.create(post);
    res.send(savedPost);
  } catch (err) {
    logger.error("Failed to save post", err);
  }
}

async function getPosts(req, res) {
  try {
    const posts = await postService.getPosts(req.params.id)
    res.send(posts)
  } catch (error) {
    logger.error("Failed to get posts", error);
  }
}

module.exports = {
  createPost,
  getPosts,
};

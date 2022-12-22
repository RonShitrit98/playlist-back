const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

async function create(post) {
  try {
    const collection = await dbService.getCollection("post");
    await collection.insertOne(post);
    return post;
  } catch (err) {
    logger.error("cannot insert post", err);
    throw err;
  }
}
async function getPosts(id) {
  console.log(id);
  try {
    const collection = await dbService.getCollection("post");
    const posts = await collection.find({ createdBy: id }).toArray();
    return posts;
  } catch (err) {
    logger.error("cannot insert post", err);
    throw err;
  }
}

module.exports = {
  create,
  getPosts,
};

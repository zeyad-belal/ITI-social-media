const express = require("express");
const verfiyUserToken = require("../utils/verfiyUserToken");
const verfiyAdminToken = require("../utils/verfiyAdminToken");
const {
  getUserPosts,
  createNewPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();


//get users posts
router.get("/", verfiyUserToken, getUserPosts);

// create new post
router.post("/new", verfiyUserToken, createNewPost);

// update post
router.patch("/:id", verfiyUserToken,  updatePost);

// delete post
router.delete("/:id", verfiyAdminToken, deletePost);

module.exports = router;

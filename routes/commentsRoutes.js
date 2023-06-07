const express = require("express");
const verfiyUserToken = require("../utils/verfiyUserToken");
const verfiyAdminToken = require("../utils/verfiyAdminToken");
const {
  getPostComments,
  createNewComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();


//get users comments
router.get("/", verfiyUserToken, getPostComments);


// create new comment
router.post("/new", verfiyUserToken, createNewComment);

// update comment
router.patch("/:id", verfiyUserToken,  updateComment);

// delete comment
router.delete("/:id", verfiyAdminToken, deleteComment);

module.exports = router;

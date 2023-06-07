const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const AppError = require("../utils/AppError");

const getPostComments = async (req, res) => {
  const { postId } = req.body;

  const comments = await Comment.find({ post: postId });
  if (!comments)  new AppError("Comments not found", 404);

  // const posts = await Comment.find({ user: userId }).populate("user");

  res.send(comments);
};

// create new Comment
const createNewComment = async (req, res) => {
  // provide postId in the body when making the comment req in the frontend
  const { content, postId } = req.body;

  const newComment = await Comment.create({
    content,
    post: postId,
    user: req.user._id,
  });

  // Update post's Comments array
  const post = await Post.findById(postId);
  post.comments.push(newComment._id);
  await post.save();

  res.send(newComment);
};

// update Comment PATCH
const updateComment = async (req, res) => {
  // provide postId in the body when making the comment req in the frontend
  const { id:commentId } = req.params;
  const {content, postId} = req.body;

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );
  if (!updatedComment)  new AppError("Comment not found", 404);

  const result = updatedComment ? "Comment updated" : "something went wrong";


  // Update the post's Comments array
  const post = await Post.findById(postId)
  if(!post) return new AppError("comment's post not found", 404);

  const index = post.comments.indexOf(commentId);

  if (index > -1) {
    post.comments[index].content = content;
    await post.save();
  }

  res.send(result);
};

// delete Comment
const deleteComment = async (req, res) => {
  const { id:commentId } = req.params;
  const { postId} = req.body;

  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if(!deletedComment) return new AppError("deleting comment faild", 501);

  const result = deletedComment ? "Comment deleted" : "something went wrong";

  // Remove the deleted Comment from the user's Comments array
  const post = await Post.findById(postId);
  const index = post.comments.indexOf(commentId);

  if (index > -1) {
    post.comments.splice(index, 1);
    await post.save();
  }

  res.send(result);
};

module.exports = {
  getPostComments,
  createNewComment,
  updateComment,
  deleteComment,
};

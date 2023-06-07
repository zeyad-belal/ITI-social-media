const Post = require("../models/post");
const User = require("../models/user");

const getUserPosts = async (req, res) => {
  const userId = req.user._id;

  const posts = await Post.find({ user: userId })
    .populate("comments")
    .populate("reviews");

  res.send(posts);
};

// create new post
const createNewPost = async (req, res) => {
  const { content } = req.body;
  const newPost = await Post.create({ content, user: req.user._id });

  // Update user's posts array
  const user = await User.findById(req.user._id);
  user.posts.push(newPost._id);
  await user.save();

  res.send(newPost);
};

// update Post PATCH
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { content },
    { new: true }
  );
  const result = updatedPost ? "post updated" : "something went wrong";

  // Update the post in the user's posts array
  const user = await User.findById(req.user._id);
  const index = user.posts.indexOf(id);
  if (index > -1) {
    user.posts[index].content = content;
    await user.save();
  }

  res.send(result);
};

// delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  const result = deletedPost ? "post deleted" : "something went wrong";

  // Remove the deleted post from the user's posts array
  const user = await User.findById(req.user._id);
  const index = user.posts.indexOf(id);
  if (index > -1) {
    user.posts.splice(index, 1);
    await user.save();
  }

  res.send(result);
};

module.exports = { getUserPosts, createNewPost, updatePost, deletePost };

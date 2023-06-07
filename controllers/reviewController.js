const Comment = require("../models/comment");
const User = require("../models/user");
const Review = require("../models/review");
const Post = require("../models/post");
const AppError = require("../utils/AppError");

const getPostReviews = async (req, res) => {
  const { postId } = req.body;

  const reviews = await Review.find({ post: postId });
  if (!reviews)  new AppError("reviews not found", 404);

  res.send(reviews);
};


// create new Review
const createNewReview = async (req, res) => {
  // provide postId in the body when making the Review req in the frontend
  const { content , rate , postId } = req.body;

  const newReview = await Review.create({
    content,
    rate,
    post: postId,
    user: req.user._id
  });
  // Update post's reviews array
  const post = await Post.findById(postId);
  post.reviews.push(newReview._id);
  await post.save();

  res.send(newReview);
};



// update Review PATCH
const updateReview = async (req, res) => {
  // provide postId in the body when making the review req in the frontend
  const { id:reviewId } = req.params;
  const {content, rate , postId} = req.body;

  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { content , rate },
    { new: true }
  );
  if (!updatedReview)  new AppError("review not found", 404);

  const result = updatedReview ? "review updated" : "something went wrong";
  
  // Update the post's reviews array
  const post = await Post.findById(postId)
  if(!post) return new AppError("review's post not found", 404);

  const index = post.reviews.indexOf(reviewId);

  if (index > -1) {
    post.reviews[index].content = content;
    await post.save();
  }

  res.send(result);
};



// delete Review
const deleteReview = async (req, res) => {
  const { id:reviewId } = req.params;
  const { postId} = req.body;

  const deletedReview = await Review.findByIdAndDelete(reviewId);
  if(!deletedReview) return new AppError("deleting review faild", 501);

  const result = deletedReview ? "review deleted" : "something went wrong";
  // Remove the deleted review from the user's reviews array
  const post = await Post.findById(postId);
  const index = post.reviews.indexOf(reviewId);

  if (index > -1) {
    post.reviews.splice(index, 1);
    await post.save();
  }

  res.send(result);
};





module.exports = {
  getPostReviews,
  createNewReview,
  updateReview,
  deleteReview
};

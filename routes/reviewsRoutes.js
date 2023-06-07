const express = require("express");
const verfiyUserToken = require("../utils/verfiyUserToken");
const verfiyAdminToken = require("../utils/verfiyAdminToken");
const {
  getPostReviews,
  createNewReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();


//get users reviews
router.get("/", verfiyUserToken, getPostReviews);


// create new review
router.post("/new", verfiyUserToken, createNewReview);

// update review
router.patch("/:id", verfiyUserToken,  updateReview);

// delete review
router.delete("/:id", verfiyAdminToken, deleteReview);

module.exports = router;

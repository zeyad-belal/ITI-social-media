const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  post:{
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

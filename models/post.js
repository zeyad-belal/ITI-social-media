const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
    required: true
  }],
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

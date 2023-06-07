const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

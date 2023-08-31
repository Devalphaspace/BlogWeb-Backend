const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: false,
    },
    photo: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    username: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: Array,
      default: [],
    },
    commentedBy: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

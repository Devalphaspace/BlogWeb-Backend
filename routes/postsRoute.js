const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User"); // Import the User model
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

//CREATE POST
router.post("/", async (req, res) => {
  // const newPost = new Post(req.body);
  const { title, desc, photo, username, categories } = req.body;
  try {
    const result = await cloudinary.uploader.upload(photo, {
      folder: "Blogs",
    });
    const savedPost = await Post.create({
      title,
      desc,
      photo: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      username,
      categories,
    });
    res.status(200).json({
      message: "posted successfully",
      savedPost,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const udatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          message: "post updated successfully",
          udatedPost,
        });
      } catch (error) {
        res.status(401).json("You can update only your post");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// LIKE POST
router.put("/:id/like", async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (post.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Post already liked by the user" });
    }

    post.likedBy.push(userId);
    post.likeCount++;
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json({
          message: "post deleted",
        });
      } catch (error) {
        res.status(401).json("You can delete only your post");
        // console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
    // console.log(error);
  }
});

//GET POST:
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
    // console.log(error);
  }
});

//GET ALL POSTS || GET
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catname = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catname) {
      posts = await Post.find({
        categories: {
          $in: [catname],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
    // console.log(error);
  }
});

module.exports = router;

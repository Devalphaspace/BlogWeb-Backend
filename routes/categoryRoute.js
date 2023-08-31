const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
const router = express.Router();

//POST CATEGORY
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CATEGORY
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find()
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;

const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

//UPDATE || PUT :
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      const { password, ...others } = updatedUser._doc;
      res.status(200).json({
        message: "Updated successfully",
        others,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can update only your account");
  }
});

//DELETE || DELETE :
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can delete only your account");
  }
});

//GET USER || GET:
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({
      message: "get successfully",
      others,
    });
  } catch (error) {
    res.status(501).json(error);
  }
});

module.exports = router;

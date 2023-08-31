const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

// RESGITER || POST:
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password:
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error("Error occurred while registering:", err);
    res.status(500).json({ error: "Failed to register" });
  }
});

// LOGIN:
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Wrong credentials" });
    }

    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(400).json({ error: "Wrong credentials" });
    }

    // Return name and email
    const { email } = user;
    return res.status(200).json({ message: "Login successful", username, email });
  } catch (err) {
    console.error("Error occurred while logging in:", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

// UPDATE USER || PUT
router.put("/update/:id", async (req, res) => {
  try {
    const { username, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, {
      username,
      profilePic,
    }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error occurred while updating profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;

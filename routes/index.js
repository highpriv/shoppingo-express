// ? Node modules.
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const router = express.Router();
const { controllerRootSlash } = require("../controllers");

// ? Root slash.
router.get("/", controllerRootSlash);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch || !user) {
      return res.status(400).send({ error: "Invalid password or email." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    res.status(401).send({
      message: "An error occured!",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ error: "Email already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    res.status(401).send({
      message: "An error occured!",
    });
  }
});

// ? Export.
module.exports = router;

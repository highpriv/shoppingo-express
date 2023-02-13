// ? Node modules.
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const router = express.Router();
const { controllerRootSlash } = require("../controllers");

// ? Root slash.
router.get("/", controllerRootSlash);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).send({ error: "Invalid password" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.send({ token });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ error: "Email already exists" });
  }

  const user = new User({ email, password });
  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.send({ token });
});

// ? Export.
module.exports = router;

// ? Node modules.
const express = require("express");
const router = express.Router();
const { controllerRootSlash } = require("../controllers");

// ? Root slash.
router.get("/", controllerRootSlash);

// ? Export.
module.exports = router;

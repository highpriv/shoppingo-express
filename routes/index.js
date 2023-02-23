// ? Node modules.
const express = require("express");
const router = express.Router();
const { controllerRootSlash, AuthController, OrderController } = require("../controllers");

// ? Root slash.
router.get("/", controllerRootSlash);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/orders", OrderController.newOrder);


// ? Export.
module.exports = router;

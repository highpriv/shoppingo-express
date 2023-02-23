const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
  async newOrder(req, res, next) {
    try {

        const cookie = req.cookies["token"];
        const checkCookie = jwt.verify(cookie, process.env.JWT_SECRET);
        const user = await User.findOne({ id: checkCookie.id });

        if (!checkCookie || !user) {
            return res.status(401).send({
              message: "Auth error!",
            });
          }


        // I'll continue with request body && validation (/w using joi)

    
      } catch (err) {
        console.log(err.message)
        res.status(401).send({
          message: "An error occured!",
        });
      }
  },
};
module.exports = controller;

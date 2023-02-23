const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
  async login(req, res, next) {
    try {
        const { email, password } = req.body;
    
        const user = (await User.findOne({ email }));
    
        let errorMessages = [
          {
            check: (!user),
            message: "Invalid password or email."
          },
          {
            check: !(bcrypt.compare(password, user.password)),
            message: "Invalid password or email."
          }
        ]
    
        let i = 0;
    
       while (i < errorMessages.length) {
        if(errorMessages[i].check) return (res.status(400).send({ error: errorMessages[i].message }));
        else i++;
       }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: 86400});
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.json({ token });
    
      } catch (err) {
        console.log(err.message)
        res.status(401).send({
          message: "An error occured!",
        });
      }
  },

  async register(req, res, next) {
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
        console.log(err.message)
        res.status(401).send({
          message: "An error occured!",
        });
      }
  },
};
module.exports = controller;

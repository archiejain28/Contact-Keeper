const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../Database/models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

//Get user logged in

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    if (err) {
      console.error(err.message);
    }
  }
});

// Register new user

router.post(
  "/",
  check("name", "enter name").not().isEmpty(),
  check("email", "enter valid email").isEmail(),
  check("password", "enter valid password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
          return res.status(400).json({ msg: "User exists" });
        }

        user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save();
        const payload = {
          user: {
            id: user.id,
          },
        };

        console.log(payload);
        jwt.sign(
          payload,
          `${config.get("jwtSecret")}`,
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            else {
              res.json({ token });
            }
          }
        );
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

module.exports = router;

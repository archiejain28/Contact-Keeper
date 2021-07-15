const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../Database/models/User.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const config = require("config");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("email", "Please enter Email").isEmail(),
    check("password", "Enter Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(402).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: "Invalid Credentials" });
      }
      console.log(user);
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(404).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        `${config.get("jwtSecret")}`,
        { expiresIn: 360000 },
        (err, token) => {
          if (!err) {
            res.json({ token });
          }
          throw err;
        }
      );
    } catch (err) {
      if (err) throw err;
    }
  }
);

module.exports = router;

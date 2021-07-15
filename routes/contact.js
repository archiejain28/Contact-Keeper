const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Contact = require("../Database/models/contact.model");
const { check, validationResult } = require("express-validator");

router.get("/", auth, (req, res) => {
  Contact.find({ user: req.user.id })
    .sort({
      date: -1,
    })
    .then((contacts) => {
      console.log(contacts);
      res.json(contacts);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/", [auth, check("name").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, email, phone, type } = req.body;

  try {
    const newcontact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });

    const contact = await newcontact.save();
    res.status(200).json(contact);
  } catch (err) {
    if (err) console.error(err.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const contactfield = {};

  const { name, email, phone, type } = req.body;

  if (name) contactfield.name = name;
  if (email) contactfield.email = email;
  if (phone) contactfield.phone = phone;
  if (type) contactfield.type = type;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      res.status(402).json({ msg: "Unauthorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactfield },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    if (err) console.error(err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      res.status(402).json({ msg: "Unauthorized" });
    }

    await Contact.findOneAndRemove(req.params.id);

    res.json({ msg: "Contact Removed" });
  } catch (err) {
    if (err) console.error(err.message);
  }
});

module.exports = router;

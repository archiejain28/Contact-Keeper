const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb_connection.js");
const path = require("path");

const app = express();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("welcome to the app");
});

app.use("/users", require("./routes/user.js"));
app.use("/contacts", require("./routes/contact.js"));
app.use("/auth", require("./routes/auth.js"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Server started ${PORT}`);
});

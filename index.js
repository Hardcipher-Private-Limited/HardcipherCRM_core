const express = require("express");

const mongoose = require("mongoose");
const app = express();
const route = require("./routes/routes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //

dotenv.config();

//connect to db
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

// app.use(express.json());
// app.use(express.urlencoded());

// middleware to pass the control to routes
app.use("/api", route);
app.all("*", (req, res) => {
  res
  .status(404)
  .json({ status: false, message: "API not found" });
});

// server listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port " + (process.env.PORT || 3000));
});

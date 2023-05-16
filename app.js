const express = require("express");

const mongoose = require("mongoose");
const app = express();
const route = require("./routes/routes");
const bodyParser = require("body-parser");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //
app.use(multer().any());

dotenv.config();

//connect to db
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

//cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders:
      "Content-Type, Authorization, Origin, X-Requested-With, Accept",
  })
);

app.use("/api", route);

app.all("*", (req, res) => {
  res.status(404).json({ status: false, message: "API not found" });
});

// server listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port " + (process.env.PORT || 3000));
});

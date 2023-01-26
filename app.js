const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("DB Connected");
  })
  .catch((error) => console.log("Unable to connect to the db"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// bring in routes
 
const jobRoutes = require("./routes/jobRoute");

// // apiDocs
app.get("/api", (req, res) => {
  res.json({ Success: "Working" });
});
// app.get("*", function (req, res) {
//   res.status(404).json({error:'route not found'});
// });

// middleware -
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
 
app.use("/api/job/v1", jobRoutes);

console.log("__dirname", __dirname);
const path = require("path");
app.use(express.static(__dirname));

const port = process.env.PORT || 8060;
app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`);
});

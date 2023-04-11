const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const PORT = process.env.PORT || 8080;

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Mongodb connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", AuthRoutes);
app.use("/api", movieRoutes);

app.listen(8080, () => {
  console.log("Backend Server Running");
});

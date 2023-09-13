const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  cors({
    origin: "http://localhost:3000",
    origin: "http://localhost:3001",
  })
);
app.use(express.json()); //Without `express.json()`, `req.body` is undefined.(The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. )
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`backend server is runing on ${process.env.PORT}`);
});

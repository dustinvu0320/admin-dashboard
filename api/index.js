// import everything
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Hide secret key
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

// Connect our app to MongDB server database
mongoose
  // This is our secret key
  .connect(process.env.MONGO_URL)
  // If True connect sucessful
  .then(() => console.log("DBConnection Sucessful!"))
  // else
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
// Pass json file
app.use(express.json());
// Create REST API server and route (http)
// "/api/user : endpoint"
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// Run the app
// Either PORT from env or PORT 5000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Backend server is running!");
  console.log(`Server Port: ${PORT}`);
});

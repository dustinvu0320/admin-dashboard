// Create a more secure app for authentication
// Register and Login inside this ROUTE
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER : post
// async and await : help program wait until savedUser finshed saving info
router.post("/register", async (req, res) => {
  console.log(res.body);
  // Create new user info
  const newUser = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    // Secret password: encrypt password
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    // Save user info into MongoDB
    const savedUser = await newUser.save();
    // status(201) : sucessful
    res.status(201).json(savedUser);
    // Try & Catch
  } catch (err) {
    // status(500) : error
    res.status(500).json(err);
  }
});

// LOGIN : post
router.post("/login", async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ username: req.body.username });

    // If there is no user
    if (!user) {
      res.status(401).json("Username is not found!");
      return;
    } 
    // Find and get password from database (decrypt)
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    // Decrypt password
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
    // If password is not matched
    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    // Store _id and isAdmin into JWT
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      // after 3 days we cannot use this access token again, must login again
      { expiresIn: "3d" }
    );

    // Keep password to be hidden and only pass other info back
    // Since all info are stored in "_doc" folder
    const { password, ...others } = user._doc;
    // Response back user if successful
    res.status(200).json({ ...others, accessToken });
    // Try & Catch
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;

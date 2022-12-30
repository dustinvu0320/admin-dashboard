const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// UPDATE : put
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    // Secret password: encrypt password
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE :
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Find and send user back
    const user = await User.findById(req.params.id);
    // Keep password to be hidden and only pass other info back
    // Since all info are stored in "_doc" folder
    const { password, ...others } = user._doc;
    // Response back user if successful
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  // new is name of query
  // query will return lastest 5 users
  const query = req.query.new;
  try {
    // Find and send user back
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS: return total # of users per month (example)
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  // Get last year (same date)
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    // Group items
    const data = await User.aggregate([
      // Condition
      { $match: { createdAt: { $gte: lastYear } } },
      // Get Month
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      // group user/items
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;

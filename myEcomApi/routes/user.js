const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

// ==========================================================================================================
// we can call this  a controller cuz it contreoll all the documennts routes and midllewares
//UPADTE

//here :id is paramtere means it have some value(variable) that can be used for authenticating users
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  //if user updates his password again we will use hashing algorithm to store it securely
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(); //tostring converts hashed code into string
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id }, //it also work if u write like this[req.params.id] without '{}'and _id
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

//====================================================================
//DELETE METHOD
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await User.findById(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//====================================================================
// Get USER data
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//===========================================================================
// Get latest(if any query provided) or All users data(if no query is passed)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//=======================================================================================

// Get user Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date(); //creates current date instance
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  //creates new Date object then use date var to last year and the setting it to date
  // console.log(lastYear);
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, //condition for getting current year documents data if matched
      {
        $project: { //$project just forward the specified field from document in a pipeline to the next on commonly $group (same like find() method)
          monthName: { $month: "$createdAt" }, //now getting month name from var we created createdAt and putting in month: var
        },
      },
      {
        $group: {
          //grouping all mathced data by month names
          _id: "$monthName",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

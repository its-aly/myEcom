const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//defining routes for register page

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(), //tostring converts hashed code into string
  });
  try {
    //try and ctach block to check for errors
    const savedUser = await newUser.save();
    //as we know it is promise based so we used async await in order capture req after it is succefully processed
    res.status(201).json(savedUser);
    //201 is successfully added and 200 means success
  } catch (err) {
    res.status(500).json("try another username or email  ");
  }
});
//#######################################################################################################
//#######################################################################################################

// router for login system
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  !user &&
    res
      .status(401) 
      .json("Wrong Credentials username or password does not exist");
  try {
    //fetching and decrypting pass from DB using secret key
    const hashedpass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPass = hashedpass.toString(CryptoJS.enc.Utf8);
    //converting password again to utf8 i.e simple plain text as entered by the user
    // console.log(originalPass);
    //if pass is wrong then
    originalPass !== req.body.password &&
      res
        .status(401)
        .json("Wrong Credentials username or password does not exist");
    //else
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "2d",
      }
    );
    const { password, ...others } = user._doc;
    res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

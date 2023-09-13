const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router(); 

//Add Item to CART
router.post("/", verifyToken, async (req, res) => {
  //verifyToken just confirms if user is logged in
  const newCart = new Cart(req.body);
  try { 
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // // ==========================================================================================================
// // //UPADTE CART PRODUCT

//here :id is paramtere means it have some value(variable) that can be used for authenticating users
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      { _id: req.params.id }, //it also work if u write like this[req.params.id] without '{}'and _id
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //====================================================================
// //REMOVE ITEM FROM CART
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findById(req.params.id);
    res.status(200).json("data from cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //====================================================================
// Get USER Cart
router.get("/find/:userId",verifyTokenAndAuth, async (req, res) => {
  //here id is not cart id but userID
  try {
    const cart = await Cart.findOne({ userId: req.params.userID }); //findOne cuz every users have only one cart
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //===========================================================================
// // // Get  All

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  //only admin can see all carts of all users
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //=======================================================================================


module.exports = router;

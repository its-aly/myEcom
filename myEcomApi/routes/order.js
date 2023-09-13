const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
//==========================================1=============================================
//CREATE NEW ORDER
router.post("/", verifyToken, async (req, res) => {
  //verifyToken just confirms if user is logged in
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // // ======================================2====================================================================
// // //UPADTE ORDER

//here :id is paramtere means it have some value(variable) that can be used for authenticating users
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  //ONLY ADMIN CAN UPDATE
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.id }, //it also work if u write like this[req.params.id] without '{}'and _id
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //==================================3=============================================
// //DELETE METHOD
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findById(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //====================================4=======================================================
// Get a single USER Orders
router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
  //here id is not order id but userID
  try {
    const orders = await Order.find({ userId: req.params.userID }); //find() cuz every user can have many orders
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //=================================5================================================================
// // // Get  All users orders

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  //only admin can see all orders of all users
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //====================================6===================================================

//GET Monthly(last and prevous) income by adding all orders amount of a month

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  //version 1
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1)); //monthe befor last month
  //version 2
  // const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  // console.log(lastMonth);
  // console.log(previousMonth);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          //below code is used to get income for a specific product base on id provided 
          ...(productId && { products: { $elemMatch: { productId } } }), //here spread is used to conditionally include the productId filter as part of the $match stage in the aggregation pipeline.
        },
      },
      // Second Stage
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
          //[below code is to get the address value but we have to use $push in grouping to get the value]
          // address: "$address",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
          // address: { $push: "$address" }, //[below code is to get the address value but we have to use $push in grouping to get the value]
          // wholeDoc: { $push: "$$ROOT" }, //[$$ROOT is mmmmost important operator in mongoDB it selects current document in pipeline that is being under processed ]
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

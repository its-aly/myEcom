const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // ==========================================================================================================
// //UPADTE PRODUCT

//here :id is paramtere means it have some value(variable) that can be used for authenticating users
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id }, //it also work if u write like this[req.params.id] without '{}'and _id
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //====================================================================
// //DELETE METHOD
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// //====================================================================
// Get a single Product Data clicked on by the user
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //===========================================================================
// // Get latest(if qNew provided) or by category names (if qCategory query is passed) else get all products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: { $in: qCategory },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //=======================================================================================

// // Get user Stats
// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date(); //creates current date instance
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//   //creates new Date object then use date var to last year and the setting it to date
//   console.log(lastYear);
//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } }, //condition for getting current documents data if matched
//       {
//         $project: {
//           month: { $month: "$createdAt" }, //now getting month name from var we created createdAt and putting in month: var
//         },
//       },
//       {
//         $group: {
//           //grouping all mathced data by month names
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

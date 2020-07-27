const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");
const { Product } = require("../models/Product");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" || ext !== ".jpg") {
      return cb(
        res.status(400).end("Only jpg and png formats are allowed"),
        false
      );
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      image: req.file.path,
      fileName: req.file.name,
    });
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getProducts", auth, (req, res) => {
  Product.find({}, (err, product) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, products: product });
  });
});

module.exports = router;

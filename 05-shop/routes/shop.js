const path = require("path");
// const rootDir = require("../utils/path");
const shopController = require("../controllers/shop");

const express = require("express");

// const adminData = require("./admin");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);

router.get("/cart", shopController.getOrders);

module.exports = router;

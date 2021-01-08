const path = require("path");
// const rootDir = require("../utils/path");
const adminController = require("../controllers/admin");

const express = require("express");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/add-product", adminController.postAddProduct);

router.get("/products", adminController.getProducts);

module.exports = router;

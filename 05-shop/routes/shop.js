const path = require("path");
// const rootDir = require("../utils/path");
const productsController = require('./../controllers/products')

const express = require("express");

// const adminData = require("./admin");

const router = express.Router();

router.get("/", productsController.getProducts);

module.exports = router;

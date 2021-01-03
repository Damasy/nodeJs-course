const path = require("path");
const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  //res.sendFile(path.join(rootDir, "views", "add-product.html")); // render static files
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeProduct: true,
    formsCss: true,
    productCss: true
  });
});

router.post("/add-product", (req, res, next) => {
  products.unshift({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;

const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html')) // static files
  new Product().fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Product List",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCss: true
    }); // dynamic files
  })
}

exports.getIndex = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html')) // static files
  new Product().fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Home",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCss: true
    }); // dynamic files
  })
}

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
}

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
}

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
}
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html')) // static files
  new Product().fetchAll().then(([products, filedData]) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Product List",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCss: true,
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  new Product()
    .findById(req.params["id"])
    .then(([product]) => {
      res.render("shop/product-details", {
        product: product[0],
        pageTitle: product[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html')) // static files
  new Product().fetchAll().then(([products, filedData]) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Home",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCss: true,
    }); // dynamic files
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts((cart) => {
    new Product().fetchAll().then(([products, filedData]) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body["productId"];
  new Product().findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  new Product().findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

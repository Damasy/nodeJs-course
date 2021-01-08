const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (!err) {
      cb(JSON.parse(data));
    } else {
      cb([]);
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products, null, '\t'), (err) => {
        console.log(err);
      });
    });
  }

  fetchAll(cb) {
    getProductsFromFile(cb);
  }
};

const db = require("./../utils/database");
const Cart = require("./cart");
module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  deleteById(id) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }

  fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};

const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const OrderScheme = new Scheme({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Scheme.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
});

module.exports = mongoose.model("order", OrderScheme);

// const { DataTypes } = require("sequelize");
// const sequelize = require("../util/database");

// const Order = sequelize.define("order", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
// });

// module.exports = Order;

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");
const errorController = require("./controllers/error");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

//hbs can be anything you need, but you should make the files extensions as the same
// https://stackoverflow.com/a/56877561/4664628
// default value for the engine initialization makes the
// extname as .handlebars
// defaultLayout as main-layout as the
// layoutsDir as view/layouts.
// app.engine(
//   "hbs",
//   expressHbs({
//     extname: "hbs",
//     defaultLayout: "main-layout",
//     layoutsDir: "views/layouts",
//   })
// ); // init engine for handlebars
// app.set("view engine", "hbs"); // hbs here should be the same as the name of the engine in the app.enginer
// app.set('view engine', 'pug'); // init dynamic template engine for pug(jade).
app.set("view engine", "ejs"); //init engine for ejs
app.set("views", "views"); // init templates folder.

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const Cart = require("./models/cart");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  foreignKey: "userId",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "ahmed", email: "damasy@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

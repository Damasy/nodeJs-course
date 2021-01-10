const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");
const errorController = require("./controllers/error");
const db = require("./utils/database");

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

db.execute("SELECT * FROM products")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

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
app.set('view engine', 'ejs'); //init engine for ejs
app.set("views", "views"); // init templates folder.

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //res.status(400).sendFile(path.join(__dirname, 'views', '404.html')) // static render for 404
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);

exports.get404 = (req, res, next) => {
  //res.status(400).sendFile(path.join(__dirname, 'views', '404.html')) // static render for 404
  res.status(404).render("404", { pageTitle: "Page Not Found" });
}
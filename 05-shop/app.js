const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug'); // init dynamic template engine.
app.set('views', 'views'); // init templates folder.

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //res.status(400).sendFile(path.join(__dirname, 'views', '404.html')) // static render for 404
  res.status(404).render('404', {pageTitle: 'Page Not Found'})
})

app.listen(3000);

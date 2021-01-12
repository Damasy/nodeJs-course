// >>>>>>>>>> this is ordinary way to use db directly without sequelize <<<<<<<<<<<<
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "root",
// });

// module.exports = pool.promise();

// >>>>>>> sequelize <<<<<<<<<< //
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "root", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

const mongodb = require("mongodb");
const Mongoient = mongodb.MongoClient;

let _db;
const mongoConnect = (cb) => {
  Mongoient.connect(
    "mongodb+srv://root:root@node-complete.0uxmx.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      cb();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

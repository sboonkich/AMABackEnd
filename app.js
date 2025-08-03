var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let shopsRouter = require("./routes/shops");
let loginRouter = require("./routes/logins");
let logindbRouter = require("./routes/logindb");
let logindbbcryptRouter = require("./routes/logindbbcrypt");

let tokenVerify = require("./middlewares/tokenHandle");
let sequelize = require("./middlewares/dbconnect");
const User = require("./models/user");
const Shop = require("./models/shop");

async function testDbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // console.log(User === sequelize.models.User);
    sequelize.sync();

    //    const users = await User.findAll();
    //    console.log("=".repeat(25));
    //console.log("all user", JSON.stringify(users, null, 2));

    // for (let u of users) {
    //   console.log(u.dataValues);
    // }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDbConnect();

const brcypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "2513";
let myHashPassword = "";

// brcypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//   myHashPassword = hash;
//   console.log("myHashPassword::", myHashPassword);
// });

// brcypt.compare(myPlaintextPassword, myHashPassword, function (err, result) {
//   console.log("compare::", result);
// });

// brcypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//   myHashPassword = hash;
//   brcypt.compare(myPlaintextPassword, myHashPassword, function (err, result) {
//     console.log("compare::", result);
//   });
//   console.log("myHashPassword::", myHashPassword);
// });

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//app.use('/users', [tokenVerify], usersRouter);
app.use("/users", usersRouter);
app.use("/shops", shopsRouter);
//app.use("/shops/name", shopsRouter);

app.use("/login", loginRouter);
app.use("/logindb", logindbRouter);
app.use("/logindbbcrypt", logindbbcryptRouter);

module.exports = app;

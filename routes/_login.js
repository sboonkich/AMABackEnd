var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const users = require("../datas/userData");

/* GET users listing. */
router.post("/", function (req, res, next) {
  try {
    let userData = [
      {
        username: "admin",
        password: "0000",
        fullname: "Administrator",
      },
      {
        username: "john",
        password: "0000",
        fullname: "John Doe",
      },
      {
        username: "doe",
        password: "0000",
        fullname: "Doe John",
      },
    ];
    let body = req.body;
    //let userData = users;
    //console.log(console.log(typeof users));
    console.log(body);

    if (!body.username || !body.password) {
      throw new Error("username and password is required.!");
    }

    let userNameIsValid = false;
    let passWordIsValid = false;

    for (let user of userData) {
      if (body.username == user.username) {
        userNameIsValid = true;
      }
      if (body.password == user.password) {
        passWordIsValid = true;
      }
    }
    if (!userNameIsValid || !passWordIsValid) {
      throw new Error("username or password invalid.!");
    }

    let token = jwt.sign({ username: body.username }, "shhhhh", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login Success.",
      token: token,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

module.exports = router;

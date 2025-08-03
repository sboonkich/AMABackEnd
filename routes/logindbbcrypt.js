var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

//const users = require("../datas/userData");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */
router.post("/", async function (req, res, next) {
  try {
    let body = req.body;
    //let userData = users;
    //console.log(console.log(typeof users));
    // console.log(body);

    if (!body.username || !body.password) {
      throw new Error("username and password is required.!");
    }

    let userNameIsValid = false;
    let passWordIsValid = false;

    const userData = await User.findOne({
      where: {
        username: body.username,
      },
      raw: true,
    });

    if (userData !== null) {
      userNameIsValid = true;
      if (userData) {
        let PlaintextPassword = body.password;
        let HashPassword = userData.password;
        passWordIsValid = await bcrypt.compare(PlaintextPassword, HashPassword);
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

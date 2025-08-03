var express = require("express");
var router = express.Router();
const Shops = require("../datas/CoffeeShope");
const shops = require("../datas/shops");
let tokenVerify = require("../middlewares/tokenHandle");

router.get("/", [tokenVerify], function (req, res, next) {
  res.status(200).json(Shops);
});

router.post("/name", function (req, res) {
  try {
    let body = req.body;
    //let ssp = json(Shops);

    if (!body.name) {
      throw new Error("กรุณาส่งชื่อมาด้วย");
    }

    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;

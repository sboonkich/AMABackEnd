var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    data: userData,
  });
});

router.get("/me", function (req, res) {
  res.status(200).json({
    message: "Success",
  });
});

module.exports = router;

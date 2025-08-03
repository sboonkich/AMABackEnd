var express = require("express");
var router = express.Router();
//const Shops = require("../datas/CoffeeShope");
const Shops = require("../models/shop");
let tokenVerify = require("../middlewares/tokenHandle");
const Shop = require("../models/shop");
//const dayjs = require("dayjs");
//dayjs.extend(require("dayjs/plugin/utc"));
//dayjs.extend(require("dayjs-timezone-iana-plugin"));

router.get("/", async function (req, res, next) {
  const name = req.query.name;
  let condition = name ? { where: { name } } : {};
  let shopsData = await Shops.findAll(condition);
  res.status(200).json({
    success: true,
    data: shopsData,
  });
});

router.post("/", async function (req, res) {
  try {
    const body = req.body;
    if (!body.name || !body.province || !body.district) {
      throw new Error("name , province ,district  is required.!");
    }

    let shop = await Shops.findOne({
      where: {
        name: body.name,
      },
      raw: true,
    });

    if (shop) {
      throw new Error(`Shop is exist at ${shop.province}`);
    }

    let result = await Shops.create({
      name: body.name,
      province: body.province,
      district: body.district,
      // createdAt: dayjs(new Date()).tz("Asia/Bangkok"),
      // updatedAt: dayjs(new Date()).tz("Asia/Bangkok"),
    });

    res.status(200).json({
      success: true,
      message: "Shop created.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const body = req.body;
    const id = req.params.id;
    const shop = await Shops.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
    if (!shop) {
      throw new Error("Shop not found.");
    }

    let data = shop;
    if (body.name) {
      data.name = body.name;
    } else {
      throw new Error("name is required.!");
    }

    if (body.province) {
      data.province = body.province;
    } else {
      throw new Error("provice is required.!");
    }

    if (body.district) {
      data.district = body.district;
    }

    let result = await shop.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Shop Updated.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const shop = await Shops.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
    if (!shop) {
      throw new Error("Shop not found.");
    }
    let result = await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Shop Deleted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

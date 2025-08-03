const { DataTypes } = require("sequelize");
const sequelize = require("../middlewares/dbconnect");

const Shop = sequelize.define(
  "Shop",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      //primaryKey: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    timestamps: false, // ปิดของ default
  }
);

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
module.exports = Shop;

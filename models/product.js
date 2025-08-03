const { DataTypes } = require("sequelize");
const sequelize = require("../middlewares/dbconnect");

const Products = sequelize.define("User", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    //    unique: true,
    //    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
module.exports = Products;

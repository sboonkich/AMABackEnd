const { DataTypes } = require("sequelize");
const sequelize = require("../middlewares/dbconnect");

const User = sequelize.define("User", {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true
module.exports = User;

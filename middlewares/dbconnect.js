const { Sequelize } = require("sequelize");
require("dotenv").config();

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DATABASE_NAME, //  "myappdb_mqig"
  process.env.DATABASE_USER, //  "myapp",
  process.env.DATABASE_PSSWD, //   "vyQtHEUDtahov8FpWXL1ymU7J8eXpKxJ",
  {
    host: process.env.DATABASE_HOST, //"dpg-d26ok2u3jp1c73dauk50-a.oregon-postgres.render.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  }
);

module.exports = sequelize;

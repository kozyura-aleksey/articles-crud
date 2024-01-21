const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(20) },
  password: { type: DataTypes.STRING(100) },
  role: { type: DataTypes.STRING(50), defaultValue: "user" },
});

module.exports = {
  User,
};

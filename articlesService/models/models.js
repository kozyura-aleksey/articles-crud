const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Article = sequelize.define("article", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  description: { type: DataTypes.STRING(300) },
  user_id: { type: DataTypes.INTEGER },
  admin_id: { type: DataTypes.INTEGER },
});

module.exports = {
  Article,
};

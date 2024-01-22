const { Sequelize } = require("sequelize");

module.exports = new Sequelize("articles-service", "postgres", "admin", {
  dialect: "postgres",
  host: "postgres",
  port: 5432,
});

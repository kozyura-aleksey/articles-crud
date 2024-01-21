const { Sequelize } = require("sequelize");

module.exports = new Sequelize("articles-service", "postgres", "admin", {
  dialect: "postgres",
  host: "localhost",
  port: 5435,
});

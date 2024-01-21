const { Sequelize } = require("sequelize");

module.exports = new Sequelize("users-service", "postgres", "admin", {
  dialect: "postgres",
  host: "localhost",
  port: 5433,
});

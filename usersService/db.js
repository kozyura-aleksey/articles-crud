const { Sequelize } = require("sequelize");

module.exports = new Sequelize("users-service", "postgres", "admin", {
  dialect: "postgres",
  host: "postgres",
  port: 5432,
});

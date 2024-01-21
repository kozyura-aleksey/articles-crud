const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "admins-service",
  password: "admin",
  port: 5434,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

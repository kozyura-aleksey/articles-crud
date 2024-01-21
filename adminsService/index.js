const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;
const pool = require("./db");
const bcrypt = require("bcrypt");
const axios = require("axios");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/authentication", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Некорректный email или password");
    }
    const query = "SELECT * FROM admins WHERE email = $1";
    try {
      const result = await pool.query(query, [email]);
      if (result.rows.length === 0) {
        return res.status(401).json("Такого пользователя не существует");
      }
      const hashedPasswordFromDb = result.rows[0].password;
      const match = bcrypt.compareSync(password, hashedPasswordFromDb);
      if (match) {
        const response = await axios.post(
          "http://localhost:5000/generateJwt",
          {
            id: result.rows[0].id,
            email: result.rows[0].email,
            role: "admin",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jwtToken = response.data;
        return res
          .status(200)
          .json(`Аутентификация успешна, token: ${jwtToken}`);
      } else {
        return res
          .status(400)
          .json("Аутентификация не успешна, пароль не верный");
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

const start = async () => {
  try {
    app.listen(port, () => console.log(`Admins service listening at ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();

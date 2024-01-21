const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const app = express();
const port = 5000;
const Controller = require("./controllers/controller");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/register",
  async (req, res) => await Controller.registration(req, res)
);

app.post("/login", async (req, res) => await Controller.login(req, res));

app.post("/generateJwt", (req, res) => {
  const { email, role, id } = req.body;
  res.status(200).json(Controller.generatejwt(id, email, role));
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`Users service listening at ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();

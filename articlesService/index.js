const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const app = express();
const port = 5002;
const authMiddleware = require("./middlewares/auth-middleware");
const Controller = require("./controllers/controller");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/articles", authMiddleware, async (req, res) =>
  Controller.createArticle(req, res)
);

app.put("/articles/:id", authMiddleware, async (req, res) =>
  Controller.updateArticle(req, res)
);

app.delete("/articles/:id", authMiddleware, async (req, res) =>
  Controller.deleteArticle(req, res)
);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () =>
      console.log(`Articles service listening at ${port}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();

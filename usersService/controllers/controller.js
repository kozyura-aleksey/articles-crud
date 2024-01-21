const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");

class Controller {
  generatejwt(id, email, role) {
    return jwt.sign({ id, email, role }, "secret", {
      expiresIn: "30m",
    });
  }

  async registration(req, res, next) {
    try {
      const { email, password, name } = req.body;
      if (!email || !password) {
        return next(res.status(404).json("Некорректный email или password"));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          res.status(404).json("Пользователь с таким email уже существует")
        );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email,
        password: hashPassword,
        name,
      });
      const token = this.generatejwt(user.id, user.email, user.role);
      const info = {
        token,
      };
      return res.status(200).json(info);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(res.status(500).json("Пользователь не найден"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(res.status(500).json("Указан неверный пароль"));
      }
      const token = this.generatejwt(user.id, user.email, user.role);
      const info = {
        token,
      };
      return res.status(200).json(info);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new Controller();

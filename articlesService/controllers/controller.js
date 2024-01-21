const { Article } = require("../models/models");

class Controller {
  async createArticle(req, res, next) {
    try {
      const { title, description } = req.body;
      const { id, role } = req.user;
      const article = await Article.create({
        title,
        description,
        user_id: id,
      });
      return res.status(200).json(article);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async updateArticle(req, res, next) {
    try {
      const { title, description } = req.body;
      const { id, role } = req.user;
      const articleId = req.params.id;
      if (role === "user") {
        await Article.update(
          {
            title,
            description,
          },
          {
            where: {
              id: articleId,
              user_id: id,
            },
          }
        );
      } else {
        await Article.update(
          {
            title,
            description,
            admin_id: id,
          },
          {
            where: {
              id: articleId,
            },
          }
        );
      }
      const article = await Article.findOne({
        where: {
          id: articleId,
        },
      });
      return res.status(200).json(article);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async deleteArticle(req, res, next) {
    try {
      const { id, role } = req.user;
      const articleId = req.params.id;
      if (role === "user") {
        await Article.destroy({
          where: {
            id: articleId,
            user_id: id,
          },
        });
      } else {
        await Article.destroy({
          where: {
            id: articleId,
          },
        });
      }
      return res.status(200).json("Статья удалена");
    } catch {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new Controller();

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    if (req.method === "OPTIONS") {
      next();
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (e) {
    console.log("Отсутствует токен авторизации ", e);
    res.status(404).json(e);
  }
};

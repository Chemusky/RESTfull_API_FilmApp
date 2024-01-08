const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token"); // se recupera el token (en thunder cliente se selecciona header y escribimos auth-token pegando el token generado)
  if (!token) return res.status(401).send("Access denied");

  //trycatch se controlan bien los errores
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("verified", verified); //he puesto el console para ver que nos devuelve
    req.user = verified;
    next();
  } catch (error) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_REFRESH);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Expired Token");
    }
  }
};

module.exports = verifyToken;

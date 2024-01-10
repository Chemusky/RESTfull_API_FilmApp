const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token"); // se recupera el token (en thunder client se selecciona header y escribimos auth-token pegando el token generado)
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

// con esta función es suficiente, los tokens son los mismos para los diferentes roles existentes
const verifyAdmin = (req, res, next) => {
  const token = req.header("admin-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (verified.role == "user") {
      return res.status(200).send({ status: "No tienes acceso" });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { verifyToken, verifyAdmin };

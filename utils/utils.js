const jwt = require("jsonwebtoken");

//creamos funcion generíca para tener los dos tokens
// esta carpeta es para crear funciones y luego exportarlas para usarse
const generateToken = (user, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(user, process.env.TOKEN_REFRESH, {
      expiresIn: "60m",
    });
  }
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "15m" });
};

module.exports = { generateToken };

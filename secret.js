const crypto = require("crypto");
const secret = "Vuelta de la navidad"; //palabrea secreta
const secret2 = "La cuesta de enero es dura"; //añade más seguridad

const hash = crypto.createHmac("sha256", secret).update(secret2).digest("hex");
console.log(hash);

//token de refresco
const secretHash = "Soy el grinch";
const secretHash2 = "El grinch es verde y feo";

const refreshHash = crypto
  .createHmac("sha256", secretHash)
  .update(secretHash2)
  .digest("hex");

console.log(refreshHash);

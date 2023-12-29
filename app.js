const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();
app.use(express.json());

// Conexión a mongo
require("dotenv").config();
const url_mongo = process.env.DATABASE_URL_DEV;
console.log(url_mongo);
mongoose.connect(url_mongo);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con mongo ${error}`); //comprobamos si sale error y que nos indique el error
});

db.on("connected", () => {
  console.log(`Conexión realizada con éxito a la BB.DD!`); // comprobamos si se ha conectado correctamente
});

db.on("disconnected", () => {
  console.log(`Mongo ha sido desconectado`); // comprobamos si se ha desconectado
});
/**********************************************************************************************************/

app.listen(PORT, () => {
  console.log(`Server running at http://localhost${PORT}`);
});

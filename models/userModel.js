const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    minLength: 6,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minLength: 8,
  },
  role: {
    type: String,
    require: [true, "El rol es obligatorio"],
    enum: ["user", "admin"],
    default: "user",
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const user = mongoose.model("Users", userSchema, "Users");

module.exports = user;

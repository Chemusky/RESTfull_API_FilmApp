const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/utils");

const signup = async (req, res) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });

    await newUser.save();

    res.status(201).json({
      status: "Success",
      message: "Usuario creado exitosamente",
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(404)
        .json({ status: "Failed", data: null, error: "El correo ya existe" });
    }

    if (error.message.includes("Correo incorrecto")) {
      return res.status(404).json({
        status: "Failed",
        data: null,
        error: "El correo es incorrecto",
      });
    }

    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }); // busca al usuarios por el email para validar
    // bycrypt es para la encriptacion de la contraseña
    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        const token = generateToken(
          { id: user.id, email: user.email, role: user.role },
          false
        );

        const tokenRefresh = generateToken(
          { id: user.id, email: user.email, role: user.role },
          true
        );

        return res.status(201).json({
          status: "Success",
          message: "Usuario logueado correctamente",
          data: {
            user: user,
            token: token,
            tokenRefresh: tokenRefresh,
          },
        });
      }

      return res.status(400).json({
        status: "Failed",
        data: null,
        error: "Usuario y contraseña no encontrado",
      });
    }

    return res.status(400).json({
      status: "Failed",
      data: null,
      error: "Usuario y contraseña no encontrado",
    });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const refreshToken = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  const user = { id: user.id, email: user.email, role: user.role };
  const token = generateToken(user, false);
  const refreshToken = generateToken(user, true);

  res.status(200).json({
    status: "succeded",
    data: {
      token,
      refreshToken,
    },
    error: null,
  });
};

module.exports = { signup, login, refreshToken };

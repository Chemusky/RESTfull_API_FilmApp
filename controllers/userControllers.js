const UserModel = require("../models/userModel");
const MovieModel = require("../models/movieModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/utils");

// Registro de Usuario
// Una vez desarrollado el controlado de creación de usuario, en el thunder client en el body se añade el nombre, email y password (constraseña: 123456789)
// si quiero crear un usuario con rol de admin lo tengo que especificar en el thunder client
// porque por defecto se crea con el rol user
const signup = async (req, res) => {
  try {
    const newUser = new UserModel({
      name: req.body.name,
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

//Inicio de sesión de usuario. En el thunder ponemos su endpoint completo, selecionamos post y el eamil y la contraseña
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
    // se pone el mismo status 400 porque va referido en caso que no se inserte el usuario y la contraseña. Se da el mismo mensaje por si es un hacker
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

// creación del token de refresco
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

// añadir películas a favoritos. Tener en cuenta que hay que poner en el header auth-token con el token generado al iniciar sesión para añadir pelis
const addFavouritesMovies = async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.favorites.push(movieId);
    await user.save();
    res
      .status(200)
      .json({ error: "La película ha sido añadida a favoritos con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al añadir la película deseada a favoritos" });
  }
};

//borrar las películas de favoritos
const deleteFavouritesMovies = async (req, res) => {
  try {
    const movieId = req.params.id;

    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado " });
    }

    const indexOfMovieId = user.favorites.indexOf(movieId);

    if (indexOfMovieId === -1) {
      return res.status(404).json({
        status: "Error",
        message: "Película no encontrada en favoritos",
      });
    }

    user.favorites.splice(indexOfMovieId, 1);
    await user.save();
    res.status(200).json({ error: "La película se ha eliminado de favoritos" });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la peli de favoritos",
      message: error.message,
    });
  }
};

// obtener las películas favoritas del usuario logeado
const getFavouritesMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado " });
    }

    const listMovie = [];

    for (const movieId of user.favorites) {
      const favorite = await MovieModel.findById(movieId);
      console.log(favorite);
      if (favorite) {
        listMovie.push(favorite.title);
      }
    }
    res.status(200).json({ data: listMovie });
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar los favoritos",
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  refreshToken,
  addFavouritesMovies,
  getFavouritesMovies,
  deleteFavouritesMovies,
};

const movieModel = require("../models/movieModel");

// obtener todas las películas
const getMovies = async (req, res) => {
  try {
    const data = await movieModel.find(); // Busca todos las películas en la base de datos
    res.status(200).json({ status: "succeeded", data, error: null }); // Devuelve los usuarios encontrados
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

// obtener la película deseada
const getMovieById = async (req, res) => {
  try {
    // console.log("getMovieById", req.movie); // he puesto el console log para ver que nos devuelve
    const movieId = req.params.id; // Obtiene el ID del usuario de los parámetros de la solicitud
    const movie = await movieModel.findById(movieId); // Busca un usuario por su ID
    res.status(200).json({ status: "succeeded", movie, error: null }); // Devuelve el usuario encontrado
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

// obtener las 10 peliculas insertadas recientemente
const getRecentMovies = async (req, res) => {
  try {
    const movies = await movieModel.find().sort({ createAt: 1 }).limit(10);
    res.status(200).json({
      status:
        "Se han obtenido las 10 películas insertadas recientemente con éxito",
      data: movies,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error al encontrar las 10 películas más recientes",
      data: null,
      error: error.message,
    }); // Maneja cualquier error que ocurra
  }
};

// obtener las 10 películas mejor valoradas
const getPopularMovies = async (req, res) => {
  try {
    const movies = await movieModel.find().sort({ rating: -1 }).limit(10);
    res.status(200).json({
      status: "Se han obtenido las 10 películas mejor valoradas con éxito",
      data: movies,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error al encontrar las 10 películas mejor valoradas",
      data: null,
      error: error.message,
    }); // Maneja cualquier error que ocurra
  }
};

module.exports = { getMovies, getMovieById, getRecentMovies, getPopularMovies };

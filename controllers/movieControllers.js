const movieModel = require("../models/movieModel");

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

const getRecentMovies = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await movieModel.sort(movieId - 1).limit(10);
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message }); // Maneja cualquier error que ocurra
  }
};

module.exports = { getMovies, getMovieById };

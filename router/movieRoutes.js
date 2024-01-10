const {
  getMovies,
  getMovieById,
  getRecentMovies,
  getPopularMovies,
} = require("../controllers/movieControllers");

const router = require("express").Router();

//IMPORTANTE: EL ORDEN DE LOS ROUTER SI IMPORTA, LAS SIMPLES VAN ARRIBA DEL TODO Y LUEGO VAN LAS COMPUESTAS
// LAS COMPUESTAS SON LAS QUE TIENEN EL ID
// TENER EN CUENTA QUE AL EMPEZAR A LEER EL CÓDIGO EMPIEZA DE ARRIBA A ABAJO

//Añadir la ruta referente a añadir una película. Le pongo el middleware verifyAdmin para que solo de permiso a los administradores

router.get("/", getMovies);
router.get("/recent_movies", getRecentMovies);
router.get("/most_popular", getPopularMovies);
router.get("/:id", getMovieById);

module.exports = router;

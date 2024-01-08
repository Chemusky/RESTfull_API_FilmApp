const { getMovies, getMovieById } = require("../controllers/movieControllers");

const router = require("express").Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

module.exports = router;

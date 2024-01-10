const router = require("express").Router();
const {
  signup,
  login,
  refreshToken,
  addFavouritesMovies,
  getFavouritesMovies,
  deleteFavouritesMovies,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/auth");

// En los router que tienen el middleware, para hacer la petición en el thunderclient, hay que poner en el header auth-token y pegar el token generado al iniciar sesión
router.post("/signup", signup);
router.post("/login", login);
router.get("/refreshToken", verifyToken, refreshToken);
router.get("/user/favorite", verifyToken, getFavouritesMovies);
router.post("/:id/addFavorite", verifyToken, addFavouritesMovies);
router.delete("/:id/deleteFavorite", verifyToken, deleteFavouritesMovies);

module.exports = router;

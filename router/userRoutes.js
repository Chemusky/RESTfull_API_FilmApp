const router = require("express").Router();
const {
  signup,
  login,
  refreshToken,
  addFavouritesMovies,
  getFavouritesMovies,
} = require("../controllers/userControllers");
const verifyToken = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/refreshToken", verifyToken, refreshToken);
router.get("/user/favorite", verifyToken, getFavouritesMovies);
router.post("/user/:id/favorite", verifyToken, addFavouritesMovies);

module.exports = router;

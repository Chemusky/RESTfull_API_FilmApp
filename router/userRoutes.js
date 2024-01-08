const router = require("express").Router();
const {
  signup,
  login,
  refreshToken,
} = require("../controllers/userControllers");
const verifyToken = require("../middlewares/auth");

router.post("/signup", signup);
router.post("login", login);
router.get("/refreshToken", verifyToken, refreshToken);

const router = require("express").Router();
const {
  register,
  getAllUsers,
  getUserByUsername,
} = require("../controllers/authController");

router.post("/register", register);
router.get("/", getAllUsers);
router.get("/login/:username", getUserByUsername);

module.exports = router;

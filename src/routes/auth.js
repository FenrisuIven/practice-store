const { Router } = require("express");
const router = Router();

const {
  isAuth,
  getLogin,
  postLogin,
  getLogout,
  getRegistration,
  postRegistration,
} = require("../controller/auth");

router.get("/logout", isAuth, getLogout);
router.get("/login", getLogin);
router.get("/register", getRegistration);

router.post("/login", postLogin);
router.post("/register", postRegistration);

module.exports = router;

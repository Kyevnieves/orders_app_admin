const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.get("/perfil", (req, res) => {
  res.render("auth/profile");
});
module.exports = router;

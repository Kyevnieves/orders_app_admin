const express = require("express");
const pool = require("../database");
const router = express.Router();

const obtenerProductosDeUsuario = (productsID) => {
  return pool.query(`SELECT * FROM products WHERE id IN ${productsID}`);
};

router.get("/", async (req, res) => {
  const response = await pool.query("SELECT * FROM users WHERE id = 3 ");
  const productsUser = response[0].products;
  /* const products = await pool.query(
    `SELECT * FROM products WHERE id IN ${productsUser}`
  ); */
  const products = await obtenerProductosDeUsuario(productsUser);
  res.render("index");
});

router.get("/perfil", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
  }
  res.render("auth/profile");
});
module.exports = router;

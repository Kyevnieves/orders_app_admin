const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/crear/producto", (req, res) => {
  res.render("productos/crear");
});

router.get("/productos", async (req, res) => {
  const products = await pool.query("SELECT * FROM products");
  res.render("productos/todos", { products });
});

router.get("/editar/producto/:id", async (req, res) => {
  let { id } = req.params;
  const product = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
  res.render("productos/editar", { product });
});

router.post("/crear/producto", async (req, res) => {
  const { productname, productcod, productprice, productimg } = req.body;
  const newProduct = {
    productname,
    productcod,
    productprice,
    productimg,
  };
  const response = await pool.query("INSERT INTO products set ?", [newProduct]);
  req.flash("success", "Producto creado");
  res.redirect(`/productos`);
});

router.post("/editar/producto/:id", async (req, res) => {
  let { id } = req.params;
  let { productname, productcod, productprice, productimg } = req.body;
  const newProductInfo = {
    productname,
    productcod,
    productprice,
    productimg,
  };
  const response = await pool.query(`UPDATE products set ? WHERE id = ?`, [
    newProductInfo,
    id,
  ]);
  req.flash("success", "Producto actualizado");
  res.redirect(`/productos`);
});

router.get("/eliminar/producto/:id", async (req, res) => {
  let { id } = req.params;
  const response = await pool.query(`DELETE FROM products WHERE id = ${id}`);
  req.flash("success", "Producto eliminado");
  res.redirect("/productos");
});
module.exports = router;

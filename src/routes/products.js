const express = require("express");
const router = express.Router();
const pool = require("../database");
const { upload } = require("../lib/multer");
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
router.post("/crear/producto", upload, async (req, res) => {
  const { productname, productcod, productprice } = req.body;
  const productimg = req.file.path;
  const newProduct = {
    productname,
    productcod,
    productprice,
    productimg,
  };
  const response = await pool.query("INSERT INTO products set ?", [newProduct]);
  res.send(response);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../database");

router.post("/procesar/pedido/:id", async (req, res) => {
  let { id } = req.params;
  const response = await pool.query(
    `UPDATE orders SET procesado = 1 WHERE id = ${id}`
  );
  console.log(response);
});

router.post("/enviado/pedido/:id", async (req, res) => {
  let { id } = req.params;
  const response = await pool.query(
    `UPDATE orders SET enviado = 1 WHERE id = ${id}`
  );
  console.log(response);
});

module.exports = router;

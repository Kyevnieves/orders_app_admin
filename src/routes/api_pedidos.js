const express = require("express");
const router = express.Router();
const pool = require("../database");
const converter = require("json-2-csv");

router.post("/procesar/pedido/:id", async (req, res) => {
  let { id } = req.params;
  const response = await pool.query(
    `UPDATE orders SET procesado = 1 WHERE id = ${id}`
  );
  const pedido = await pool.query(`SELECT * FROM orders WHERE id = ${id}`);
  const strgPedido = pedido[0].pedido;
  const jsonInfoPedido = JSON.parse(strgPedido);
  const jsonPedido = jsonInfoPedido[0].pedido;
  let json2csvCallback = function (err, csv) {
    if (err) throw err;
    res.send(csv);
  };
  converter.json2csv(jsonPedido, json2csvCallback);
});

router.post("/enviado/pedido/:id", async (req, res) => {
  let { id } = req.params;
  const response = await pool.query(
    `UPDATE orders SET enviado = 1 WHERE id = ${id}`
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../database");

const formatearDate = (date) => {
  let dateFormat = new Date(date);
  let fechaFormateada =
    dateFormat.getDate() +
    "/" +
    dateFormat.getMonth() +
    "/" +
    dateFormat.getFullYear();
  return fechaFormateada;
};

router.get("/pedidos", async (req, res) => {
  const pedido = await pool.query(`SELECT * FROM orders`);
  const pedidoObj = [];
  pedido.forEach((p) => {
    let fecha = formatearDate(p.createdAt);
    let json = {
      id: p.id,
      idcorrelativo: p.idcorrelativo,
      companyname: req.user.companyname,
      procesado: p.procesado,
      enviado: p.enviado,
      fecha,
    };
    pedidoObj.push(json);
  });
  res.render("pedidos/todos", { pedidoObj });
});

router.get("/pedido/:id", async (req, res) => {
  let { id } = req.params;
  let pedido = await pool.query(`SELECT * FROM orders WHERE id = ${id}`);
  let strgPedido = pedido[0].pedido;
  let arrayPedido = JSON.parse(strgPedido);
  let jsonPedido = arrayPedido[0].pedido;
  let date = arrayPedido[0].companyInfo;
  let fecha = formatearDate(date.fecha);
  let jsonFecha = [fecha];
  res.render("pedidos/pedido", { jsonPedido, jsonFecha });
});

router.get("/pedidos/noprocesados", async (req, res) => {
  const pedido = await pool.query(`SELECT * FROM orders WHERE procesado = 0`);
  const pedidoObj = [];
  pedido.forEach((p) => {
    let fecha = formatearDate(p.createdAt);
    let json = {
      id: p.id,
      idcorrelativo: p.idcorrelativo,
      companyname: req.user.companyname,
      procesado: p.procesado,
      enviado: p.enviado,
      fecha,
    };
    pedidoObj.push(json);
  });
  res.render("pedidos/noprocesados", { pedidoObj });
});

router.get("/pedidos/noenviados", async (req, res) => {
  const pedido = await pool.query(
    `SELECT * FROM orders WHERE enviado = 0 AND procesado = 1`
  );
  const pedidoObj = [];
  pedido.forEach((p) => {
    let fecha = formatearDate(p.createdAt);
    let json = {
      id: p.id,
      idcorrelativo: p.idcorrelativo,
      companyname: req.user.companyname,
      procesado: p.procesado,
      enviado: p.enviado,
      fecha,
    };
    pedidoObj.push(json);
  });
  res.render("pedidos/noenviados", { pedidoObj });
});

router.get("/pedidos/enviados", async (req, res) => {
  const pedido = await pool.query(
    `SELECT * FROM orders WHERE enviado = 1 AND procesado = 1`
  );
  const pedidoObj = [];
  pedido.forEach((p) => {
    let fecha = formatearDate(p.createdAt);
    let json = {
      id: p.id,
      idcorrelativo: p.idcorrelativo,
      companyname: req.user.companyname,
      procesado: p.procesado,
      enviado: p.enviado,
      fecha,
    };
    pedidoObj.push(json);
  });
  res.render("pedidos/enviados", { pedidoObj });
});
router.post("/orders/add", async (req, res) => {
  const { pedido } = req.body;
  await pool.query(
    `UPDATE users SET idorder = idorder + 1 WHERE id = ${req.user.id}`
  );

  const newOrder = {
    companyid: req.user.id,
    idcorrelativo: req.user.idorder,
    pedido,
    procesado: 0,
    enviado: 0,
  };

  const response = await pool.query("INSERT INTO orders set ?", [newOrder]);
  res.redirect(`/pedido/${response.insertId}`);
});

module.exports = router;

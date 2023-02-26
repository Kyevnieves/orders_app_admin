const express = require("express");
const pool = require("../database");
const router = express.Router();

const obtenerProductosDeUsuario = (productsID) => {
  return pool.query(`SELECT * FROM products WHERE id IN ${productsID}`);
};

const modificacionQuery = (response) => {
  const newObj = [];
  response.forEach((e) => {
    let strg = JSON.stringify(e);
    let replace = strg.replace("COUNT(*)", "cantidad");
    let obj = JSON.parse(replace);
    newObj.push(obj);
  });
  const strgObj = JSON.stringify(newObj);
  return strgObj;
};

const obtenerCantidadPedidos = async () => {
  const response = await pool.query(
    `SELECT month, COUNT(*) FROM orders WHERE month is not null GROUP BY month;`
  );
  // CONVERSION A STRING PARA MODIFICACIONES
  let resultado = modificacionQuery(response);
  return resultado;
};

const utilidadPedidosMensuales = (response) => {
  const newObj = [];
  response.forEach((e) => {
    let strg = JSON.stringify(e);
    let replace = strg.replace("COUNT(*)", "cantidad");
    let obj = JSON.parse(replace);
    newObj.push(obj);
  });
  return newObj[0];
};

const cantidadPedidosMensuales = async () => {
  let date = new Date();
  let mesActual = date.getMonth() + 1;
  ////////////////////////////////////////////////////////////////////////
  let procesados = await pool.query(
    `SELECT COUNT(*) FROM orders WHERE procesado = 1 AND month = ${mesActual}`
  );
  let objCantidadProcesados = utilidadPedidosMensuales(procesados);
  let cantidadProcesados = objCantidadProcesados.cantidad;
  ////////////////////////////////////////////////////////////////////////
  let enviados = await pool.query(
    `SELECT COUNT(*) FROM orders WHERE enviado = 1 AND month = ${mesActual}`
  );
  let objCantidadEnviados = utilidadPedidosMensuales(enviados);
  let cantidadEnviados = objCantidadEnviados.cantidad;
  ////////////////////////////////////////////////////////////////////////
  let cancelados = await pool.query(
    `SELECT COUNT(*) FROM orders WHERE cancelado = 1 AND month = ${mesActual}`
  );
  let objCantidadCancelados = utilidadPedidosMensuales(cancelados);
  let cantidadCancelados = objCantidadCancelados.cantidad;
  ////////////////////////////////////////////////////////////////////////
  let totales = await pool.query(
    `SELECT COUNT(*) FROM orders WHERE month = ${mesActual}`
  );
  let objCantidadTotales = utilidadPedidosMensuales(totales);
  let cantidadTotales = objCantidadTotales.cantidad;
  ////////////////////////////////////////////////////////////////////////
  let usuarios = await pool.query(`SELECT COUNT(*) FROM users`);
  let objCantidadUsuarios = utilidadPedidosMensuales(usuarios);
  let cantidadUsuarios = objCantidadUsuarios.cantidad;
  let Obj = {
    procesados: cantidadProcesados,
    enviados: cantidadEnviados,
    cancelados: cantidadCancelados,
    totales: cantidadTotales,
    usuarios: cantidadUsuarios,
  };
  return Obj;
};

router.get("/", async (req, res) => {
  const response = await pool.query("SELECT * FROM users WHERE id = 3 ");
  const productsUser = response[0].products;
  /* const products = await pool.query(
    `SELECT * FROM products WHERE id IN ${productsUser}`
  ); */
  const products = await obtenerProductosDeUsuario(productsUser);
  const reporteMensual = await cantidadPedidosMensuales();
  const reporteAnual = await obtenerCantidadPedidos();
  res.render("index", { reporteAnual, reporteMensual });
});

router.get("/perfil", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
  }
  res.render("auth/profile");
});
module.exports = router;

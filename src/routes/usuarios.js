const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/registrar/usuario", async (req, res) => {
  res.render("usuarios/registrar");
});

router.get("/usuarios", async (req, res) => {
  const usuarios = await pool.query("SELECT * FROM users WHERE superuser = 0");
  const userObj = [];
  usuarios.forEach((u) => {
    let json = {
      id: u.id,
      codigo: u.username,
      empresa: u.companyname,
      telefono: u.companyphone,
      email: u.companyemail,
    };
    userObj.push(json);
  });
  res.render("usuarios/todos", { userObj });
});

router.get("/usuario/:id", async (req, res) => {
  let { id } = req.params;
  const usuario = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  res.render("usuarios/profile", { usuario });
});

router.get("/eliminar/usuario/:id", async (req, res) => {
  let { id } = req.params;
  const response = await pool.query(`DELETE FROM users WHERE id = ${id}`);
  console.log(response);
  req.flash("success", "Usuario eliminado");
  res.redirect("/usuarios");
});

router.get("/editar/usuario/:id", async (req, res) => {
  let { id } = req.params;
  const usuario = await pool.query(
    `SELECT * FROM users WHERE id = ${id} AND superuser = 0`
  );
  res.render("usuarios/editar", { usuario });
});

router.post("/editar/usuario/:id", async (req, res) => {
  let { id } = req.params;
  let {
    username,
    companyname,
    companyrif,
    companyphone,
    companyaddress,
    companyemail,
    companylogo,
  } = req.body;

  const newUser = {
    username,
    companyname,
    companyrif,
    companyphone,
    companyaddress,
    companyemail,
    companylogo,
  };
  console.log(req.body);
  await pool.query("UPDATE users set ? WHERE id = ?", [newUser, id]);
  req.flash("success", "Usuario actualizado");
  res.redirect(`/usuarios`);
});
module.exports = router;

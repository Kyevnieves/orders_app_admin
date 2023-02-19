const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/registrar/usuario", async (req, res) => {
  res.render("usuarios/registrar");
});

router.get("/usuarios", async (req, res) => {
  const usuarios = await pool.query("SELECT * FROM users");
  const userObj = [];
  usuarios.forEach((u) => {
    let json = {
      codigo: u.username,
      empresa: u.companyname,
      telefono: u.companyphone,
      email: u.companyemail,
    };
    userObj.push(json);
  });
  res.render("usuarios/todos", { userObj });
});
module.exports = router;

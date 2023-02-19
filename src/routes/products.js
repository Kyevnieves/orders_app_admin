const express = require("express");
const router = express.Router();
const pool = require("../database");

router.post('/product/add', async (req, res)=>{
    const { productname, productcod, productprice, productimg } = req.body;
    const newProduct = {
        productname,
        productcod,
        productprice,
        productimg,
      };
    const response = await pool.query("INSERT INTO products set ?", [newProduct]);
    res.send(response)
})

module.exports = router;

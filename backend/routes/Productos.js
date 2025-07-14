const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

router.post('/', async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.json({ ok: true });
});

module.exports = router;

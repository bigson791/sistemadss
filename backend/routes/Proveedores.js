const express = require('express');
const router = express.Router();
const Proveedor = require('../models/Proveedor');

router.get('/', async (req, res) => {
  const proveedores = await Proveedor.find();
  res.json(proveedores);
});

router.post('/', async (req, res) => {
  const nuevo = new Proveedor(req.body);
  await nuevo.save();
  res.json({ ok: true });
});

module.exports = router;

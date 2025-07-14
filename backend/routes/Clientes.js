const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.get('/', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

router.post('/', async (req, res) => {
  const nuevo = new Cliente(req.body);
  await nuevo.save();
  res.json({ ok: true });
});

module.exports = router;

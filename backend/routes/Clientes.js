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

router.put('/:id', async (req, res) => {
  await Cliente.findByIdAndUpdate(req.params.id, req.body);
  res.json({ ok: true });
});

router.delete('/:id', async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});


module.exports = router;

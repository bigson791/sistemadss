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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, req.body, { new: true });
    if (!proveedorActualizado) {
      return res.status(404).json({ ok: false, mensaje: 'Proveedor no encontrado' });
    }
    res.json({ ok: true, mensaje: 'Proveedor actualizado', proveedor: proveedorActualizado });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
